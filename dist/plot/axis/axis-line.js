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

var _axisUtils = require('../../utils/axis-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;


var propTypes = {
  height: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object,
  orientation: _propTypes2.default.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  width: _propTypes2.default.number.isRequired
};

var defaultProps = {
  style: {}
};

function AxisLine(_ref) {
  var orientation = _ref.orientation,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;

  var lineProps = void 0;
  if (orientation === LEFT) {
    lineProps = {
      x1: width,
      x2: width,
      y1: 0,
      y2: height
    };
  } else if (orientation === RIGHT) {
    lineProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height
    };
  } else if (orientation === TOP) {
    lineProps = {
      x1: 0,
      x2: width,
      y1: height,
      y2: height
    };
  } else {
    lineProps = {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0
    };
  }
  return _react2.default.createElement('line', _extends({}, lineProps, { className: 'rv-xy-plot__axis__line', style: style }));
}

AxisLine.defaultProps = defaultProps;
AxisLine.displayName = 'AxisLine';
AxisLine.propTypes = propTypes;

exports.default = AxisLine;