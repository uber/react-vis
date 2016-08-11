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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC94eS1wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOztBQUtBOztBQUVBOztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVkEsSUFBTSxhQUFhLENBQ2pCLEdBRGlCLEVBRWpCLEdBRmlCLEVBR2pCLE9BSGlCLEVBSWpCLE1BSmlCLEVBS2pCLFFBTGlCLEVBTWpCLFNBTmlCLEVBT2pCLE1BUGlCLENBQW5COztJQVlNLE07Ozs7O3dCQUVtQjtBQUNyQixhQUFPO0FBQ0wsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBRHpCO0FBRUwsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUYxQjtBQUdMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCO0FBQ3ZELGdCQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEaUM7QUFFdkQsZUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BRmtDO0FBR3ZELGlCQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFIZ0M7QUFJdkQsa0JBQVEsZ0JBQU0sU0FBTixDQUFnQjtBQUorQixTQUF0QixDQUFELEVBSzlCLGdCQUFNLFNBQU4sQ0FBZ0IsTUFMYyxDQUExQixDQUhIO0FBU0wsc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixJQVR6QjtBQVVMLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsSUFWeEI7QUFXTCxzQkFBYyxnQkFBTSxTQUFOLENBQWdCLElBWHpCO0FBWUwscUJBQWEsZ0JBQU0sU0FBTixDQUFnQixJQVp4QjtBQWFMLG9EQWJLO0FBY0wsaUJBQVMsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixVQUF0QjtBQWRKLE9BQVA7QUFnQkQ7Ozt3QkFFeUI7QUFDeEIsYUFBTztBQUNMLGdCQUFRO0FBQ04sZ0JBQU0s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QU4sQ0FBbUIsS0FBbkIsZUFDRixVQURFO0FBRUw7QUFGSyxXQUdGLFlBQVksS0FBWixDQUhFLEVBSUYsV0FKRSxFQUtGLE1BQU0sS0FMSixFQU1GLFNBTkUsRUFBUDtBQVFELE9BaEJNLENBQVA7QUFpQkQ7Ozs2QkFFUTtBQUFBLG9CQUNpQixLQUFLLEtBRHRCO0FBQUEsVUFDQSxLQURBLFdBQ0EsS0FEQTtBQUFBLFVBQ08sTUFEUCxXQUNPLE1BRFA7OztBQUdQLFVBQUksS0FBSyxZQUFMLEVBQUosRUFBeUI7QUFDdkIsZUFDRTtBQUNFLHFCQUFVLFlBRFo7QUFFRSxpQkFBTztBQUNMLG1CQUFVLEtBQVYsT0FESztBQUVMLG9CQUFXLE1BQVg7QUFGSyxXQUZULEdBREY7QUFRRDtBQUNELFVBQU0sYUFBYSxLQUFLLHlCQUFMLEVBQW5COztBQUVBLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsaUJBQU87QUFDTCxtQkFBVSxLQUFWLE9BREs7QUFFTCxvQkFBVyxNQUFYO0FBRkssV0FEVDtBQUtFLHFCQUFVLFlBTFo7QUFNRTtBQUFBO0FBQUE7QUFDRSx1QkFBVSxtQkFEWjtBQUVFLG1CQUFPLEtBRlQ7QUFHRSxvQkFBUSxNQUhWO0FBSUUseUJBQWEsS0FBSyxpQkFKcEI7QUFLRSwwQkFBYyxLQUFLLGtCQUxyQjtBQU1FLDBCQUFjLEtBQUssa0JBTnJCO0FBT0cscUJBQVcsTUFBWCxDQUFrQjtBQUFBLG1CQUFLLEtBQUssRUFBRSxJQUFGLENBQU8sV0FBakI7QUFBQSxXQUFsQjtBQVBILFNBTkY7QUFlRyxtQkFBVyxNQUFYLENBQWtCO0FBQUEsaUJBQUssS0FBSyxDQUFDLEVBQUUsSUFBRixDQUFPLFdBQWxCO0FBQUEsU0FBbEI7QUFmSCxPQURGO0FBbUJEOzs7O0VBeFFrQixnQkFBTSxTOztBQTJRM0IsT0FBTyxXQUFQLEdBQXFCLFFBQXJCOztrQkFFZSxNIiwiZmlsZSI6Inh5LXBsb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGVxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuXG5pbXBvcnQge1xuICBnZXRTdGFja2VkRGF0YSxcbiAgZ2V0U2VyaWVzQ2hpbGRyZW4sXG4gIGdldFNlcmllc1Byb3BzRnJvbUNoaWxkcmVufSBmcm9tICcuLi91dGlscy9zZXJpZXMtdXRpbHMnO1xuXG5pbXBvcnQge2dldElubmVyRGltZW5zaW9uc30gZnJvbSAnLi4vdXRpbHMvY2hhcnQtdXRpbHMnO1xuXG5pbXBvcnQge1xuICBDT05USU5VT1VTX0NPTE9SX1JBTkdFLFxuICBTSVpFX1JBTkdFLFxuICBPUEFDSVRZX1JBTkdFfSBmcm9tICcuLi90aGVtZSc7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXG4gICd4JyxcbiAgJ3knLFxuICAnY29sb3InLFxuICAnZmlsbCcsXG4gICdzdHJva2UnLFxuICAnb3BhY2l0eScsXG4gICdzaXplJ1xuXTtcblxuaW1wb3J0IHtBbmltYXRpb25Qcm9wVHlwZX0gZnJvbSAnLi4vdXRpbHMvYW5pbWF0aW9uLXV0aWxzJztcblxuY2xhc3MgWFlQbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBsZWZ0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICB0b3A6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHJpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBib3R0b206IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICAgIH0pLCBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXSksXG4gICAgICBvbk1vdXNlTGVhdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25Nb3VzZU1vdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25Nb3VzZUVudGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTW91c2VEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uUHJvcFR5cGUsXG4gICAgICBzdGFja0J5OiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoQVRUUklCVVRFUylcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hcmdpbjoge1xuICAgICAgICBsZWZ0OiA0MCxcbiAgICAgICAgcmlnaHQ6IDEwLFxuICAgICAgICB0b3A6IDEwLFxuICAgICAgICBib3R0b206IDQwXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX21vdXNlTGVhdmVIYW5kbGVyID0gdGhpcy5fbW91c2VMZWF2ZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9tb3VzZUVudGVySGFuZGxlciA9IHRoaXMuX21vdXNlRW50ZXJIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VNb3ZlSGFuZGxlciA9IHRoaXMuX21vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9tb3VzZURvd25IYW5kbGVyID0gdGhpcy5fbW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IHtzdGFja0J5fSA9IHByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZ2V0U2VyaWVzQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuICAgIGNvbnN0IGRhdGEgPSBnZXRTdGFja2VkRGF0YShjaGlsZHJlbiwgc3RhY2tCeSk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjYWxlTWl4aW5zOiB0aGlzLl9nZXRTY2FsZU1peGlucyhkYXRhLCBwcm9wcyksXG4gICAgICBkYXRhXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBnZXRTZXJpZXNDaGlsZHJlbihuZXh0UHJvcHMuY2hpbGRyZW4pO1xuICAgIGNvbnN0IG5leHREYXRhID0gZ2V0U3RhY2tlZERhdGEoY2hpbGRyZW4sIG5leHRQcm9wcy5zdGFja0J5KTtcbiAgICBjb25zdCB7c2NhbGVNaXhpbnN9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXh0U2NhbGVNaXhpbnMgPSB0aGlzLl9nZXRTY2FsZU1peGlucyhuZXh0RGF0YSwgbmV4dFByb3BzKTtcbiAgICBpZiAoIWVxdWFsKG5leHRTY2FsZU1peGlucywgc2NhbGVNaXhpbnMpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2NhbGVNaXhpbnM6IG5leHRTY2FsZU1peGlucyxcbiAgICAgICAgZGF0YTogbmV4dERhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIG1vdmVtZW50LXJlbGF0ZWQgY2FsbGJhY2tzIGlmIHRoZXkgYXJlIGF2YWlsYWJsZS5cbiAgICogQHBhcmFtIHtSZWFjdC5TeW50aGV0aWNFdmVudH0gZXZlbnQgTW91c2UgbW92ZSBldmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tb3VzZU1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qge29uTW91c2VNb3ZlLCBjaGlsZHJlbn0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbk1vdXNlTW92ZSkge1xuICAgICAgb25Nb3VzZU1vdmUoZXZlbnQpO1xuICAgIH1cbiAgICBjb25zdCBzZXJpZXNDaGlsZHJlbiA9IGdldFNlcmllc0NoaWxkcmVuKGNoaWxkcmVuKTtcbiAgICBzZXJpZXNDaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVmc1tgc2VyaWVzJHtpbmRleH1gXTtcbiAgICAgIGlmIChjb21wb25lbnQgJiYgY29tcG9uZW50Lm9uUGFyZW50TW91c2VNb3ZlKSB7XG4gICAgICAgIGNvbXBvbmVudC5vblBhcmVudE1vdXNlTW92ZShldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBvbk1vdXNlTGVhdmUgaGFuZGxlciBpZiBpdCB3YXMgcGFzc2VkIGluIHByb3BzLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBOYXRpdmUgZXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbW91c2VMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7b25Nb3VzZUxlYXZlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTW91c2VMZWF2ZSkge1xuICAgICAgb25Nb3VzZUxlYXZlKHtldmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIG9uTW91c2VEb3duIGhhbmRsZXIgaWYgaXQgd2FzIHBhc3NlZCBpbiBwcm9wcy5cbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgTmF0aXZlIGV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21vdXNlRG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7b25Nb3VzZURvd259ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25Nb3VzZURvd24pIHtcbiAgICAgIG9uTW91c2VEb3duKHtldmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIG9uTW91c2VFbnRlciBoYW5kbGVyIGlmIGl0IHdhcyBwYXNzZWQgaW4gcHJvcHMuXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IE5hdGl2ZSBldmVudC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tb3VzZUVudGVySGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IHtvbk1vdXNlRW50ZXJ9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25Nb3VzZUVudGVyKSB7XG4gICAgICBvbk1vdXNlRW50ZXIoe2V2ZW50fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiBzY2FsZS1yZWxhdGVkIHNldHRpbmdzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgYnkgZGVmYXVsdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIE9iamVjdCBvZiBwcm9wcy5cbiAgICogQHJldHVybnMge09iamVjdH0gRGVmYXVsdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0U2NhbGVEZWZhdWx0cyhwcm9wcykge1xuICAgIGNvbnN0IHtpbm5lcldpZHRoLCBpbm5lckhlaWdodH0gPSBnZXRJbm5lckRpbWVuc2lvbnMocHJvcHMpO1xuICAgIHJldHVybiB7XG4gICAgICB4UmFuZ2U6IFswLCBpbm5lcldpZHRoXSxcbiAgICAgIHlSYW5nZTogW2lubmVySGVpZ2h0LCAwXSxcbiAgICAgIGNvbG9yUmFuZ2U6IENPTlRJTlVPVVNfQ09MT1JfUkFOR0UsXG4gICAgICBvcGFjaXR5UmFuZ2U6IE9QQUNJVFlfUkFOR0UsXG4gICAgICBzaXplUmFuZ2U6IFNJWkVfUkFOR0VcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFwIG9mIHNjYWxlcyBmcm9tIHRoZSBwcm9wcywgYXBwbHkgZGVmYXVsdHMgdG8gdGhlbSBhbmQgdGhlbiBwYXNzXG4gICAqIHRoZW0gZnVydGhlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQXJyYXkgb2YgYWxsIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcyBvZiB0aGUgY29tcG9uZW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2Ygc2NhbGUtcmVsYXRlZCBwcm9wcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRTY2FsZU1peGlucyhkYXRhLCBwcm9wcykge1xuICAgIGNvbnN0IGF0dHJQcm9wcyA9IHt9O1xuICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5fZ2V0U2NhbGVEZWZhdWx0cyhwcm9wcyk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBnZXRTZXJpZXNDaGlsZHJlbihwcm9wcy5jaGlsZHJlbik7XG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IGF0dHIgPSBBVFRSSUJVVEVTLmZpbmQoXG4gICAgICAgIGEgPT4ga2V5LmluZGV4T2YoYSkgPT09IDAgfHwga2V5LmluZGV4T2YoYF8ke2F9YCkgPT09IDApO1xuICAgICAgaWYgKCFhdHRyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGF0dHJQcm9wc1trZXldID0gcHJvcHNba2V5XTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHplcm9CYXNlUHJvcHMgPSB7fTtcbiAgICBjb25zdCBhZGp1c3RCeSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBhZGp1c3RXaGF0ID0gbmV3IFNldCgpO1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFjaGlsZCB8fCAhZGF0YVtpbmRleF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgQVRUUklCVVRFUy5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgaXNEb21haW5BZGp1c3RtZW50TmVlZGVkLFxuICAgICAgICAgIHplcm9CYXNlVmFsdWV9ID0gY2hpbGQudHlwZS5nZXRQYXJlbnRDb25maWcoXG4gICAgICAgICAgYXR0cixcbiAgICAgICAgICBjaGlsZC5wcm9wc1xuICAgICAgICApO1xuICAgICAgICBpZiAoaXNEb21haW5BZGp1c3RtZW50TmVlZGVkKSB7XG4gICAgICAgICAgYWRqdXN0QnkuYWRkKGF0dHIpO1xuICAgICAgICAgIGFkanVzdFdoYXQuYWRkKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoemVyb0Jhc2VWYWx1ZSkge1xuICAgICAgICAgIHplcm9CYXNlUHJvcHNbYCR7YXR0cn1CYXNlVmFsdWVgXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgLi4uemVyb0Jhc2VQcm9wcyxcbiAgICAgIC4uLmF0dHJQcm9wcyxcbiAgICAgIF9hbGxEYXRhOiBkYXRhLFxuICAgICAgX2FkanVzdEJ5OiBBcnJheS5mcm9tKGFkanVzdEJ5KSxcbiAgICAgIF9hZGp1c3RXaGF0OiBBcnJheS5mcm9tKGFkanVzdFdoYXQpLFxuICAgICAgX3N0YWNrQnk6IHByb3BzLnN0YWNrQnlcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgcGxvdCBpcyBlbXB0eSBvciBub3QuXG4gICAqIEN1cnJlbnRseSBjaGVja3MgdGhlIGRhdGEgb25seS5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgZm9yIGVtcHR5LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzUGxvdEVtcHR5KCkge1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuICFkYXRhIHx8ICFkYXRhLmxlbmd0aCB8fFxuICAgICAgIWRhdGEuc29tZShzZXJpZXMgPT4gc2VyaWVzICYmIHNlcmllcy5zb21lKGQgPT4gZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGNoaWxkIGNvbXBvbmVudHMgKGluY2x1ZGluZyBzZXJpZXMpIGZvciByZW5kZXJpbmcuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2YgY2hpbGQgY29tcG9uZW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRDbG9uZWRDaGlsZENvbXBvbmVudHMoKSB7XG4gICAgY29uc3Qge2FuaW1hdGlvbn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtzY2FsZU1peGlucywgZGF0YX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBnZXRJbm5lckRpbWVuc2lvbnModGhpcy5wcm9wcyk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNlcmllc1Byb3BzID0gZ2V0U2VyaWVzUHJvcHNGcm9tQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGRhdGFQcm9wcyA9IG51bGw7XG4gICAgICBpZiAoc2VyaWVzUHJvcHNbaW5kZXhdKSB7XG4gICAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgdGhlIHNlcmllcyBpbiB0aGUgbGlzdCBvZiBwcm9wcyBhbmQgcmV0cmlldmVcbiAgICAgICAgLy8gdGhlIGRhdGEgcHJvcGVydHkgZnJvbSBpdC5cbiAgICAgICAgY29uc3Qge3Nlcmllc0luZGV4fSA9IHNlcmllc1Byb3BzW2luZGV4XTtcbiAgICAgICAgZGF0YVByb3BzID0ge2RhdGE6IGRhdGFbc2VyaWVzSW5kZXhdfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgLi4uZGltZW5zaW9ucyxcbiAgICAgICAgYW5pbWF0aW9uLFxuICAgICAgICAuLi5zZXJpZXNQcm9wc1tpbmRleF0sXG4gICAgICAgIC4uLnNjYWxlTWl4aW5zLFxuICAgICAgICAuLi5jaGlsZC5wcm9wcyxcbiAgICAgICAgLi4uZGF0YVByb3BzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRoaXMuX2lzUGxvdEVtcHR5KCkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJydi14eS1wbG90XCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxuICAgICAgICAgIH19Lz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSB0aGlzLl9nZXRDbG9uZWRDaGlsZENvbXBvbmVudHMoKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdFwiPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdF9faW5uZXJcIlxuICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5fbW91c2VNb3ZlSGFuZGxlcn1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX21vdXNlTGVhdmVIYW5kbGVyfVxuICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5fbW91c2VFbnRlckhhbmRsZXJ9PlxuICAgICAgICAgIHtjb21wb25lbnRzLmZpbHRlcihjID0+IGMgJiYgYy50eXBlLnJlcXVpcmVzU1ZHKX1cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtjb21wb25lbnRzLmZpbHRlcihjID0+IGMgJiYgIWMudHlwZS5yZXF1aXJlc1NWRyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblhZUGxvdC5kaXNwbGF5TmFtZSA9ICdYWVBsb3QnO1xuXG5leHBvcnQgZGVmYXVsdCBYWVBsb3Q7XG4iXX0=