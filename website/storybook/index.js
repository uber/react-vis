import React from 'react';

import '../../dist/style.css';
import '../.storybook/storybook.css';

import {storiesOf} from '@storybook/react';
import {withKnobs, boolean} from '@storybook/addon-knobs/react';
import {AutoSizer} from 'react-virtualized';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  VerticalBarSeries
} from 'react-vis';
function generateData({nbPoints = 20, startValue = 10, changeRatio = 0.1}) {
  return new Array(nbPoints).fill(0).reduce(
    (prev, curr, i) => [
      ...prev,
      {
        x: i + 1,
        y: prev[i].y * (1 + (Math.random() - 0.5) * changeRatio)
      }
    ],
    [{x: 0, y: startValue}]
  );
}

function SimpleChartWrapper(props) {
  return (
    <AutoSizer>
      {({height, width}) => (
        <XYPlot height={height} width={width} yDomain={[0, 20]}>
          {boolean('X Axis', true) && <XAxis />}
          {boolean('Y Axis', true) && <YAxis />}
          {boolean('vertical gridlines', true) && <VerticalGridLines />}
          {boolean('horizontal gridlines', true) && <HorizontalGridLines />}
          {props.children}
        </XYPlot>
      )}
    </AutoSizer>
  );
}

storiesOf('Single chart', module)
  .addDecorator(withKnobs)
  .add('Single Line chart', () => {
    return (
      <SimpleChartWrapper>
        <LineSeries data={generateData({})} />
      </SimpleChartWrapper>
    );
  })
  .add('Multiple Line series', () => {
    return (
      <SimpleChartWrapper>
        <LineSeries data={generateData({})} />
        <LineSeries data={generateData({})} />
        <LineSeries data={generateData({})} />
      </SimpleChartWrapper>
    );
  })
  .add('Vertical Bar Chart', () => {
    return (
      <SimpleChartWrapper>
        <VerticalBarSeries data={generateData({nbPoints: 8, changeRatio: 0.4})} />
      </SimpleChartWrapper>
    );
  })
  .add('Multiple Bar series, clustered', () => {
    return (
      <SimpleChartWrapper>
        <VerticalBarSeries data={generateData({nbPoints: 8, changeRatio: 0.4})} />
        <VerticalBarSeries data={generateData({nbPoints: 8, changeRatio: 0.4})} />
        <VerticalBarSeries data={generateData({nbPoints: 8, changeRatio: 0.4})} />
      </SimpleChartWrapper>
    );
  });
