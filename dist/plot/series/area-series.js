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

var _d3Shape = require('d3-shape');

var d3Shape = _interopRequireWildcard(_d3Shape);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _theme = require('../../theme');

var _seriesUtils = require('../../utils/series-utils');

var _reactUtils = require('../../utils/react-utils');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line';

var AreaSeries = function (_AbstractSeries) {
  _inherits(AreaSeries, _AbstractSeries);

  function AreaSeries() {
    _classCallCheck(this, AreaSeries);

    return _possibleConstructorReturn(this, (AreaSeries.__proto__ || Object.getPrototypeOf(AreaSeries)).apply(this, arguments));
  }

  _createClass(AreaSeries, [{
    key: '_renderArea',
    value: function _renderArea(data, x, y0, y, curve, getNull) {
      var area = d3Shape.area();
      if (curve !== null) {
        if (typeof curve === 'string' && d3Shape[curve]) {
          area = area.curve(d3Shape[curve]);
        } else if (typeof curve === 'function') {
          area = area.curve(curve);
        }
      }
      area = area.defined(getNull);
      area = area.x(x).y0(y0).y1(y);
      return area(data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          animation = _props.animation,
          className = _props.className,
          curve = _props.curve,
          data = _props.data,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          style = _props.style;


      if (this.props.nullAccessor) {
        (0, _reactUtils.warning)('nullAccessor has been renamed to getNull', true);
      }

      if (!data) {
        return null;
      }

      if (animation) {
        return _react2.default.createElement(
          _animation2.default,
          _extends({}, this.props, { animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS }),
          _react2.default.createElement(AreaSeries, _extends({}, this.props, { animation: null }))
        );
      }

      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      var y0 = this._getAttr0Functor('y');
      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');
      var fill = this._getAttributeValue('fill') || this._getAttributeValue('color');
      var newOpacity = this._getAttributeValue('opacity');
      var opacity = Number.isFinite(newOpacity) ? newOpacity : _theme.DEFAULT_OPACITY;
      var getNull = this.props.nullAccessor || this.props.getNull;
      var d = this._renderArea(data, x, y0, y, curve, getNull);

      return _react2.default.createElement('path', {
        d: d,
        className: predefinedClassName + ' ' + className,
        transform: 'translate(' + marginLeft + ',' + marginTop + ')',
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        style: _extends({
          opacity: opacity,
          stroke: stroke,
          fill: fill
        }, style)
      });
    }
  }]);

  return AreaSeries;
}(_abstractSeries2.default);

AreaSeries.displayName = 'AreaSeries';
AreaSeries.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  getNull: _propTypes2.default.func
});
AreaSeries.defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  getNull: function getNull() {
    return true;
  }
});

exports.default = AreaSeries;