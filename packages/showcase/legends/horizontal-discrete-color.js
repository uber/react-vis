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

import DiscreteColorLegend from 'legends/discrete-color-legend';
import GradientDefs from 'plot/gradient-defs';

const ITEMS = [
  {title: 'Dashed', color: "#45aeb1", strokeStyle: "dashed"},
  {title: 'Dasharray', color: '#f93', strokeDasharray: "1 2 3 4 5 6 7"},
  {title: 'Dots', color: 'url(#circles)', strokeWidth: 9},
  {title: 'Stripes', color: 'url(#stripes)'},
  {title: 'Wide stripes', color: 'url(#stripes)', strokeWidth: 13},
  {title: 'Normal', color: 'purple'},
  {title: 'Wide', color: 'powderblue', strokeWidth: 6},
];

export default function DiscreteColorExample() {
  return (
    <div>
      <svg height={0} width={0}>
        <GradientDefs>
            <pattern id="stripes" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 0, 0 l 5, 5" stroke="#45aeb1" strokeLinecap="square" />
            </pattern>
            <pattern id="circles" width="3" height="3" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="magenta" />
            </pattern>

        </GradientDefs>
      </svg>
    <DiscreteColorLegend orientation="horizontal" width={300} items={ITEMS} />
    </div>
  );
}
