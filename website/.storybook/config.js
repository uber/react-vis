import {configure} from '@storybook/react';

function loadStories() {
  require('../storybook/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
