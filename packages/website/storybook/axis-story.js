import React from 'react';

import {storiesOf} from '@storybook/react';

import {withKnobs, number, select} from '@storybook/addon-knobs/react';

import {LineSeries, VerticalBarSeries, XAxis, YAxis} from 'react-vis';
import {generateLinearData, getTime, getWord} from './storybook-data.js';

import {SimpleChartWrapperNoAxes} from './storybook-utils';

storiesOf('Axes and scales/Axis Formatting/Base', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Axis orientation',
    () => {
      const XAxisOrientation = select(
        'XAxis.orientation',
        {bottom: 'bottom', top: 'top'},
        'bottom',
        'XAxis'
      );
      const YAxisOrientation = select(
        'YAxis.orientation',
        {left: 'left', right: 'right'},
        'left',
        'YAxis'
      );
      return (
        <SimpleChartWrapperNoAxes
          margin={{
            ...(XAxisOrientation === 'top' ? {bottom: 20, top: 40} : {}),
            ...(YAxisOrientation === 'right' ? {left: 10, right: 40} : {})
          }}
        >
          <XAxis orientation={XAxisOrientation} />
          <YAxis orientation={YAxisOrientation} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Axis titles',
    () => {
      const XAxisPosition = select(
        'XAxis.position',
        {start: 'start', middle: 'middle', end: 'end'},
        'end',
        'XAxis'
      );
      const YAxisPosition = select(
        'YAxis.position',
        {start: 'start', middle: 'middle', end: 'end'},
        'end',
        'YAxis'
      );

      return (
        <SimpleChartWrapperNoAxes>
          <XAxis title="x-axis" position={XAxisPosition} />
          <YAxis title="y-axis" position={YAxisPosition} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Tick total',
    () => {
      const xTickTotal = number(
        'XAxis.tickTotal',
        10,
        {max: 20, min: 0, range: true},
        'XAxis'
      );
      const yTickTotal = number(
        'YAxis.tickTotal',
        10,
        {max: 20, min: 0, range: true},
        'YAxis'
      );

      return (
        <SimpleChartWrapperNoAxes>
          <XAxis tickTotal={xTickTotal} />
          <YAxis tickTotal={yTickTotal} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Tick Size',
    () => {
      const xTickSize = number(
        'XAxis.tickSize',
        6,
        {max: 10, min: 0, range: true},
        'XAxis'
      );
      const yTickSize = number(
        'YAxis.tickSize',
        6,
        {max: 10, min: 0, range: true},
        'YAxis'
      );

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSize={xTickSize} />
          <YAxis tickSize={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Tick Size (Inner)',
    () => {
      const xTickSize = number(
        'XAxis.tickSizeInner',
        6,
        {max: 10, min: 0, range: true},
        'XAxis'
      );
      const yTickSize = number(
        'YAxis.tickSizeInner',
        6,
        {max: 10, min: 0, range: true},
        'YAxis'
      );

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSizeInner={xTickSize} />
          <YAxis tickSizeInner={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Tick Size (Outer)',
    () => {
      const xTickSize = number(
        'XAxis.tickSizeOuter',
        6,
        {max: 10, min: 0, range: true},
        'XAxis'
      );
      const yTickSize = number(
        'YAxis.tickSizeOuter',
        6,
        {max: 10, min: 0, range: true},
        'YAxis'
      );

      return (
        <SimpleChartWrapperNoAxes noHorizontalGridLines noVerticalGridLines>
          <XAxis tickSizeOuter={xTickSize} />
          <YAxis tickSizeOuter={yTickSize} />
          <LineSeries data={generateLinearData({key: 'line1'})} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'Tick orientation',
    () => {
      const tickLabelAngle = number(
        'tickLabelAngle',
        0,
        {max: 90, min: -90, range: true},
        'XAxis'
      );
      return (
        <SimpleChartWrapperNoAxes margin={{bottom: 80}}>
          <XAxis
            tickFormat={d => new Date(d).toLocaleDateString()}
            tickLabelAngle={tickLabelAngle}
          />
          <YAxis />
          <LineSeries
            data={generateLinearData({
              key: 'line-with-time',
              extraParams: [['x', getTime({})]]
            })}
          />
        </SimpleChartWrapperNoAxes>
      );
    },
  );
storiesOf('Axes and scales/Scales', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'time Scale',
    () => {
      return (
        <SimpleChartWrapperNoAxes margin={{right: 20}}>
          <XAxis tickFormat={d => new Date(d).toLocaleDateString()} />
          <YAxis />
          <LineSeries
            data={generateLinearData({
              key: 'line-with-time',
              extraParams: [['x', getTime({})]]
            })}
          />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'category scale',
    () => {
      const data = generateLinearData({
        nbPoints: 8,
        changeRatio: 0.4,
        key: 'bar1'
      });
      return (
        <SimpleChartWrapperNoAxes xType="ordinal">
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
        </SimpleChartWrapperNoAxes>
      );
    },
  )
  .addWithJSX(
    'ordinal scale',
    () => {
      const data = generateLinearData({
        nbPoints: 8,
        changeRatio: 0.4,
        key: 'bar-with-words',
        extraParams: [['x', getWord({})]]
      });
      return (
        <SimpleChartWrapperNoAxes xType="ordinal">
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
        </SimpleChartWrapperNoAxes>
      );
    },
  );
