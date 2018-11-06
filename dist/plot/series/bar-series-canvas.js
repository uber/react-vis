'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Color = require('d3-color');

var _theme = require('../../theme');

var _scalesUtils = require('../../utils/scales-utils');

var _seriesUtils = require('../../utils/series-utils');

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


function getScaleDistance(props, attr) {
  var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}

var BarSeriesCanvas = function (_AbstractSeries) {
  _inherits(BarSeriesCanvas, _AbstractSeries);

  function BarSeriesCanvas() {
    _classCallCheck(this, BarSeriesCanvas);

    return _possibleConstructorReturn(this, (BarSeriesCanvas.__proto__ || Object.getPrototypeOf(BarSeriesCanvas)).apply(this, arguments));
  }

  _createClass(BarSeriesCanvas, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props, ctx) {
      var data = props.data,
          linePosAttr = props.linePosAttr,
          lineSizeAttr = props.lineSizeAttr,
          valuePosAttr = props.valuePosAttr,
          marginTop = props.marginTop,
          marginBottom = props.marginBottom;

      if (!data || data.length === 0) {
        return;
      }

      var distance = getScaleDistance(props, linePosAttr);
      var line = (0, _scalesUtils.getAttributeFunctor)(props, linePosAttr);
      var value = (0, _scalesUtils.getAttributeFunctor)(props, valuePosAttr);
      var value0 = (0, _scalesUtils.getAttr0Functor)(props, valuePosAttr);
      var fill = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var stroke = (0, _scalesUtils.getAttributeFunctor)(props, 'stroke') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacity = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');

      var halfSpace = distance / 2 * 0.85;
      // totalSpaceAvailable is the space we have available to draw all the
      // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)
      var totalSpaceAvailable = halfSpace * 2;

      var _getStackParams = (0, _seriesUtils.getStackParams)(props),
          sameTypeTotal = _getStackParams.sameTypeTotal,
          sameTypeIndex = _getStackParams.sameTypeIndex;

      data.forEach(function (row) {
        var totalSpaceCenter = line(row);
        // totalSpaceStartingPoint is the first pixel were we can start drawing
        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace;

        // spaceTakenByInterBarsPixels has the overhead space consumed by each bar of sameTypeTotal
        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
        // lineSize is the space we have available to draw sameTypeIndex bar
        var lineSize = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels;

        var fillColor = (0, _d3Color.rgb)(fill(row));
        var strokeColor = (0, _d3Color.rgb)(stroke(row));
        var rowOpacity = opacity(row) || _theme.DEFAULT_OPACITY;

        // linePos is the first pixel were we can start drawing sameTypeIndex bar
        var linePos = totalSpaceStartingPoint + lineSize * sameTypeIndex + sameTypeIndex;
        var valuePos = Math.min(value0(row), value(row));
        var x = valuePosAttr === 'x' ? valuePos : linePos;
        var y = valuePosAttr === 'y' ? valuePos : linePos;

        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === 'height' ? lineSize : valueSize;
        var width = lineSizeAttr === 'width' ? lineSize : valueSize;

        ctx.beginPath();
        ctx.rect(x + marginBottom, y + marginTop, width, height);
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

  return BarSeriesCanvas;
}(_abstractSeries2.default);

BarSeriesCanvas.displayName = 'BarSeriesCanvas';
BarSeriesCanvas.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  linePosAttr: _propTypes2.default.string.isRequired,
  valuePosAttr: _propTypes2.default.string.isRequired,
  lineSizeAttr: _propTypes2.default.string.isRequired,
  valueSizeAttr: _propTypes2.default.string.isRequired
});

BarSeriesCanvas.propTypes = _extends({}, _abstractSeries2.default.propTypes);

exports.default = BarSeriesCanvas;