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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

var _animation = require('../animation');

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _theme = require('../theme');

var _chartUtils = require('../utils/chart-utils');

var _lineSeries = require('../plot/series/line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _lineMarkSeries = require('../plot/series/line-mark-series');

var _lineMarkSeries2 = _interopRequireDefault(_lineMarkSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _decorativeAxis = require('../plot/axis/decorative-axis');

var _decorativeAxis2 = _interopRequireDefault(_decorativeAxis);

var _highlight = require('../plot/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var predefinedClassName = 'rv-parallel-coordinates-chart';
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  var animation = props.animation,
      domains = props.domains,
      style = props.style,
      tickFormat = props.tickFormat;

  return domains.map(function (domain, index) {
    var sortedDomain = domain.domain;

    var domainTickFormat = function domainTickFormat(t) {
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };

    return _react2.default.createElement(_decorativeAxis2.default, {
      animation: animation,
      key: index + '-axis',
      axisStart: { x: domain.name, y: 0 },
      axisEnd: { x: domain.name, y: 1 },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    });
  });
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  var domains = props.domains,
      style = props.style;

  return domains.map(function (domain, index) {
    return {
      x: domain.name,
      y: 1.1,
      label: domain.name,
      style: style
    };
  });
}

/**
 * Generate the actual lines to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.showMarks {Bool} whether or not to use the line mark series
 * @return {Array} the plotted axis components
 */
function getLines(props) {
  var animation = props.animation,
      brushFilters = props.brushFilters,
      colorRange = props.colorRange,
      domains = props.domains,
      data = props.data,
      style = props.style,
      showMarks = props.showMarks;

  var scales = domains.reduce(function (acc, _ref) {
    var domain = _ref.domain,
        name = _ref.name;

    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});
  // const

  return data.map(function (row, rowIndex) {
    var withinFilteredRange = true;
    var mappedData = domains.map(function (domain, index) {
      var getValue = domain.getValue,
          name = domain.name;

      // watch out! Gotcha afoot
      // yVal after being scale is in [0, 1] range

      var yVal = scales[name](getValue ? getValue(row) : row[name]);
      var filter = brushFilters[name];
      // filter value after being scale back from pixel space is also in [0, 1]
      if (filter && (yVal < filter.min || yVal > filter.max)) {
        withinFilteredRange = false;
      }
      return { x: name, y: yVal };
    });
    var selectedName = predefinedClassName + '-line';
    var unselectedName = selectedName + ' ' + predefinedClassName + '-line-unselected';
    var lineProps = {
      animation: animation,
      className: withinFilteredRange ? selectedName : unselectedName,
      key: rowIndex + '-polygon',
      data: mappedData,
      color: row.color || colorRange[rowIndex % colorRange.length],
      style: _extends({}, style.lines, row.style || {})
    };
    if (!withinFilteredRange) {
      lineProps.style = _extends({}, lineProps.style, style.deselectedLineStyle);
    }
    return showMarks ? _react2.default.createElement(_lineMarkSeries2.default, lineProps) : _react2.default.createElement(_lineSeries2.default, lineProps);
  });
}

var ParallelCoordinates = function (_Component) {
  _inherits(ParallelCoordinates, _Component);

  function ParallelCoordinates() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ParallelCoordinates);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ParallelCoordinates.__proto__ || Object.getPrototypeOf(ParallelCoordinates)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      brushFilters: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ParallelCoordinates, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var brushFilters = this.state.brushFilters;
      var _props = this.props,
          animation = _props.animation,
          brushing = _props.brushing,
          className = _props.className,
          children = _props.children,
          colorRange = _props.colorRange,
          data = _props.data,
          domains = _props.domains,
          height = _props.height,
          hideInnerMostValues = _props.hideInnerMostValues,
          margin = _props.margin,
          onMouseLeave = _props.onMouseLeave,
          onMouseEnter = _props.onMouseEnter,
          showMarks = _props.showMarks,
          style = _props.style,
          tickFormat = _props.tickFormat,
          width = _props.width;


      var axes = getAxes({
        domains: domains,
        animation: animation,
        hideInnerMostValues: hideInnerMostValues,
        style: style,
        tickFormat: tickFormat
      });

      var lines = getLines({
        animation: animation,
        brushFilters: brushFilters,
        colorRange: colorRange,
        domains: domains,
        data: data,
        showMarks: showMarks,
        style: style
      });
      var labelSeries = _react2.default.createElement(_labelSeries2.default, {
        animation: true,
        key: className,
        className: predefinedClassName + '-label',
        data: getLabels({ domains: domains, style: style.labels })
      });

      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(this.props, _chartUtils.DEFAULT_MARGINS),
          marginLeft = _getInnerDimensions.marginLeft,
          marginRight = _getInnerDimensions.marginRight;

      return _react2.default.createElement(
        _xyPlot2.default,
        {
          height: height,
          width: width,
          margin: margin,
          dontCheckIfEmpty: true,
          className: className + ' ' + predefinedClassName,
          onMouseLeave: onMouseLeave,
          onMouseEnter: onMouseEnter,
          xType: 'ordinal',
          yDomain: [0, 1]
        },
        children,
        axes.concat(lines).concat(labelSeries),
        brushing && domains.map(function (d) {
          var trigger = function trigger(row) {
            _this2.setState({
              brushFilters: _extends({}, brushFilters, _defineProperty({}, d.name, row ? { min: row.bottom, max: row.top } : null))
            });
          };
          return _react2.default.createElement(_highlight2.default, {
            key: d.name,
            drag: true,
            highlightX: d.name,
            onBrushEnd: trigger,
            onDragEnd: trigger,
            highlightWidth: (width - marginLeft - marginRight) / domains.length,
            enableX: false
          });
        })
      );
    }
  }]);

  return ParallelCoordinates;
}(_react.Component);

ParallelCoordinates.displayName = 'ParallelCoordinates';
ParallelCoordinates.propTypes = {
  animation: _animation.AnimationPropType,
  brushing: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  colorType: _propTypes2.default.string,
  colorRange: _propTypes2.default.arrayOf(_propTypes2.default.string),
  data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  domains: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    domain: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
    tickFormat: _propTypes2.default.func
  })).isRequired,
  height: _propTypes2.default.number.isRequired,
  margin: _chartUtils.MarginPropType,
  style: _propTypes2.default.shape({
    axes: _propTypes2.default.object,
    labels: _propTypes2.default.object,
    lines: _propTypes2.default.object
  }),
  showMarks: _propTypes2.default.bool,
  tickFormat: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired
};
ParallelCoordinates.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  style: {
    axes: {
      line: {},
      ticks: {},
      text: {}
    },
    labels: {
      fontSize: 10,
      textAnchor: 'middle'
    },
    lines: {
      strokeWidth: 1,
      strokeOpacity: 1
    },
    deselectedLineStyle: {
      strokeOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT
};

exports.default = ParallelCoordinates;