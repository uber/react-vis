/* eslint-disable no-undef */
import {JSDOM} from 'jsdom';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()})

const dom = new JSDOM('<body></body>');
const window = dom.window;
global.document = window.document;
global.window = document.defaultView;

global.navigator = {
  userAgent: 'node.js'
};

/* eslint-enable no-undef */
