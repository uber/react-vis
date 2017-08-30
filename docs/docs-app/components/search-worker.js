const PAGES = require('../constants/pages.js');
const {docsRouting, docsNaming} = PAGES;

let pages = [];

// modify the results
function buildResults(searchReg) {
  return pages
    .filter(page => page.text.match(searchReg) || page.name.match(searchReg));
}

/* eslint-disable consistent-this */
module.exports = function worker(self) {
  self.addEventListener('message', (event) => {
    switch (event.data.actionType) {
    case 'getIndex':
      fetch(
        'http://localhost:3001/markdown/index.json',
        {
          method: 'GET',
          'content-type': 'application/json'
        }
      )
      .then(response => response.json())
      .then(body => {
        pages = body.map(page => {

          return {
            text: page.text,
            link: docsRouting[page.fileName] || '',
            name: docsNaming[page.fileName] || ''
          };
        })
        .sort((a, b) => {
          return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        });
        self.postMessage({actionType: 'successful-load', body: 'complete'});
      });

      break;
    case 'search':
      const searchReg = new RegExp(event.data.searchString, 'i');
      self.postMessage({
        actionType: 'search-result',
        body: event.data.searchString.length ? buildResults(searchReg) : []
      });
      break;
    default:
      break;
    }
  });
};
