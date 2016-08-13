'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Selection2 = _interopRequireDefault(_d3Selection);

var _pureRenderComponent = require('../../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _scalesUtils = require('../../utils/scales-utils');

var _animationUtils = require('../../utils/animation-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Uber Technologies, Inc.
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

var AbstractSeries = function (_PureRenderComponent) {
  _inherits(AbstractSeries, _PureRenderComponent);

  _createClass(AbstractSeries, null, [{
    key: 'propTypes',
    get: function get() {
      return _extends({}, (0, _scalesUtils.getScalePropTypesByAttribute)('x'), (0, _scalesUtils.getScalePropTypesByAttribute)('y'), (0, _scalesUtils.getScalePropTypesByAttribute)('size'), (0, _scalesUtils.getScalePropTypesByAttribute)('opacity'), (0, _scalesUtils.getScalePropTypesByAttribute)('color'), {
        width: _react2.default.PropTypes.number,
        height: _react2.default.PropTypes.number,
        data: _react2.default.PropTypes.array,
        onValueMouseOver: _react2.default.PropTypes.func,
        onValueMouseOut: _react2.default.PropTypes.func,
        onValueClick: _react2.default.PropTypes.func,
        onSeriesMouseOver: _react2.default.PropTypes.func,
        onSeriesMouseOut: _react2.default.PropTypes.func,
        onSeriesClick: _react2.default.PropTypes.func,
        onNearestX: _react2.default.PropTypes.func,
        animation: _animationUtils.AnimationPropType
      });
    }
  }]);

  function AbstractSeries(props) {
    _classCallCheck(this, AbstractSeries);

    /**
     * Mouse over handler for the series without single values.
     * @type {function}
     * @protected
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractSeries).call(this, props));

    _this._mouseOver = _this._mouseOverHandler.bind(_this, false);

    /**
     * Mouse over handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._mouseOverWithValue = _this._mouseOverHandler.bind(_this, true);

    /**
     * Mouse out handler for the series without single values.
     * @type {function}
     * @protected
     */
    _this._mouseOut = _this._mouseOutHandler.bind(_this, false);

    /**
     * Mouse out handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._mouseOutWithValue = _this._mouseOutHandler.bind(_this, true);

    /**
     * Click handler for the series without single values.
     * @type {function}
     * @protected
     */
    _this._click = _this._clickHandler.bind(_this, false);

    /**
     * Click handler for the series **with** single values.
     * @type {function}
     * @protected
     */
    _this._clickWithValue = _this._clickHandler.bind(_this, true);
    return _this;
  }

  /**
   * Mouse over handler for all series.
   * @param {boolean} useValue Use value handler if true.
   * @param {Object} d Value object
   * @private
   */


  _createClass(AbstractSeries, [{
    key: '_mouseOverHandler',
    value: function _mouseOverHandler(useValue, d) {
      var _props = this.props;
      var onValueMouseOver = _props.onValueMouseOver;
      var onSeriesMouseOver = _props.onSeriesMouseOver;

      if (useValue && onValueMouseOver) {
        onValueMouseOver(d, { event: _d3Selection2.default.event });
      }
      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event: _d3Selection2.default.event });
      }
    }

    /**
     * Mouse out handler for all series.
     * @param {boolean} useValue Use value handler if true.
     * @param {Object} d Value object
     * @private
     */

  }, {
    key: '_mouseOutHandler',
    value: function _mouseOutHandler(useValue, d) {
      var _props2 = this.props;
      var onValueMouseOut = _props2.onValueMouseOut;
      var onSeriesMouseOut = _props2.onSeriesMouseOut;

      if (useValue && onValueMouseOut) {
        onValueMouseOut(d, { event: _d3Selection2.default.event });
      }
      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event: _d3Selection2.default.event });
      }
    }

    /**
     * Click handler for all series.
     * @param {boolean} useValue Use value handler if true.
     * @param {Object} d Value object
     * @private
     */

  }, {
    key: '_clickHandler',
    value: function _clickHandler(useValue, d) {
      var _props3 = this.props;
      var onValueClick = _props3.onValueClick;
      var onSeriesClick = _props3.onSeriesClick;

      if (useValue && onValueClick) {
        onValueClick(d, { event: _d3Selection2.default.event });
      }
      if (onSeriesClick) {
        onSeriesClick({ event: _d3Selection2.default.event });
      }
    }

    /**
     * Tells the rest of the world that it requires SVG to work.
     * @returns {boolean} Result.
     */

  }, {
    key: '_getAttributeFunctor',


    /**
     * Get attribute functor.
     * @param {string} attr Attribute name
     * @returns {*} Functor.
     * @protected
     */
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
    }

    /**
     * Get the attr0 functor.
     * @param {string} attr Attribute name.
     * @returns {*} Functor.
     * @private
     */

  }, {
    key: '_getAttr0Functor',
    value: function _getAttr0Functor(attr) {
      return (0, _scalesUtils.getAttr0Functor)(this.props, attr);
    }

    /**
     * Get the attribute value if it is available.
     * @param {string} attr Attribute name.
     * @returns {*} Attribute value if available, fallback value or undefined
     * otherwise.
     * @protected
     */

  }, {
    key: '_getAttributeValue',
    value: function _getAttributeValue(attr) {
      return (0, _scalesUtils.getAttributeValue)(this.props, attr);
    }

    /**
     * Get the scale object distance by the attribute from the list of properties.
     * @param {string} attr Attribute name.
     * @returns {number} Scale distance.
     * @protected
     */

  }, {
    key: '_getScaleDistance',
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }

    /**
     * Apply transition to the elements and return the new elements instead.
     * @param {d3.selection} elements Elements.
     * @returns {d3.selection} Animated elements if animation is available.
     * @protected
     */

  }, {
    key: '_applyTransition',
    value: function _applyTransition(elements) {
      return (0, _animationUtils.applyTransition)(this.props, elements);
    }
  }, {
    key: 'onParentMouseMove',
    value: function onParentMouseMove(event) {
      var _props4 = this.props;
      var _props4$marginLeft = _props4.marginLeft;
      var marginLeft = _props4$marginLeft === undefined ? 0 : _props4$marginLeft;
      var onNearestX = _props4.onNearestX;
      var data = _props4.data;

      if (!onNearestX || !data) {
        return;
      }
      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;

      // TODO(antonb): WAT?
      _d3Selection2.default.event = event.nativeEvent;
      var coordinate = _d3Selection2.default.mouse(event.currentTarget)[0] - marginLeft;
      var xScaleFn = this._getAttributeFunctor('x');

      data.forEach(function (item) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate - currentCoordinate);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
        }
      });
      if (!value) {
        return;
      }
      onNearestX(value, {
        innerX: xScaleFn(value),
        event: event.nativeEvent
      });
    }
  }], [{
    key: 'getParentConfig',


    /**
     * Get a default config for the parent.
     * @returns {Object} Empty config.
     */
    value: function getParentConfig() {
      return {};
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return AbstractSeries;
}(_pureRenderComponent2.default);

exports.default = AbstractSeries;