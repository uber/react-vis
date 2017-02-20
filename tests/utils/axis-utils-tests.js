// Copyright (c) 2016 Uber Technologies, Inc.
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

import {getTicksTotalFromSize, getTickValues} from 'utils/axis-utils';
import {scaleLinear} from 'd3-scale';

test('axis-utils #getTicksTotalFromSize', t => {
  t.ok(getTicksTotalFromSize(0) === 5, 'Returns valid value for 0px');
  t.ok(getTicksTotalFromSize(301) === 10, 'Returns valid value for 301px');
  t.ok(getTicksTotalFromSize(701) === 20, 'Returns valid value for 701px');
  t.end();
});

test('axis-utils #getTickValues', t => {
  const scale = scaleLinear().domain([0, 1]).range(['red', 'blue']);
  t.deepEqual(getTickValues(scale, 10, false),
    [0, 0.1, 0.2, 0.30000000000000004, 0.4, 0.5, 0.6000000000000001, 0.7000000000000001, 0.8, 0.9, 1],
    'should find the correct tick values');

  const predefinedVals = ['got dang', 1, undefined, 'lolz'];
  t.deepEqual(getTickValues(scale, 10, predefinedVals), predefinedVals,
    'should find the correct tick values');

  t.end();
});
