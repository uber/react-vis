/* eslint-disable no-undef */
import jsdom from 'jsdom';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

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
