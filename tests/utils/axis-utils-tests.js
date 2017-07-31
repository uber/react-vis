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

import test from 'tape';
import {scaleLinear} from 'd3-scale';

import {
  getTicksTotalFromSize,
  getTickValues,
  getAxisAngle,
  generateFit,
  generatePoints
} from 'utils/axis-utils';

test('axis-utils #getTicksTotalFromSize', t => {
  t.ok(getTicksTotalFromSize(0) === 5, 'Returns valid value for 0px');
  t.ok(getTicksTotalFromSize(301) === 10, 'Returns valid value for 301px');
  t.ok(getTicksTotalFromSize(701) === 20, 'Returns valid value for 701px');
  t.end();
});

test('axis-utils #getTickValues', t => {
  const scale = scaleLinear().domain([0, 1]).range(['red', 'blue']);
  t.deepEqual(getTickValues(scale, 10, false).map(d => Math.round(d * 1000) / 1000),
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    'should find the correct tick values');

  const predefinedVals = ['got dang', 1, undefined, 'lolz'];
  t.deepEqual(getTickValues(scale, 10, predefinedVals), predefinedVals,
    'should find the correct tick values');

  t.end();
});

test('axis-utils #getAxisAngle', t => {
  t.equal(getAxisAngle({x: 0, y: 0}, {x: 1, y: 1}), Math.PI / 4);
  t.equal(getAxisAngle({x: 0, y: 0}, {x: 0, y: 1}), Math.PI / 2);
  t.equal(getAxisAngle({x: 0, y: 0}, {x: 0, y: -1}), 3 * Math.PI / 2);
  t.end();
});

test('axis-utils #generateFit', t => {
  t.deepEqual(generateFit({x: 0, y: 0}, {x: 1, y: 1}), {left: 0, offset: 0, right: 1, slope: 1});
  t.deepEqual(generateFit({x: 0, y: 0}, {x: 0, y: 1}), {left: 0, offset: 0, right: 1, slope: 0});
  t.deepEqual(generateFit({x: 0, y: 0}, {x: 0, y: -1}), {left: 0, offset: 0, right: -1, slope: 0});
  t.end();
});

test('axis-utils #generatePoints', t => {
  const result = generatePoints({
    axisStart: {x: 0, y: 1},
    axisEnd: {x: 1, y: 1},
    numberOfTicks: 5,
    axisDomain: [10, 100]
  });
  const expectedResult = {
    points: [
      {text: 10, y: 1, x: 0},
      {text: 28, y: 1, x: 0.2},
      {text: 46, y: 1, x: 0.4},
      {text: 64, y: 1, x: 0.6000000000000001},
      {text: 82, y: 1, x: 0.8},
      {text: 100, y: 1, x: 1}
    ],
    slope: -0
  };
  t.deepEqual(result, expectedResult);
  t.end();
});
