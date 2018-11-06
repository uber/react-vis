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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Voronoi = require('d3-voronoi');

var _react = require('react');

var _animation = require('../../animation');

var _scalesUtils = require('../../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, (0, _scalesUtils.getScalePropTypesByAttribute)('x'), (0, _scalesUtils.getScalePropTypesByAttribute)('y'), (0, _scalesUtils.getScalePropTypesByAttribute)('size'), (0, _scalesUtils.getScalePropTypesByAttribute)('opacity'), (0, _scalesUtils.getScalePropTypesByAttribute)('color'), {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  data: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])),
  onValueMouseOver: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func,
  onValueClick: _propTypes2.default.func,
  onValueRightClick: _propTypes2.default.func,
  onSeriesMouseOver: _propTypes2.default.func,
  onSeriesMouseOut: _propTypes2.default.func,
  onSeriesClick: _propTypes2.default.func,
  onSeriesRightClick: _propTypes2.default.func,
  onNearestX: _propTypes2.default.func,
  onNearestXY: _propTypes2.default.func,
  style: _propTypes2.default.object,
  animation: _animation.AnimationPropType,
  stack: _propTypes2.default.bool
});

var defaultProps = {
  className: '',
  stack: false,
  style: {}
};

var AbstractSeries = function (_PureComponent) {
  _inherits(AbstractSeries, _PureComponent);

  function AbstractSeries() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AbstractSeries);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractSeries.__proto__ || Object.getPrototypeOf(AbstractSeries)).call.apply(_ref, [this].concat(args))), _this), _this._seriesClickHandler = function (event) {
      var onSeriesClick = _this.props.onSeriesClick;

      if (onSeriesClick) {
        onSeriesClick({ event: event });
      }
    }, _this._seriesMouseOutHandler = function (event) {
      var onSeriesMouseOut = _this.props.onSeriesMouseOut;

      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event: event });
      }
    }, _this._seriesMouseOverHandler = function (event) {
      var onSeriesMouseOver = _this.props.onSeriesMouseOver;

      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event: event });
      }
    }, _this._seriesRightClickHandler = function (event) {
      var onSeriesRightClick = _this.props.onSeriesRightClick;

      if (onSeriesRightClick) {
        onSeriesRightClick({ event: event });
      }
    }, _this._valueClickHandler = function (d, event) {
      var _this$props = _this.props,
          onValueClick = _this$props.onValueClick,
          onSeriesClick = _this$props.onSeriesClick;

      if (onValueClick) {
        onValueClick(d, { event: event });
      }
      if (onSeriesClick) {
        onSeriesClick({ event: event });
      }
    }, _this._valueMouseOutHandler = function (d, event) {
      var _this$props2 = _this.props,
          onValueMouseOut = _this$props2.onValueMouseOut,
          onSeriesMouseOut = _this$props2.onSeriesMouseOut;

      if (onValueMouseOut) {
        onValueMouseOut(d, { event: event });
      }
      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event: event });
      }
    }, _this._valueMouseOverHandler = function (d, event) {
      var _this$props3 = _this.props,
          onValueMouseOver = _this$props3.onValueMouseOver,
          onSeriesMouseOver = _this$props3.onSeriesMouseOver;

      if (onValueMouseOver) {
        onValueMouseOver(d, { event: event });
      }
      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event: event });
      }
    }, _this._valueRightClickHandler = function (d, event) {
      var _this$props4 = _this.props,
          onValueRightClick = _this$props4.onValueRightClick,
          onSeriesRightClick = _this$props4.onSeriesRightClick;

      if (onValueRightClick) {
        onValueRightClick(d, { event: event });
      }
      if (onSeriesRightClick) {
        onSeriesRightClick({ event: event });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AbstractSeries, [{
    key: 'onParentMouseMove',
    value: function onParentMouseMove(event) {
      var _props = this.props,
          onNearestX = _props.onNearestX,
          onNearestXY = _props.onNearestXY,
          data = _props.data;

      if (!onNearestX && !onNearestXY || !data) {
        return;
      }
      if (onNearestXY) {
        this._handleNearestXY(event);
      } else {
        this._handleNearestX(event);
      }
    }
  }, {
    key: 'onParentTouchMove',
    value: function onParentTouchMove(e) {
      e.preventDefault();
      this.onParentMouseMove(e);
    }
  }, {
    key: 'onParentTouchStart',
    value: function onParentTouchStart(e) {
      // prevent mouse event emulation
      e.preventDefault();
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
     * Get attribute functor.
     * @param {string} attr Attribute name
     * @returns {*} Functor.
     * @protected
     */

  }, {
    key: '_getAttributeFunctor',
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
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
  }, {
    key: '_getXYCoordinateInContainer',
    value: function _getXYCoordinateInContainer(event) {
      var _props2 = this.props,
          _props2$marginTop = _props2.marginTop,
          marginTop = _props2$marginTop === undefined ? 0 : _props2$marginTop,
          _props2$marginLeft = _props2.marginLeft,
          marginLeft = _props2$marginLeft === undefined ? 0 : _props2$marginLeft;
      var evt = event.nativeEvent,
          currentTarget = event.currentTarget;

      var rect = currentTarget.getBoundingClientRect();
      var x = evt.clientX;
      var y = evt.clientY;
      if (evt.type === 'touchmove') {
        x = evt.touches[0].pageX;
        y = evt.touches[0].pageY;
      }
      return {
        x: x - rect.left - currentTarget.clientLeft - marginLeft,
        y: y - rect.top - currentTarget.clientTop - marginTop
      };
    }
  }, {
    key: '_handleNearestX',
    value: function _handleNearestX(event) {
      var _props3 = this.props,
          onNearestX = _props3.onNearestX,
          data = _props3.data;

      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;
      var valueIndex = null;

      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor('x');

      data.forEach(function (item, i) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate.x - currentCoordinate);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
          valueIndex = i;
        }
      });
      if (!value) {
        return;
      }
      onNearestX(value, {
        innerX: xScaleFn(value),
        index: valueIndex,
        event: event.nativeEvent
      });
    }
  }, {
    key: '_handleNearestXY',
    value: function _handleNearestXY(event) {
      var _props4 = this.props,
          onNearestXY = _props4.onNearestXY,
          data = _props4.data;


      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor('x');
      var yScaleFn = this._getAttributeFunctor('y');

      // Create a voronoi with each node center points
      var voronoiInstance = (0, _d3Voronoi.voronoi)().x(xScaleFn).y(yScaleFn);

      var foundPoint = voronoiInstance(data).find(coordinate.x, coordinate.y);
      var value = foundPoint.data;

      if (!value) {
        return;
      }
      onNearestXY(value, {
        innerX: foundPoint.x,
        innerY: foundPoint.y,
        index: foundPoint.index,
        event: event.nativeEvent
      });
    }

    /**
     * Click handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Mouse out handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Mouse over handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Right Click handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Click handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Mouse out handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Mouse over handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */


    /**
     * Right Click handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */

  }], [{
    key: 'getParentConfig',

    /**
     * Get a default config for the parent.
     * @returns {Object} Empty config.
     */
    value: function getParentConfig() {
      return {};
    }

    /**
     * Tells the rest of the world that it requires SVG to work.
     * @returns {boolean} Result.
     */

  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return AbstractSeries;
}(_react.PureComponent);

AbstractSeries.displayName = 'AbstractSeries';
AbstractSeries.propTypes = propTypes;
AbstractSeries.defaultProps = defaultProps;

exports.default = AbstractSeries;