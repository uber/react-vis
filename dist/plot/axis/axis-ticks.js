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

var _axisUtils = require('../../utils/axis-utils');

var _scalesUtils = require('../../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;


var propTypes = {
  height: _propTypes2.default.number.isRequired,
  orientation: _propTypes2.default.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  style: _propTypes2.default.object,
  width: _propTypes2.default.number.isRequired
};

var defaultProps = {
  style: {}
};

function _getTickFormatFn(scale, tickTotal, tickFormat) {
  return !tickFormat ? scale.tickFormat ? scale.tickFormat(tickTotal) : function (v) {
    return v;
  } : tickFormat;
}

var AxisTicks = function (_React$Component) {
  _inherits(AxisTicks, _React$Component);

  function AxisTicks() {
    _classCallCheck(this, AxisTicks);

    return _possibleConstructorReturn(this, (AxisTicks.__proto__ || Object.getPrototypeOf(AxisTicks)).apply(this, arguments));
  }

  _createClass(AxisTicks, [{
    key: '_areTicksWrapped',

    /**
     * Check if axis ticks should be mirrored (for the right and top positions.
     * @returns {boolean} True if mirrored.
     * @private
     */
    value: function _areTicksWrapped() {
      var orientation = this.props.orientation;

      return orientation === LEFT || orientation === TOP;
    }
  }, {
    key: '_getTickContainerPropsGetterFn',
    value: function _getTickContainerPropsGetterFn() {
      if (this._isAxisVertical()) {
        return function (pos) {
          return { transform: 'translate(0, ' + pos + ')' };
        };
      }
      return function (pos) {
        return { transform: 'translate(' + pos + ', 0)' };
      };
    }

    /**
     * Get attributes for the label of the tick.
     * @returns {Object} Object with properties.
     * @private
     */

  }, {
    key: '_getTickLabelProps',
    value: function _getTickLabelProps() {
      var _props = this.props,
          orientation = _props.orientation,
          tickLabelAngle = _props.tickLabelAngle,
          tickSize = _props.tickSize,
          _props$tickSizeOuter = _props.tickSizeOuter,
          tickSizeOuter = _props$tickSizeOuter === undefined ? tickSize : _props$tickSizeOuter,
          _props$tickPadding = _props.tickPadding,
          tickPadding = _props$tickPadding === undefined ? tickSize : _props$tickPadding;

      // Assign the text orientation inside the label of the tick mark.

      var textAnchor = void 0;
      if (orientation === LEFT || orientation === BOTTOM && tickLabelAngle) {
        textAnchor = 'end';
      } else if (orientation === RIGHT || orientation === TOP && tickLabelAngle) {
        textAnchor = 'start';
      } else {
        textAnchor = 'middle';
      }

      // The label's position is translated to the given padding and then the
      // label is rotated to the given angle.
      var isVertical = this._isAxisVertical();
      var wrap = this._areTicksWrapped() ? -1 : 1;

      var labelOffset = wrap * (tickSizeOuter + tickPadding);
      var transform = (isVertical ? 'translate(' + labelOffset + ', 0)' : 'translate(0, ' + labelOffset + ')') + (tickLabelAngle ? ' rotate(' + tickLabelAngle + ')' : '');

      // Set the vertical offset of the label according to the position of
      // the axis.
      var dy = orientation === TOP || tickLabelAngle ? '0' : orientation === BOTTOM ? '0.72em' : '0.32em';

      return {
        textAnchor: textAnchor,
        dy: dy,
        transform: transform
      };
    }

    /**
     * Get the props of the tick line.
     * @returns {Object} Props.
     * @private
     */

  }, {
    key: '_getTickLineProps',
    value: function _getTickLineProps() {
      var _ref;

      var _props2 = this.props,
          tickSize = _props2.tickSize,
          _props2$tickSizeOuter = _props2.tickSizeOuter,
          tickSizeOuter = _props2$tickSizeOuter === undefined ? tickSize : _props2$tickSizeOuter,
          _props2$tickSizeInner = _props2.tickSizeInner,
          tickSizeInner = _props2$tickSizeInner === undefined ? tickSize : _props2$tickSizeInner;

      var isVertical = this._isAxisVertical();
      var tickXAttr = isVertical ? 'y' : 'x';
      var tickYAttr = isVertical ? 'x' : 'y';
      var wrap = this._areTicksWrapped() ? -1 : 1;
      return _ref = {}, _defineProperty(_ref, tickXAttr + '1', 0), _defineProperty(_ref, tickXAttr + '2', 0), _defineProperty(_ref, tickYAttr + '1', -wrap * tickSizeInner), _defineProperty(_ref, tickYAttr + '2', wrap * tickSizeOuter), _ref;
    }

    /**
     * Gets if the axis is vertical.
     * @returns {boolean} True if vertical.
     * @private
     */

  }, {
    key: '_isAxisVertical',
    value: function _isAxisVertical() {
      var orientation = this.props.orientation;

      return orientation === LEFT || orientation === RIGHT;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          attr = _props3.attr,
          orientation = _props3.orientation,
          width = _props3.width,
          height = _props3.height,
          style = _props3.style,
          tickFormat = _props3.tickFormat,
          tickTotal = _props3.tickTotal,
          tickValues = _props3.tickValues;


      var x = orientation === LEFT ? width : 0;
      var y = orientation === TOP ? height : 0;

      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);

      var values = (0, _axisUtils.getTickValues)(scale, tickTotal, tickValues);
      var tickFormatFn = _getTickFormatFn(scale, tickTotal, tickFormat);

      var translateFn = this._getTickContainerPropsGetterFn();
      var pathProps = this._getTickLineProps();
      var textProps = this._getTickLabelProps();

      var ticks = values.map(function (v, i) {
        var pos = scale(v);
        var labelNode = tickFormatFn(v, i, scale, tickTotal);
        var shouldRenderAsOwnNode = _react2.default.isValidElement(labelNode) && !['tspan', 'textPath'].includes(labelNode.type);
        var shouldAddProps = labelNode && typeof labelNode.type !== 'string';
        return _react2.default.createElement(
          'g',
          _extends({
            key: i
          }, translateFn(pos, 0), {
            className: 'rv-xy-plot__axis__tick',
            style: style
          }),
          _react2.default.createElement('line', _extends({}, pathProps, {
            className: 'rv-xy-plot__axis__tick__line',
            style: _extends({}, style, style.line)
          })),
          shouldRenderAsOwnNode ? _react2.default.cloneElement(labelNode, shouldAddProps ? _extends({}, textProps, {
            containerWidth: width,
            tickCount: values.length
          }) : undefined) : _react2.default.createElement(
            'text',
            _extends({}, textProps, {
              className: 'rv-xy-plot__axis__tick__text',
              style: _extends({}, style, style.text)
            }),
            labelNode
          )
        );
      });

      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + x + ', ' + y + ')',
          className: 'rv-xy-plot__axis__ticks'
        },
        ticks
      );
    }
  }]);

  return AxisTicks;
}(_react2.default.Component);

AxisTicks.defaultProps = defaultProps;
AxisTicks.displayName = 'AxisTicks';
AxisTicks.propTypes = propTypes;
AxisTicks.requiresSVG = true;

exports.default = AxisTicks;