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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvYWJzdHJhY3Qtc2VyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsYzs7Ozs7d0JBRUk7QUFDckIsMEJBQ0ssK0NBQTZCLEdBQTdCLENBREwsRUFFSywrQ0FBNkIsR0FBN0IsQ0FGTCxFQUdLLCtDQUE2QixNQUE3QixDQUhMLEVBSUssK0NBQTZCLFNBQTdCLENBSkwsRUFLSywrQ0FBNkIsT0FBN0IsQ0FMTDtBQU1FLGVBQU8sZ0JBQU0sU0FBTixDQUFnQixNQU56QjtBQU9FLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFQMUI7QUFRRSxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsS0FSeEI7QUFTRSwwQkFBa0IsZ0JBQU0sU0FBTixDQUFnQixJQVRwQztBQVVFLHlCQUFpQixnQkFBTSxTQUFOLENBQWdCLElBVm5DO0FBV0Usc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixJQVhoQztBQVlFLDJCQUFtQixnQkFBTSxTQUFOLENBQWdCLElBWnJDO0FBYUUsMEJBQWtCLGdCQUFNLFNBQU4sQ0FBZ0IsSUFicEM7QUFjRSx1QkFBZSxnQkFBTSxTQUFOLENBQWdCLElBZGpDO0FBZUUsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixJQWY5QjtBQWdCRTtBQWhCRjtBQWtCRDs7O0FBRUQsMEJBQVksS0FBWixFQUFtQjtBQUFBOzs7Ozs7OztBQUFBLGtHQUNYLEtBRFc7O0FBUWpCLFVBQUssVUFBTCxHQUFrQixNQUFLLGlCQUFMLENBQXVCLElBQXZCLFFBQWtDLEtBQWxDLENBQWxCOzs7Ozs7O0FBT0EsVUFBSyxtQkFBTCxHQUEyQixNQUFLLGlCQUFMLENBQXVCLElBQXZCLFFBQWtDLElBQWxDLENBQTNCOzs7Ozs7O0FBT0EsVUFBSyxTQUFMLEdBQWlCLE1BQUssZ0JBQUwsQ0FB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LElBQTRDLFVBQS9EO0FBQ0EsVUFBTSxXQUFXLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsQ0FBakI7O0FBRUEsV0FBSyxPQUFMLENBQWEsZ0JBQVE7QUFDbkIsWUFBTSxvQkFBb0IsU0FBUyxJQUFULENBQTFCO0FBQ0EsWUFBTSxjQUFjLEtBQUssR0FBTCxDQUFTLGFBQWEsaUJBQXRCLENBQXBCO0FBQ0EsWUFBSSxjQUFjLFdBQWxCLEVBQStCO0FBQzdCLHdCQUFjLFdBQWQ7QUFDQSxrQkFBUSxJQUFSO0FBQ0Q7QUFDRixPQVBEO0FBUUEsVUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWO0FBQ0Q7QUFDRCxpQkFBVyxLQUFYLEVBQWtCO0FBQ2hCLGdCQUFRLFNBQVMsS0FBVCxDQURRO0FBRWhCLGVBQU8sTUFBTTtBQUZHLE9BQWxCO0FBSUQ7Ozs7Ozs7OztzQ0FwRndCO0FBQ3ZCLGFBQU8sRUFBUDtBQUNEOzs7d0JBVndCO0FBQ3ZCLGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBM0hrQixjIiwiZmlsZSI6ImFic3RyYWN0LXNlcmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZDNTZWxlY3Rpb24gZnJvbSAnZDMtc2VsZWN0aW9uJztcblxuaW1wb3J0IFB1cmVSZW5kZXJDb21wb25lbnQgZnJvbSAnLi4vLi4vcHVyZS1yZW5kZXItY29tcG9uZW50JztcbmltcG9ydCB7XG4gIGdldEF0dHJpYnV0ZUZ1bmN0b3IsXG4gIGdldEF0dHIwRnVuY3RvcixcbiAgZ2V0QXR0cmlidXRlVmFsdWUsXG4gIGdldFNjYWxlT2JqZWN0RnJvbVByb3BzLFxuICBnZXRTY2FsZVByb3BUeXBlc0J5QXR0cmlidXRlfSBmcm9tICcuLi8uLi91dGlscy9zY2FsZXMtdXRpbHMnO1xuXG5pbXBvcnQge0FuaW1hdGlvblByb3BUeXBlLCBhcHBseVRyYW5zaXRpb259IGZyb20gJy4uLy4uL3V0aWxzL2FuaW1hdGlvbi11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0U2VyaWVzIGV4dGVuZHMgUHVyZVJlbmRlckNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ3gnKSxcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ3knKSxcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ3NpemUnKSxcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ29wYWNpdHknKSxcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ2NvbG9yJyksXG4gICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICAgIG9uVmFsdWVNb3VzZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25WYWx1ZU1vdXNlT3V0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uVmFsdWVDbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvblNlcmllc01vdXNlT3ZlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvblNlcmllc01vdXNlT3V0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uU2VyaWVzQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25OZWFyZXN0WDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBhbmltYXRpb246IEFuaW1hdGlvblByb3BUeXBlXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgLyoqXG4gICAgICogTW91c2Ugb3ZlciBoYW5kbGVyIGZvciB0aGUgc2VyaWVzIHdpdGhvdXQgc2luZ2xlIHZhbHVlcy5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX21vdXNlT3ZlciA9IHRoaXMuX21vdXNlT3ZlckhhbmRsZXIuYmluZCh0aGlzLCBmYWxzZSk7XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBvdmVyIGhhbmRsZXIgZm9yIHRoZSBzZXJpZXMgKip3aXRoKiogc2luZ2xlIHZhbHVlcy5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX21vdXNlT3ZlcldpdGhWYWx1ZSA9IHRoaXMuX21vdXNlT3ZlckhhbmRsZXIuYmluZCh0aGlzLCB0cnVlKTtcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIG91dCBoYW5kbGVyIGZvciB0aGUgc2VyaWVzIHdpdGhvdXQgc2luZ2xlIHZhbHVlcy5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX21vdXNlT3V0ID0gdGhpcy5fbW91c2VPdXRIYW5kbGVyLmJpbmQodGhpcywgZmFsc2UpO1xuXG4gICAgLyoqXG4gICAgICogTW91c2Ugb3V0IGhhbmRsZXIgZm9yIHRoZSBzZXJpZXMgKip3aXRoKiogc2luZ2xlIHZhbHVlcy5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX21vdXNlT3V0V2l0aFZhbHVlID0gdGhpcy5fbW91c2VPdXRIYW5kbGVyLmJpbmQodGhpcywgdHJ1ZSk7XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBoYW5kbGVyIGZvciB0aGUgc2VyaWVzIHdpdGhvdXQgc2luZ2xlIHZhbHVlcy5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX2NsaWNrID0gdGhpcy5fY2xpY2tIYW5kbGVyLmJpbmQodGhpcywgZmFsc2UpO1xuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgaGFuZGxlciBmb3IgdGhlIHNlcmllcyAqKndpdGgqKiBzaW5nbGUgdmFsdWVzLlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdGhpcy5fY2xpY2tXaXRoVmFsdWUgPSB0aGlzLl9jbGlja0hhbmRsZXIuYmluZCh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3VzZSBvdmVyIGhhbmRsZXIgZm9yIGFsbCBzZXJpZXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlVmFsdWUgVXNlIHZhbHVlIGhhbmRsZXIgaWYgdHJ1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGQgVmFsdWUgb2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbW91c2VPdmVySGFuZGxlcih1c2VWYWx1ZSwgZCkge1xuICAgIGNvbnN0IHtvblZhbHVlTW91c2VPdmVyLCBvblNlcmllc01vdXNlT3Zlcn0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh1c2VWYWx1ZSAmJiBvblZhbHVlTW91c2VPdmVyKSB7XG4gICAgICBvblZhbHVlTW91c2VPdmVyKGQsIHtldmVudDogZDNTZWxlY3Rpb24uZXZlbnR9KTtcbiAgICB9XG4gICAgaWYgKG9uU2VyaWVzTW91c2VPdmVyKSB7XG4gICAgICBvblNlcmllc01vdXNlT3Zlcih7ZXZlbnQ6IGQzU2VsZWN0aW9uLmV2ZW50fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdXNlIG91dCBoYW5kbGVyIGZvciBhbGwgc2VyaWVzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVZhbHVlIFVzZSB2YWx1ZSBoYW5kbGVyIGlmIHRydWUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkIFZhbHVlIG9iamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21vdXNlT3V0SGFuZGxlcih1c2VWYWx1ZSwgZCkge1xuICAgIGNvbnN0IHtvblZhbHVlTW91c2VPdXQsIG9uU2VyaWVzTW91c2VPdXR9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodXNlVmFsdWUgJiYgb25WYWx1ZU1vdXNlT3V0KSB7XG4gICAgICBvblZhbHVlTW91c2VPdXQoZCwge2V2ZW50OiBkM1NlbGVjdGlvbi5ldmVudH0pO1xuICAgIH1cbiAgICBpZiAob25TZXJpZXNNb3VzZU91dCkge1xuICAgICAgb25TZXJpZXNNb3VzZU91dCh7ZXZlbnQ6IGQzU2VsZWN0aW9uLmV2ZW50fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsaWNrIGhhbmRsZXIgZm9yIGFsbCBzZXJpZXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlVmFsdWUgVXNlIHZhbHVlIGhhbmRsZXIgaWYgdHJ1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGQgVmFsdWUgb2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2xpY2tIYW5kbGVyKHVzZVZhbHVlLCBkKSB7XG4gICAgY29uc3Qge29uVmFsdWVDbGljaywgb25TZXJpZXNDbGlja30gPSB0aGlzLnByb3BzO1xuICAgIGlmICh1c2VWYWx1ZSAmJiBvblZhbHVlQ2xpY2spIHtcbiAgICAgIG9uVmFsdWVDbGljayhkLCB7ZXZlbnQ6IGQzU2VsZWN0aW9uLmV2ZW50fSk7XG4gICAgfVxuICAgIGlmIChvblNlcmllc0NsaWNrKSB7XG4gICAgICBvblNlcmllc0NsaWNrKHtldmVudDogZDNTZWxlY3Rpb24uZXZlbnR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgdGhlIHJlc3Qgb2YgdGhlIHdvcmxkIHRoYXQgaXQgcmVxdWlyZXMgU1ZHIHRvIHdvcmsuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXN1bHQuXG4gICAqL1xuICBzdGF0aWMgZ2V0IHJlcXVpcmVzU1ZHKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgcGFyZW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBFbXB0eSBjb25maWcuXG4gICAqL1xuICBzdGF0aWMgZ2V0UGFyZW50Q29uZmlnKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYXR0cmlidXRlIGZ1bmN0b3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIEF0dHJpYnV0ZSBuYW1lXG4gICAqIEByZXR1cm5zIHsqfSBGdW5jdG9yLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfZ2V0QXR0cmlidXRlRnVuY3RvcihhdHRyKSB7XG4gICAgcmV0dXJuIGdldEF0dHJpYnV0ZUZ1bmN0b3IodGhpcy5wcm9wcywgYXR0cik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhdHRyMCBmdW5jdG9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICogQHJldHVybnMgeyp9IEZ1bmN0b3IuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0QXR0cjBGdW5jdG9yKGF0dHIpIHtcbiAgICByZXR1cm4gZ2V0QXR0cjBGdW5jdG9yKHRoaXMucHJvcHMsIGF0dHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYXR0cmlidXRlIHZhbHVlIGlmIGl0IGlzIGF2YWlsYWJsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAqIEByZXR1cm5zIHsqfSBBdHRyaWJ1dGUgdmFsdWUgaWYgYXZhaWxhYmxlLCBmYWxsYmFjayB2YWx1ZSBvciB1bmRlZmluZWRcbiAgICogb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfZ2V0QXR0cmlidXRlVmFsdWUoYXR0cikge1xuICAgIHJldHVybiBnZXRBdHRyaWJ1dGVWYWx1ZSh0aGlzLnByb3BzLCBhdHRyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNjYWxlIG9iamVjdCBkaXN0YW5jZSBieSB0aGUgYXR0cmlidXRlIGZyb20gdGhlIGxpc3Qgb2YgcHJvcGVydGllcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFNjYWxlIGRpc3RhbmNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfZ2V0U2NhbGVEaXN0YW5jZShhdHRyKSB7XG4gICAgY29uc3Qgc2NhbGVPYmplY3QgPSBnZXRTY2FsZU9iamVjdEZyb21Qcm9wcyh0aGlzLnByb3BzLCBhdHRyKTtcbiAgICByZXR1cm4gc2NhbGVPYmplY3QgPyBzY2FsZU9iamVjdC5kaXN0YW5jZSA6IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdHJhbnNpdGlvbiB0byB0aGUgZWxlbWVudHMgYW5kIHJldHVybiB0aGUgbmV3IGVsZW1lbnRzIGluc3RlYWQuXG4gICAqIEBwYXJhbSB7ZDMuc2VsZWN0aW9ufSBlbGVtZW50cyBFbGVtZW50cy5cbiAgICogQHJldHVybnMge2QzLnNlbGVjdGlvbn0gQW5pbWF0ZWQgZWxlbWVudHMgaWYgYW5pbWF0aW9uIGlzIGF2YWlsYWJsZS5cbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX2FwcGx5VHJhbnNpdGlvbihlbGVtZW50cykge1xuICAgIHJldHVybiBhcHBseVRyYW5zaXRpb24odGhpcy5wcm9wcywgZWxlbWVudHMpO1xuICB9XG5cbiAgb25QYXJlbnRNb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBjb25zdCB7bWFyZ2luTGVmdCA9IDAsIG9uTmVhcmVzdFgsIGRhdGF9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9uTmVhcmVzdFggfHwgIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG1pbkRpc3RhbmNlID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGxldCB2YWx1ZSA9IG51bGw7XG5cbiAgICAvLyBUT0RPKGFudG9uYik6IFdBVD9cbiAgICBkM1NlbGVjdGlvbi5ldmVudCA9IGV2ZW50Lm5hdGl2ZUV2ZW50O1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBkM1NlbGVjdGlvbi5tb3VzZShldmVudC5jdXJyZW50VGFyZ2V0KVswXSAtIG1hcmdpbkxlZnQ7XG4gICAgY29uc3QgeFNjYWxlRm4gPSB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCd4Jyk7XG5cbiAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IHhTY2FsZUZuKGl0ZW0pO1xuICAgICAgY29uc3QgbmV3RGlzdGFuY2UgPSBNYXRoLmFicyhjb29yZGluYXRlIC0gY3VycmVudENvb3JkaW5hdGUpO1xuICAgICAgaWYgKG5ld0Rpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgICAgbWluRGlzdGFuY2UgPSBuZXdEaXN0YW5jZTtcbiAgICAgICAgdmFsdWUgPSBpdGVtO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25OZWFyZXN0WCh2YWx1ZSwge1xuICAgICAgaW5uZXJYOiB4U2NhbGVGbih2YWx1ZSksXG4gICAgICBldmVudDogZXZlbnQubmF0aXZlRXZlbnRcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=