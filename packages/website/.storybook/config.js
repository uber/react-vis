import {configure, addParameters, setAddon} from '@storybook/react';
import JSXAddon, {jsxDecorator} from 'storybook-addon-jsx';
import {SimpleChartWrapper, jsxOptions} from '../storybook/storybook-utils';

setAddon(JSXAddon);
addParameters({jsx: jsxOptions});

function loadStories() {
  require('../storybook/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
