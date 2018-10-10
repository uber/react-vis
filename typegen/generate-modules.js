const fs = require('fs');
const path = require('path');

function generateSubModules(mainJsFile, basePath) {
  const pathMap = new Map();
  const regex = /export\s+(\S+|\{[\s\w,]*\})\s+from\s+'(\.\/)?(\S+)'/g;

  let match;
  do {
    match = regex.exec(mainJsFile);
    if (match) {
      pathMap.set(match[1], match[3]);
    }
  } while (match);

  Array.from(pathMap).forEach(([name, componentPath]) => {
    let fullPath = path.join(basePath, `${componentPath}`);
    fullPath = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
      ? path.join(fullPath, 'index.d.ts')
      : fullPath + '.d.ts';

    fs.writeFileSync(
      fullPath,
      name.includes('{')
        ? `export ${name} from 'react-vis';\n`
        : `import { ${name} } from 'react-vis';\nexport default ${name};\n`,
    )
  });
}

const indexContent = fs.readFileSync('../src/index.js', 'utf8');

generateSubModules(indexContent, '../es');
generateSubModules(indexContent, '../dist');
