'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axisUtils = require('../../utils/axis-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

// Assuming that 16px = 1em
var ADJUSTMENT_FOR_TEXT_SIZE = 16;
var MARGIN = 6;
var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;

var defaultProps = {
  position: 'end'
};

/**
 * Compute transformations, keyed by orientation
 * @param {number} width - width of axis
 * @param {number} height - height of axis
 * @returns {Object} Object of transformations, keyed by orientation
 */
var transformation = function transformation(width, height) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, LEFT, {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: MARGIN,
      rotation: -90,
      textAnchor: 'end'
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: 'middle'
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: 'start'
    }
  }), _defineProperty(_ref, RIGHT, {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: MARGIN,
      rotation: -90,
      textAnchor: 'end'
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: 'middle'
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: 'start'
    }
  }), _defineProperty(_ref, TOP, {
    start: {
      x: MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'start'
    },
    middle: {
      x: width / 2 - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'middle'
    },
    end: {
      x: width - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'end'
    }
  }), _defineProperty(_ref, BOTTOM, {
    start: {
      x: MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'start'
    },
    middle: {
      x: width / 2 - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'middle'
    },
    end: {
      x: width - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'end'
    }
  }), _ref;
};

var propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  orientation: _propTypes2.default.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string.isRequired
};

function AxisTitle(_ref2) {
  var orientation = _ref2.orientation,
      position = _ref2.position,
      width = _ref2.width,
      height = _ref2.height,
      style = _ref2.style,
      title = _ref2.title;

  var outerGroupTranslateX = orientation === LEFT ? width : 0;
  var outerGroupTranslateY = orientation === TOP ? height : 0;
  var outerGroupTransform = 'translate(' + outerGroupTranslateX + ', ' + outerGroupTranslateY + ')';
  var _transformation$orien = transformation(width, height)[orientation][position],
      x = _transformation$orien.x,
      y = _transformation$orien.y,
      rotation = _transformation$orien.rotation,
      textAnchor = _transformation$orien.textAnchor;

  var innerGroupTransform = 'translate(' + x + ', ' + y + ') rotate(' + rotation + ')';

  return _react2.default.createElement(
    'g',
    { transform: outerGroupTransform, className: 'rv-xy-plot__axis__title' },
    _react2.default.createElement(
      'g',
      { style: _extends({ textAnchor: textAnchor }, style), transform: innerGroupTransform },
      _react2.default.createElement(
        'text',
        { style: style },
        title
      )
    )
  );
}

AxisTitle.displayName = 'AxisTitle';
AxisTitle.propTypes = propTypes;
AxisTitle.defaultProps = defaultProps;
exports.default = AxisTitle;