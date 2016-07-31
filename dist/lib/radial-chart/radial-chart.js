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