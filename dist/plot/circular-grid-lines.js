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

var _scalesUtils = require('../utils/scales-utils');

var _animation = require('../animation');

var _animation2 = _interopRequireDefault(_animation);

var _axisUtils = require('../utils/axis-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Uber Technologies, Inc.
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

var animatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickTotal'];

var CircularGridLines = function (_PureComponent) {
  _inherits(CircularGridLines, _PureComponent);

  function CircularGridLines() {
    _classCallCheck(this, CircularGridLines);

    return _possibleConstructorReturn(this, (CircularGridLines.__proto__ || Object.getPrototypeOf(CircularGridLines)).apply(this, arguments));
  }

  _createClass(CircularGridLines, [{
    key: '_getDefaultProps',
    value: function _getDefaultProps() {
      var _props = this.props,
          innerWidth = _props.innerWidth,
          innerHeight = _props.innerHeight,
          marginTop = _props.marginTop,
          marginLeft = _props.marginLeft;

      return {
        left: marginLeft,
        top: marginTop,
        width: innerWidth,
        height: innerHeight,
        style: {},
        tickTotal: (0, _axisUtils.getTicksTotalFromSize)(Math.min(innerWidth, innerHeight))
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          animation = _props2.animation,
          centerX = _props2.centerX,
          centerY = _props2.centerY;

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: animatedProps }),
          _react2.default.createElement(CircularGridLines, _extends({}, this.props, { animation: null }))
        );
      }

      var props = _extends({}, this._getDefaultProps(), this.props);

      var tickTotal = props.tickTotal,
          tickValues = props.tickValues,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop,
          rRange = props.rRange,
          style = props.style;


      var xScale = (0, _scalesUtils.getAttributeScale)(props, 'x');
      var yScale = (0, _scalesUtils.getAttributeScale)(props, 'y');
      var values = (0, _axisUtils.getTickValues)(xScale, tickTotal, tickValues);
      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + (xScale(centerX) + marginLeft) + ',' + (yScale(centerY) + marginTop) + ')',
          className: 'rv-xy-plot__circular-grid-lines'
        },
        values.reduce(function (res, value, index) {
          var radius = xScale(value);
          if (rRange && (radius < rRange[0] || radius > rRange[1])) {
            return res;
          }
          return res.concat([_react2.default.createElement('circle', _extends({ cx: 0, cy: 0, r: radius }, {
            key: index,
            className: 'rv-xy-plot__circular-grid-lines__line',
            style: style
          }))]);
        }, [])
      );
    }
  }]);

  return CircularGridLines;
}(_react.PureComponent);

CircularGridLines.displayName = 'CircularGridLines';
CircularGridLines.propTypes = {
  centerX: _propTypes2.default.number,
  centerY: _propTypes2.default.number,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  top: _propTypes2.default.number,
  left: _propTypes2.default.number,
  rRange: _propTypes2.default.arrayOf(_propTypes2.default.number),

  style: _propTypes2.default.object,

  tickValues: _propTypes2.default.arrayOf(_propTypes2.default.number),
  tickTotal: _propTypes2.default.number,

  animation: _animation.AnimationPropType,
  // generally supplied by xyplot
  marginTop: _propTypes2.default.number,
  marginBottom: _propTypes2.default.number,
  marginLeft: _propTypes2.default.number,
  marginRight: _propTypes2.default.number,
  innerWidth: _propTypes2.default.number,
  innerHeight: _propTypes2.default.number
};
CircularGridLines.defaultProps = {
  centerX: 0,
  centerY: 0
};
CircularGridLines.requiresSVG = true;

exports.default = CircularGridLines;