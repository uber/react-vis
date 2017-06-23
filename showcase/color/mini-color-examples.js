// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {
  GradientDefs,
  XYPlot,
  LineSeries,
  MarkSeries,
  VerticalBarSeries
} from 'index';

import {
  DISCRETE_COLOR_RANGE,
  EXTENDED_DISCRETE_COLOR_RANGE,
  CONTINUOUS_COLOR_RANGE
} from '../../src/theme';

const colors = [
  '#cd3b54',
  '#59b953',
  '#ba4fb9',
  '#99b53e',
  '#7f61d3',
  '#c9a83a',
  '#626dbc',
  '#e08b39',
  '#5ea0d8',
  '#cf4d2a',
  '#4fb79b',
  '#d24691',
  '#528240',
  '#c388d2',
  '#80742b',
  '#9c4a6d',
  '#caaa70',
  '#e0829f',
  '#9d5d30',
  '#dc7666'
];

const data = {
  noColor: [],
  categoryColorAtSeriesLevel: [],
  literalColorAtSeriesLevel: [],
  linearColorAtSeriesLevel: [],
  literalColorAtMarkLevel: [],
  linearColorAtMarkLevel: [],
  categoryColorAtMarkLevel: []
};

for (let i = 0; i < 3; i++) {
  const noColorSeries = [];
  const categoryColorSeries = [];
  const literalColorSeries = [];
  const linearColorSeries = [];

  for (let j = 0; j < 10; j++) {
    const datapoint = {x: j, y: Math.random() * 10};
    const categoryDatapoint = {...datapoint, color: Math.floor(Math.random() * 20)};
    const linearDatapoint = {...datapoint, color: Math.random() * 10};
    const literalDatapoint = {...datapoint, color: colors[Math.floor(Math.random() * 20)]};
    noColorSeries.push(datapoint);
    categoryColorSeries.push(categoryDatapoint);
    literalColorSeries.push(literalDatapoint);
    linearColorSeries.push(linearDatapoint);
  }
  data.noColor.push({key: i, data: noColorSeries});
  data.categoryColorAtSeriesLevel.push({key: i, data: noColorSeries, color: i});
  data.literalColorAtSeriesLevel.push({key: i, data: noColorSeries,
    color: colors[i]});
  data.linearColorAtSeriesLevel.push({key: i, data: noColorSeries,
    color: Math.floor(Math.random() * 20)});
  data.literalColorAtMarkLevel.push({key: i, data: literalColorSeries});
  data.linearColorAtMarkLevel.push({key: i, data: linearColorSeries});
  data.categoryColorAtMarkLevel.push({key: i, data: categoryColorSeries});
}

const defaultXYPlotProps = {
  width: 200,
  height: 200,
  xDomain: [-0.5, 9.5],
  yDomain: [-0.5, 10.5],
  margin: {top: 5, bottom: 5, left: 5, right: 5}
};

export function SensibleDefaults() {
  return generateCharts(data.noColor);
}

export function ColorInXYPlot() {
  return generateCharts(data.noColor, {color: 'red', stroke: 'red'});
}

export function LiteralColorAtSeriesLevel() {
  return generateCharts(data.literalColorAtSeriesLevel);
}

export function LinearColorAtSeriesLevel() {
  return generateCharts(data.linearColorAtSeriesLevel, {
    colorType: 'linear', colorDomain: [0, 9], colorRange: CONTINUOUS_COLOR_RANGE
  });
}

export function CategoryColorAtSeriesLevel() {
  return generateCharts(data.categoryColorAtSeriesLevel, {colorType: 'category',
    colorDomain: [0, 1, 2], colorRange: EXTENDED_DISCRETE_COLOR_RANGE
  });
}

export function LiteralColorAtMarkLevel() {
  return generateCharts(data.literalColorAtMarkLevel, {colorType: 'literal'});
}

export function CategoryColorAtMarkLevel() {
  return generateCharts(data.categoryColorAtMarkLevel, {colorType: 'category'});
}

