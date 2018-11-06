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

var _d3Contour = require('d3-contour');

var _d3Geo = require('d3-geo');

var _d3Scale = require('d3-scale');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _seriesUtils = require('../../utils/series-utils');

var _theme = require('../../theme');

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--contour';

function getDomain(data) {
  return data.reduce(function (acc, row) {
    return {
      min: Math.min(acc.min, row.value),
      max: Math.max(acc.max, row.value)
    };
  }, { min: Infinity, max: -Infinity });
}

var ContourSeries = function (_AbstractSeries) {
  _inherits(ContourSeries, _AbstractSeries);

  function ContourSeries() {
    _classCallCheck(this, ContourSeries);

    return _possibleConstructorReturn(this, (ContourSeries.__proto__ || Object.getPrototypeOf(ContourSeries)).apply(this, arguments));
  }

  _createClass(ContourSeries, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          bandwidth = _props.bandwidth,
          className = _props.className,
          colorRange = _props.colorRange,
          data = _props.data,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          style = _props.style;


      if (!data || !innerWidth || !innerHeight) {
        return null;
      }

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(ContourSeries, _extends({}, this.props, { animation: null }))
        );
      }

      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');

      var contouredData = (0, _d3Contour.contourDensity)().x(function (d) {
        return x(d);
      }).y(function (d) {
        return y(d);
      }).size([innerWidth, innerHeight]).bandwidth(bandwidth)(data);

      var geo = (0, _d3Geo.geoPath)();

      var _getDomain = getDomain(contouredData),
          min = _getDomain.min,
          max = _getDomain.max;

      var colorScale = (0, _d3Scale.scaleLinear)().domain([min, max]).range(colorRange || _theme.CONTINUOUS_COLOR_RANGE);
      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')'
        },
        contouredData.map(function (polygon, index) {
          return _react2.default.createElement('path', {
            className: 'rv-xy-plot__series--contour-line',
            key: 'rv-xy-plot__series--contour-line-' + index,
            d: geo(polygon),
            style: _extends({
              fill: colorScale(polygon.value)
            }, style)
          });
        })
      );
    }
  }]);

  return ContourSeries;
}(_abstractSeries2.default);

ContourSeries.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  animation: _propTypes2.default.bool,
  bandwidth: _propTypes2.default.number,
  className: _propTypes2.default.string,
  marginLeft: _propTypes2.default.number,
  marginTop: _propTypes2.default.number,
  style: _propTypes2.default.object
});

ContourSeries.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  bandwidth: 40,
  style: {}
});

exports.default = ContourSeries;