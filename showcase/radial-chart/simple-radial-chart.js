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

export default class SimpleRadialChart extends React.Component {
  render() {
    return (
      <RadialChart
        colorType={'literal'}
        colorDomain={[0, 100]}
        colorRange={[0, 10]}
        margin={{top: 100}}
        data={[
          {angle: 1, color: '#0f0', label: 'green', opacity: 0.2},
          {angle: 2, color: '#ff0', label: 'yellow'},
          {angle: 5, color: '#0ff', label: 'cyan'},
          {angle: 3, color: '#f0f', label: 'magenta'},
          {angle: 5, color: '#ff0', label: 'yellow again'}
        ]}
        showLabels
        width={400}
        height={300} />
    );
  }
}
