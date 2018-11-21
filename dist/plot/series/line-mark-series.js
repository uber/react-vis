'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _lineSeries = require('./line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _markSeries = require('./mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _lineSeries2.default.propTypes, {
  lineStyle: _propTypes2.default.object,
  markStyle: _propTypes2.default.object
});

var LineMarkSeries = function (_AbstractSeries) {
  _inherits(LineMarkSeries, _AbstractSeries);

  function LineMarkSeries() {
    _classCallCheck(this, LineMarkSeries);

    return _possibleConstructorReturn(this, (LineMarkSeries.__proto__ || Object.getPrototypeOf(LineMarkSeries)).apply(this, arguments));
  }

  _createClass(LineMarkSeries, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          lineStyle = _props.lineStyle,
          markStyle = _props.markStyle,
          style = _props.style;

      return _react2.default.createElement(
        'g',
        { className: 'rv-xy-plot__series rv-xy-plot__series--linemark' },
        _react2.default.createElement(_lineSeries2.default, _extends({}, this.props, { style: _extends({}, style, lineStyle) })),
        _react2.default.createElement(_markSeries2.default, _extends({}, this.props, { style: _extends({}, style, markStyle) }))
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return _extends({}, _lineSeries2.default.defaultProps, {
        lineStyle: {},
        markStyle: {}
      });
    }
  }]);

  return LineMarkSeries;
}(_abstractSeries2.default);

LineMarkSeries.displayName = 'LineMarkSeries';
LineMarkSeries.propTypes = propTypes;

exports.default = LineMarkSeries;