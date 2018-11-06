'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axisUtils = require('../utils/axis-utils');

var _gridLines = require('./grid-lines');

var _gridLines2 = _interopRequireDefault(_gridLines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HORIZONTAL = _axisUtils.DIRECTION.HORIZONTAL;


var propTypes = _extends({}, _gridLines2.default.propTypes, {
  direction: _propTypes2.default.oneOf([HORIZONTAL])
});

var defaultProps = {
  direction: HORIZONTAL,
  attr: 'y'
};

function HorizontalGridLines(props) {
  return _react2.default.createElement(_gridLines2.default, props);
}

HorizontalGridLines.displayName = 'HorizontalGridLines';
HorizontalGridLines.propTypes = propTypes;
HorizontalGridLines.defaultProps = defaultProps;
HorizontalGridLines.requiresSVG = true;

exports.default = HorizontalGridLines;