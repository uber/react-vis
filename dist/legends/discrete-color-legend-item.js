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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

function DiscreteColorLegendItem(_ref) {
  var color = _ref.color,
      strokeDasharray = _ref.strokeDasharray,
      strokeStyle = _ref.strokeStyle,
      strokeWidth = _ref.strokeWidth,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      orientation = _ref.orientation,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      title = _ref.title;

  var className = 'rv-discrete-color-legend-item ' + orientation;
  if (disabled) {
    className += ' disabled';
  }
  if (onClick) {
    className += ' clickable';
  }
  var strokeDasharrayStyle = STROKE_STYLES[strokeStyle] || strokeDasharray;
  return _react2.default.createElement(
    'div',
    { className: className, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
    _react2.default.createElement(
      'svg',
      { className: 'rv-discrete-color-legend-item__color', height: 2, width: 14 },
      _react2.default.createElement('path', {
        className: 'rv-discrete-color-legend-item__color__path',
        d: 'M 0, 1 L 14, 1',
        style: _extends({}, strokeWidth ? { strokeWidth: strokeWidth } : {}, strokeDasharrayStyle ? { strokeDasharray: strokeDasharrayStyle } : {}, {
          stroke: disabled ? null : color
        })

      })
    ),
    _react2.default.createElement(
      'span',
      { className: 'rv-discrete-color-legend-item__title' },
      title
    )
  );
}

DiscreteColorLegendItem.propTypes = {
  color: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  onClick: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']).isRequired,
  strokeDasharray: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  strokeStyle: _propTypes2.default.oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.defaultProps = {
  disabled: false,
  strokeStyle: 'solid'
};
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';

exports.default = DiscreteColorLegendItem;