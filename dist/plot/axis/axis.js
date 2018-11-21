'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _axisUtils = require('../../utils/axis-utils');

var _scalesUtils = require('../../utils/scales-utils');

var _axisLine = require('./axis-line');

var _axisLine2 = _interopRequireDefault(_axisLine);

var _axisTicks = require('./axis-ticks');

var _axisTicks2 = _interopRequireDefault(_axisTicks);

var _axisTitle = require('./axis-title');

var _axisTitle2 = _interopRequireDefault(_axisTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var defaultAnimatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];

var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;


var propTypes = {
  orientation: _propTypes2.default.oneOf([LEFT, RIGHT, TOP, BOTTOM]),
  attr: _propTypes2.default.string.isRequired,
  attrAxis: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  top: _propTypes2.default.number,
  left: _propTypes2.default.number,
  title: _propTypes2.default.string,

  style: _propTypes2.default.object,

  className: _propTypes2.default.string,
  hideTicks: _propTypes2.default.bool,
  hideLine: _propTypes2.default.bool,
  on0: _propTypes2.default.bool,
  tickLabelAngle: _propTypes2.default.number,
  tickSize: _propTypes2.default.number,
  tickSizeInner: _propTypes2.default.number,
  tickSizeOuter: _propTypes2.default.number,
  tickPadding: _propTypes2.default.number,
  tickValues: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),
  tickFormat: _propTypes2.default.func,
  tickTotal: _propTypes2.default.number,

  // Not expected to be used by the users.
  // TODO: Add underscore to these properties later.
  marginTop: _propTypes2.default.number,
  marginBottom: _propTypes2.default.number,
  marginLeft: _propTypes2.default.number,
  marginRight: _propTypes2.default.number,
  innerWidth: _propTypes2.default.number,
  innerHeight: _propTypes2.default.number
};

var defaultProps = {
  className: '',
  on0: false,
  style: {},
  tickSize: 6,
  tickPadding: 8,
  orientation: BOTTOM
};

var predefinedClassName = 'rv-xy-plot__axis';
var VERTICAL_CLASS_NAME = 'rv-xy-plot__axis--vertical';
var HORIZONTAL_CLASS_NAME = 'rv-xy-plot__axis--horizontal';

var Axis = function (_PureComponent) {
  _inherits(Axis, _PureComponent);

  function Axis() {
    _classCallCheck(this, Axis);

    return _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).apply(this, arguments));
  }

  _createClass(Axis, [{
    key: '_getDefaultAxisProps',

    /**
     * Define the default values depending on the data passed from the outside.
     * @returns {*} Object of default properties.
     * @private
     */
    value: function _getDefaultAxisProps() {
      var _props = this.props,
          innerWidth = _props.innerWidth,
          innerHeight = _props.innerHeight,
          marginTop = _props.marginTop,
          marginBottom = _props.marginBottom,
          marginLeft = _props.marginLeft,
          marginRight = _props.marginRight,
          orientation = _props.orientation;

      if (orientation === BOTTOM) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: innerHeight + marginTop,
          left: marginLeft,
          width: innerWidth,
          height: marginBottom
        };
      } else if (orientation === TOP) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: 0,
          left: marginLeft,
          width: innerWidth,
          height: marginTop
        };
      } else if (orientation === LEFT) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
          top: marginTop,
          left: 0,
          width: marginLeft,
          height: innerHeight
        };
      }
      return {
        tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
        top: marginTop,
        left: marginLeft + innerWidth,
        width: marginRight,
        height: innerHeight
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var animation = this.props.animation;


      if (animation) {
        var animatedProps = animation.nonAnimatedProps ? defaultAnimatedProps.filter(function (prop) {
          return animation.nonAnimatedProps.indexOf(prop) < 0;
        }) : defaultAnimatedProps;

        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: animatedProps }),
          _react2.default.createElement(Axis, _extends({}, this.props, { animation: null }))
        );
      }

      var props = _extends({}, this._getDefaultAxisProps(), this.props);

      var attrAxis = props.attrAxis,
          className = props.className,
          height = props.height,
          hideLine = props.hideLine,
          hideTicks = props.hideTicks,
          left = props.left,
          marginTop = props.marginTop,
          on0 = props.on0,
          orientation = props.orientation,
          position = props.position,
          style = props.style,
          title = props.title,
          top = props.top,
          width = props.width;

      var isVertical = [LEFT, RIGHT].indexOf(orientation) > -1;
      var axisClassName = isVertical ? VERTICAL_CLASS_NAME : HORIZONTAL_CLASS_NAME;

      var leftPos = left;
      var topPos = top;
      if (on0) {
        var scale = (0, _scalesUtils.getAttributeScale)(props, attrAxis);
        if (isVertical) {
          leftPos = scale(0);
        } else {
          topPos = marginTop + scale(0);
        }
      }

      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + leftPos + ',' + topPos + ')',
          className: predefinedClassName + ' ' + axisClassName + ' ' + className,
          style: style
        },
        !hideLine && _react2.default.createElement(_axisLine2.default, {
          height: height,
          width: width,
          orientation: orientation,
          style: _extends({}, style, style.line)
        }),
        !hideTicks && _react2.default.createElement(_axisTicks2.default, _extends({}, props, { style: _extends({}, style, style.ticks) })),
        title ? _react2.default.createElement(_axisTitle2.default, {
          position: position,
          title: title,
          height: height,
          width: width,
          style: _extends({}, style, style.title),
          orientation: orientation
        }) : null
      );
    }
  }]);

  return Axis;
}(_react.PureComponent);

Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;

exports.default = Axis;