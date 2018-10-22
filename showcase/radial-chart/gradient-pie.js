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

import {GradientDefs, RadialChart} from 'index';

export default function GradientPie(props) {
  return (
    <RadialChart
      colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 10]}
      margin={{top: 100}}
      getColor={d => `url(#${d.gradientLabel})`}
      data={[
        {angle: 1, gradientLabel: 'grad1'},
        {angle: 2, gradientLabel: 'grad2'},
        {angle: 5, gradientLabel: 'grad3'}
      ]}
      labelsRadiusMultiplier={1.1}
      labelsStyle={{fontSize: 16, fill: '#222'}}
      showLabels
      style={{stroke: '#fff', strokeWidth: 2}}
      width={400}
      height={300}
    >
      <GradientDefs>
        <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="red" stopOpacity={0.4} />
          <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient id="grad2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="blue" stopOpacity={0.4} />
          <stop offset="100%" stopColor="green" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient id="grad3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="yellow" stopOpacity={0.4} />
          <stop offset="100%" stopColor="green" stopOpacity={0.3} />
        </linearGradient>
      </GradientDefs>
    </RadialChart>
  );
}
