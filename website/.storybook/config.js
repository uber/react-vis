import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  addonPanelInRight: true
});

function loadStories() {
  require('../storybook/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);