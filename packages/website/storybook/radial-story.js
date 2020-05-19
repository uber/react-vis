import React from 'react';

import {setAddon, storiesOf} from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

import {
  withKnobs,
  boolean,
  color,
  number,
  object,
  select,
  text
} from '@storybook/addon-knobs/react';

import {ArcSeries} from 'react-vis';

import {generateRadialData} from './storybook-data.js';
import {
  SimpleChartWrapperNoAxes,
  SimpleRadialChartWrapper,
  jsxOptions
} from './storybook-utils.js';

// function styledLineSeries(props) {
//   return (
//     <LineSeries
//       data={props.data}
//       opacity={number('opacity', props.opacity || 1, {max: 1, min: 0, range: true, step: 0.01}, 'style')}
//       stroke={color('stroke', props.stroke || '#12939a', 'style')}
//       strokeDasharray={text('strokeDasharray', props.strokeDasharray || '', 'style')}
//       strokeStyle={select(
//         'strokeStyle',
//         {solid: 'solid', dashed: 'dashed'},
//         props.strokeStyle || 'solid',
//         'style'
//       )}
//       strokeWidth={text('strokeWidth', props.strokeWidth || '', 'style')}
//       style={object('style', props.style || {}, 'style')}
//     />
//   );
// }

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
    jsxOptions
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
    jsxOptions
  );
