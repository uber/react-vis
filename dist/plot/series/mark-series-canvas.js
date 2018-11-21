'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Color = require('d3-color');

var _theme = require('../../theme');

var _scalesUtils = require('../../utils/scales-utils');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

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

var MarkSeriesCanvas = function (_AbstractSeries) {
  _inherits(MarkSeriesCanvas, _AbstractSeries);

  function MarkSeriesCanvas() {
    _classCallCheck(this, MarkSeriesCanvas);

    return _possibleConstructorReturn(this, (MarkSeriesCanvas.__proto__ || Object.getPrototypeOf(MarkSeriesCanvas)).apply(this, arguments));
  }

  _createClass(MarkSeriesCanvas, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props, ctx) {
      var data = props.data,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop;


      var x = (0, _scalesUtils.getAttributeFunctor)(props, 'x');
      var y = (0, _scalesUtils.getAttributeFunctor)(props, 'y');
      var size = (0, _scalesUtils.getAttributeFunctor)(props, 'size') || function (p) {
        return _theme.DEFAULT_SIZE;
      };
      var fill = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var stroke = (0, _scalesUtils.getAttributeFunctor)(props, 'stroke') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacity = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');

      data.forEach(function (row) {
        var fillColor = (0, _d3Color.rgb)(fill(row));
        var strokeColor = (0, _d3Color.rgb)(stroke(row));
        var rowOpacity = opacity(row) || _theme.DEFAULT_OPACITY;
        ctx.beginPath();
        ctx.arc(x(row) + marginLeft, y(row) + marginTop, size(row), 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(' + fillColor.r + ', ' + fillColor.g + ', ' + fillColor.b + ', ' + rowOpacity + ')';
        ctx.fill();
        ctx.strokeStyle = 'rgba(' + strokeColor.r + ', ' + strokeColor.g + ', ' + strokeColor.b + ', ' + rowOpacity + ')';
        ctx.stroke();
      });
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

  return MarkSeriesCanvas;
}(_abstractSeries2.default);

MarkSeriesCanvas.displayName = 'MarkSeriesCanvas';

MarkSeriesCanvas.propTypes = _extends({}, _abstractSeries2.default.propTypes);

exports.default = MarkSeriesCanvas;