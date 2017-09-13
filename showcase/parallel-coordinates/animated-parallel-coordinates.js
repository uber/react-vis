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

import React, {Component} from 'react';

import ShowcaseButton from '../showcase-components/showcase-button';
import {ParallelCoordinates} from 'index';

const DATA = [{
  explosions: 7,
  wow: 10,
  dog: 8,
  sickMoves: 9,
  nice: 7
}];

const DOMAIN = [
  {name: 'nice', domain: [0, 100], tickFormat: t => t},
  {name: 'explosions', domain: [6.9, 7.1]},
  {name: 'wow', domain: [0, 11]},
  {name: 'dog', domain: [0, 16]},
  {name: 'sickMoves', domain: [0, 20]}
];

function generateData() {
  return [
    Object.keys(DATA[0]).reduce((acc, key) => {
      acc[key] = DATA[0][key] + 5 * (Math.random() - 0.5);
      return acc;
    }, {})
  ];
}

export default class AnimatedParallelCoordinates extends Component {
  state = {
    data: DATA
  }

  render() {
    const {data} = this.state;

    return (
      <div className="centered-and-flexed">
        <ParallelCoordinates
          animation
          data={data}
          domains={DOMAIN}
          style={{
            lines: {
              strokeWidth: 3,
              strokeDasharray: '2, 2'
            },
            axes: {
              text: {
                opacity: 1
              }
            },
            labels: {
              textAnchor: 'right'
            }
          }}
          margin={{
            left: 30,
            top: 30,
            bottom: 40,
            right: 50
          }}
          tickFormat={t => ''}
          width={400}
          height={300} />
        <ShowcaseButton
         onClick={() => this.setState({data: generateData()})}
         buttonContent={'UPDATE DATA'} />
      </div>
    );
  }
}
