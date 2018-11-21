'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _markSeries = require('../plot/series/mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

var _polygonSeries = require('../plot/series/polygon-series');

var _polygonSeries2 = _interopRequireDefault(_polygonSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _decorativeAxis = require('../plot/axis/decorative-axis');

var _decorativeAxis2 = _interopRequireDefault(_decorativeAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var predefinedClassName = 'rv-radar-chart';
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 - props.startingAngle {number} the initial angle offset
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  var animation = props.animation,
      domains = props.domains,
      startingAngle = props.startingAngle,
      style = props.style,
      tickFormat = props.tickFormat,
      hideInnerMostValues = props.hideInnerMostValues;

  return domains.map(function (domain, index) {
    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var sortedDomain = domain.domain;

    var domainTickFormat = function domainTickFormat(t) {
      if (hideInnerMostValues && t === sortedDomain[0]) {
        return '';
      }
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };

    return _react2.default.createElement(_decorativeAxis2.default, {
      animation: animation,
      key: index + '-axis',
      axisStart: { x: 0, y: 0 },
      axisEnd: {
        x: getCoordinate(Math.cos(angle)),
        y: getCoordinate(Math.sin(angle))
      },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    });
  });
}

/**
 * Generate x or y coordinate for axisEnd
 * @param {Number} axisEndPoint
 - epsilon is an arbitrarily chosen small number to approximate axisEndPoints
 - to true values resulting from trigonometry functions (sin, cos) on angles
 * @return {Number} the x or y coordinate accounting for exact trig values
 */
function getCoordinate(axisEndPoint) {
  var epsilon = 10e-13;
  if (Math.abs(axisEndPoint) <= epsilon) {
    axisEndPoint = 0;
  } else if (axisEndPoint > 0) {
    if (Math.abs(axisEndPoint - 0.5) <= epsilon) {
      axisEndPoint = 0.5;
    }
  } else if (axisEndPoint < 0) {
    if (Math.abs(axisEndPoint + 0.5) <= epsilon) {
      axisEndPoint = -0.5;
    }
  }
  return axisEndPoint;
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
  - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  var domains = props.domains,
      startingAngle = props.startingAngle,
      style = props.style;

  return domains.map(function (_ref, index) {
    var name = _ref.name;

    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var radius = 1.2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      label: name,
      style: style
    };
  });
}

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 * @return {Array} the plotted axis components
 */
function getPolygons(props) {
  var animation = props.animation,
      colorRange = props.colorRange,
      domains = props.domains,
      data = props.data,
      style = props.style,
      startingAngle = props.startingAngle,
      onSeriesMouseOver = props.onSeriesMouseOver,
      onSeriesMouseOut = props.onSeriesMouseOut;

  var scales = domains.reduce(function (acc, _ref2) {
    var domain = _ref2.domain,
        name = _ref2.name;

    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});

  return data.map(function (row, rowIndex) {
    var mappedData = domains.map(function (_ref3, index) {
      var name = _ref3.name,
          getValue = _ref3.getValue;

      var dataPoint = getValue ? getValue(row) : row[name];
      // error handling if point doesn't exist
      var angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      var radius = Math.max(scales[name](dataPoint), 0);
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), name: row.name };
    });

    return _react2.default.createElement(_polygonSeries2.default, {
      animation: animation,
      className: predefinedClassName + '-polygon',
      key: rowIndex + '-polygon',
      data: mappedData,
      style: _extends({
        stroke: row.color || row.stroke || colorRange[rowIndex % colorRange.length],
        fill: row.color || row.fill || colorRange[rowIndex % colorRange.length]
      }, style.polygons),
      onSeriesMouseOver: onSeriesMouseOver,
      onSeriesMouseOut: onSeriesMouseOut
    });
  });
}

/**
 * Generate circles at the polygon points for Hover functionality
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 - props.onValueMouseOver {function} function to call on mouse over a polygon point
 - props.onValueMouseOver {function} function to call when mouse leaves a polygon point
 * @return {Array} the plotted axis components
 */
