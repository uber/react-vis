/* eslint-env node */
const fs = require('fs');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration)
    .forEach(p => {
      const importPath = p.value.source.value;
      if (isLocalImport(importPath)) {
        p.value.source.value = `~/${importPath}`;
      }
    })
    .toSource();
};

const PREFIX = './packages/react-vis/src/';
function isLocalImport(importPath) {
  const checks = [importPath, importPath + '/index.js', importPath + '.js'].map(
    x => PREFIX + x
  );

  return checks.some(x => fs.existsSync(x));
}
