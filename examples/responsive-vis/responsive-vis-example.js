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
  createData,
  filterFeatures,
  computeRadius,
  getPPP
} from './responsive-vis-utils';

import ResponsiveScatterplot from './responsive-scatterplot';

const ASPECT_RATIO = 1.2;
// range constants
const SUPER_LOW_RANGE = [0, 1e-4];
const VERY_LOW_RANGE = [0, 8e-4];
const LOW_RANGE = [0, 5e-3];
const MED_LOW_RANGE = [1e-4, 5e-3];
const HIGH_LOW_RANGE = [8e-4, 5e-3];
const MED_RANGE = [5e-3, 1e-2];
const HIGH_RANGE = [1e-2, Infinity];
const MED_HIGH_RANGE = [MED_RANGE[0], HIGH_RANGE[1]];
// const MIN_PPP = 2e-5;

const SCATTERPLOT_FEATURES = [
  {min: -Infinity, max: Infinity, name: 'axes'},
  {min: SUPER_LOW_RANGE[0], max: SUPER_LOW_RANGE[1], name: 'labels'},
  {min: VERY_LOW_RANGE[0], max: VERY_LOW_RANGE[1], name: 'pointSelection'},
  {min: LOW_RANGE[0], max: LOW_RANGE[1], name: 'points'},
  {min: MED_LOW_RANGE[0], max: MED_LOW_RANGE[1], name: 'tooltips'},
  {min: MED_HIGH_RANGE[0], max: MED_HIGH_RANGE[1], name: 'bins'},
  {min: MED_HIGH_RANGE[0], max: MED_HIGH_RANGE[1], name: 'bintips'},
  {min: MED_HIGH_RANGE[0], max: MED_HIGH_RANGE[1], name: 'binSelection'},
  {min: HIGH_LOW_RANGE[0], max: HIGH_LOW_RANGE[1], name: 'brushSelection'}
];

export default class ResponsiveVisDemo extends React.Component {

  state = {
    dataSize: 1,
    visSize: 400,
    data: createData(5)
  }

  renderControls(featuresToRender) {
    const {dataSize, visSize} = this.state;
    return (<div className="responsive-controls">
      {`Data Size: ${(~~Math.pow(10, dataSize))}`}
      <input
        onChange={e => {
          const newData = createData(~~Math.pow(10, e.target.value));
          this.setState({
            dataSize: e.target.value,
            data: newData
          });
        }}
        type="range"
        min={1}
        max={6}
        step={0.1}
        value={dataSize}
        />

      {`Visualization size: ${visSize}`}
      <input
        onChange={e => this.setState({visSize: ~~e.target.value})}
        type="range"
        min={100}
        max={1000}
        value={visSize}
        />
      <div>{`Features: ${Object.keys(featuresToRender).join(', ')}`}</div>
    </div>);
  }

  render() {
    const {data, visSize} = this.state;
    const width = visSize;
    const height = visSize * ASPECT_RATIO;
    const ppp = getPPP(width, height, data, 'TWOD');
    const featuresToRender = filterFeatures(SCATTERPLOT_FEATURES, ppp);

    return (
      <div className="responsive-vis-example">
        {this.renderControls(featuresToRender)}
        <ResponsiveScatterplot
          data={data}
          height={ASPECT_RATIO * visSize}
          width={visSize} />
      </div>
    );
  }
}
