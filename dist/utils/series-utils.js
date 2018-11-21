'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANIMATED_SERIES_PROPS = undefined;

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

exports.isSeriesChild = isSeriesChild;
exports.getSeriesChildren = getSeriesChildren;
exports.getStackedData = getStackedData;
exports.getSeriesPropsFromChildren = getSeriesPropsFromChildren;
exports.getRadialDomain = getRadialDomain;
exports.getStackParams = getStackParams;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _abstractSeries = require('../plot/series/abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Check if the component is series or not.
 * @param {React.Component} child Component.
 * @returns {boolean} True if the child is series, false otherwise.
 */
function isSeriesChild(child) {
  var prototype = child.type.prototype;

  return prototype instanceof _abstractSeries2.default;
}

/**
 * Get all series from the 'children' object of the component.
 * @param {Object} children Children.
 * @returns {Array} Array of children.
 */
function getSeriesChildren(children) {
  return _react2.default.Children.toArray(children).filter(function (child) {
    return child && isSeriesChild(child);
  });
}

/**
 * Collect the map of repetitions of the series type for all children.
 * @param {Array} children Array of children.
 * @returns {{}} Map of repetitions where sameTypeTotal is the total amount and
 * sameTypeIndex is always 0.
 */
function collectSeriesTypesInfo(children) {
  var result = {};
  children.filter(isSeriesChild).forEach(function (child) {
    var displayName = child.type.displayName;
    var cluster = child.props.cluster;

    if (!result[displayName]) {
      result[displayName] = {
        sameTypeTotal: 0,
        sameTypeIndex: 0,
        clusters: new Set()
      };
    }
    result[displayName].clusters.add(cluster);
    result[displayName].sameTypeTotal++;
  });
  return result;
}

/**
 * Check series to see if it has angular data that needs to be converted
 * @param {Array} data - an array of objects to check
 * @returns {Boolean} whether or not this series contains polar configuration
 */
function seriesHasAngleRadius() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (!data) {
    return false;
  }
  return data.some(function (row) {
    return row.radius && row.angle;
  });
}

/**
 * Possibly convert polar coordinates to x/y for computing domain
 * @param {Array} data - an array of objects to check
 * @param {String} attr - the property being checked
 * @returns {Boolean} whether or not this series contains polar configuration
 */
function prepareData(data) {
  if (!seriesHasAngleRadius(data)) {
    return data;
  }

  return data.map(function (row) {
    return _extends({}, row, {
      x: row.radius * Math.cos(row.angle),
      y: row.radius * Math.sin(row.angle)
    });
  });
}

/**
 * Collect the stacked data for all children in use. If the children don't have
 * the data (e.g. the child is invalid series or something else), then the child
 * is skipped.
 * Each next value of attr is equal to the previous value plus the difference
 * between attr0 and attr.
 * @param {Array} children Array of children.
 * @param {string} attr Attribute to stack by.
 * @returns {Array} New array of children for the series.
 */
function getStackedData(children, attr) {
  var areSomeSeriesStacked = children.some(function (series) {
    return series && series.props.stack;
  });
  // It stores the last segment position added to each bar, separated by cluster.
  var latestAttrPositions = {};

  return children.reduce(function (accumulator, series, seriesIndex) {
    // Skip the children that are not series (e.g. don't have any data).
    if (!series) {
      accumulator.push(null);
      return accumulator;
    }

    var _series$props = series.props,
        data = _series$props.data,
        _series$props$cluster = _series$props.cluster,
        cluster = _series$props$cluster === undefined ? 'default' : _series$props$cluster,
        stack = _series$props.stack;

    var preppedData = prepareData(data, attr);

    if (!attr || !preppedData || !preppedData.length || areSomeSeriesStacked && !stack) {
      accumulator.push(preppedData);
      return accumulator;
    }

    var attr0 = attr + '0';
    var baseAttr = attr === 'y' ? 'x' : 'y';

    accumulator.push(preppedData.map(function (d, dIndex) {
      var _extends2, _latestAttrPositions$2;

      if (!latestAttrPositions[cluster]) {
        latestAttrPositions[cluster] = {};
      }

      var prevD = latestAttrPositions[cluster][d[baseAttr]];
      // It is the first segment of a bar.
      if (!prevD) {
        var _latestAttrPositions$;

        latestAttrPositions[cluster][d[baseAttr]] = (_latestAttrPositions$ = {}, _defineProperty(_latestAttrPositions$, attr0, d[attr0]), _defineProperty(_latestAttrPositions$, attr, d[attr]), _latestAttrPositions$);

        return _extends({}, d);
      }

      // Calculate the position of the next segment in a bar.
      var nextD = _extends({}, d, (_extends2 = {}, _defineProperty(_extends2, attr0, prevD[attr]), _defineProperty(_extends2, attr, prevD[attr] + d[attr] - (d[attr0] || 0)), _extends2));

      latestAttrPositions[cluster][d[baseAttr]] = (_latestAttrPositions$2 = {}, _defineProperty(_latestAttrPositions$2, attr0, nextD[attr0]), _defineProperty(_latestAttrPositions$2, attr, nextD[attr]), _latestAttrPositions$2);

      return nextD;
    }));

    return accumulator;
  }, []);
}

