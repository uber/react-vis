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

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _seriesUtils = require('../../utils/series-utils');

var _theme = require('../../theme');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--whisker';
var DEFAULT_STROKE_WIDTH = 1;
var DEFAULT_CROSS_BAR_WIDTH = 6;

/**
 * Render whisker lines for a data point.
 * @param {Object} whiskerMarkProps All the properties of the whisker mark.
 * @private
 */
var renderWhiskerMark = function renderWhiskerMark(whiskerMarkProps) {
  return function (d, i) {
    var crossBarWidth = whiskerMarkProps.crossBarWidth,
        opacityFunctor = whiskerMarkProps.opacityFunctor,
        sizeFunctor = whiskerMarkProps.sizeFunctor,
        strokeFunctor = whiskerMarkProps.strokeFunctor,
        strokeWidth = whiskerMarkProps.strokeWidth,
        style = whiskerMarkProps.style,
        valueClickHandler = whiskerMarkProps.valueClickHandler,
        valueMouseOutHandler = whiskerMarkProps.valueMouseOutHandler,
        valueMouseOverHandler = whiskerMarkProps.valueMouseOverHandler,
        valueRightClickHandler = whiskerMarkProps.valueRightClickHandler,
        xFunctor = whiskerMarkProps.xFunctor,
        yFunctor = whiskerMarkProps.yFunctor;


    var r = sizeFunctor ? sizeFunctor(d) : 0;
    var cx = xFunctor(d);
    var cy = yFunctor(d);
    var positiveXVariance = xFunctor({ x: d.x + d.xVariance / 2 });
    var negativeXVariance = xFunctor({ x: d.x - d.xVariance / 2 });
    var positiveYVariance = yFunctor({ y: d.y + d.yVariance / 2 });
    var negativeYVariance = yFunctor({ y: d.y - d.yVariance / 2 });
    /**
     * Determine whether on not we should draw whiskers in each direction.
     * We need to see an actual variance value, and also have that value extend past the
     * radius "buffer" region in which we won't be drawing (if any).
     */
    var hasXWhiskers = positiveXVariance && cx + r < positiveXVariance;
    var hasYWhiskers = positiveYVariance && cy - r > positiveYVariance;
    if (!hasXWhiskers && !hasYWhiskers) {
      return null;
    }

    var styleAttr = _extends({
      opacity: opacityFunctor ? opacityFunctor(d) : _theme.DEFAULT_OPACITY,
      stroke: strokeFunctor && strokeFunctor(d),
      strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
    }, style);
    var crossBarExtension = crossBarWidth / 2;

    var rightLineAttrs = {
      x1: cx + r,
      y1: cy,
      x2: positiveXVariance,
      y2: cy,
      style: styleAttr
    };
    var leftLineAttrs = {
      x1: cx - r,
      y1: cy,
      x2: negativeXVariance,
      y2: cy,
      style: styleAttr
    };
    var rightCrossBarAttrs = {
      x1: positiveXVariance,
      y1: cy - crossBarExtension,
      x2: positiveXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };
    var leftCrossBarAttrs = {
      x1: negativeXVariance,
      y1: cy - crossBarExtension,
      x2: negativeXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };

    var upperLineAttrs = {
      x1: cx,
      y1: cy - r,
      x2: cx,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerLineAttrs = {
      x1: cx,
      y1: cy + r,
      x2: cx,
      y2: negativeYVariance,
      style: styleAttr
    };
    var upperCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: positiveYVariance,
      x2: cx + crossBarExtension,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: negativeYVariance,
      x2: cx + crossBarExtension,
      y2: negativeYVariance,
      style: styleAttr
    };

    return _react2.default.createElement(
      'g',
      {
        className: 'mark-whiskers',
        key: i,
        onClick: function onClick(e) {
          return valueClickHandler(d, e);
        },
        onContextMenu: function onContextMenu(e) {
          return valueRightClickHandler(d, e);
        },
        onMouseOver: function onMouseOver(e) {
          return valueMouseOverHandler(d, e);
        },
        onMouseOut: function onMouseOut(e) {
          return valueMouseOutHandler(d, e);
        }
      },
      hasXWhiskers ? _react2.default.createElement(
        'g',
        { className: 'x-whiskers' },
        _react2.default.createElement('line', rightLineAttrs),
        _react2.default.createElement('line', leftLineAttrs),
        _react2.default.createElement('line', rightCrossBarAttrs),
        _react2.default.createElement('line', leftCrossBarAttrs)
      ) : null,
      hasYWhiskers ? _react2.default.createElement(
        'g',
        { className: 'y-whiskers' },
        _react2.default.createElement('line', upperLineAttrs),
        _react2.default.createElement('line', lowerLineAttrs),
        _react2.default.createElement('line', upperCrossBarAttrs),
        _react2.default.createElement('line', lowerCrossBarAttrs)
      ) : null
    );
  };
};

var WhiskerSeries = function (_AbstractSeries) {
  _inherits(WhiskerSeries, _AbstractSeries);

  function WhiskerSeries() {
    _classCallCheck(this, WhiskerSeries);

    return _possibleConstructorReturn(this, (WhiskerSeries.__proto__ || Object.getPrototypeOf(WhiskerSeries)).apply(this, arguments));
  }

  _createClass(WhiskerSeries, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          crossBarWidth = _props.crossBarWidth,
          data = _props.data,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          strokeWidth = _props.strokeWidth,
          style = _props.style;

      if (!data) {
        return null;
      }
      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(WhiskerSeries, _extends({}, this.props, { animation: null }))
        );
      }

      var whiskerMarkProps = {
        crossBarWidth: crossBarWidth,
        opacityFunctor: this._getAttributeFunctor('opacity'),
        sizeFunctor: this._getAttributeFunctor('size'),
        strokeFunctor: this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color'),
        strokeWidth: strokeWidth,
        style: style,
        xFunctor: this._getAttributeFunctor('x'),
        yFunctor: this._getAttributeFunctor('y'),
        valueClickHandler: this._valueClickHandler,
        valueRightClickHandler: this._valueRightClickHandler,
        valueMouseOverHandler: this._valueMouseOverHandler,
        valueMouseOutHandler: this._valueMouseOutHandler
      };

      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')'
        },
        data.map(renderWhiskerMark(whiskerMarkProps))
      );
    }
  }]);

  return WhiskerSeries;
}(_abstractSeries2.default);

WhiskerSeries.displayName = 'WhiskerSeries';
WhiskerSeries.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  strokeWidth: _propTypes2.default.number
});
WhiskerSeries.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  crossBarWidth: DEFAULT_CROSS_BAR_WIDTH,
  size: 0,
  strokeWidth: DEFAULT_STROKE_WIDTH
});
exports.default = WhiskerSeries;