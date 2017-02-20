/* eslint-disable no-undef */
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function mapProperties(property) {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

/* eslint-enable no-undef */
