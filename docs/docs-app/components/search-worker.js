module.exports = function worker(self) {
  self.addEventListener('message', (event) => {
    switch (event.data.actionType) {
    case 'getIndex':
      // const myInit = {
      //   method: 'GET',
      //   headers: (new Headers()),
      //   mode: 'cors',
      //   cache: 'default'
      // };
      //
      // const myRequest = new Request('markdown/examples/showcases/plots-showcase.md', myInit);
      fetch(
        'http://localhost:3001/markdown/examples/showcases/plots-showcase.md',
        {method: 'GET'}
      )
        .then(response => {
          self.postMessage(JSON.stringify(response.text()));
          // response.blob()
        });
        // .then(myBlob => {
        // });
      break;
    case 'search':
      self.postMessage('search for thing');
      break;
    default:
      break;
    }
    // // ev.data=4 from main.js
    // const startNum = parseInt(event.data, 10);
    // setInterval(() => {
    //   const r = startNum / Math.random() - 1;
    //   self.postMessage([r]);
    // }, 500);
  });
};
