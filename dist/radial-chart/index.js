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

var _d3Shape = require('d3-shape');

var _animation = require('../animation');

var _arcSeries = require('../plot/series/arc-series');

var _arcSeries2 = _interopRequireDefault(_arcSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _theme = require('../theme');

var _chartUtils = require('../utils/chart-utils');

var _seriesUtils = require('../utils/series-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var predefinedClassName = 'rv-radial-chart';

var DEFAULT_RADIUS_MARGIN = 15;

/**
 * Create the list of wedges to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
 * @returns {Array} Array of nodes.
 */
function getWedgesToRender(_ref) {
  var data = _ref.data,
      getAngle = _ref.getAngle;

  var pie = (0, _d3Shape.pie)().sort(null).value(getAngle);
  var pieData = pie(data).reverse();
  return pieData.map(function (row, index) {
    return _extends({}, row.data, {
      angle0: row.startAngle,
      angle: row.endAngle,
      radius0: row.data.innerRadius || 0,
      radius: row.data.radius || 1,
      color: row.data.color || index
    });
  });
}

function generateLabels(mappedData, accessors) {
  var labelsRadiusMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.1;
  var getLabel = accessors.getLabel,
      getSubLabel = accessors.getSubLabel;

  return mappedData.reduce(function (res, row) {
    var angle = row.angle,
        angle0 = row.angle0,
        radius = row.radius;

    var centeredAngle = (angle + angle0) / 2;

    // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!
    var updatedAngle = -1 * centeredAngle + Math.PI / 2;
    var newLabels = [];
    if (getLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getLabel(row)
      });
    }

    if (getSubLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getSubLabel(row),
        style: { fontSize: 10 },
        yOffset: 12
      });
    }
    return res.concat(newLabels);
  }, []);
  // could add force direction here to make sure the labels dont overlap
}

/**
 * Get the max radius so the chart can extend to the margin.
 * @param  {Number} width - container width
 * @param  {Number} height - container height
 * @return {Number} radius
 */
function getMaxRadius(width, height) {
  return Math.min(width, height) / 2 - DEFAULT_RADIUS_MARGIN;
}

function RadialChart(props) {
  var animation = props.animation,
      className = props.className,
      children = props.children,
      colorType = props.colorType,
      data = props.data,
      getAngle = props.getAngle,
      getLabel = props.getLabel,
      getSubLabel = props.getSubLabel,
      height = props.height,
      hideRootNode = props.hideRootNode,
      innerRadius = props.innerRadius,
      labelsAboveChildren = props.labelsAboveChildren,
      labelsRadiusMultiplier = props.labelsRadiusMultiplier,
      labelsStyle = props.labelsStyle,
      margin = props.margin,
      onMouseLeave = props.onMouseLeave,
      onMouseEnter = props.onMouseEnter,
      radius = props.radius,
      showLabels = props.showLabels,
      style = props.style,
      width = props.width;

  var mappedData = getWedgesToRender({
    data: data,
    height: height,
    hideRootNode: hideRootNode,
    width: width,
    getAngle: getAngle
  });
  var radialDomain = (0, _seriesUtils.getRadialDomain)(mappedData);
  var arcProps = _extends({
    colorType: colorType
  }, props, {
    animation: animation,
    radiusDomain: [0, radialDomain],
    data: mappedData,
    radiusNoFallBack: true,
    style: style,
    arcClassName: 'rv-radial-chart__series--pie__slice'
  });
  if (radius) {
    arcProps.radiusDomain = [0, 1];
    arcProps.radiusRange = [innerRadius || 0, radius];
    arcProps.radiusType = 'linear';
  }
  var maxRadius = radius ? radius : getMaxRadius(width, height);
  var defaultMargin = (0, _chartUtils.getRadialLayoutMargin)(width, height, maxRadius);

  var labels = generateLabels(mappedData, {
    getLabel: getLabel,
    getSubLabel: getSubLabel
  }, labelsRadiusMultiplier);
  return _react2.default.createElement(
    _xyPlot2.default,
    {
      height: height,
      width: width,
      margin: _extends({}, margin, defaultMargin),
      className: className + ' ' + predefinedClassName,
      onMouseLeave: onMouseLeave,
      onMouseEnter: onMouseEnter,
      xDomain: [-radialDomain, radialDomain],
      yDomain: [-radialDomain, radialDomain]
    },
    _react2.default.createElement(_arcSeries2.default, _extends({}, arcProps, { getAngle: function getAngle(d) {
        return d.angle;
      } })),
    showLabels && !labelsAboveChildren && _react2.default.createElement(_labelSeries2.default, { data: labels, style: labelsStyle }),
    children,
    showLabels && labelsAboveChildren && _react2.default.createElement(_labelSeries2.default, { data: labels, style: labelsStyle })
  );
}

RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes2.default.string,
  colorType: _propTypes2.default.string,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    angle: _propTypes2.default.number,
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    radius: _propTypes2.default.number,
    style: _propTypes2.default.object
  })).isRequired,
  getAngle: _propTypes2.default.func,
  getAngle0: _propTypes2.default.func,
  padAngle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number]),
  getRadius: _propTypes2.default.func,
  getRadius0: _propTypes2.default.func,
  getLabel: _propTypes2.default.func,
  height: _propTypes2.default.number.isRequired,
  labelsAboveChildren: _propTypes2.default.bool,
  labelsStyle: _propTypes2.default.object,
  margin: _chartUtils.MarginPropType,
  onValueClick: _propTypes2.default.func,
  onValueMouseOver: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func,
  showLabels: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  subLabel: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired
};
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  padAngle: 0,
  getAngle: function getAngle(d) {
    return d.angle;
  },
  getAngle0: function getAngle0(d) {
    return d.angle0;
  },
  getRadius: function getRadius(d) {
    return d.radius;
  },
  getRadius0: function getRadius0(d) {
    return d.radius0;
  },
  getLabel: function getLabel(d) {
    return d.label;
  },
  getSubLabel: function getSubLabel(d) {
    return d.subLabel;
  }
};

exports.default = RadialChart;