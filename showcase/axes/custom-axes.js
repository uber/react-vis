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

import {XYPlot, XAxis, YAxis, MarkSeries} from 'index';

const MARGIN = {
  left: 10,
  right: 10,
  bottom: 80,
  top: 20
};

const WORDS = [
  'cool',
  'dog',
  'skateboard',
  'wow',
  'such',
  <tspan>
    <tspan x="0" dy="1em">
      Multiline
    </tspan>
    <tspan x="0" dy="1em">
      dogs
    </tspan>
  </tspan>
];
export default function Example(props) {
  return (
    <XYPlot margin={MARGIN} width={300} height={300}>
      <XAxis top={0} hideLine tickValues={[0, 1, 3, 4, 5]} title="X" />
      <XAxis tickFormat={v => `Value is ${v}`} tickLabelAngle={-90} />
      <YAxis hideTicks />
      <YAxis left={50} tickFormat={v => v * v} />
      <YAxis hideLine left={150} tickFormat={v => WORDS[v]} />
      <MarkSeries
        data={[{x: 0, y: 0}, {x: 5, y: 5}]}
        opacity={0}
        opacityType="linear"
      />
    </XYPlot>
  );
}
