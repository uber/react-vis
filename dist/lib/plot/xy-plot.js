'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _seriesUtils = require('../utils/series-utils');

var _chartUtils = require('../utils/chart-utils');

var _theme = require('../theme');

var _animationUtils = require('../utils/animation-utils');

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

var ATTRIBUTES = ['x', 'y', 'color', 'fill', 'stroke', 'opacity', 'size'];

var XYPlot = function (_React$Component) {
  _inherits(XYPlot, _React$Component);

  _createClass(XYPlot, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        margin: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.shape({
          left: _react2.default.PropTypes.number,
          top: _react2.default.PropTypes.number,
          right: _react2.default.PropTypes.number,
          bottom: _react2.default.PropTypes.number
        }), _react2.default.PropTypes.number]),
        onMouseLeave: _react2.default.PropTypes.func,
        onMouseMove: _react2.default.PropTypes.func,
        onMouseEnter: _react2.default.PropTypes.func,
        animation: _animationUtils.AnimationPropType,
        stackBy: _react2.default.PropTypes.oneOf(ATTRIBUTES)
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        margin: {
          left: 40,
          right: 10,
          top: 10,
          bottom: 40
        }
      };
    }
  }]);

  function XYPlot(props) {
    _classCallCheck(this, XYPlot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XYPlot).call(this, props));

    _this._mouseLeaveHandler = _this._mouseLeaveHandler.bind(_this);
    _this._mouseEnterHandler = _this._mouseEnterHandler.bind(_this);
    _this._mouseMoveHandler = _this._mouseMoveHandler.bind(_this);
    var stackBy = props.stackBy;

    var children = (0, _seriesUtils.getSeriesChildren)(props.children);
    var data = (0, _seriesUtils.getStackedData)(children, stackBy);
    _this.state = {
      scaleMixins: _this._getScaleMixins(data, props),
      data: data
    };
    return _this;
  }

  _createClass(XYPlot, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var children = (0, _seriesUtils.getSeriesChildren)(nextProps.children);
      var nextData = (0, _seriesUtils.getStackedData)(children, nextProps.stackBy);
      var scaleMixins = this.state.scaleMixins;

      var nextScaleMixins = this._getScaleMixins(nextData, nextProps);
      if (!(0, _deepEqual2.default)(nextScaleMixins, scaleMixins)) {
        this.setState({
          scaleMixins: nextScaleMixins,
          data: nextData
        });
      }
    }

    /**
     * Trigger movement-related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse move event.
     * @private
     */

  }, {
    key: '_mouseMoveHandler',
    value: function _mouseMoveHandler(event) {
      var _this2 = this;

      var _props = this.props;
      var onMouseMove = _props.onMouseMove;
      var children = _props.children;

      if (onMouseMove) {
        onMouseMove(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this2.refs['series' + index];
        if (component && component.onParentMouseMove) {
          component.onParentMouseMove(event);
        }
      });
    }

    /**
     * Trigger onMouseLeave handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseLeaveHandler',
    value: function _mouseLeaveHandler(event) {
      var onMouseLeave = this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave({ event: event });
      }
    }

    /**
     * Trigger onMouseEnter handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseEnterHandler',
    value: function _mouseEnterHandler(event) {
      var onMouseEnter = this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter({ event: event });
      }
    }

    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */

  }, {
    key: '_getScaleDefaults',
    value: function _getScaleDefaults(props) {
      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(props);

      var innerWidth = _getInnerDimensions.innerWidth;
      var innerHeight = _getInnerDimensions.innerHeight;

      return {
        xRange: [0, innerWidth],
        yRange: [innerHeight, 0],
        colorRange: _theme.CONTINUOUS_COLOR_RANGE,
        opacityRange: _theme.OPACITY_RANGE,
        sizeRange: _theme.SIZE_RANGE
      };
    }

    /**
     * Get the map of scales from the props, apply defaults to them and then pass
     * them further.
     * @param {Object} data Array of all data.
     * @param {Object} props Props of the component.
     * @returns {Object} Map of scale-related props.
     * @private
     */

  }, {
    key: '_getScaleMixins',
    value: function _getScaleMixins(data, props) {
      var attrProps = {};
      var defaults = this._getScaleDefaults(props);
      var children = (0, _seriesUtils.getSeriesChildren)(props.children);
      Object.keys(props).forEach(function (key) {
        var attr = ATTRIBUTES.find(function (a) {
          return key.indexOf(a) === 0 || key.indexOf('_' + a) === 0;
        });
        if (!attr) {
          return;
        }
        attrProps[key] = props[key];
      });

      var zeroBaseProps = {};
      var adjustBy = new Set();
      var adjustWhat = new Set();
      children.forEach(function (child, index) {
        if (!child || !data[index]) {
          return;
        }
        ATTRIBUTES.forEach(function (attr) {
          var _child$type$getParent = child.type.getParentConfig(attr, child.props);

          var isDomainAdjustmentNeeded = _child$type$getParent.isDomainAdjustmentNeeded;
          var zeroBaseValue = _child$type$getParent.zeroBaseValue;

          if (isDomainAdjustmentNeeded) {
            adjustBy.add(attr);
            adjustWhat.add(index);
          }
          if (zeroBaseValue) {
            zeroBaseProps[attr + 'BaseValue'] = 0;
          }
        });
      });

      return _extends({}, defaults, zeroBaseProps, attrProps, {
        _allData: data,
        _adjustBy: Array.from(adjustBy),
        _adjustWhat: Array.from(adjustWhat),
        _stackBy: props.stackBy
      });
    }

    /**
     * Checks if the plot is empty or not.
     * Currently checks the data only.
     * @returns {boolean} True for empty.
     * @private
     */

  }, {
    key: '_isPlotEmpty',
    value: function _isPlotEmpty() {
      var data = this.state.data;

      return !data || !data.length || !data.some(function (series) {
        return series && series.some(function (d) {
          return d;
        });
      });
    }

    /**
     * Prepare the child components (including series) for rendering.
     * @returns {Array} Array of child components.
     * @private
     */

  }, {
    key: '_getClonedChildComponents',
    value: function _getClonedChildComponents() {
      var animation = this.props.animation;
      var _state = this.state;
      var scaleMixins = _state.scaleMixins;
      var data = _state.data;

      var dimensions = (0, _chartUtils.getInnerDimensions)(this.props);
      var children = _react2.default.Children.toArray(this.props.children);
      var seriesProps = (0, _seriesUtils.getSeriesPropsFromChildren)(children);
      return children.map(function (child, index) {
        var dataProps = null;
        if (seriesProps[index]) {
          // Get the index of the series in the list of props and retrieve
          // the data property from it.
          var seriesIndex = seriesProps[index].seriesIndex;

          dataProps = { data: data[seriesIndex] };
        }
        return _react2.default.cloneElement(child, _extends({}, dimensions, {
          animation: animation
        }, seriesProps[index], scaleMixins, child.props, dataProps));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;


      if (this._isPlotEmpty()) {
        return _react2.default.createElement('div', {
          className: 'rv-xy-plot',
          style: {
            width: width + 'px',
            height: height + 'px'
          } });
      }
      var components = this._getClonedChildComponents();

      return _react2.default.createElement(
        'div',
        {
          style: {
            width: width + 'px',
            height: height + 'px'
          },
          className: 'rv-xy-plot' },
        _react2.default.createElement(
          'svg',
          {
            className: 'rv-xy-plot__inner',
            width: width,
            height: height,
            onMouseMove: this._mouseMoveHandler,
            onMouseLeave: this._mouseLeaveHandler,
            onMouseEnter: this._mouseEnterHandler },
          components.filter(function (c) {
            return c && c.type.requiresSVG;
          })
        ),
        components.filter(function (c) {
          return c && !c.type.requiresSVG;
        })
      );
    }
  }]);

  return XYPlot;
}(_react2.default.Component);

