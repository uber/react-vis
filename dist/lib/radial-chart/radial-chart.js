'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 Uber Technologies, Inc.
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

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _d3Selection = require('d3-selection');

var _d3Selection2 = _interopRequireDefault(_d3Selection);

var _d3Shape = require('d3-shape');

var _d3Shape2 = _interopRequireDefault(_d3Shape);

var _scalesUtils = require('../utils/scales-utils');

var _chartUtils = require('../utils/chart-utils');

var _animationUtils = require('../utils/animation-utils');

var _theme = require('../theme');

var _reactUtils = require('../utils/react-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['angle', 'radius', 'innerRadius', 'color', 'opacity', 'fill', 'stroke'];

/**
 * Walk through the data and assign color property to the data points if it
 * doesn't exist.
 * @param {Array} data Array of data.
 * @returns {Array} New array of data points.
 */
function assignColorsToData(data) {
  return data.map(function (d, color) {
    return _extends({ color: color }, d);
  });
}

var RadialChart = function (_React$Component) {
  _inherits(RadialChart, _React$Component);

  _createClass(RadialChart, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        margin: _react2.default.PropTypes.shape({
          left: _react2.default.PropTypes.number,
          top: _react2.default.PropTypes.number,
          right: _react2.default.PropTypes.number,
          bottom: _react2.default.PropTypes.number
        }),
        animation: _animationUtils.AnimationPropType,
        onSectionMouseOver: _react2.default.PropTypes.func,
        onSectionMouseOut: _react2.default.PropTypes.func,
        onSectionClick: _react2.default.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        margin: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      };
    }
  }]);

  function RadialChart(props) {
    _classCallCheck(this, RadialChart);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadialChart).call(this, props));

    var data = assignColorsToData(props.data);
    _this.state = {
      scaleProps: _this._getAllScaleProps(props, data),
      data: data
    };
    _this._sectionMouseOut = _this._sectionMouseOut.bind(_this);
    _this._sectionMouseOver = _this._sectionMouseOver.bind(_this);
    _this._sectionClick = _this._sectionClick.bind(_this);
    _this._arc = null;
    return _this;
  }

  _createClass(RadialChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateChart();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextData = assignColorsToData(nextProps.data);
      var scaleProps = this.state.scaleProps;

      var nextscaleProps = this._getAllScaleProps(nextProps, nextData);
      if (!(0, _deepEqual2.default)(nextscaleProps, scaleProps)) {
        this.setState({
          scaleProps: nextscaleProps,
          data: nextData
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateChart();
    }

    /**
     * Triggers a callback on a section if the callback is set.
     * @param {function} handler Callback function.
     * @param {Object} d Data point of the arc.
     * @private
     */

  }, {
    key: '_triggerSectionHandler',
    value: function _triggerSectionHandler(handler, d) {
      if (handler) {
        var _arc$centroid = this._arc.centroid(d);

        var _arc$centroid2 = _slicedToArray(_arc$centroid, 2);

        var x = _arc$centroid2[0];
        var y = _arc$centroid2[1];

        handler(d.data, { event: _d3Selection2.default.event, x: x, y: y });
      }
    }

    /**
     * `mouseover` handler for the section.
     * @param {Object} d Data point.
     * @private
     */

  }, {
    key: '_sectionMouseOver',
    value: function _sectionMouseOver(d) {
      var onSectionMouseOver = this.props.onSectionMouseOver;

      this._triggerSectionHandler(onSectionMouseOver, d);
    }

    /**
     * `mouseout` handler for the section.
     * @param {Object} d Data point.
     * @private
     */

  }, {
    key: '_sectionMouseOut',
    value: function _sectionMouseOut(d) {
      var onSectionMouseOut = this.props.onSectionMouseOut;

      this._triggerSectionHandler(onSectionMouseOut, d);
    }

    /**
     * `click` handler for the section.
     * @param {Object} d Data point.
     * @private
     */

  }, {
    key: '_sectionClick',
    value: function _sectionClick(d) {
      var onSectionClick = this.props.onSectionClick;

      this._triggerSectionHandler(onSectionClick, d);
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

      var radius = Math.min(innerWidth / 2, innerHeight / 2);
      return {
        radiusRange: [0, radius],
        _radiusValue: radius,
        opacityRange: _theme.OPACITY_RANGE,
        _opacityValue: 1,
        colorRange: _theme.DISCRETE_COLOR_RANGE,
        colorType: 'category'
      };
    }

    /**
     * Get the map of scales from the props.
     * @param {Object} props Props.
     * @param {Object} data Array of all data.
     * @returns {Object} Map of scales.
     * @private
     */

  }, {
    key: '_getAllScaleProps',
    value: function _getAllScaleProps(props, data) {
      var attrProps = {};
      var defaults = this._getScaleDefaults(props);
      Object.keys(props).forEach(function (key) {
        var attr = ATTRIBUTES.find(function (a) {
          return key.indexOf(a) === 0;
        });
        if (!attr) {
          return;
        }
        attrProps[key] = props[key];
      });
      return _extends({}, defaults, attrProps, {
        _allData: data,
        _adjustBy: [],
        _adjustWhat: []
      });
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

    /**
     * Get attribute functor.
     * @param {string} attr Attribute name.
     * @returns {*} Functor.
     * @protected
     */

  }, {
    key: '_getAttributeFunctor',
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.state.scaleProps, attr);
    }

    /**
     * Update the radial chart. Assign new styles and positions to the sections.
     * @private
     */

  }, {
    key: '_updateChart',
    value: function _updateChart() {
      var data = this.state.data;

      var container = (0, _reactUtils.getDOMNode)(this.refs.container);
      var pie = _d3Shape2.default.pie().sort(null).value(function (d) {
        return d.angle;
      });

      var radiusFn = this._getAttributeFunctor('radius');
      var innerRadiusFn = this._getAttributeFunctor('innerRadius');
      if (!radiusFn) {
        return;
      }
      var arc = _d3Shape2.default.arc().outerRadius(radiusFn).innerRadius(innerRadiusFn);
      this._arc = arc;

      var sections = _d3Selection2.default.select(container).selectAll('path').data(pie(data)).on('click', this._sectionClick).on('mouseover', this._sectionMouseOver).on('mouseout', this._sectionMouseOut);
      this._applyTransition(sections).attr('d', arc).style('opacity', this._getAttributeFunctor('opacity')).style('fill', this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')).style('stroke', this._getAttributeFunctor('stroke'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;

      var _getInnerDimensions2 = (0, _chartUtils.getInnerDimensions)(this.props);

      var innerWidth = _getInnerDimensions2.innerWidth;
      var innerHeight = _getInnerDimensions2.innerHeight;

      return _react2.default.createElement(
        'div',
        {
          style: {
            width: width + 'px',
            height: height + 'px'
          },
          className: 'rv-radial-chart' },
        _react2.default.createElement(
          'svg',
          {
            width: width,
            height: height,
            className: 'rv-radial-chart__svg' },
          _react2.default.createElement(
            'g',
            {
              className: 'rv-radial-chart__series--pie',
              transform: 'translate(' + innerWidth / 2 + ',' + innerHeight / 2 + ')',
              ref: 'container' },
            data.map(function (d, i) {
              return _react2.default.createElement('path', { key: i });
            })
          )
        )
      );
    }
  }]);

  return RadialChart;
}(_react2.default.Component);

