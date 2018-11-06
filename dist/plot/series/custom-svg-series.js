'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Copyright (c) 2017 Uber Technologies, Inc.
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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--custom-svg-wrapper';

var DEFAULT_STYLE = {
  stroke: 'blue',
  fill: 'blue'
};

function predefinedComponents(type) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STYLE;

  switch (type) {
    case 'diamond':
      return _react2.default.createElement('polygon', {
        style: style,
        points: '0 0 ' + size / 2 + ' ' + size / 2 + ' 0 ' + size + ' ' + -size / 2 + ' ' + size / 2 + ' 0 0'
      });
    case 'star':
      var starPoints = [].concat(_toConsumableArray(new Array(5))).map(function (c, index) {
        var angle = index / 5 * Math.PI * 2;
        var innerAngle = angle + Math.PI / 10;
        var outerAngle = angle - Math.PI / 10;
        // ratio of inner polygon to outer polgyon
        var innerRadius = size / 2.61;
        return '\n        ' + Math.cos(outerAngle) * size + ' ' + Math.sin(outerAngle) * size + '\n        ' + Math.cos(innerAngle) * innerRadius + ' ' + Math.sin(innerAngle) * innerRadius + '\n      ';
      }).join(' ');
      return _react2.default.createElement('polygon', {
        points: starPoints,
        x: '0',
        y: '0',
        height: size,
        width: size,
        style: style
      });
    case 'square':
      return _react2.default.createElement('rect', {
        x: '' + -size / 2,
        y: '' + -size / 2,
        height: size,
        width: size,
        style: style
      });
    default:
    case 'circle':
      return _react2.default.createElement('circle', { cx: '0', cy: '0', r: size / 2, style: style });
  }
}

function getInnerComponent(_ref) {
  var customComponent = _ref.customComponent,
      defaultType = _ref.defaultType,
      positionInPixels = _ref.positionInPixels,
      positionFunctions = _ref.positionFunctions,
      style = _ref.style,
      propsSize = _ref.propsSize;
  var size = customComponent.size;

  var aggStyle = _extends({}, style, customComponent.style || {});
  var innerComponent = customComponent.customComponent;
  if (!innerComponent && typeof defaultType === 'string') {
    return predefinedComponents(defaultType, size || propsSize, aggStyle);
  }
  // if default component is a function
  if (!innerComponent) {
    return defaultType(customComponent, positionInPixels, aggStyle);
  }
  if (typeof innerComponent === 'string') {
    return predefinedComponents(innerComponent || defaultType, size, aggStyle);
  }
  // if inner component is a function
  return innerComponent(customComponent, positionInPixels, aggStyle);
}

var CustomSVGSeries = function (_AbstractSeries) {
  _inherits(CustomSVGSeries, _AbstractSeries);

  function CustomSVGSeries() {
    _classCallCheck(this, CustomSVGSeries);

    return _possibleConstructorReturn(this, (CustomSVGSeries.__proto__ || Object.getPrototypeOf(CustomSVGSeries)).apply(this, arguments));
  }

  _createClass(CustomSVGSeries, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          customComponent = _props.customComponent,
          data = _props.data,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          style = _props.style,
          size = _props.size;


      if (!data || !innerWidth || !innerHeight) {
        return null;
      }

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(CustomSVGSeries, _extends({}, this.props, { animation: false }))
        );
      }

      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      var contents = data.map(function (seriesComponent, index) {
        var positionInPixels = {
          x: x({ x: seriesComponent.x }),
          y: y({ y: seriesComponent.y })
        };
        var innerComponent = getInnerComponent({
          customComponent: seriesComponent,
          positionInPixels: positionInPixels,
          defaultType: customComponent,
          positionFunctions: { x: x, y: y },
          style: style,
          propsSize: size
        });
        return _react2.default.createElement(
          'g',
          {
            className: 'rv-xy-plot__series--custom-svg',
            key: 'rv-xy-plot__series--custom-svg-' + index,
            transform: 'translate(' + positionInPixels.x + ',' + positionInPixels.y + ')',
            onMouseEnter: function onMouseEnter(e) {
              return _this2._valueMouseOverHandler(seriesComponent, e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2._valueMouseOutHandler(seriesComponent, e);
            }
          },
          innerComponent
        );
      });
      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          transform: 'translate(' + marginLeft + ',' + marginTop + ')'
        },
        contents
      );
    }
  }]);

  return CustomSVGSeries;
}(_abstractSeries2.default);

CustomSVGSeries.propTypes = {
  animation: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  customComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
    y: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired
  })).isRequired,
  marginLeft: _propTypes2.default.number,
  marginTop: _propTypes2.default.number,
  style: _propTypes2.default.object,
  size: _propTypes2.default.number,
  onValueMouseOver: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func
};

CustomSVGSeries.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  animation: false,
  customComponent: 'circle',
  style: {},
  size: 2
});

exports.default = CustomSVGSeries;