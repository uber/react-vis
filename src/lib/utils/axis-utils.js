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

import d3Axis from 'd3-axis';

const AXIS_FNS = {
  left: d3Axis.axisLeft,
  right: d3Axis.axisRight,
  top: d3Axis.axisTop,
  bottom: d3Axis.axisBottom
};

export const AXIS_ORIENTATIONS = Object.keys(AXIS_FNS);

export function getAxisFnByOrientation(orientation) {
  return AXIS_FNS[orientation];
}

/**
 * Get total amount of ticks from a given size in pixels.
 * @param {number} size Size of the axis in pixels.
 * @returns {number} Total amount of ticks.
 */
export function getTicksTotalFromSize(size) {
  if (size < 700) {
    if (size > 300) {
      return 10;
    }
    return 5;
  }
  return 20;
}
