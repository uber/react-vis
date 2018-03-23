import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs, color, number, object, text} from '@storybook/addon-knobs/react';

import {HorizontalBarSeries, VerticalBarSeries} from 'react-vis';

import {generateLinearData, intRandom, random} from './storybook-data.js';
import {chooseColorScale, SimpleChartWrapper} from './storybook-utils.js';

function addBarSeriesStory(isVertical = true) {
  const seriesName = isVertical ? 'VerticalBarSeries' : 'HorizontalBarSeries';
  const Series = isVertical ? VerticalBarSeries : HorizontalBarSeries;
  function styledSeries(props) {
    return (
      <Series
        color={color('color', props.color || null)}
        data={props.data}
        fill={color('fill', props.fill || '#12939a')}
        opacity={number('opacity', props.opacity || 1, {max: 1, min: 0, range: true, step: 0.01})}
        stroke={color('stroke', props.stroke || '#12939a')}
        style={object('style', props.style || {})}
      />
    );
  }

  const xyPlotParams = isVertical ? {} : {xDomain: [0, 20], yDomain: [0, 8]};
  function dataGenerator(params) {
    return generateLinearData({...params, flipXY: !isVertical});
  }

  storiesOf(seriesName, module)
    .addDecorator(withKnobs)
    .add(`single ${seriesName}`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          <Series data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'})} />
        </SimpleChartWrapper>
      );
    })
    .add(`multiple ${seriesName} - clustered`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          <Series data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'})} />
          <Series data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar2'})} />
          <Series data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar3'})} />
        </SimpleChartWrapper>
      );
    })
    .add(`multiple ${seriesName} - stacked`, () => {
      return (
        <SimpleChartWrapper
          {...(isVertical ?
            {
              stackBy: 'y',
              xDomain: [0, 8],
              yDomain: [0, 50]
            } :
            {
              stackBy: 'x',
              xDomain: [0, 50],
              yDomain: [0, 8]
            })}
        >
          <Series
            cluster={text('BarSeries.1.cluster', 'stack 1')}
            data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'})}
          />
          <Series
            cluster={text('BarSeries.2.cluster', 'stack 1')}
            data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar2'})}
          />
          <Series
            cluster={text('BarSeries.3.cluster', 'stack 1')}
            data={dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar3'})}
          />
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - color vary by datapoint`, () => {
      const {colorScale, colorRange} = chooseColorScale();

      return (
        <SimpleChartWrapper {...xyPlotParams} colorScale={colorScale} colorRange={colorRange}>
          <Series
            data={dataGenerator({
              nbPoints: 8,
              changeRatio: 0.4,
              extraParams: [['color', intRandom({})]],
              key: 'bar-color-1'
            })}
          />
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - opacity vary by datapoint`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          <Series
            data={dataGenerator({
              nbPoints: 8,
              changeRatio: 0.4,
              extraParams: [['opacity', random({min: 0.5, max: 1})]],
              key: 'bar-opacity-1'
            })}
          />
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - styling - fill`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          {styledSeries({
            data: dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'}),
            fill: '#2c51be'
          })}
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - styling - opacity`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          {styledSeries({
            data: dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'}),
            opacity: 0.5
          })}
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - styling - stroke`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          {styledSeries({
            data: dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'}),
            stroke: '#2c51be'
          })}
        </SimpleChartWrapper>
      );
    })
    .add(`${seriesName} - styling - style`, () => {
      return (
        <SimpleChartWrapper {...xyPlotParams}>
          {styledSeries({
            data: dataGenerator({nbPoints: 8, changeRatio: 0.4, key: 'bar1'}),
            style: {
              stroke: '#2c51be',
              strokeWidth: '3px'
            }
          })}
        </SimpleChartWrapper>
      );
    });
}
addBarSeriesStory();
addBarSeriesStory(false);
