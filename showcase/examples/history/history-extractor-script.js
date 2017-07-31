const fs = require('fs');
const util = require('util');
// only runs on node 8 so be careful!
const exec = util.promisify(require('child_process').exec);

async function buildHistory() {
  const {stdout} = await exec('git log');
  const commits = stdout.split(/commit.*/g).map(commitMsg => {
    const authorLine = (/Author: (.*)/g).exec(commitMsg);
    if (!authorLine || authorLine.length === 0) {
      return {invalid: true};
    }
    const dateLine = (/Date: (.*)/g).exec(commitMsg)[1];
    const authorString = authorLine[1];
    return {
      email: (/\<(.*)\>/g).exec(authorString)[1].trim(),
      author: (/(.*)\</g).exec(authorString)[1].trim(),
      date: new Date(dateLine)
    };
  });

  fs.writeFile('./showcase/examples/history/history.json', JSON.stringify(commits), 'utf8', (err, data) => {
    /* eslint-disable no-console */
    if (err) {
      console.log(err);
    } else {
      console.log('complete');
    }
    /* eslint-enable no-console */
  });
}
buildHistory();