function getPolygonPoints(props) {
  var animation = props.animation,
      domains = props.domains,
      data = props.data,
      startingAngle = props.startingAngle,
      style = props.style,
      onValueMouseOver = props.onValueMouseOver,
      onValueMouseOut = props.onValueMouseOut;

  if (!onValueMouseOver) {
    return;
  }
  var scales = domains.reduce(function (acc, _ref4) {
    var domain = _ref4.domain,
        name = _ref4.name;

    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});
  return data.map(function (row, rowIndex) {
    var mappedData = domains.map(function (_ref5, index) {
      var name = _ref5.name,
          getValue = _ref5.getValue;

      var dataPoint = getValue ? getValue(row) : row[name];
      // error handling if point doesn't exist
      var angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      var radius = Math.max(scales[name](dataPoint), 0);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        domain: name,
        value: dataPoint,
        dataName: row.name
      };
    });

    return _react2.default.createElement(_markSeries2.default, {
      animation: animation,
      className: predefinedClassName + '-polygonPoint',
      key: rowIndex + '-polygonPoint',
      data: mappedData,
      size: 10,
      style: _extends({}, style.polygons, {
        fill: 'transparent',
        stroke: 'transparent'
      }),
      onValueMouseOver: onValueMouseOver,
      onValueMouseOut: onValueMouseOut
    });
  });
}

function RadarChart(props) {
  var animation = props.animation,
      className = props.className,
      children = props.children,
      colorRange = props.colorRange,
      data = props.data,
      domains = props.domains,
      height = props.height,
      hideInnerMostValues = props.hideInnerMostValues,
      margin = props.margin,
      onMouseLeave = props.onMouseLeave,
      onMouseEnter = props.onMouseEnter,
      startingAngle = props.startingAngle,
      style = props.style,
      tickFormat = props.tickFormat,
      width = props.width,
      renderAxesOverPolygons = props.renderAxesOverPolygons,
      onValueMouseOver = props.onValueMouseOver,
      onValueMouseOut = props.onValueMouseOut,
      onSeriesMouseOver = props.onSeriesMouseOver,
      onSeriesMouseOut = props.onSeriesMouseOut;


  var axes = getAxes({
    domains: domains,
    animation: animation,
    hideInnerMostValues: hideInnerMostValues,
    startingAngle: startingAngle,
    style: style,
    tickFormat: tickFormat
  });

  var polygons = getPolygons({
    animation: animation,
    colorRange: colorRange,
    domains: domains,
    data: data,
    startingAngle: startingAngle,
    style: style,
    onSeriesMouseOver: onSeriesMouseOver,
    onSeriesMouseOut: onSeriesMouseOut
  });

  var polygonPoints = getPolygonPoints({
    animation: animation,
    colorRange: colorRange,
    domains: domains,
    data: data,
    startingAngle: startingAngle,
    style: style,
    onValueMouseOver: onValueMouseOver,
    onValueMouseOut: onValueMouseOut
  });

  var labelSeries = _react2.default.createElement(_labelSeries2.default, {
    animation: animation,
    key: className,
    className: predefinedClassName + '-label',
    data: getLabels({ domains: domains, style: style.labels, startingAngle: startingAngle }) });
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
      xDomain: [-1, 1],
      yDomain: [-1, 1] },
    children,
    !renderAxesOverPolygons && axes.concat(polygons).concat(labelSeries).concat(polygonPoints),
    renderAxesOverPolygons && polygons.concat(labelSeries).concat(axes).concat(polygonPoints)
  );
}

RadarChart.displayName = 'RadarChart';
RadarChart.propTypes = {
  animation: _animation.AnimationPropType,
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
  hideInnerMostValues: _propTypes2.default.bool,
  margin: _chartUtils.MarginPropType,
  startingAngle: _propTypes2.default.number,
  style: _propTypes2.default.shape({
    axes: _propTypes2.default.object,
    labels: _propTypes2.default.object,
    polygons: _propTypes2.default.object
  }),
  tickFormat: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired,
  renderAxesOverPolygons: _propTypes2.default.bool,
  onValueMouseOver: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func,
  onSeriesMouseOver: _propTypes2.default.func,
  onSeriesMouseOut: _propTypes2.default.func
};
RadarChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  hideInnerMostValues: true,
  startingAngle: Math.PI / 2,
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
    polygons: {
      strokeWidth: 0.5,
      strokeOpacity: 1,
      fillOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT,
  renderAxesOverPolygons: false
};

exports.default = RadarChart;