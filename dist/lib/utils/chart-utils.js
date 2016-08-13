'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerDimensions = getInnerDimensions;
exports.getDataFromChildren = getDataFromChildren;

var _seriesUtils = require('./series-utils');

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @returns {Object} Dimensions of the component.
 */
function getInnerDimensions(props) {
  var height = props.height;
  var width = props.width;
  var _props$margin = props.margin;
  var _props$margin$left = _props$margin.left;
  var marginLeft = _props$margin$left === undefined ? 0 : _props$margin$left;
  var _props$margin$top = _props$margin.top;
  var marginTop = _props$margin$top === undefined ? 0 : _props$margin$top;
  var _props$margin$right = _props$margin.right;
  var marginRight = _props$margin$right === undefined ? 0 : _props$margin$right;
  var _props$margin$bottom = _props$margin.bottom;
  var marginBottom = _props$margin$bottom === undefined ? 0 : _props$margin$bottom;

  return {
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    width: width,
    height: height,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}

/**
 * Collect data from the list of children.
 * @param {Object} props Props for the plot.
 * @returns {Array} Array of arrays with data.
 */
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

function getDataFromChildren(props) {
  var children = props.children;

  return (0, _seriesUtils.getSeriesChildren)(children).map(function (child) {
    return child.props.data;
  });
}