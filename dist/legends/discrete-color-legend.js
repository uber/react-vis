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

var _discreteColorLegendItem = require('./discrete-color-legend-item');

var _discreteColorLegendItem2 = _interopRequireDefault(_discreteColorLegendItem);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DiscreteColorLegend(_ref) {
  var className = _ref.className,
      colors = _ref.colors,
      height = _ref.height,
      items = _ref.items,
      onItemClick = _ref.onItemClick,
      onItemMouseEnter = _ref.onItemMouseEnter,
      onItemMouseLeave = _ref.onItemMouseLeave,
      orientation = _ref.orientation,
      style = _ref.style,
      width = _ref.width;

  return _react2.default.createElement(
    'div',
    {
      className: 'rv-discrete-color-legend ' + orientation + ' ' + className,
      style: _extends({ width: width, height: height }, style)
    },
    items.map(function (item, i) {
      return _react2.default.createElement(_discreteColorLegendItem2.default, {
        title: item.title ? item.title : item,
        color: item.color ? item.color : colors[i % colors.length],
        strokeDasharray: item.strokeDasharray,
        strokeStyle: item.strokeStyle,
        strokeWidth: item.strokeWidth,
        disabled: Boolean(item.disabled),
        orientation: orientation,
        key: i,
        onClick: onItemClick ? function (e) {
          return onItemClick(item, i, e);
        } : null,
        onMouseEnter: onItemMouseEnter ? function (e) {
          return onItemMouseEnter(item, i, e);
        } : null,
        onMouseLeave: onItemMouseEnter ? function (e) {
          return onItemMouseLeave(item, i, e);
        } : null
      });
    })
  );
}

DiscreteColorLegend.displayName = 'DiscreteColorLegendItem';
DiscreteColorLegend.propTypes = {
  className: _propTypes2.default.string,
  items: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    color: _propTypes2.default.string,
    disabled: _propTypes2.default.bool
  }), _propTypes2.default.string.isRequired, _propTypes2.default.element])).isRequired,
  onItemClick: _propTypes2.default.func,
  onItemMouseEnter: _propTypes2.default.func,
  onItemMouseLeave: _propTypes2.default.func,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  orientation: _propTypes2.default.oneOf(['vertical', 'horizontal'])
};

DiscreteColorLegend.defaultProps = {
  className: '',
  colors: _theme.DISCRETE_COLOR_RANGE,
  orientation: 'vertical'
};

exports.default = DiscreteColorLegend;