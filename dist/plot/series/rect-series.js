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

var _seriesUtils = require('../../utils/series-utils');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--rect';

var RectSeries = function (_AbstractSeries) {
  _inherits(RectSeries, _AbstractSeries);

  function RectSeries() {
    _classCallCheck(this, RectSeries);

    return _possibleConstructorReturn(this, (RectSeries.__proto__ || Object.getPrototypeOf(RectSeries)).apply(this, arguments));
  }

  _createClass(RectSeries, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          data = _props.data,
          linePosAttr = _props.linePosAttr,
          lineSizeAttr = _props.lineSizeAttr,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          style = _props.style,
          valuePosAttr = _props.valuePosAttr,
          valueSizeAttr = _props.valueSizeAttr;


      if (!data) {
        return null;
      }

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(RectSeries, _extends({}, this.props, { animation: null }))
        );
      }

      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      var line0Functor = this._getAttr0Functor(linePosAttr);
      var valueFunctor = this._getAttributeFunctor(valuePosAttr);
      var value0Functor = this._getAttr0Functor(valuePosAttr);
      var fillFunctor = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
      var strokeFunctor = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
      var opacityFunctor = this._getAttributeFunctor('opacity');

      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')'
        },
        data.map(function (d, i) {
          var _attrs;

          var attrs = (_attrs = {
            style: _extends({
              opacity: opacityFunctor && opacityFunctor(d),
              stroke: strokeFunctor && strokeFunctor(d),
              fill: fillFunctor && fillFunctor(d)
            }, style)
          }, _defineProperty(_attrs, linePosAttr, line0Functor(d)), _defineProperty(_attrs, lineSizeAttr, Math.abs(lineFunctor(d) - line0Functor(d))), _defineProperty(_attrs, valuePosAttr, Math.min(value0Functor(d), valueFunctor(d))), _defineProperty(_attrs, valueSizeAttr, Math.abs(-value0Functor(d) + valueFunctor(d))), _defineProperty(_attrs, 'onClick', function onClick(e) {
            return _this2._valueClickHandler(d, e);
          }), _defineProperty(_attrs, 'onContextMenu', function onContextMenu(e) {
            return _this2._valueRightClickHandler(d, e);
          }), _defineProperty(_attrs, 'onMouseOver', function onMouseOver(e) {
            return _this2._valueMouseOverHandler(d, e);
          }), _defineProperty(_attrs, 'onMouseOut', function onMouseOut(e) {
            return _this2._valueMouseOutHandler(d, e);
          }), _defineProperty(_attrs, 'key', i), _attrs);
          return _react2.default.createElement('rect', attrs);
        })
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return _extends({}, _abstractSeries2.default.propTypes, {
        linePosAttr: _propTypes2.default.string,
        valuePosAttr: _propTypes2.default.string,
        lineSizeAttr: _propTypes2.default.string,
        valueSizeAttr: _propTypes2.default.string
      });
    }
  }]);

  return RectSeries;
}(_abstractSeries2.default);

RectSeries.displayName = 'RectSeries';

exports.default = RectSeries;