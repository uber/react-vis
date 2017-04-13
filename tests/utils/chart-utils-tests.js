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

import {getRadialLayoutMargin} from 'utils/chart-utils';

test('chart-utils #getRadialLayoutMargin', t => {
  t.deepEqual(getRadialLayoutMargin(500, 300, 230), {
    bottom: 35,
    left: 135,
    right: 135,
    top: 35
  }, 'Get the right margin to center the radial layout chart - landscape container');

  t.deepEqual(getRadialLayoutMargin(300, 500, 230), {
    bottom: 135,
    left: 35,
    right: 35,
    top: 135
  }, 'Get the right margin to center the radial layout chart  - portrait container');

  t.deepEqual(getRadialLayoutMargin(300, 300, 230), {
    bottom: 35,
    left: 35,
    right: 35,
    top: 35
  }, 'Get the right margin to center the radial layout chart  - rectangle container')
  t.end();
});
