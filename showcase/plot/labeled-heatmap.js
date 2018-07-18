// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
import {scaleLinear} from 'd3-scale';

import {XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries} from 'index';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const data = [...new Array(alphabet.length)].reduce((acc, _, idx) => {
  return acc.concat([...new Array(alphabet.length)].map((d, jdx) => {
    return {
      x: `${alphabet[idx]}1`,
      y: `${alphabet[jdx]}2`,
      color: (idx + jdx) % Math.floor(jdx / idx) || idx
    };
  }));
}, []);
const {min, max} = data.reduce((acc, row) => {
  return {
    min: Math.min(acc.min, row.color),
    max: Math.max(acc.max, row.color)
  };
}, {min: Infinity, max: -Infinity});

export default class LabeledHeatmap extends React.Component {
  render() {
    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(['orange', 'white', 'cyan']);
    return (
      <XYPlot
        xType="ordinal"
        xDomain={alphabet.map(letter => `${letter}1`)}
        yType="ordinal"
        yDomain={alphabet.map(letter => `${letter}2`)}
        margin={50}
        width={500}
        height={500}>
        <XAxis orientation="top" />
        <YAxis />
        <HeatmapSeries
          colorType="literal"
          getColor={d => exampleColorScale(d.color)}
          style={{
            stroke: 'white',
            strokeWidth: '2px',
            rectStyle: {
              rx: 10,
              ry: 10
            }
          }}
          className="heatmap-series-example"
          data={data}/>
        <LabelSeries
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => {
            // need to stringify or else the 0s will be ignored
            return `${d.color}`;
          }}/>
      </XYPlot>
    );
  }
}
