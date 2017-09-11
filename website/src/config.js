import React from 'react';

import demos from 'demos';

const {ComplexChart, StreamgraphExample} = demos;

export const PROJECT_TYPE = 'github';

export const PROJECT_NAME = 'React-vis';
export const PROJECT_ORG = 'uber';
export const PROJECT_URL = `https://github.com/${PROJECT_ORG}/${PROJECT_NAME}`;
export const PROJECT_DESC = 'A composable charting library';

export const PROJECTS = {};

export const HOME_HEADING = 'A composable charting library';

export const HOME_RIGHT = (
  <div>
    <div className="m-bottom">
      <ComplexChart forFrontPage />
    </div>
    <div>
      <StreamgraphExample forFrontPage />
    </div>
  </div>
);

export const HOME_BULLETS = [{
  text: 'React Consistent',
  desc: 'A chart in react-vis consists of components made of properties and children',
  img: 'images/icon-react.svg'
}, {
  text: 'High-level',
  desc: 'Create charts with the least amount of code possible',
  img: 'images/icon-layers.svg'
}, {
  text: 'Expressive',
  desc: 'Handles a large range of different charts, from area charts to treemaps',
  img: 'images/icon-chart.svg'
}, {
  text: 'Deeply customizable',
  desc: 'Sensible defaults, yet everything can be modified',
  img: 'images/icon-custom.svg'
}, {
  text: 'Industry-strong',
  desc: 'Born to support the many internal tools at Uber',
  img: 'images/icon-high-precision.svg'
}];

export const ADDITIONAL_LINKS = [];

export const BASENAME = '/react-vis';
export const HISTORY = 'browser';
