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

import {XYPlot, DecorativeAxis} from 'index';

const MARGIN = {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30
};

export default function Example(props) {
  return (
    <XYPlot
      dontCheckIfEmpty
      margin={MARGIN}
      xDomain={[0, 1]}
      yDomain={[0, 1]}
      width={300}
      height={300}
    >
      <DecorativeAxis
        axisStart={{x: 0, y: 0}}
        axisEnd={{x: 1, y: 1}}
        axisDomain={[-10, 100]}
      />
      <DecorativeAxis
        axisStart={{x: 1, y: 0}}
        axisEnd={{x: 0, y: 1}}
        axisDomain={[1000, 900]}
        tickSize={-10}
        tickValue={t => `¡${t}!`}
      />
    </XYPlot>
  );
}