/**
 * Get the list of series props for a child.
 * @param {Array} children Array of all children.
 * @returns {Array} Array of series props for each child. If a child is not a
 * series, than it's undefined.
 */
function getSeriesPropsFromChildren(children) {
  var result = [];
  var seriesTypesInfo = collectSeriesTypesInfo(children);
  var seriesIndex = 0;
  var _opacityValue = _theme.DEFAULT_OPACITY;
  children.forEach(function (child) {
    var props = void 0;
    if (isSeriesChild(child)) {
      var seriesTypeInfo = seriesTypesInfo[child.type.displayName];
      var _colorValue = _theme.DISCRETE_COLOR_RANGE[seriesIndex % _theme.DISCRETE_COLOR_RANGE.length];
      props = _extends({}, seriesTypeInfo, {
        seriesIndex: seriesIndex,
        _colorValue: _colorValue,
        _opacityValue: _opacityValue
      });
      seriesTypeInfo.sameTypeIndex++;
      seriesIndex++;
      if (child.props.cluster) {
        props.cluster = child.props.cluster;
        // Using Array.from() so we can use .indexOf
        props.clusters = Array.from(seriesTypeInfo.clusters);
        props.sameTypeTotal = props.clusters.length;
        props.sameTypeIndex = props.clusters.indexOf(child.props.cluster);
      }
    }
    result.push(props);
  });
  return result;
}

/**
 * Find the max radius value from the nodes to be rendered after they have been
 * transformed into an array
 * @param {Array} data - the tree data after it has been broken into a iterable
 * it is an array of objects!
 * @returns {number} the maximum value in coordinates for the radial variable
 */
function getRadialDomain(data) {
  return data.reduce(function (res, row) {
    return Math.max(row.radius, res);
  }, 0);
}

var ANIMATED_SERIES_PROPS = exports.ANIMATED_SERIES_PROPS = ['xRange', 'xDomain', 'x', 'yRange', 'yDomain', 'y', 'colorRange', 'colorDomain', 'color', 'opacityRange', 'opacityDomain', 'opacity', 'strokeRange', 'strokeDomain', 'stroke', 'fillRange', 'fillDomain', 'fill', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'data', 'angleDomain', 'angleRange', 'angle', 'radiusDomain', 'radiusRange', 'radius', 'innerRadiusDomain', 'innerRadiusRange', 'innerRadius'];

function getStackParams(props) {
  var _stackBy = props._stackBy,
      valuePosAttr = props.valuePosAttr,
      cluster = props.cluster;
  var _props$sameTypeTotal = props.sameTypeTotal,
      sameTypeTotal = _props$sameTypeTotal === undefined ? 1 : _props$sameTypeTotal,
      _props$sameTypeIndex = props.sameTypeIndex,
      sameTypeIndex = _props$sameTypeIndex === undefined ? 0 : _props$sameTypeIndex;

  // If bars are stacked, but not clustering, override `sameTypeTotal` and
  // `sameTypeIndex` such that bars are stacked and not staggered.

  if (_stackBy === valuePosAttr && !cluster) {
    sameTypeTotal = 1;
    sameTypeIndex = 0;
  }
  return { sameTypeTotal: sameTypeTotal, sameTypeIndex: sameTypeIndex };
}