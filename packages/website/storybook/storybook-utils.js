import React from 'react';
import {AutoSizer} from 'react-virtualized';
import {
  XYPlot,
  RadialChart,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis';
import {boolean, select} from '@storybook/addon-knobs/react';

export const CATEGORY_PALETTE = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#125C77',
  '#4DC19C',
  '#776E57',
  '#12939A',
  '#17B8BE',
  '#F6D18A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#829AE3',
  '#E79FD5',
  '#1E96BE',
  '#89DAC1',
  '#B3AD9E'
];

export const LINEAR_PALETTE = ['#EF5D28', '#FF9833'];

export function SimpleChartWrapper(props) {
  return (
    <AutoSizer>
      {({height, width}) => (
        <XYPlot
          height={height}
          width={width}
          colorRange={props.colorRange}
          colorScale={props.colorType}
          fillRange={props.fillRange}
          fillScale={props.fillScale}
          margin={props.margin}
          strokeRange={props.strokeRange}
          strokeType={props.strokeType}
          xDomain={props.xDomain}
          xType={props.xType}
          yDomain={props.yDomain || [0, 20]}
          stackBy={props.stackBy}
        >
          {props.noXAxis
            ? null
            : boolean('X Axis', true, 'General chart options') && <XAxis />}
          {props.noYAxis
            ? null
            : boolean('Y Axis', true, 'General chart options') && <YAxis />}
          {props.noVerticalGridLines
            ? null
            : boolean('vertical gridlines', true, 'General chart options') && (
                <VerticalGridLines />
              )}
          {props.noHorizontalGridLines
            ? null
            : boolean(
                'horizontal gridlines',
                true,
                'General chart options'
              ) && <HorizontalGridLines />}
          {props.children}
        </XYPlot>
      )}
    </AutoSizer>
  );
}

export function SimpleRadialChartWrapper(props) {
  return (
    <AutoSizer>
      {({height, width}) => (
        <RadialChart height={height} width={width} {...props} />
      )}
    </AutoSizer>
  );
}

export function SimpleChartWrapperNoAxes(props) {
  return SimpleChartWrapper({...props, noXAxis: true, noYAxis: true});
}

export function chooseColorScale() {
  const colorScale = select(
    'colorScale',
    {linear: 'linear', category: 'category'},
    'category'
  );
  const colorRange = {
    category: CATEGORY_PALETTE,
    linear: LINEAR_PALETTE
  }[colorScale];
  return {colorRange, colorScale};
}

export const jsxOptions = {

    defaultProps: false,
    displayName: component => {
      if (
        component.type.name === 'SimpleChartWrapper' ||
        component.type.name === 'SimpleChartWrapperNoAxes'
      ) {
        return 'XYPlot';
      }
      if (component.type.name === 'SimpleRadialChartWrapper') {
        return 'RadialChart';
      }
      return component.type.displayName;
    },
    filterProps: ['className', 'getNull', 'nullAccessor', 'stack']
};
