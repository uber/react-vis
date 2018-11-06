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

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _seriesUtils = require('../../utils/series-utils');

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--label';

var getTextAnchor = function getTextAnchor(labelAnchorX, leftOfMiddle) {
  return labelAnchorX ? labelAnchorX : leftOfMiddle ? 'start' : 'end';
};
var getAlignmentBaseline = function getAlignmentBaseline(labelAnchorY, aboveMiddle) {
  return labelAnchorY ? labelAnchorY : aboveMiddle ? 'text-before-edge' : 'text-after-edge';
};

var LabelSeries = function (_AbstractSeries) {
  _inherits(LabelSeries, _AbstractSeries);

  function LabelSeries() {
    _classCallCheck(this, LabelSeries);

    return _possibleConstructorReturn(this, (LabelSeries.__proto__ || Object.getPrototypeOf(LabelSeries)).apply(this, arguments));
  }

  _createClass(LabelSeries, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          animation = _props.animation,
          allowOffsetToBeReversed = _props.allowOffsetToBeReversed,
          className = _props.className,
          data = _props.data,
          _data = _props._data,
          getLabel = _props.getLabel,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          rotation = _props.rotation,
          style = _props.style,
          xRange = _props.xRange,
          yRange = _props.yRange,
          labelAnchorX = _props.labelAnchorX,
          labelAnchorY = _props.labelAnchorY;

      if (!data) {
        return null;
      }

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(LabelSeries, _extends({}, this.props, { animation: null, _data: data }))
        );
      }

      var xFunctor = this._getAttributeFunctor('x');
      var yFunctor = this._getAttributeFunctor('y');

      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')',
          style: style
        },
        data.reduce(function (res, d, i) {
          var markStyle = d.style,
              xOffset = d.xOffset,
              yOffset = d.yOffset;

          if (!getLabel(d)) {
            return res;
          }
          var xVal = xFunctor(d);
          var yVal = yFunctor(d);
          var leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
          var aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;

          var x = xVal + (allowOffsetToBeReversed && leftOfMiddle ? -1 : 1) * (xOffset || 0);
          var y = yVal + (allowOffsetToBeReversed && aboveMiddle ? -1 : 1) * (yOffset || 0);

          var hasRotationValueSet = d.rotation === 0 || d.rotation;
          var labelRotation = hasRotationValueSet ? d.rotation : rotation;
          var attrs = _extends({
            alignmentBaseline: getAlignmentBaseline(labelAnchorY, aboveMiddle),
            className: 'rv-xy-plot__series--label-text',
            key: i,
            onClick: function onClick(e) {
              return _this2._valueClickHandler(d, e);
            },
            onContextMenu: function onContextMenu(e) {
              return _this2._valueRightClickHandler(d, e);
            },
            onMouseOver: function onMouseOver(e) {
              return _this2._valueMouseOverHandler(d, e);
            },
            onMouseOut: function onMouseOut(e) {
              return _this2._valueMouseOutHandler(d, e);
            },
            textAnchor: getTextAnchor(labelAnchorX, leftOfMiddle),
            x: x,
            y: y,
            transform: 'rotate(' + labelRotation + ',' + x + ',' + y + ')'
          }, markStyle);
          var textContent = getLabel(_data ? _data[i] : d);
          return res.concat([_react2.default.createElement(
            'text',
            attrs,
            textContent
          )]);
        }, [])
      );
    }
  }]);

  return LabelSeries;
}(_abstractSeries2.default);

LabelSeries.propTypes = {
  animation: _propTypes2.default.bool,
  allowOffsetToBeReversed: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    y: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    angle: _propTypes2.default.number,
    radius: _propTypes2.default.number,
    label: _propTypes2.default.string,
    xOffset: _propTypes2.default.number,
    yOffset: _propTypes2.default.number,
    style: _propTypes2.default.object
  })).isRequired,
  marginLeft: _propTypes2.default.number,
  marginTop: _propTypes2.default.number,
  rotation: _propTypes2.default.number,
  style: _propTypes2.default.object,
  xRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  yRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  labelAnchorX: _propTypes2.default.string,
  labelAnchorY: _propTypes2.default.string
};
LabelSeries.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  animation: false,
  rotation: 0,
  getLabel: function getLabel(d) {
    return d.label;
  }
});
LabelSeries.displayName = 'LabelSeries';
exports.default = LabelSeries;