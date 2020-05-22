import React from 'react';

import {storiesOf} from '@storybook/react';

import {
  withKnobs,
  boolean,
  number,
  object,
} from '@storybook/addon-knobs/react';

import {generateRadialData} from './storybook-data.js';
import {
  SimpleRadialChartWrapper,
} from './storybook-utils.js';

function labelProps() {
  const showLabels = boolean('showLabels', true, 'Labels');
  const labelsRadiusMultiplier = number(
    'labelsRadiusMultiplier',
    1.1,
    {max: 2, min: 0, range: true, step: 0.1},
    'Labels'
  );
  const labelsStyle = object('labelStyle', {fontSize: 12}, 'Labels');
  return {labelsRadiusMultiplier, labelsStyle, showLabels};
}

storiesOf('Series/RadialCharts/Pie Chart', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Single Pie Chart',
    () => {
      const nbSlices = number(
        'nbSlices',
        5,
        {max: 8, min: 1, range: true, step: 1},
        'Pie Chart'
      );
      return (
        <SimpleRadialChartWrapper
          data={generateRadialData({key: 'radial-1'}).slice(0, nbSlices)}
        />
      );
    },
  )
  .addWithJSX(
    'Single Pie Chart with Labels',
    () => {
      const nbSlices = number(
        'nbSlices',
        5,
        {max: 8, min: 1, range: true, step: 1},
        'Pie Chart'
      );
      return (
        <SimpleRadialChartWrapper
          data={generateRadialData({key: 'radial-1'}).slice(0, nbSlices)}
          {...labelProps()}
        />
      );
    },
  );
