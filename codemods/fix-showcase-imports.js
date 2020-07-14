/* eslint-env node,jscodeshift */
// const j = require('jscodeshift');

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.ImportDeclaration)
    .forEach(p => {
      const importPath = p.value.source.value;
      if (!importPath.startsWith('react-vis/')) {
        return;
      }
      if (p.value.specifiers.length === 0) {
        return;
      }

      if (
        p.value.specifiers.length === 1 &&
        p.value.specifiers[0].type === 'ImportDefaultSpecifier'
      ) {
        j(p).replaceWith(
          j.importDeclaration(
            [j.importSpecifier(j.identifier(p.value.specifiers[0].local.name))],
            j.literal('react-vis')
          )
        );
      }
    })
    .toSource();
};
