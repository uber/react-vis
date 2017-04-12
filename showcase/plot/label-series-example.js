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

import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  MarkSeries,
  LabelSeries
} from 'index';

function generateData() {
  return [
    {x: Math.random() * 3, y: Math.random() * 20, label: 'Wigglytuff', size: 30, style: {fontSize: 20}},
    {x: Math.random() * 3, y: Math.random() * 20, label: 'Psyduck', size: 10},
    {x: Math.random() * 3, y: Math.random() * 20, label: 'Geodude', size: 1},
    {x: Math.random() * 3, y: Math.random() * 20, label: 'Ditto', size: 12},
    {x: Math.random() * 3, y: Math.random() * 20, label: 'Snorlax', size: 4}
  ];
}

export default class Example extends React.Component {
  state = {
    data: generateData()
  }
  render() {
    const {data} = this.state;
    return (
      <div>
        <ShowcaseButton onClick={() => this.setState({data: generateData()})} buttonContent="UPDATE"/>
        <XYPlot
          width={300}
          height={300}>
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            sizeRange={[5, 15]}
            data={data}/>
          <LabelSeries
            animation
            allowOffsetToBeReversed
            data={data} />
        </XYPlot>
      </div>
    );
  }
}
