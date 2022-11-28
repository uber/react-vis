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

import {
  getUniquePropertyValues,
  addValueToArray,
  transformValueToString
} from '~/utils/data-utils';

const arr = [{a: 1}, {b: 3, a: 2}, {a: 2}];

describe('data-utils', () => {
  test('getUniquePropertyValues', () => {
    const result = getUniquePropertyValues(arr, d => d.a);
    expect(result.length === 2).toBeTruthy();
    expect(result.indexOf(1) !== -1 && result.indexOf(2) !== -1).toBeTruthy();
  });

  test('addValueToArray', () => {
    expect(addValueToArray([-10, 10], 1)).toEqual([-10, 10]);
    expect(addValueToArray([-10, 0], 1)).toEqual([-10, 1]);
    expect(addValueToArray([0, 10], -1)).toEqual([-1, 10]);
  });

  test('transformValueToString', () => {
    expect(transformValueToString(0)).toEqual(0);

    // 43200000 - this is the timestamp for 12PM on 1970-01-01
    // This plays much nicer when running tests locally for different timezones.
    expect(transformValueToString(new Date(43200000))).toEqual(
      'Thu Jan 01 1970'
    );
  });
});
