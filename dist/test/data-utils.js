'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

require('babel-polyfill');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _dataUtils = require('../lib/utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var arr = [{ a: 1 }, { b: 3, a: 2 }, { a: 2 }];

(0, _tape2.default)('data-utils/getObjectValueAccessor', function t(assert) {
  var result = (0, _dataUtils.getObjectValueAccessor)('a');
  assert.ok(result({ a: 1, b: 2 }) === 1, 'Should return value of the property');
  assert.end();
});

(0, _tape2.default)('data-utils/getUniquePropertyValues', function t(assert) {
  var result = (0, _dataUtils.getUniquePropertyValues)(arr, 'a');
  assert.ok(result.length === 2, 'Should return the array of the proper size');
  assert.ok(result.indexOf(1) !== -1 && result.indexOf(2) !== -1, 'Should return unique values of the property');
  assert.end();
});

(0, _tape2.default)('data-utils/isObjectPropertyInUse', function t(assert) {
  var result = (0, _dataUtils.isObjectPropertyInUse)(arr, 'a');
  assert.ok(result, 'Should find the property in use');
  assert.end();
});

(0, _tape2.default)('data-utils/addValueToArray', function t(assert) {
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([-10, 10], 1), [-10, 10]), 'Shouldn\'t add the value if the value is in the array');
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([-10, 0], 1), [-10, 1]), 'Should add the value if the value is larger');
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([0, 10], -1), [-1, 10]), 'Should add the value if the value is smaller');
  assert.end();
});