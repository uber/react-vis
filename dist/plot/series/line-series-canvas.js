'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Color = require('d3-color');

var _d3Shape = require('d3-shape');

var d3Shape = _interopRequireWildcard(_d3Shape);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../../theme');

var _scalesUtils = require('../../utils/scales-utils');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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


var LineSeriesCanvas = function (_AbstractSeries) {
  _inherits(LineSeriesCanvas, _AbstractSeries);

  function LineSeriesCanvas() {
    _classCallCheck(this, LineSeriesCanvas);

    return _possibleConstructorReturn(this, (LineSeriesCanvas.__proto__ || Object.getPrototypeOf(LineSeriesCanvas)).apply(this, arguments));
  }

  _createClass(LineSeriesCanvas, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props, ctx) {
      var curve = props.curve,
          data = props.data,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop,
          strokeWidth = props.strokeWidth,
          strokeDasharray = props.strokeDasharray;

      if (!data || data.length === 0) {
        return;
      }

      var x = (0, _scalesUtils.getAttributeFunctor)(props, 'x');
      var y = (0, _scalesUtils.getAttributeFunctor)(props, 'y');
      var stroke = (0, _scalesUtils.getAttributeValue)(props, 'stroke') || (0, _scalesUtils.getAttributeValue)(props, 'color');
      var strokeColor = (0, _d3Color.rgb)(stroke);
      var newOpacity = (0, _scalesUtils.getAttributeValue)(props, 'opacity');
      var opacity = Number.isFinite(newOpacity) ? newOpacity : _theme.DEFAULT_OPACITY;
      var line = d3Shape.line().x(function (row) {
        return x(row) + marginLeft;
      }).y(function (row) {
        return y(row) + marginTop;
      });
      if (typeof curve === 'string' && d3Shape[curve]) {
        line = line.curve(d3Shape[curve]);
      } else if (typeof curve === 'function') {
        line = line.curve(curve);
      }

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(' + strokeColor.r + ', ' + strokeColor.g + ', ' + strokeColor.b + ', ' + opacity + ')';
      ctx.lineWidth = strokeWidth;

      if (strokeDasharray) {
        ctx.setLineDash(strokeDasharray);
      }

      line.context(ctx)(data);
      ctx.stroke();
      ctx.closePath();
      // set back to default
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return false;
    }
  }, {
    key: 'isCanvas',
    get: function get() {
      return true;
    }
  }]);

  return LineSeriesCanvas;
}(_abstractSeries2.default);

LineSeriesCanvas.displayName = 'LineSeriesCanvas';
LineSeriesCanvas.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  strokeWidth: 2
});

LineSeriesCanvas.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  strokeWidth: _propTypes2.default.number
});

exports.default = LineSeriesCanvas;