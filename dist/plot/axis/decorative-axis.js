'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Format = require('d3-format');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _abstractSeries = require('../series/abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _decorativeAxisTicks = require('./decorative-axis-ticks');

var _decorativeAxisTicks2 = _interopRequireDefault(_decorativeAxisTicks);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2017 Uber Technologies, Inc.
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

var predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis';

var animatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];

var DecorativeAxis = function (_AbstractSeries) {
  _inherits(DecorativeAxis, _AbstractSeries);

  function DecorativeAxis() {
    _classCallCheck(this, DecorativeAxis);

    return _possibleConstructorReturn(this, (DecorativeAxis.__proto__ || Object.getPrototypeOf(DecorativeAxis)).apply(this, arguments));
  }

  _createClass(DecorativeAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          axisStart = _props.axisStart,
          axisEnd = _props.axisEnd,
          axisDomain = _props.axisDomain,
          numberOfTicks = _props.numberOfTicks,
          tickValue = _props.tickValue,
          tickSize = _props.tickSize,
          style = _props.style;


      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: animatedProps }),
          _react2.default.createElement(DecorativeAxis, _extends({}, this.props, { animation: null }))
        );
      }

      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');

      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')'
        },
        _react2.default.createElement('line', _extends({}, _extends({
          x1: x({ x: axisStart.x }),
          x2: x({ x: axisEnd.x }),
          y1: y({ y: axisStart.y }),
          y2: y({ y: axisEnd.y })
        }, style.line), {
          className: 'rv-xy-plot__axis__line'
        })),
        _react2.default.createElement(
          'g',
          { className: 'rv-xy-manipulable-axis__ticks' },
          (0, _decorativeAxisTicks2.default)({
            axisDomain: axisDomain,
            axisEnd: { x: x(axisEnd), y: y(axisEnd) },
            axisStart: { x: x(axisStart), y: y(axisStart) },
            numberOfTicks: numberOfTicks,
            tickValue: tickValue,
            tickSize: tickSize,
            style: style
          })
        )
      );
    }
  }]);

  return DecorativeAxis;
}(_abstractSeries2.default);

var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');

DecorativeAxis.defaultProps = {
  className: '',
  numberOfTicks: 10,
  tickValue: function tickValue(d) {
    return DEFAULT_FORMAT(d);
  },
  tickSize: 5,
  style: {
    line: {
      strokeWidth: 1
    },
    ticks: {
      strokeWidth: 2
    },
    text: {}
  }
};
DecorativeAxis.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  axisDomain: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  axisEnd: _propTypes2.default.shape({
    x: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    y: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  }).isRequired,
  axisStart: _propTypes2.default.shape({
    x: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    y: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  }).isRequired,
  className: _propTypes2.default.string,
  numberOfTicks: _propTypes2.default.number,
  tickValue: _propTypes2.default.func,
  tickSize: _propTypes2.default.number,
  style: _propTypes2.default.shape({
    line: _propTypes2.default.object,
    ticks: _propTypes2.default.object,
    text: _propTypes2.default.object
  })
});
DecorativeAxis.displayName = 'DecorativeAxis';
exports.default = DecorativeAxis;