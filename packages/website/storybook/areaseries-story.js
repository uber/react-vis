import React from 'react';

import {storiesOf} from '@storybook/react';

import {
  withKnobs,
  color,
  number,
  object,
  select
} from '@storybook/addon-knobs/react';

import {AreaSeries, LineSeries} from 'react-vis';

import {generateLinearData, nonUniformX} from './storybook-data.js';
import {SimpleChartWrapper} from './storybook-utils.js';

function styledAreaSeries(props) {
  return (
    <AreaSeries
      data={props.data}
      fill={color('fill', props.stroke || '#12939a', 'AreaSeries style')}
      opacity={number(
        'opacity',
        props.opacity || 1,
        {max: 1, min: 0, range: true, step: 0.01},
        'AreaSeries style'
      )}
      stroke={color('stroke', props.stroke || '#12939a', 'AreaSeries style')}
      style={object('style', props.style || {}, 'AreaSeries style')}
    />
  );
}

storiesOf('Series/AreaSeries/Base', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Single Area chart',
    () => {
      return (
        <SimpleChartWrapper>
          <AreaSeries opacity={0.5} data={generateLinearData({key: 'area1'})} />
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'Single Area chart paired with LineSeries',
    () => {
      return (
        <SimpleChartWrapper>
          <AreaSeries
            opacity={0.25}
            data={generateLinearData({key: 'area1'})}
            stroke="transparent"
          />
          <LineSeries
            stroke="#12939a"
            data={generateLinearData({key: 'area1'})}
          />
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'With negative numbers',
    () => {
      return (
        <SimpleChartWrapper yDomain={[-3, 3]}>
          <AreaSeries
            opacity={0.5}
            data={generateLinearData({startValue: 0, key: 'area-neg'})}
          />
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'With non-uniform x numbers',
    () => {
      return (
        <SimpleChartWrapper>
          <AreaSeries
            opacity={0.5}
            data={generateLinearData({
              key: 'area-random-x',
              extraParams: [['x', nonUniformX()]]
            })}
          />
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'Multiple Area series',
    () => {
      return (
        <SimpleChartWrapper>
          <AreaSeries
            opacity={0.25}
            data={generateLinearData({key: 'area1'})}
          />
          <AreaSeries
            opacity={0.25}
            data={generateLinearData({key: 'area2'})}
          />
          <AreaSeries
            opacity={0.25}
            data={generateLinearData({key: 'area3'})}
          />
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'Multiple stacked Area series',
    () => {
      return (
        <SimpleChartWrapper stackBy="y" yDomain={[0, 50]}>
          <AreaSeries opacity={0.5} data={generateLinearData({key: 'area1'})} />
          <AreaSeries opacity={0.5} data={generateLinearData({key: 'area2'})} />
          <AreaSeries opacity={0.5} data={generateLinearData({key: 'area3'})} />
        </SimpleChartWrapper>
      );
    },
  );

storiesOf('Series/AreaSeries/Styling', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'opacity',
    () => {
      return (
        <SimpleChartWrapper>
          {styledAreaSeries({
            data: generateLinearData({key: 'area1'}),
            opacity: 0.75
          })}
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'stroke',
    () => {
      return (
        <SimpleChartWrapper>
          {styledAreaSeries({
            data: generateLinearData({key: 'area1'}),
            stroke: '#2c51be'
          })}
        </SimpleChartWrapper>
      );
    },
  )
  .addWithJSX(
    'style object',
    () => {
      return (
        <SimpleChartWrapper>
          {styledAreaSeries({
            data: generateLinearData({key: 'area1'}),
            style: {
              stroke: '#E48000',
              strokeAreajoin: 'round',
              strokeWidth: '3px'
            }
          })}
        </SimpleChartWrapper>
      );
    },
  );

storiesOf('Series/AreaSeries/Curve', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Curve',
    () => {
      return (
        <SimpleChartWrapper>
          <AreaSeries
            opacity={0.5}
            data={generateLinearData({key: 'area1'})}
            curve={select(
              'curve',
              {
                curveBasis: 'curveBasis',
                curveCatmullRom: 'curveCatmullRom',
                curveCardinal: 'curveCardinal',
                curveAreaar: 'curveAreaar',
                curveStep: 'curveStep',
                curveStepAfter: 'curveStepAfter',
                curveStepBefore: 'curveStepBefore',
                none: null
              },
              'curveBasis',
              'AreaSeries curve'
            )}
          />
        </SimpleChartWrapper>
      );
    },
  );
