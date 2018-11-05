'use strict';

function padStr(str) {
  const padding = ' '.repeat(2);
  return str.split('\n').map(s=>(padding+s).trimRight()).join('\n');
}

//Can't support custom validators
function isCustomValidator(type) {
  return typeof type === "function" && type.name !== '_fpr';
}  

function fakeProp(type, propToString, isRequired){
  if (isCustomValidator(type)) {
    type = 'any';
  }
  const _fpr = ()=>{};
  _fpr.toString = (path = '', options = {}) => {
    const result = propToString ? propToString(type, path, options) : type
    return result;
  };
  _fpr._type = type;
  _fpr._req = isRequired;
  if (!isRequired) {
    _fpr.isRequired = fakeProp(type, propToString, true);
  }
  return _fpr;
}

function oneOfToString(props) {
  return props
    .map(prop=>JSON.stringify(prop))
    .filter(str=>typeof str === 'string')
    .map(str=>str.replace(/"/g, `'`))
    .join(' | ');
}  

function oneOfTypeToString(props, path, options) {
  return props.map(prop=>prop.toString(path, options)).join(' | ');
}

function shapeToString(shape, path, options) {
  return `{\n`+padStr(
    Object.keys(shape)
      .map(key=>`${key}${shape[key]._req ? '' : '?'}: ${shape[key].toString(`${path}.${key}`, options)}`)
      .join(';\n')
  )+`;\n}`;
} 

function arrayOfToString(prop, path, options) {
  return `Array<${prop.toString(path, options)}>`;
}

function objectOfToString(prop, path, options) {
  return `{[key: string]: ${prop.toString(path, options)}}`;
}

function genericCallback(name) {
  return (prop, path, {[name]: cb})=> cb ? cb(path, prop) : prop;
}

const fakePropTypes = {
  //simple values
  bool: fakeProp('boolean'),
  number: fakeProp('number'),
  string: fakeProp('string'),
  symbol: fakeProp('Symbol'),

  //values that could be mapped
  element: fakeProp('ReactChild', genericCallback('mapReactChild')),
  node: fakeProp('ReactNode', genericCallback('mapReactNode')),
  array: fakeProp('Array<any>', genericCallback('mapArray')),
  func: fakeProp('Function', genericCallback('mapFunction')),
  object: fakeProp('{[key: string]: any}', genericCallback('mapObject')),
  any: fakeProp('any', genericCallback('mapAny')),

  //complex values
  oneOf: (props)=>fakeProp(props, oneOfToString),
  oneOfType: (props)=>fakeProp(props, oneOfTypeToString),
  arrayOf: (prop)=>fakeProp(prop, arrayOfToString),
  objectOf: (prop)=>fakeProp(prop, objectOfToString),
  instanceOf: (func)=>fakeProp(func.name), //prop should be class|function
  shape: (shape)=>fakeProp(shape, shapeToString),
  exact: (shape)=>fakeProp(shape, shapeToString),
};

function getComponentProps(comp, path, options) {
  const parentPropTypes = comp.__proto__.propTypes || {};
  const parentDefaultProps = comp.__proto__.defaultProps || {};
  const parentKeys = [...Object.keys(parentPropTypes), ...Object.keys(parentDefaultProps)];

  const result = Object.keys(comp.propTypes)
    .filter(key=>!parentKeys.some(parentKey=>key===parentKey))
    .map((key)=>{
      const prop = isCustomValidator(comp.propTypes[key]) ? 'any' : comp.propTypes[key];
      const defaultProp = comp.defaultProps && comp.defaultProps[key];
      const required = prop._req && (defaultProp === undefined);
      const propValue = prop.toString(`${path}.${key}`, options);
      const propKey = key + (required ? '' : '?');
      return `${propKey}: ${propValue};`
    })
    .join('\n');

  return result ? `\n${result}\n` : '';
}

function getComponent(name, comp, options) {
  const parentName = comp.__proto__.name;
  const props = padStr(getComponentProps(comp, name, options));
  let result;
  if (parentName) {
    result = 
      `export interface ${name}Props {${props}}\n`+
      `export class ${name} extends ${parentName}<${name}Props> {}\n`;
  } else {
    result = 
      `export interface ${name}Props {${props}}\n`+
      `export const ${name}: SFC<${name}Props>;\n`;
  }

  if (options.getComponent) {
    result = options.getComponent(name, props, parentName, result);
  }

  return result;
};

function generateTypes(moduleName, moduleExport, options = {}) {
  const reactImport = options.skipReactImport ? '' : 
    `import { Component, PureComponent, ReactChild, ReactNode, SFC } from 'react';\n\n`;

  let customDeclarations = options.customDeclarations || '';
  if (Array.isArray(customDeclarations)) {
    customDeclarations = customDeclarations.join('\n');
  }

  const moduleContent = moduleExport.propTypes
    //single component
    ? getComponent(moduleExport.name, moduleExport, options)
    //set of components
    : Object.keys(moduleExport)
        .filter(key=>moduleExport[key].propTypes)
        .map(key=>getComponent(key, moduleExport[key], options))
        .join('\n');

  return  `declare module '${moduleName}' {\n\n`+
    padStr(
      reactImport+
      customDeclarations+'\n'+
      moduleContent+'\n'
    )+
  `}\n`;
}

const injectPropTypes = (propTypes) => { 
  Object.keys(propTypes).forEach(key=>propTypes[key] = fakePropTypes[key]);
  return propTypes;
}

module.exports = {injectPropTypes, generateTypes};