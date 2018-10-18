const fs = require('fs');
const path = require('path');

const reactVis = require('../dist');

const pathMap = new Map();
const reactVisModule = require.main.children.find(child => child.exports === reactVis);

// Map origin source file location for each element exported from main module
Object.keys(reactVis).forEach(key => {
  const originModule = reactVisModule.children.find(child => child.exports &&
    // Can't use Object.values here. It is not available in node v6
    Object.keys(child.exports)
      .map(key => child.exports[key])
      .find(exp => exp === reactVis[key])
  );
  if (originModule) {
    const defaultExport = reactVis[key] === originModule.exports.default;
    const { filename } = originModule;
    if (defaultExport) {
      pathMap.set(filename, key);
    } else {
      const oldValue = pathMap.get(filename) || [];
      pathMap.set(filename, [...oldValue, key])
    }
  }
});

function generateModuleFile(filePath, value) {
  const { dir, name } = path.parse(filePath);
  const dtsFileName = path.join(dir, `${name}.d.ts`);

  fs.writeFileSync(
    dtsFileName,
    Array.isArray(value)
      ? `export { ${value.join(', ')} } from 'react-vis';\n`
      : `import { ${value} } from 'react-vis';\nexport default ${value};\n`
  );
}

// write modules definitions to ../dist directory
Array.from(pathMap).forEach(([filePath, value]) => generateModuleFile(filePath, value));

// write modules definitions to ../es directory
Array.from(pathMap).forEach(([filePath, value]) => {
  filePath = path.resolve('../es', path.relative('../dist', filePath));
  generateModuleFile(filePath, value);
});
