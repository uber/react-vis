const { injectPropTypes, generateTypes } = require('prop-types-to-dts');
const fs = require('fs');

const PropTypes = injectPropTypes(require('prop-types'));

const reactVis = require('../dist');

//Adding missing prop types (described in docs but not covered with prop types of components)
const colorType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
reactVis.AbstractSeries.propTypes = {
  ...reactVis.AbstractSeries.propTypes,
  color: colorType,
  stroke: colorType,
  fill: colorType,
  opacity: PropTypes.number,
}

function splitPath(path) {
  const [fullCompName, ...properties] = path.split('.');
  const compName = fullCompName.replace('Canvas', '');
  const propName = properties.join('.');
  return { compName, propName };
}

function isAbstract(name) {
  return name === 'AbstractSeries';
}

function getPoint(name) {
  return isAbstract(name) ? 'T' : `${name}Point`;
}

const customDeclarations = fs.readFileSync('header.d.ts');

let reactVisTypings = generateTypes('react-vis', reactVis, {
  customDeclarations,

  skipReactImport: true,

  getComponent: (name, props, parentName, def) => {
    if (isAbstract(name)) {
      return `export interface ${name}Props<T extends ${name}Point> {${props}}\n` +
        `export class ${name}<T> extends ${parentName}<T> {}\n`;
    } else if (isAbstract(parentName)) {
      return `export interface ${name}Props extends ${parentName}Props<${name.replace('Canvas', '')}Point> {${props}}\n` +
        `export class ${name} extends ${parentName}<${name}Props> {}\n`;
    } else {
      return def;
    }
  },

  mapObject: (path, def) => {
    const { compName, propName } = splitPath(path);

    if (/style/i.test(propName)) {
      return 'CSSProperties';

    } else if (/data/.test(propName)) {
      return getPoint(compName);

    } else if (/nodes/.test(propName)) {
      return getPoint(compName);

    } else {
      if (!['Sankey.links.source', 'Sankey.links.target', 'Crosshair.values',
        'Crosshair.series', 'Hint.scales', 'Hint.value'].includes(path)) {
        console.warn(`Object not mapped: ${compName}.${propName}`);
      }
      return def;
    }
  },

  mapFunction: (path, def) => {
    const { compName, propName } = splitPath(path);
    if (/onValue\w+|onLeaf\w+|onLink\w+/.test(propName)) {
      return `RVValueEventHandler<${getPoint(compName)}>`;

    } else if (/onNearestX/.test(propName)) {
      return `RVNearestXEventHandler<${getPoint(compName)}>`;

    } else if (/onNearestXY/.test(propName)) {
      return `RVNearestXYEventHandler<${getPoint(compName)}>`;

    } else if (/getNull/.test(propName)) { //should be before /get/ handler!!!
      return `RVGetNull<${getPoint(compName)}>`;

    } else if (/sortFunction/.test(propName)) {
      return `RVSortFn<${getPoint(compName)}>`;

    } else if (/getAlignStyle/.test(propName)) { //should be before /get/ handler!!!
      return `RVGetAlignStyle`;

    } else if (/get\w+/.test(propName)) {
      let key = /get(\w+)/.exec(propName)[1];
      key = key[0].toLowerCase() + key.slice(1);
      return `RVGet<${getPoint(compName)}, '${key}'>`;

    } else if (/onMouse\w+|on\w*Click|onSeries\w+|onHover|onBrushStart|onDragStart/.test(propName)) {
      return 'RVMouseEventHandler';

    } else if (/onTouch\w+/.test(propName)) {
      return 'RVTouchEventHandler';

    } else if (/onWheel/.test(propName)) {
      return 'RVWheelEventHandler';

    } else if (/onBlur/.test(propName)) {
      return 'RVFocusEventHandler';

    } else if (/onBrush|onDrag|onBrushEnd|onDragEnd/.test(propName)) {
      return 'RVBrushEventHandler';

    } else if (/onSearchChange/.test(propName)) {
      return 'RVSearchChangeEventHandler';

    } else if (/onItem\w+/.test(propName)) {
      return 'RVItemEventHandler';

    } else if (/tickFormat|tickValue/.test(propName)) {
      return 'RVTickFormat';

    } else if (/itemsFormat/.test(propName)) {
      return 'RVItemsFormat';

    } else if (/titleFormat/.test(propName)) {
      return 'RVTitleFormat';

    } else if (/padAngle/.test(propName)) {
      return 'RVPadAngle';

    } else if (/searchFn/.test(propName)) {
      return 'RVSearchFn';

    } else if (/Hint.format/.test(path)) {
      return 'RVHintFormat';

    } else {
      if (!['LineSeries.curve', 'LineMarkSeries.curve', 'CustomSVGSeries.customComponent',
        'Voronoi.x', 'Voronoi.y', 'RadialChart.subLabel'].includes(path)) {
        console.warn(`Function not mapped: ${compName}.${propName}`);
      }
      return def;
    }
  },

  mapAny: (path, def) => {
    const { compName, propName } = splitPath(path);

    if (/\w+(Base)?Value/.test(propName)) {
      const key = /_?(\w+?)(Base)?Value/.exec(propName)[1];
      return `${getPoint(compName)}['${key}']`;
    } else {
      console.warn(`Any not mapped: ${compName}.${propName}`);
      return def;
    }
  },

  mapArray: (path, def) => {
    const { compName, propName } = splitPath(path);

    if (/\w+(Domain|Range)/.test(propName)) {
      const key = /(\w+)(Domain|Range)/.exec(propName)[1];
      return `Array<${getPoint(compName)}['${key}']>`;
    } else {
      if (!['AbstractSeries.data'].includes(path)) {
        console.warn(`Array not mapped: ${compName}.${propName}`);
      }
      return def;
    }
  },
});

reactVisTypings = reactVisTypings
  .replace(/ReactComponent/g, 'Component')
  .replace(/ReactPureComponent/g, 'PureComponent');

fs.writeFileSync('../index.d.ts', reactVisTypings + '\n');