export function CategoryColorAtMarkLevelCustomPalette() {
  return generateCharts(data.categoryColorAtMarkLevel, {
    colorType: 'category',
    colorRange: colors
  });
}

export function CategoryColorAtMarkLevelFixedStroke() {
  return generateCharts(data.categoryColorAtMarkLevel, {colorType: 'category', stroke: '#f70'});
}

export function LinearColorAtMarkLevelNoPalette() {
  return generateCharts(data.linearColorAtMarkLevel);
}

export function LinearColorAtMarkLevel() {
  return generateCharts(data.linearColorAtMarkLevel, {colorRange: ['#c7e9c0', '#00441b']});
}

export function LineSeriesMarkSeries() {
  return (<XYPlot {...defaultXYPlotProps} width={600}>
    {data.noColor.map((d, i) => <LineSeries {...d}
      key={i} color={DISCRETE_COLOR_RANGE[i]}/>)}
    {data.noColor.map((d, i) => <MarkSeries {...d}
      key={i} color={DISCRETE_COLOR_RANGE[i]} stroke="white"/>)}
  </XYPlot>);
}

export function GradientCharts() {
  const gradient = (<GradientDefs>
    <linearGradient
      id="myGradient"
      gradientUnits="userSpaceOnUse"
      x1="0" y1="0" x2="200" y2="200">
      <stop offset="10%" stopColor="#c6e48b" />
      <stop offset="33%" stopColor="#7bc96f" />
      <stop offset="66%" stopColor="#239a3b" />
      <stop offset="90%" stopColor="#196127" />
    </linearGradient>
  </GradientDefs>);
  return (<div style={{display: 'flex'}}>
    <XYPlot {...defaultXYPlotProps}>
      {gradient}
      <VerticalBarSeries {...data.noColor[0]} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot {...defaultXYPlotProps}>
      {gradient}
      <LineSeries {...data.noColor[0]} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot {...defaultXYPlotProps}>
      {gradient}
      <MarkSeries {...data.noColor[0]} color={'url(#myGradient)'} />
    </XYPlot>
  </div>);
}

export function ColorSpecificity() {
  const accentColor = '#FF9833';
  const seventhElementColored = [...data.noColor[2].data];
  seventhElementColored[6].color = accentColor;

  return (<div style={{display: 'flex'}}>
    <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal">
      <VerticalBarSeries data={seventhElementColored} />
    </XYPlot>
    <XYPlot {...defaultXYPlotProps} stroke="#e5e5e5" strokeType="literal">
      <LineSeries {...data.noColor[0]} />
      <LineSeries {...data.noColor[1]} />
      <LineSeries {...data.noColor[2]} stroke={accentColor}/>
    </XYPlot>
    <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal" stroke="white" >
      <MarkSeries {...data.noColor[0]} />
      <MarkSeries {...data.noColor[1]} />
      <MarkSeries data={seventhElementColored} color="#4fb79b"/>
    </XYPlot>
  </div>);
}

export function ReactVis5() {
  return generatePalette(DISCRETE_COLOR_RANGE);
}

export function ReactVis20() {
  return generatePalette(EXTENDED_DISCRETE_COLOR_RANGE);
}

export function Continuous() {
  return generatePalette(CONTINUOUS_COLOR_RANGE);
}

export function CustomPalette() {
  return generatePalette(colors);
}

function generatePalette(range) {
  return (<div style={{display: 'flex', maxWidth: 700, flexWrap: 'wrap'}}>
    {range.map((d, i) => (<div key={i} style={{
      background: d,
      width: 80, height: 80, borderRadius: 5, margin: 10, position: 'relative'}}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        textShadow: 'white 1px 1px',
        transform: 'translate(-50%, -50%)'}}>{d}</div>
    </div>))}
  </div>);
}

function generateCharts(seriesData, props) {
  return (
    <div style={{display: 'flex'}}>
      {[VerticalBarSeries, LineSeries, MarkSeries]
      .map((Type, key) => (<XYPlot
        key={key}
        {...defaultXYPlotProps}
        {...props}>
        {seriesData.map((d, i) => (<Type {...d} />))}
      </XYPlot>))}
    </div>);
}
