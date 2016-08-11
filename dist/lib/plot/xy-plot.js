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
        onMouseDown: _react2.default.PropTypes.func,
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
    _this._mouseDownHandler = _this._mouseDownHandler.bind(_this);
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
     * Trigger onMouseDown handler if it was passed in props.
     * @param {Event} event Native event.
     * @private
     */

  }, {
    key: '_mouseDownHandler',
    value: function _mouseDownHandler(event) {
      var onMouseDown = this.props.onMouseDown;

      if (onMouseDown) {
        onMouseDown({ event: event });
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
            onMouseEnter: this._mouseEnterHandler,
            onMouseDown: this._mouseDownHandler },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC94eS1wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOztBQUtBOztBQUVBOztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVkEsSUFBTSxhQUFhLENBQ2pCLEdBRGlCLEVBRWpCLEdBRmlCLEVBR2pCLE9BSGlCLEVBSWpCLE1BSmlCLEVBS2pCLFFBTGlCLEVBTWpCLFNBTmlCLEVBT2pCLE1BUGlCLENBQW5COztJQVlNLE07Ozs7O3dCQUVtQjtBQUNyQixhQUFPO0FBQ0wsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBRHpCO0FBRUwsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUYxQjtBQUdMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ3ZELGdCQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEaUM7QUFFdkQsZUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BRmtDO0FBR3ZELGlCQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFIZ0M7QUFJdkQsa0JBQVEsZ0JBQU0sU0FBTixDQUFnQjtBQUorQixTQUF0QixDQUFELEVBSzlCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMYyxDQUExQixDQUhIO0FBU0wsc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixJQVR6QjtBQVVMLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsSUFWeEI7QUFXTCxzQkFBYyxnQkFBTSxTQUFOLENBQWdCLElBWHpCO0FBWUwscUJBQWEsZ0JBQU0sU0FBTixDQUFnQixJQVp4QjtBQWFMLG9EQWJLO0FBY0wsaUJBQVMsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixVQUF0QjtBQWRKLE9BQVA7QUFnQkQ7Ozt3QkFFeUI7QUFDeEIsYUFBTztBQUNMLGdCQUFRO0FBQ04sZ0JBQU0s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IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBlcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcblxuaW1wb3J0IHtcbiAgZ2V0U3RhY2tlZERhdGEsXG4gIGdldFNlcmllc0NoaWxkcmVuLFxuICBnZXRTZXJpZXNQcm9wc0Zyb21DaGlsZHJlbn0gZnJvbSAnLi4vdXRpbHMvc2VyaWVzLXV0aWxzJztcblxuaW1wb3J0IHtnZXRJbm5lckRpbWVuc2lvbnN9IGZyb20gJy4uL3V0aWxzL2NoYXJ0LXV0aWxzJztcblxuaW1wb3J0IHtcbiAgQ09OVElOVU9VU19DT0xPUl9SQU5HRSxcbiAgU0laRV9SQU5HRSxcbiAgT1BBQ0lUWV9SQU5HRX0gZnJvbSAnLi4vdGhlbWUnO1xuXG5jb25zdCBBVFRSSUJVVEVTID0gW1xuICAneCcsXG4gICd5JyxcbiAgJ2NvbG9yJyxcbiAgJ2ZpbGwnLFxuICAnc3Ryb2tlJyxcbiAgJ29wYWNpdHknLFxuICAnc2l6ZSdcbl07XG5cbmltcG9ydCB7QW5pbWF0aW9uUHJvcFR5cGV9IGZyb20gJy4uL3V0aWxzL2FuaW1hdGlvbi11dGlscyc7XG5cbmNsYXNzIFhZUGxvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICByaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSwgUmVhY3QuUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgb25Nb3VzZUxlYXZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTW91c2VNb3ZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTW91c2VFbnRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvbk1vdXNlRG93bjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBhbmltYXRpb246IEFuaW1hdGlvblByb3BUeXBlLFxuICAgICAgc3RhY2tCeTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKEFUVFJJQlVURVMpXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW46IHtcbiAgICAgICAgbGVmdDogNDAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgYm90dG9tOiA0MFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9tb3VzZUxlYXZlSGFuZGxlciA9IHRoaXMuX21vdXNlTGVhdmVIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VFbnRlckhhbmRsZXIgPSB0aGlzLl9tb3VzZUVudGVySGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLl9tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VEb3duSGFuZGxlciA9IHRoaXMuX21vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBjb25zdCB7c3RhY2tCeX0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbiA9IGdldFNlcmllc0NoaWxkcmVuKHByb3BzLmNoaWxkcmVuKTtcbiAgICBjb25zdCBkYXRhID0gZ2V0U3RhY2tlZERhdGEoY2hpbGRyZW4sIHN0YWNrQnkpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzY2FsZU1peGluczogdGhpcy5fZ2V0U2NhbGVNaXhpbnMoZGF0YSwgcHJvcHMpLFxuICAgICAgZGF0YVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZ2V0U2VyaWVzQ2hpbGRyZW4obmV4dFByb3BzLmNoaWxkcmVuKTtcbiAgICBjb25zdCBuZXh0RGF0YSA9IGdldFN0YWNrZWREYXRhKGNoaWxkcmVuLCBuZXh0UHJvcHMuc3RhY2tCeSk7XG4gICAgY29uc3Qge3NjYWxlTWl4aW5zfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgbmV4dFNjYWxlTWl4aW5zID0gdGhpcy5fZ2V0U2NhbGVNaXhpbnMobmV4dERhdGEsIG5leHRQcm9wcyk7XG4gICAgaWYgKCFlcXVhbChuZXh0U2NhbGVNaXhpbnMsIHNjYWxlTWl4aW5zKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNjYWxlTWl4aW5zOiBuZXh0U2NhbGVNaXhpbnMsXG4gICAgICAgIGRhdGE6IG5leHREYXRhXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBtb3ZlbWVudC1yZWxhdGVkIGNhbGxiYWNrcyBpZiB0aGV5IGFyZSBhdmFpbGFibGUuXG4gICAqIEBwYXJhbSB7UmVhY3QuU3ludGhldGljRXZlbnR9IGV2ZW50IE1vdXNlIG1vdmUgZXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbW91c2VNb3ZlSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IHtvbk1vdXNlTW92ZSwgY2hpbGRyZW59ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25Nb3VzZU1vdmUpIHtcbiAgICAgIG9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgICB9XG4gICAgY29uc3Qgc2VyaWVzQ2hpbGRyZW4gPSBnZXRTZXJpZXNDaGlsZHJlbihjaGlsZHJlbik7XG4gICAgc2VyaWVzQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLnJlZnNbYHNlcmllcyR7aW5kZXh9YF07XG4gICAgICBpZiAoY29tcG9uZW50ICYmIGNvbXBvbmVudC5vblBhcmVudE1vdXNlTW92ZSkge1xuICAgICAgICBjb21wb25lbnQub25QYXJlbnRNb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgb25Nb3VzZUxlYXZlIGhhbmRsZXIgaWYgaXQgd2FzIHBhc3NlZCBpbiBwcm9wcy5cbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgTmF0aXZlIGV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21vdXNlTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qge29uTW91c2VMZWF2ZX0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbk1vdXNlTGVhdmUpIHtcbiAgICAgIG9uTW91c2VMZWF2ZSh7ZXZlbnR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBvbk1vdXNlRG93biBoYW5kbGVyIGlmIGl0IHdhcyBwYXNzZWQgaW4gcHJvcHMuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IE5hdGl2ZSBldmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tb3VzZURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qge29uTW91c2VEb3dufSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTW91c2VEb3duKSB7XG4gICAgICBvbk1vdXNlRG93bih7ZXZlbnR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBvbk1vdXNlRW50ZXIgaGFuZGxlciBpZiBpdCB3YXMgcGFzc2VkIGluIHByb3BzLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBOYXRpdmUgZXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbW91c2VFbnRlckhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7b25Nb3VzZUVudGVyfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTW91c2VFbnRlcikge1xuICAgICAgb25Nb3VzZUVudGVyKHtldmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxpc3Qgb2Ygc2NhbGUtcmVsYXRlZCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIGJ5IGRlZmF1bHQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBPYmplY3Qgb2YgcHJvcHMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IERlZmF1bHRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFNjYWxlRGVmYXVsdHMocHJvcHMpIHtcbiAgICBjb25zdCB7aW5uZXJXaWR0aCwgaW5uZXJIZWlnaHR9ID0gZ2V0SW5uZXJEaW1lbnNpb25zKHByb3BzKTtcbiAgICByZXR1cm4ge1xuICAgICAgeFJhbmdlOiBbMCwgaW5uZXJXaWR0aF0sXG4gICAgICB5UmFuZ2U6IFtpbm5lckhlaWdodCwgMF0sXG4gICAgICBjb2xvclJhbmdlOiBDT05USU5VT1VTX0NPTE9SX1JBTkdFLFxuICAgICAgb3BhY2l0eVJhbmdlOiBPUEFDSVRZX1JBTkdFLFxuICAgICAgc2l6ZVJhbmdlOiBTSVpFX1JBTkdFXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcCBvZiBzY2FsZXMgZnJvbSB0aGUgcHJvcHMsIGFwcGx5IGRlZmF1bHRzIHRvIHRoZW0gYW5kIHRoZW4gcGFzc1xuICAgKiB0aGVtIGZ1cnRoZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIEFycmF5IG9mIGFsbCBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgUHJvcHMgb2YgdGhlIGNvbXBvbmVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIHNjYWxlLXJlbGF0ZWQgcHJvcHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0U2NhbGVNaXhpbnMoZGF0YSwgcHJvcHMpIHtcbiAgICBjb25zdCBhdHRyUHJvcHMgPSB7fTtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuX2dldFNjYWxlRGVmYXVsdHMocHJvcHMpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZ2V0U2VyaWVzQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBhdHRyID0gQVRUUklCVVRFUy5maW5kKFxuICAgICAgICBhID0+IGtleS5pbmRleE9mKGEpID09PSAwIHx8IGtleS5pbmRleE9mKGBfJHthfWApID09PSAwKTtcbiAgICAgIGlmICghYXR0cikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhdHRyUHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgfSk7XG5cbiAgICBjb25zdCB6ZXJvQmFzZVByb3BzID0ge307XG4gICAgY29uc3QgYWRqdXN0QnkgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgYWRqdXN0V2hhdCA9IG5ldyBTZXQoKTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghY2hpbGQgfHwgIWRhdGFbaW5kZXhdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIEFUVFJJQlVURVMuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGlzRG9tYWluQWRqdXN0bWVudE5lZWRlZCxcbiAgICAgICAgICB6ZXJvQmFzZVZhbHVlfSA9IGNoaWxkLnR5cGUuZ2V0UGFyZW50Q29uZmlnKFxuICAgICAgICAgIGF0dHIsXG4gICAgICAgICAgY2hpbGQucHJvcHNcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGlzRG9tYWluQWRqdXN0bWVudE5lZWRlZCkge1xuICAgICAgICAgIGFkanVzdEJ5LmFkZChhdHRyKTtcbiAgICAgICAgICBhZGp1c3RXaGF0LmFkZChpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHplcm9CYXNlVmFsdWUpIHtcbiAgICAgICAgICB6ZXJvQmFzZVByb3BzW2Ake2F0dHJ9QmFzZVZhbHVlYF0gPSAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZWZhdWx0cyxcbiAgICAgIC4uLnplcm9CYXNlUHJvcHMsXG4gICAgICAuLi5hdHRyUHJvcHMsXG4gICAgICBfYWxsRGF0YTogZGF0YSxcbiAgICAgIF9hZGp1c3RCeTogQXJyYXkuZnJvbShhZGp1c3RCeSksXG4gICAgICBfYWRqdXN0V2hhdDogQXJyYXkuZnJvbShhZGp1c3RXaGF0KSxcbiAgICAgIF9zdGFja0J5OiBwcm9wcy5zdGFja0J5XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHBsb3QgaXMgZW1wdHkgb3Igbm90LlxuICAgKiBDdXJyZW50bHkgY2hlY2tzIHRoZSBkYXRhIG9ubHkuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGZvciBlbXB0eS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc1Bsb3RFbXB0eSgpIHtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAhZGF0YSB8fCAhZGF0YS5sZW5ndGggfHxcbiAgICAgICFkYXRhLnNvbWUoc2VyaWVzID0+IHNlcmllcyAmJiBzZXJpZXMuc29tZShkID0+IGQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBjaGlsZCBjb21wb25lbnRzIChpbmNsdWRpbmcgc2VyaWVzKSBmb3IgcmVuZGVyaW5nLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIGNoaWxkIGNvbXBvbmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0Q2xvbmVkQ2hpbGRDb21wb25lbnRzKCkge1xuICAgIGNvbnN0IHthbmltYXRpb259ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7c2NhbGVNaXhpbnMsIGRhdGF9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gZ2V0SW5uZXJEaW1lbnNpb25zKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICBjb25zdCBzZXJpZXNQcm9wcyA9IGdldFNlcmllc1Byb3BzRnJvbUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgICByZXR1cm4gY2hpbGRyZW4ubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBkYXRhUHJvcHMgPSBudWxsO1xuICAgICAgaWYgKHNlcmllc1Byb3BzW2luZGV4XSkge1xuICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBzZXJpZXMgaW4gdGhlIGxpc3Qgb2YgcHJvcHMgYW5kIHJldHJpZXZlXG4gICAgICAgIC8vIHRoZSBkYXRhIHByb3BlcnR5IGZyb20gaXQuXG4gICAgICAgIGNvbnN0IHtzZXJpZXNJbmRleH0gPSBzZXJpZXNQcm9wc1tpbmRleF07XG4gICAgICAgIGRhdGFQcm9wcyA9IHtkYXRhOiBkYXRhW3Nlcmllc0luZGV4XX07XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgIC4uLmRpbWVuc2lvbnMsXG4gICAgICAgIGFuaW1hdGlvbixcbiAgICAgICAgLi4uc2VyaWVzUHJvcHNbaW5kZXhdLFxuICAgICAgICAuLi5zY2FsZU1peGlucyxcbiAgICAgICAgLi4uY2hpbGQucHJvcHMsXG4gICAgICAgIC4uLmRhdGFQcm9wc1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICh0aGlzLl9pc1Bsb3RFbXB0eSgpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcbiAgICAgICAgICB9fS8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5fZ2V0Q2xvbmVkQ2hpbGRDb21wb25lbnRzKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RcIj5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX2lubmVyXCJcbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgb25Nb3VzZU1vdmU9e3RoaXMuX21vdXNlTW92ZUhhbmRsZXJ9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLl9tb3VzZUxlYXZlSGFuZGxlcn1cbiAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuX21vdXNlRW50ZXJIYW5kbGVyfVxuICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9tb3VzZURvd25IYW5kbGVyfT5cbiAgICAgICAgICB7Y29tcG9uZW50cy5maWx0ZXIoYyA9PiBjICYmIGMudHlwZS5yZXF1aXJlc1NWRyl9XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7Y29tcG9uZW50cy5maWx0ZXIoYyA9PiBjICYmICFjLnR5cGUucmVxdWlyZXNTVkcpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5YWVBsb3QuZGlzcGxheU5hbWUgPSAnWFlQbG90JztcblxuZXhwb3J0IGRlZmF1bHQgWFlQbG90O1xuIl19