XYPlot.displayName = 'XYPlot';

exports.default = XYPlot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC94eS1wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOztBQUtBOztBQUVBOztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVkEsSUFBTSxhQUFhLENBQ2pCLEdBRGlCLEVBRWpCLEdBRmlCLEVBR2pCLE9BSGlCLEVBSWpCLE1BSmlCLEVBS2pCLFFBTGlCLEVBTWpCLFNBTmlCLEVBT2pCLE1BUGlCLENBQW5COztJQVlNLE07Ozs7O3dCQUVtQjtBQUNyQixhQUFPO0FBQ0wsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBRHpCO0FBRUwsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUYxQjtBQUdMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ3ZELGdCQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEaUM7QUFFdkQsZUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BRmtDO0FBR3ZELGlCQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFIZ0M7QUFJdkQsa0JBQVEsZ0JBQU0sU0FBTixDQUFnQjtBQUorQixTQUF0QixDQUFELEVBSzlCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMYyxDQUExQixDQUhIO0FBU0wsc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixJQVR6QjtBQVVMLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsSUFWeEI7QUFXTCxzQkFBYyxnQkFBTSxTQUFOLENBQWdCLElBWHpCO0FBWUwsb0RBWks7QUFhTCxpQkFBUyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLFVBQXRCO0FBYkosT0FBUDtBQWVEOzs7d0JBRXlCO0FBQ3hCLGFBQU87QUFDTCxnQkFBUTtBQUNOLGdCQUFNLEVBREE7QUFFTixpQkFBTyxFQUZEO0FBR04sZUFBSyxFQUhD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QUssWUFBTCxFQUFKLEVBQXlCO0FBQ3ZCLGVBQ0U7QUFDRSxxQkFBVSxZQURaO0FBRUUsaUJBQU87QUFDTCxtQkFBVSxLQUFWLE9BREs7QUFFTCxvQkFBVyxNQUFYO0FBRkssV0FGVCxHQURGO0FBUUQ7QUFDRCxVQUFNLGFBQWEsS0FBSyx5QkFBTCxFQUFuQjs7QUFFQSxhQUNFO0FBQUE7QUFBQTtBQUNFLGlCQUFPO0FBQ0wsbUJBQVUsS0FBVixPQURLO0FBRUwsb0JBQVcsTUFBWDtBQUZLLFdBRFQ7QUFLRSxxQkFBVSxZQUxaO0FBTUU7QUFBQTtBQUFBO0FBQ0UsdUJBQVUsbUJBRFo7QUFFRSxtQkFBTyxLQUZUO0FBR0Usb0JBQVEsTUFIVjtBQUlFLHlCQUFhLEtBQUssaUJBSnBCO0FBS0UsMEJBQWMsS0FBSyxrQkFMckI7QUFNRSwwQkFBYyxLQUFLLGtCQU5yQjtBQU9HLHFCQUFXLE1BQVgsQ0FBa0I7QUFBQSxtQkFBSyxLQUFLLEVBQUUsSUFBRixDQUFPLFdBQWpCO0FBQUEsV0FBbEI7QUFQSCxTQU5GO0FBZUcsbUJBQVcsTUFBWCxDQUFrQjtBQUFBLGlCQUFLLEtBQUssQ0FBQyxFQUFFLElBQUYsQ0FBTyxXQUFsQjtBQUFBLFNBQWxCO0FBZkgsT0FERjtBQW1CRDs7OztFQTFQa0IsZ0JBQU0sUzs7QUE2UDNCLE9BQU8sV0FBUCxHQUFxQixRQUFyQjs7a0JBRWUsTSIsImZpbGUiOiJ4eS1wbG90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBlcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcblxuaW1wb3J0IHtcbiAgZ2V0U3RhY2tlZERhdGEsXG4gIGdldFNlcmllc0NoaWxkcmVuLFxuICBnZXRTZXJpZXNQcm9wc0Zyb21DaGlsZHJlbn0gZnJvbSAnLi4vdXRpbHMvc2VyaWVzLXV0aWxzJztcblxuaW1wb3J0IHtnZXRJbm5lckRpbWVuc2lvbnN9IGZyb20gJy4uL3V0aWxzL2NoYXJ0LXV0aWxzJztcblxuaW1wb3J0IHtcbiAgQ09OVElOVU9VU19DT0xPUl9SQU5HRSxcbiAgU0laRV9SQU5HRSxcbiAgT1BBQ0lUWV9SQU5HRX0gZnJvbSAnLi4vdGhlbWUnO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW1xuICAneCcsXG4gICd5JyxcbiAgJ2NvbG9yJyxcbiAgJ2ZpbGwnLFxuICAnc3Ryb2tlJyxcbiAgJ29wYWNpdHknLFxuICAnc2l6ZSdcbl07XG5cbmltcG9ydCB7QW5pbWF0aW9uUHJvcFR5cGV9IGZyb20gJy4uL3V0aWxzL2FuaW1hdGlvbi11dGlscyc7XG5cbmNsYXNzIFhZUGxvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICByaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSwgUmVhY3QuUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgb25Nb3VzZUxlYXZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTW91c2VNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTW91c2VFbnRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBhbmltYXRpb246IEFuaW1hdGlvblByb3BUeXBlLFxuICAgICAgc3RhY2tCeTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKEFUVFJJQlVURVMpXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW46IHtcbiAgICAgICAgbGVmdDogNDAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgYm90dG9tOiA0MFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9tb3VzZUxlYXZlSGFuZGxlciA9IHRoaXMuX21vdXNlTGVhdmVIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VFbnRlckhhbmRsZXIgPSB0aGlzLl9tb3VzZUVudGVySGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLl9tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgY29uc3Qge3N0YWNrQnl9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBnZXRTZXJpZXNDaGlsZHJlbihwcm9wcy5jaGlsZHJlbik7XG4gICAgY29uc3QgZGF0YSA9IGdldFN0YWNrZWREYXRhKGNoaWxkcmVuLCBzdGFja0J5KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2NhbGVNaXhpbnM6IHRoaXMuX2dldFNjYWxlTWl4aW5zKGRhdGEsIHByb3BzKSxcbiAgICAgIGRhdGFcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGdldFNlcmllc0NoaWxkcmVuKG5leHRQcm9wcy5jaGlsZHJlbik7XG4gICAgY29uc3QgbmV4dERhdGEgPSBnZXRTdGFja2VkRGF0YShjaGlsZHJlbiwgbmV4dFByb3BzLnN0YWNrQnkpO1xuICAgIGNvbnN0IHtzY2FsZU1peGluc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5leHRTY2FsZU1peGlucyA9IHRoaXMuX2dldFNjYWxlTWl4aW5zKG5leHREYXRhLCBuZXh0UHJvcHMpO1xuICAgIGlmICghZXF1YWwobmV4dFNjYWxlTWl4aW5zLCBzY2FsZU1peGlucykpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzY2FsZU1peGluczogbmV4dFNjYWxlTWl4aW5zLFxuICAgICAgICBkYXRhOiBuZXh0RGF0YVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgbW92ZW1lbnQtcmVsYXRlZCBjYWxsYmFja3MgaWYgdGhleSBhcmUgYXZhaWxhYmxlLlxuICAgKiBAcGFyYW0ge1JlYWN0LlN5bnRoZXRpY0V2ZW50fSBldmVudCBNb3VzZSBtb3ZlIGV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21vdXNlTW92ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7b25Nb3VzZU1vdmUsIGNoaWxkcmVufSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTW91c2VNb3ZlKSB7XG4gICAgICBvbk1vdXNlTW92ZShldmVudCk7XG4gICAgfVxuICAgIGNvbnN0IHNlcmllc0NoaWxkcmVuID0gZ2V0U2VyaWVzQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICAgIHNlcmllc0NoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5yZWZzW2BzZXJpZXMke2luZGV4fWBdO1xuICAgICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQub25QYXJlbnRNb3VzZU1vdmUpIHtcbiAgICAgICAgY29tcG9uZW50Lm9uUGFyZW50TW91c2VNb3ZlKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIG9uTW91c2VMZWF2ZSBoYW5kbGVyIGlmIGl0IHdhcyBwYXNzZWQgaW4gcHJvcHMuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IE5hdGl2ZSBldmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tb3VzZUxlYXZlSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IHtvbk1vdXNlTGVhdmV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25Nb3VzZUxlYXZlKSB7XG4gICAgICBvbk1vdXNlTGVhdmUoe2V2ZW50fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgb25Nb3VzZUVudGVyIGhhbmRsZXIgaWYgaXQgd2FzIHBhc3NlZCBpbiBwcm9wcy5cbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgTmF0aXZlIGV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21vdXNlRW50ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qge29uTW91c2VFbnRlcn0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbk1vdXNlRW50ZXIpIHtcbiAgICAgIG9uTW91c2VFbnRlcih7ZXZlbnR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsaXN0IG9mIHNjYWxlLXJlbGF0ZWQgc2V0dGluZ3MgdGhhdCBzaG91bGQgYmUgYXBwbGllZCBieSBkZWZhdWx0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgT2JqZWN0IG9mIHByb3BzLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBEZWZhdWx0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRTY2FsZURlZmF1bHRzKHByb3BzKSB7XG4gICAgY29uc3Qge2lubmVyV2lkdGgsIGlubmVySGVpZ2h0fSA9IGdldElubmVyRGltZW5zaW9ucyhwcm9wcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHhSYW5nZTogWzAsIGlubmVyV2lkdGhdLFxuICAgICAgeVJhbmdlOiBbaW5uZXJIZWlnaHQsIDBdLFxuICAgICAgY29sb3JSYW5nZTogQ09OVElOVU9VU19DT0xPUl9SQU5HRSxcbiAgICAgIG9wYWNpdHlSYW5nZTogT1BBQ0lUWV9SQU5HRSxcbiAgICAgIHNpemVSYW5nZTogU0laRV9SQU5HRVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXAgb2Ygc2NhbGVzIGZyb20gdGhlIHByb3BzLCBhcHBseSBkZWZhdWx0cyB0byB0aGVtIGFuZCB0aGVuIHBhc3NcbiAgICogdGhlbSBmdXJ0aGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBBcnJheSBvZiBhbGwgZGF0YS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFByb3BzIG9mIHRoZSBjb21wb25lbnQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBzY2FsZS1yZWxhdGVkIHByb3BzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFNjYWxlTWl4aW5zKGRhdGEsIHByb3BzKSB7XG4gICAgY29uc3QgYXR0clByb3BzID0ge307XG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLl9nZXRTY2FsZURlZmF1bHRzKHByb3BzKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGdldFNlcmllc0NoaWxkcmVuKHByb3BzLmNoaWxkcmVuKTtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgYXR0ciA9IEFUVFJJQlVURVMuZmluZChcbiAgICAgICAgYSA9PiBrZXkuaW5kZXhPZihhKSA9PT0gMCB8fCBrZXkuaW5kZXhPZihgXyR7YX1gKSA9PT0gMCk7XG4gICAgICBpZiAoIWF0dHIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXR0clByb3BzW2tleV0gPSBwcm9wc1trZXldO1xuICAgIH0pO1xuXG4gICAgY29uc3QgemVyb0Jhc2VQcm9wcyA9IHt9O1xuICAgIGNvbnN0IGFkanVzdEJ5ID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGFkanVzdFdoYXQgPSBuZXcgU2V0KCk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIWNoaWxkIHx8ICFkYXRhW2luZGV4XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBBVFRSSUJVVEVTLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBpc0RvbWFpbkFkanVzdG1lbnROZWVkZWQsXG4gICAgICAgICAgemVyb0Jhc2VWYWx1ZX0gPSBjaGlsZC50eXBlLmdldFBhcmVudENvbmZpZyhcbiAgICAgICAgICBhdHRyLFxuICAgICAgICAgIGNoaWxkLnByb3BzXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc0RvbWFpbkFkanVzdG1lbnROZWVkZWQpIHtcbiAgICAgICAgICBhZGp1c3RCeS5hZGQoYXR0cik7XG4gICAgICAgICAgYWRqdXN0V2hhdC5hZGQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh6ZXJvQmFzZVZhbHVlKSB7XG4gICAgICAgICAgemVyb0Jhc2VQcm9wc1tgJHthdHRyfUJhc2VWYWx1ZWBdID0gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAuLi56ZXJvQmFzZVByb3BzLFxuICAgICAgLi4uYXR0clByb3BzLFxuICAgICAgX2FsbERhdGE6IGRhdGEsXG4gICAgICBfYWRqdXN0Qnk6IEFycmF5LmZyb20oYWRqdXN0QnkpLFxuICAgICAgX2FkanVzdFdoYXQ6IEFycmF5LmZyb20oYWRqdXN0V2hhdCksXG4gICAgICBfc3RhY2tCeTogcHJvcHMuc3RhY2tCeVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBwbG90IGlzIGVtcHR5IG9yIG5vdC5cbiAgICogQ3VycmVudGx5IGNoZWNrcyB0aGUgZGF0YSBvbmx5LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBmb3IgZW1wdHkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNQbG90RW1wdHkoKSB7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gIWRhdGEgfHwgIWRhdGEubGVuZ3RoIHx8XG4gICAgICAhZGF0YS5zb21lKHNlcmllcyA9PiBzZXJpZXMgJiYgc2VyaWVzLnNvbWUoZCA9PiBkKSk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGUgY2hpbGQgY29tcG9uZW50cyAoaW5jbHVkaW5nIHNlcmllcykgZm9yIHJlbmRlcmluZy5cbiAgICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBjaGlsZCBjb21wb25lbnRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENsb25lZENoaWxkQ29tcG9uZW50cygpIHtcbiAgICBjb25zdCB7YW5pbWF0aW9ufSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3NjYWxlTWl4aW5zLCBkYXRhfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGdldElubmVyRGltZW5zaW9ucyh0aGlzLnByb3BzKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgY29uc3Qgc2VyaWVzUHJvcHMgPSBnZXRTZXJpZXNQcm9wc0Zyb21DaGlsZHJlbihjaGlsZHJlbik7XG4gICAgcmV0dXJuIGNoaWxkcmVuLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgZGF0YVByb3BzID0gbnVsbDtcbiAgICAgIGlmIChzZXJpZXNQcm9wc1tpbmRleF0pIHtcbiAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiB0aGUgc2VyaWVzIGluIHRoZSBsaXN0IG9mIHByb3BzIGFuZCByZXRyaWV2ZVxuICAgICAgICAvLyB0aGUgZGF0YSBwcm9wZXJ0eSBmcm9tIGl0LlxuICAgICAgICBjb25zdCB7c2VyaWVzSW5kZXh9ID0gc2VyaWVzUHJvcHNbaW5kZXhdO1xuICAgICAgICBkYXRhUHJvcHMgPSB7ZGF0YTogZGF0YVtzZXJpZXNJbmRleF19O1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAuLi5kaW1lbnNpb25zLFxuICAgICAgICBhbmltYXRpb24sXG4gICAgICAgIC4uLnNlcmllc1Byb3BzW2luZGV4XSxcbiAgICAgICAgLi4uc2NhbGVNaXhpbnMsXG4gICAgICAgIC4uLmNoaWxkLnByb3BzLFxuICAgICAgICAuLi5kYXRhUHJvcHNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAodGhpcy5faXNQbG90RW1wdHkoKSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXG4gICAgICAgICAgfX0vPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHRoaXMuX2dldENsb25lZENoaWxkQ29tcG9uZW50cygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9XCJydi14eS1wbG90XCI+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICBjbGFzc05hbWU9XCJydi14eS1wbG90X19pbm5lclwiXG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLl9tb3VzZU1vdmVIYW5kbGVyfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5fbW91c2VMZWF2ZUhhbmRsZXJ9XG4gICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLl9tb3VzZUVudGVySGFuZGxlcn0+XG4gICAgICAgICAge2NvbXBvbmVudHMuZmlsdGVyKGMgPT4gYyAmJiBjLnR5cGUucmVxdWlyZXNTVkcpfVxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2NvbXBvbmVudHMuZmlsdGVyKGMgPT4gYyAmJiAhYy50eXBlLnJlcXVpcmVzU1ZHKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuWFlQbG90LmRpc3BsYXlOYW1lID0gJ1hZUGxvdCc7XG5cbmV4cG9ydCBkZWZhdWx0IFhZUGxvdDtcbiJdfQ==