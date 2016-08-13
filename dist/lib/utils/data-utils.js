'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectValueAccessor = getObjectValueAccessor;
exports.getUniquePropertyValues = getUniquePropertyValues;
exports.isObjectPropertyInUse = isObjectPropertyInUse;
exports.addValueToArray = addValueToArray;
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

/**
 * Get the value accessor function that gets a property from an object.
 * @param {string} propertyName Property name.
 * @returns {Function} Value accessor.
 */
function getObjectValueAccessor(propertyName) {
  return function (obj) {
    return obj[propertyName];
  };
}

/**
 * Get unique property values from an array.
 * @param {Array} arr Array of data.
 * @param {string} propertyName Prop name.
 * @returns {Array} Array of unique values.
 */
function getUniquePropertyValues(arr, propertyName) {
  var setOfValues = new Set(arr.map(getObjectValueAccessor(propertyName)));
  return Array.from(setOfValues);
}

/**
 * Check if the property is used in at least one object of the array.
 * @param {Array} arr Array of all data.
 * @param {string} propertyName Property name.
 * @returns {boolean} True if used.
 */
function isObjectPropertyInUse(arr, propertyName) {
  return Boolean(arr.find(function (d) {
    return d && typeof d[propertyName] !== 'undefined';
  }));
}

/**
 * Add zero to the domain.
 * @param {Array} arr Add zero to the domain.
 * @param {Number} value Add zero to domain.
 * @returns {Array} Adjusted domain.
 */
function addValueToArray(arr, value) {
  var result = [].concat(arr);
  if (result[0] > value) {
    result[0] = value;
  }
  if (result[result.length - 1] < value) {
    result[result.length - 1] = value;
  }
  return result;
}