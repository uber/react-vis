'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.isSeriesChild = isSeriesChild;
exports.getSeriesChildren = getSeriesChildren;
exports.getStackedData = getStackedData;
exports.getSeriesPropsFromChildren = getSeriesPropsFromChildren;

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

    if (!result[displayName]) {
      result[displayName] = {
        sameTypeTotal: 0,
        sameTypeIndex: 0
      };
    }
    result[displayName].sameTypeTotal++;
  });
  return result;
}

/**
 * Collect the stacked data for all children in use. If the children don't have
 * the data (e.g. the child is invalid series or something else), then the child
 * is skipped.
 * Each next value of attr is equal to the previous value plus the difference
 * between attr0 and attr.
 * @param {Array} children Array of children.
 * @param {string} attr Attribute.
 * @returns {Array} New array of children for the series.
 */
function getStackedData(children, attr) {
  var childData = [];
  var prevIndex = -1;
  children.forEach(function (child, childIndex) {
    // Skip the children that are not series (e.g. don't have any data).
    if (!child) {
      childData.push(null);
      return;
    }
    var data = child.props.data;

    if (!attr || !data || !data.length) {
      childData.push(data);
      return;
    }
    var attr0 = attr + '0';
    childData.push(data.map(function (d, dIndex) {
      var _extends2;

      // In case if it's the first series don't try to override any values.
      if (prevIndex < 0) {
        return _extends({}, d);
      }
      // In case if the series is not the first, try to get the attr0 values
      // from the previous series.
      var prevD = childData[prevIndex][dIndex];
      return _extends({}, d, (_extends2 = {}, _defineProperty(_extends2, attr0, prevD[attr]), _defineProperty(_extends2, attr, prevD[attr] + d[attr] - (d[attr0] || 0)), _extends2));
    }));
    prevIndex = childIndex;
  });
  return childData;
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
        ref: 'series' + seriesIndex,
        _colorValue: _colorValue,
        _opacityValue: _opacityValue
      });
      seriesTypeInfo.sameTypeIndex++;
      seriesIndex++;
    }
    result.push(props);
  });
  return result;
}