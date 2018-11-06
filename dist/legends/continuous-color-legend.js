'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  height: _propTypes2.default.number,
  endColor: _propTypes2.default.string,
  endTitle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  midColor: _propTypes2.default.string,
  midTitle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  startColor: _propTypes2.default.string,
  startTitle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  width: _propTypes2.default.number
}; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var defaultProps = {
  className: '',
  startColor: _theme.CONTINUOUS_COLOR_RANGE[0],
  endColor: _theme.CONTINUOUS_COLOR_RANGE[1]
};

function ContinuousColorLegend(_ref) {
  var startColor = _ref.startColor,
      midColor = _ref.midColor,
      endColor = _ref.endColor,
      startTitle = _ref.startTitle,
      midTitle = _ref.midTitle,
      endTitle = _ref.endTitle,
      height = _ref.height,
      width = _ref.width,
      className = _ref.className;

  var colors = [startColor];
  if (midColor) {
    colors.push(midColor);
  }
  colors.push(endColor);
  return _react2.default.createElement(
    'div',
    {
      className: 'rv-continuous-color-legend ' + className,
      style: { width: width, height: height }
    },
    _react2.default.createElement('div', {
      className: 'rv-gradient',
      style: { background: 'linear-gradient(to right, ' + colors.join(',') + ')' }
    }),
    _react2.default.createElement(
      'div',
      { className: 'rv-legend-titles' },
      _react2.default.createElement(
        'span',
        { className: 'rv-legend-titles__left' },
        startTitle
      ),
      _react2.default.createElement(
        'span',
        { className: 'rv-legend-titles__right' },
        endTitle
      ),
      midTitle ? _react2.default.createElement(
        'span',
        { className: 'rv-legend-titles__center' },
        midTitle
      ) : null
    )
  );
}

ContinuousColorLegend.displayName = 'ContinuousColorLegend';
ContinuousColorLegend.propTypes = propTypes;
ContinuousColorLegend.defaultProps = defaultProps;

exports.default = ContinuousColorLegend;