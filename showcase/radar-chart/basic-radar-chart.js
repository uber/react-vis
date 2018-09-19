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
import {format} from 'd3-format';

import RadarChart from 'radar-chart';

const DATA = [
  {
    name: 'Mercedes',
    mileage: 7,
    price: 10,
    safety: 8,
    performance: 9,
    interior: 7,
    warranty: 7
  },
  {
    name: 'Honda',
    mileage: 8,
    price: 6,
    safety: 9,
    performance: 6,
    interior: 3,
    warranty: 9
  },
  {
    name: 'Chevrolet',
    mileage: 5,
    price: 4,
    safety: 6,
    performance: 4,
    interior: 5,
    warranty: 6
  }
];

const basicFormat = format('.2r');
const wideFormat = format('.3r');

export default function BasicRadarChart(props) {
  return (
    <RadarChart
      data={DATA}
      tickFormat={t => wideFormat(t)}
      startingAngle={0}
      domains={[
        {name: 'mileage', domain: [0, 10]},
        {
          name: 'price',
          domain: [2, 16],
          tickFormat: t => `$${basicFormat(t)}`,
          getValue: d => d.price
        },
        {name: 'safety', domain: [5, 10], getValue: d => d.safety},
        {name: 'performance', domain: [0, 10], getValue: d => d.performance},
        {name: 'interior', domain: [0, 7], getValue: d => d.interior},
        {name: 'warranty', domain: [10, 2], getValue: d => d.warranty}
      ]}
      width={400}
      height={300}
    />
  );
}
