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

import {getUniquePropertyValues, addValueToArray, transformValueToString} from 'utils/data-utils';

const arr = [{a: 1}, {b: 3, a: 2}, {a: 2}];

test('data-utils #getUniquePropertyValues', t => {
  const result = getUniquePropertyValues(arr, d => d.a);
  t.ok(result.length === 2, 'Should return the array of the proper size');
  t.ok(
    result.indexOf(1) !== -1 && result.indexOf(2) !== -1,
    'Should return unique values of the property'
  );
  t.end();
});

test('data-utils #addValueToArray', t => {
  t.deepEqual(
    addValueToArray([-10, 10], 1),
    [-10, 10],
    "Shouldn't add the value if the value is in the array"
  );
  t.deepEqual(
    addValueToArray([-10, 0], 1),
    [-10, 1],
    'Should add the value if the value is larger'
  );
  t.deepEqual(
    addValueToArray([0, 10], -1),
    [-1, 10],
    'Should add the value if the value is smaller'
  );
  t.end();
});

test('data-utils #transformValueToString', t => {
  t.deepEqual(transformValueToString(0), 0,
    'Shouldn\'t transform the number value');
  t.deepEqual(transformValueToString(new Date(0)), 'Thu Jan 01 1970',
    'Should transform the date to string value');
  t.end();
});
