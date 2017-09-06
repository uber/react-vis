const fs = require('fs');

const INJECTION_REG = /<!-- INJECT:".+\" -->/g;

fs.readdir('docs/markdown', (err, items) => {
  if (err) {
    return;
  }

  let files = items;

  items
    .filter(fileName => !fileName.match(/\.md/) && fileName !== 'index.json')
    .forEach(dirName => {
      const dirItems = fs.readdirSync(`docs/markdown/${dirName}`);
      files = files.concat(dirItems.map(item => `${dirName}/${item}`));
    });

  const mappedFiles = files
    .filter(fileName => fileName.match(/\.md/) && fileName !== 'index.json')
    .map(fileName => {
      return {
        text: fs.readFileSync(`docs/markdown/${fileName}`, 'utf8').replace(INJECTION_REG, ''),
        fileName
      };
    });

  fs.writeFile('docs/markdown/index.json', JSON.stringify(mappedFiles), 'utf8', (error, data) => {
    /* eslint-disable no-console */
    if (error) {
      console.log(err);
    } else {
      console.log('complete');
    }
    /* eslint-enable no-console */
  });
});
