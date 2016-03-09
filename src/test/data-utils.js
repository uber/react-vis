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
import 'babel-polyfill';
import equal from 'deep-equal';

import {
  getObjectValueAccessor,
  getUniquePropertyValues,
  isObjectPropertyInUse,
  addValueToArray} from '../lib/utils/data-utils';

const arr = [{a: 1}, {b: 3, a: 2}, {a: 2}];

test('data-utils/getObjectValueAccessor', function t(assert) {
  const result = getObjectValueAccessor('a');
  assert.ok(result({a: 1, b: 2}) === 1, 'Should return value of the property');
  assert.end();
});

test('data-utils/getUniquePropertyValues', function t(assert) {
  const result = getUniquePropertyValues(arr, 'a');
  assert.ok(result.length === 2, 'Should return the array of the proper size');
  assert.ok(
    result.indexOf(1) !== -1 && result.indexOf(2) !== -1,
    'Should return unique values of the property');
  assert.end();
});

test('data-utils/isObjectPropertyInUse', function t(assert) {
  const result = isObjectPropertyInUse(arr, 'a');
  assert.ok(result, 'Should find the property in use');
  assert.end();
});

test('data-utils/addValueToArray', function t(assert) {
  assert.ok(
    equal(addValueToArray([-10, 10], 1), [-10, 10]),
    'Shouldn\'t add the value if the value is in the array');
  assert.ok(
    equal(addValueToArray([-10, 0], 1), [-10, 1]),
    'Should add the value if the value is larger');
  assert.ok(
    equal(addValueToArray([0, 10], -1), [-1, 10]),
    'Should add the value if the value is smaller');
  assert.end();
});
