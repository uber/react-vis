'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var propTypes = {
  className: _propTypes2.default.string,
  circlesTotal: _propTypes2.default.number,
  endSize: _propTypes2.default.number,
  endTitle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  height: _propTypes2.default.number,
  startSize: _propTypes2.default.number,
  startTitle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  width: _propTypes2.default.number
};

var defaultProps = {
  circlesTotal: 10,
  className: '',
  endSize: 20,
  startSize: 2
};

function ContinuousSizeLegend(_ref) {
  var startTitle = _ref.startTitle,
      endTitle = _ref.endTitle,
      startSize = _ref.startSize,
      endSize = _ref.endSize,
      circlesTotal = _ref.circlesTotal,
      height = _ref.height,
      width = _ref.width,
      className = _ref.className;

  var circles = [];
  var step = (endSize - startSize) / (circlesTotal - 1);

  for (var i = 0; i < circlesTotal; i++) {
    var size = step * i + startSize;
    circles.push(_react2.default.createElement('div', {
      key: i,
      className: 'rv-bubble',
      style: {
        width: size,
        height: size,
        borderRadius: size / 2
      }
    }));
    // Add the separator in order to justify the content (otherwise the tags
    // will be stacked together without any margins around).
    circles.push(' ');
  }
  return _react2.default.createElement(
    'div',
    {
      className: 'rv-continuous-size-legend ' + className,
      style: { width: width, height: height }
    },
    _react2.default.createElement(
      'div',
      { className: 'rv-bubbles', style: { height: endSize } },
      circles,
      _react2.default.createElement('div', { className: 'rv-spacer' })
    ),
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
      )
    )
  );
}

ContinuousSizeLegend.displayName = 'ContinuousSizeLegend';
ContinuousSizeLegend.propTypes = propTypes;
ContinuousSizeLegend.defaultProps = defaultProps;

exports.default = ContinuousSizeLegend;