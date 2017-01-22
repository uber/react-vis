// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {
  AreaSeries,
  Hint,
  HorizontalBarSeries,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

import {
  filterFeatures,
  getPPP
} from './responsive-vis-utils';

// range constants
const VERY_LOW_RANGE = [0, 0.08];
const LOW_RANGE = [0, 0.7];
const VERY_LOW_TO_HIGH = [0.08, Infinity];
const HIGH_RANGE = [0.7, Infinity];
// const MIN_PPP = 2e-5;

const BARCHART_FEATURES = [
  {min: -Infinity, max: Infinity, name: 'xaxis'},
  {min: VERY_LOW_RANGE[0], max: VERY_LOW_RANGE[1], name: 'yaxis'},
  {min: VERY_LOW_TO_HIGH[0], max: VERY_LOW_TO_HIGH[1], name: 'mouseLabels'},
  {min: LOW_RANGE[0], max: LOW_RANGE[1], name: 'bars'},
  {min: HIGH_RANGE[0], max: HIGH_RANGE[1], name: 'area'}
];

function updateDataForArea(data, ppp) {
  // Use the PPP ratio as the step to sample the data
  const step = Math.round(ppp);
  const sample = [];
  let index = data.length - 1;
  while (index >= 0) {
    const dataPoint = data[index];
    sample.unshift({...dataPoint, y: sample.length - 1});
    index -= step;
  }
  return sample;
}

export default class ResponsiveScatterplot extends React.Component {

  constructor(props) {
    super(props);
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
  }

  state = {
    hoveredPoint: false
  }

  _rememberValue(value) {
    console.log(value)
    this.setState({hoveredPoint: {
      x: -25,
      y: value.y,
      label: value.label
    }});
  }

  _forgetValue() {
    this.setState({hoveredPoint: null});
  }

  getFeatures() {
    const {data, height, margin, width} = this.props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const ppp = getPPP(innerWidth, innerHeight, data, 'HEIGHT');
    return filterFeatures(BARCHART_FEATURES, ppp);
  }

  render() {
    const {data, height, margin, width} = this.props;
    const {hoveredPoint} = this.state;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const ppp = getPPP(innerWidth, innerHeight, data, 'HEIGHT');
    const featuresToRender = filterFeatures(BARCHART_FEATURES, ppp);
    const updatedData = featuresToRender.area ? updateDataForArea(data, ppp) : data;
    return (
      <div className="responsive-bar-chart">
        <XYPlot
          yType="ordinal"
          xType="linear"
          margin={margin}
          height={height}
          width={width}>
          {featuresToRender.xaxis && <XAxis orientation="top"/>}
          {featuresToRender.yaxis && <YAxis />}
          {featuresToRender.bars && <HorizontalBarSeries
            colorType="literal"
            yRange={[0, innerHeight]}
            xRange={[0, innerWidth]}
            onValueMouseOver={featuresToRender.mouseLabels ? this._rememberValue : null}
            data={updatedData} />}
          {featuresToRender.area && <AreaSeries
            colorType="literal"
            color="#12939A"
            yType="linear"
            yDomain={[0, updatedData.length]}
            yRange={[0, innerHeight]}
            xRange={[innerWidth, 0]}
            onValueMouseOver={featuresToRender.mouseLabels ? this._rememberValue : null}
            onNearestX={featuresToRender.mouseLabels ? this._rememberValue : null}
            data={updatedData} />}
          {featuresToRender.mouseLabels && hoveredPoint && <Hint
            value={hoveredPoint} >{hoveredPoint.label}</Hint>}
        </XYPlot>
      </div>
    );
  }
}
