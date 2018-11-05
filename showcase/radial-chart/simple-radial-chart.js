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

import RadialChart from 'radial-chart';

export default function SimpleRadialChart(props) {
  return (
    <RadialChart
      colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 10]}
      margin={{top: 100}}
      getLabel={d => d.name}
      data={[
        {angle: 1, color: '#89DAC1', name: 'green', opacity: 0.2},
        {angle: 2, color: '#F6D18A', name: 'yellow'},
        {angle: 5, color: '#1E96BE', name: 'cyan'},
        {angle: 3, color: '#DA70BF', name: 'magenta'},
        {angle: 5, color: '#F6D18A', name: 'yellow again'}
      ]}
      labelsRadiusMultiplier={1.1}
      labelsStyle={{fontSize: 16, fill: '#222'}}
      showLabels
      style={{stroke: '#fff', strokeWidth: 2}}
      width={400}
      height={300}
    />
  );
}
