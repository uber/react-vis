'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXIS_ORIENTATIONS = undefined;
exports.getAxisFnByOrientation = getAxisFnByOrientation;
exports.getTicksTotalFromSize = getTicksTotalFromSize;

var _d3Axis = require('d3-axis');

var _d3Axis2 = _interopRequireDefault(_d3Axis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AXIS_FNS = {
  left: _d3Axis2.default.axisLeft,
  right: _d3Axis2.default.axisRight,
  top: _d3Axis2.default.axisTop,
  bottom: _d3Axis2.default.axisBottom
}; // Copyright (c) 2016 Uber Technologies, Inc.
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

var AXIS_ORIENTATIONS = exports.AXIS_ORIENTATIONS = Object.keys(AXIS_FNS);

function getAxisFnByOrientation(orientation) {
  return AXIS_FNS[orientation];
}

/**
 * Get total amount of ticks from a given size in pixels.
 * @param {number} size Size of the axis in pixels.
 * @returns {number} Total amount of ticks.
 */
function getTicksTotalFromSize(size) {
  if (size < 700) {
    if (size > 300) {
      return 10;
    }
    return 5;
  }
  return 20;
}