exports.default = RadialChart;


RadialChart.displayName = 'RadialChart';

exports.default = RadialChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmFkaWFsLWNoYXJ0L3JhZGlhbC1jaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFJQTs7Ozs7Ozs7OztBQUVBLElBQU0sYUFBYSxDQUNqQixPQURpQixFQUVqQixRQUZpQixFQUdqQixhQUhpQixFQUlqQixPQUppQixFQUtqQixTQUxpQixFQU1qQixNQU5pQixFQU9qQixRQVBpQixDQUFuQjs7Ozs7Ozs7QUFnQkEsU0FBUyxrQkFBVCxDQUE0QixJQUE1QixFQUFrQztBQUNoQyxTQUFPLEtBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUM1QixzQkFBUSxZQUFSLElBQWtCLENBQWxCO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0lBRW9CLFc7Ozs7O3dCQUNJO0FBQ3JCLGFBQU87QUFDTCxlQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFEekI7QUFFTCxnQkFBUSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBRjFCO0FBR0wsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQjtBQUM1QixnQkFBTSxnQkFBTSxTQUFOLENBQWdCLE1BRE07QUFFNUIsZUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BRk87QUFHNUIsaUJBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUhLO0FBSTVCLGtCQUFRLGdCQUFNLFNBQU4sQ0FBZ0I7QUFKSSxTQUF0QixDQUhIO0FBU0wsb0RBVEs7QUFVTCw0QkFBb0IsZ0JBQU0sU0FBTixDQUFnQixJQVYvQjtBQVdMLDJCQUFtQixnQkFBTSxTQUFOLENBQWdCLElBWDlCO0FBWUwsd0JBQWdCLGdCQUFNLFNBQU4sQ0FBZ0I7QUFaM0IsT0FBUDtBQWNEOzs7d0JBRXlCO0FBQ3hCLGFBQU87QUFD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LEtBQUssQ0FBWCxHQUFWO0FBQUEsYUFBVDtBQUpIO0FBSkY7QUFORixPQURGO0FBb0JEOzs7O0VBak9zQyxnQkFBTSxTOztrQkFBMUIsVzs7O0FBb09yQixZQUFZLFdBQVosR0FBMEIsYUFBMUI7O2tCQUVlLFciLCJmaWxlIjoicmFkaWFsLWNoYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBlcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcbmltcG9ydCBkM1NlbGVjdGlvbiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IGQzU2hhcGUgZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQge2dldEF0dHJpYnV0ZUZ1bmN0b3J9IGZyb20gJy4uL3V0aWxzL3NjYWxlcy11dGlscyc7XG5cbmltcG9ydCB7Z2V0SW5uZXJEaW1lbnNpb25zfSBmcm9tICcuLi91dGlscy9jaGFydC11dGlscyc7XG5cbmltcG9ydCB7QW5pbWF0aW9uUHJvcFR5cGUsIGFwcGx5VHJhbnNpdGlvbn0gZnJvbSAnLi4vdXRpbHMvYW5pbWF0aW9uLXV0aWxzJztcblxuaW1wb3J0IHtcbiAgT1BBQ0lUWV9SQU5HRSxcbiAgRElTQ1JFVEVfQ09MT1JfUkFOR0V9IGZyb20gJy4uL3RoZW1lJztcblxuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuLi91dGlscy9yZWFjdC11dGlscyc7XG5cbmNvbnN0IEFUVFJJQlVURVMgPSBbXG4gICdhbmdsZScsXG4gICdyYWRpdXMnLFxuICAnaW5uZXJSYWRpdXMnLFxuICAnY29sb3InLFxuICAnb3BhY2l0eScsXG4gICdmaWxsJyxcbiAgJ3N0cm9rZSdcbl07XG5cbi8qKlxuICogV2FsayB0aHJvdWdoIHRoZSBkYXRhIGFuZCBhc3NpZ24gY29sb3IgcHJvcGVydHkgdG8gdGhlIGRhdGEgcG9pbnRzIGlmIGl0XG4gKiBkb2Vzbid0IGV4aXN0LlxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBvZiBkYXRhLlxuICogQHJldHVybnMge0FycmF5fSBOZXcgYXJyYXkgb2YgZGF0YSBwb2ludHMuXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbkNvbG9yc1RvRGF0YShkYXRhKSB7XG4gIHJldHVybiBkYXRhLm1hcCgoZCwgY29sb3IpID0+IHtcbiAgICByZXR1cm4ge2NvbG9yLCAuLi5kfTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlhbENoYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICByaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSxcbiAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uUHJvcFR5cGUsXG4gICAgICBvblNlY3Rpb25Nb3VzZU92ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25TZWN0aW9uTW91c2VPdXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgb25TZWN0aW9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW46IHtcbiAgICAgICAgbGVmdDogMTAsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgYm90dG9tOiAxMFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBkYXRhID0gYXNzaWduQ29sb3JzVG9EYXRhKHByb3BzLmRhdGEpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzY2FsZVByb3BzOiB0aGlzLl9nZXRBbGxTY2FsZVByb3BzKHByb3BzLCBkYXRhKSxcbiAgICAgIGRhdGFcbiAgICB9O1xuICAgIHRoaXMuX3NlY3Rpb25Nb3VzZU91dCA9IHRoaXMuX3NlY3Rpb25Nb3VzZU91dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX3NlY3Rpb25Nb3VzZU92ZXIgPSB0aGlzLl9zZWN0aW9uTW91c2VPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fc2VjdGlvbkNsaWNrID0gdGhpcy5fc2VjdGlvbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fYXJjID0gbnVsbDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IG5leHREYXRhID0gYXNzaWduQ29sb3JzVG9EYXRhKG5leHRQcm9wcy5kYXRhKTtcbiAgICBjb25zdCB7c2NhbGVQcm9wc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5leHRzY2FsZVByb3BzID0gdGhpcy5fZ2V0QWxsU2NhbGVQcm9wcyhuZXh0UHJvcHMsIG5leHREYXRhKTtcbiAgICBpZiAoIWVxdWFsKG5leHRzY2FsZVByb3BzLCBzY2FsZVByb3BzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNjYWxlUHJvcHM6IG5leHRzY2FsZVByb3BzLFxuICAgICAgICBkYXRhOiBuZXh0RGF0YVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSBjYWxsYmFjayBvbiBhIHNlY3Rpb24gaWYgdGhlIGNhbGxiYWNrIGlzIHNldC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlciBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGQgRGF0YSBwb2ludCBvZiB0aGUgYXJjLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RyaWdnZXJTZWN0aW9uSGFuZGxlcihoYW5kbGVyLCBkKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMuX2FyYy5jZW50cm9pZChkKTtcbiAgICAgIGhhbmRsZXIoZC5kYXRhLCB7ZXZlbnQ6IGQzU2VsZWN0aW9uLmV2ZW50LCB4LCB5fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGBtb3VzZW92ZXJgIGhhbmRsZXIgZm9yIHRoZSBzZWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZCBEYXRhIHBvaW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NlY3Rpb25Nb3VzZU92ZXIoZCkge1xuICAgIGNvbnN0IHtvblNlY3Rpb25Nb3VzZU92ZXJ9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLl90cmlnZ2VyU2VjdGlvbkhhbmRsZXIob25TZWN0aW9uTW91c2VPdmVyLCBkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgbW91c2VvdXRgIGhhbmRsZXIgZm9yIHRoZSBzZWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZCBEYXRhIHBvaW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NlY3Rpb25Nb3VzZU91dChkKSB7XG4gICAgY29uc3Qge29uU2VjdGlvbk1vdXNlT3V0fSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5fdHJpZ2dlclNlY3Rpb25IYW5kbGVyKG9uU2VjdGlvbk1vdXNlT3V0LCBkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgY2xpY2tgIGhhbmRsZXIgZm9yIHRoZSBzZWN0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZCBEYXRhIHBvaW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NlY3Rpb25DbGljayhkKSB7XG4gICAgY29uc3Qge29uU2VjdGlvbkNsaWNrfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5fdHJpZ2dlclNlY3Rpb25IYW5kbGVyKG9uU2VjdGlvbkNsaWNrLCBkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxpc3Qgb2Ygc2NhbGUtcmVsYXRlZCBzZXR0aW5ncyB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIGJ5IGRlZmF1bHQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBPYmplY3Qgb2YgcHJvcHMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IERlZmF1bHRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFNjYWxlRGVmYXVsdHMocHJvcHMpIHtcbiAgICBjb25zdCB7aW5uZXJXaWR0aCwgaW5uZXJIZWlnaHR9ID0gZ2V0SW5uZXJEaW1lbnNpb25zKHByb3BzKTtcbiAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihpbm5lcldpZHRoIC8gMiwgaW5uZXJIZWlnaHQgLyAyKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmFkaXVzUmFuZ2U6IFswLCByYWRpdXNdLFxuICAgICAgX3JhZGl1c1ZhbHVlOiByYWRpdXMsXG4gICAgICBvcGFjaXR5UmFuZ2U6IE9QQUNJVFlfUkFOR0UsXG4gICAgICBfb3BhY2l0eVZhbHVlOiAxLFxuICAgICAgY29sb3JSYW5nZTogRElTQ1JFVEVfQ09MT1JfUkFOR0UsXG4gICAgICBjb2xvclR5cGU6ICdjYXRlZ29yeSdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFwIG9mIHNjYWxlcyBmcm9tIHRoZSBwcm9wcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFByb3BzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBBcnJheSBvZiBhbGwgZGF0YS5cbiAgICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIHNjYWxlcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRBbGxTY2FsZVByb3BzKHByb3BzLCBkYXRhKSB7XG4gICAgY29uc3QgYXR0clByb3BzID0ge307XG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLl9nZXRTY2FsZURlZmF1bHRzKHByb3BzKTtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgYXR0ciA9IEFUVFJJQlVURVMuZmluZChhID0+IGtleS5pbmRleE9mKGEpID09PSAwKTtcbiAgICAgIGlmICghYXR0cikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhdHRyUHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgLi4uYXR0clByb3BzLFxuICAgICAgX2FsbERhdGE6IGRhdGEsXG4gICAgICBfYWRqdXN0Qnk6IFtdLFxuICAgICAgX2FkanVzdFdoYXQ6IFtdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0cmFuc2l0aW9uIHRvIHRoZSBlbGVtZW50cyBhbmQgcmV0dXJuIHRoZSBuZXcgZWxlbWVudHMgaW5zdGVhZC5cbiAgICogQHBhcmFtIHtkMy5zZWxlY3Rpb259IGVsZW1lbnRzIEVsZW1lbnRzLlxuICAgKiBAcmV0dXJucyB7ZDMuc2VsZWN0aW9ufSBBbmltYXRlZCBlbGVtZW50cyBpZiBhbmltYXRpb24gaXMgYXZhaWxhYmxlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfYXBwbHlUcmFuc2l0aW9uKGVsZW1lbnRzKSB7XG4gICAgcmV0dXJuIGFwcGx5VHJhbnNpdGlvbih0aGlzLnByb3BzLCBlbGVtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGF0dHJpYnV0ZSBmdW5jdG9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICogQHJldHVybnMgeyp9IEZ1bmN0b3IuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIF9nZXRBdHRyaWJ1dGVGdW5jdG9yKGF0dHIpIHtcbiAgICByZXR1cm4gZ2V0QXR0cmlidXRlRnVuY3Rvcih0aGlzLnN0YXRlLnNjYWxlUHJvcHMsIGF0dHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcmFkaWFsIGNoYXJ0LiBBc3NpZ24gbmV3IHN0eWxlcyBhbmQgcG9zaXRpb25zIHRvIHRoZSBzZWN0aW9ucy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGVDaGFydCgpIHtcbiAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldERPTU5vZGUodGhpcy5yZWZzLmNvbnRhaW5lcik7XG4gICAgY29uc3QgcGllID0gZDNTaGFwZS5waWUoKS5zb3J0KG51bGwpLnZhbHVlKGQgPT4gZC5hbmdsZSk7XG5cbiAgICBjb25zdCByYWRpdXNGbiA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3JhZGl1cycpO1xuICAgIGNvbnN0IGlubmVyUmFkaXVzRm4gPSB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdpbm5lclJhZGl1cycpO1xuICAgIGlmICghcmFkaXVzRm4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYXJjID0gZDNTaGFwZS5hcmMoKVxuICAgICAgLm91dGVyUmFkaXVzKHJhZGl1c0ZuKVxuICAgICAgLmlubmVyUmFkaXVzKGlubmVyUmFkaXVzRm4pO1xuICAgIHRoaXMuX2FyYyA9IGFyYztcblxuICAgIGNvbnN0IHNlY3Rpb25zID0gZDNTZWxlY3Rpb24uc2VsZWN0KGNvbnRhaW5lcikuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgIC5vbignY2xpY2snLCB0aGlzLl9zZWN0aW9uQ2xpY2spXG4gICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX3NlY3Rpb25Nb3VzZU92ZXIpXG4gICAgICAub24oJ21vdXNlb3V0JywgdGhpcy5fc2VjdGlvbk1vdXNlT3V0KTtcbiAgICB0aGlzLl9hcHBseVRyYW5zaXRpb24oc2VjdGlvbnMpXG4gICAgICAuYXR0cignZCcsIGFyYylcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ29wYWNpdHknKSlcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2ZpbGwnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdzdHJva2UnKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2RhdGEsIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7aW5uZXJXaWR0aCwgaW5uZXJIZWlnaHR9ID0gZ2V0SW5uZXJEaW1lbnNpb25zKHRoaXMucHJvcHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwicnYtcmFkaWFsLWNoYXJ0XCI+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYtcmFkaWFsLWNoYXJ0X19zdmdcIj5cbiAgICAgICAgICA8Z1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwicnYtcmFkaWFsLWNoYXJ0X19zZXJpZXMtLXBpZVwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoIC8gMn0sJHtpbm5lckhlaWdodCAvIDJ9KWB9XG4gICAgICAgICAgICByZWY9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIHtkYXRhLm1hcCgoZCwgaSkgPT4gPHBhdGgga2V5PXtpfS8+KX1cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SYWRpYWxDaGFydC5kaXNwbGF5TmFtZSA9ICdSYWRpYWxDaGFydCc7XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlhbENoYXJ0O1xuIl19