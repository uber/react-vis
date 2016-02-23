// Copyright (c) 2016 Uber Technologies, Inc.
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

import d3 from 'd3';
import React from 'react';
import warning from 'warning';

import {
  getObjectValueAccessor,
  getUniquePropertyValues,
  isObjectPropertyInUse,
  addZeroToArray} from './data-utils';

/**
 * Linear scale name.
 * @type {string}
 * @const
 */
const LINEAR_SCALE_TYPE = 'linear';

/**
 * Ordinal scale name.
 * @type {string}
 * @const
 */
const ORDINAL_SCALE_TYPE = 'ordinal';

/**
 * Category scale.
 * @type {string}
 * @const
 */
const CATEGORY_SCALE_TYPE = 'category';

/**
 * Log scale name.
 * @type {string}
 * @const
 */
const LOG_SCALE_TYPE = 'log';

/**
 * Time scale name.
 * @type {string}
 * @const
 */
const TIME_SCALE_TYPE = 'time';

/**
 * Scale functions that are supported in the library.
 * @type {Object}
 * @const
 */
const SCALE_FUNCTIONS = {
  [LINEAR_SCALE_TYPE]: d3.scale.linear,
  [ORDINAL_SCALE_TYPE]: d3.scale.ordinal,
  [CATEGORY_SCALE_TYPE]: d3.scale.ordinal,
  [LOG_SCALE_TYPE]: d3.scale.log,
  [TIME_SCALE_TYPE]: d3.time.scale
};

/**
 * Find the smallest distance between the values on a given scale and return
 * the index of the element, where the smallest distance was found.
 * @param {Array} values Array of values.
 * @param {Object} scaleObject Scale object.
 * @returns {number} Index of an element where the smallest distance was found.
 * @private
 */
function _getSmallestDistanceIndex(values, scaleObject) {
  const scaleFn = _getScaleFnFromScaleObject(scaleObject);
  let result = 0;
  if (scaleFn) {
    let nextValue;
    let currentValue = scaleFn(values[1]);
    let distance = currentValue - scaleFn(values[0]);
    let nextDistance;

    for (let i = 1; i < values.length; i++) {
      nextValue = scaleFn(values[i]);
      nextDistance = Math.abs(nextValue - currentValue);
      if (distance <= nextDistance) {
        distance = nextDistance;
        result = i;
      }
      currentValue = nextValue;
    }
  }
  return result;
}

/**
 * Crate a scale function from the scale object.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale function.
 * @private
 */
function _getScaleFnFromScaleObject(scaleObject) {
  if (!scaleObject) {
    return null;
  }
  const {type, domain, range} = scaleObject;
  if (type !== ORDINAL_SCALE_TYPE) {
    return SCALE_FUNCTIONS[type]().domain(domain).range(range);
  }
  return SCALE_FUNCTIONS[type]().domain(domain).rangePoints(range, 1);
}

/**
 * Get the domain from the array of data.
 * @param {Array} allData All data.
 * @param {string} attr Property name.
 * @param {string} type Scale type.
 * @returns {Array} Domain.
 * @private
 */
function _getDomainByAttr(allData, attr, type) {
  let domain;
  const startFromZero = false;
  // const {startFromZero = false} = scaleProps;
  const valueAccessor = getObjectValueAccessor(attr);
  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    // Find the domain.
    domain = d3.extent(allData, valueAccessor);
    // Include zero to the domain in case if it's not there.
    if (startFromZero) {
      domain = addZeroToArray(domain);
    }
  } else {
    domain = d3.set(allData.map(valueAccessor)).values();
  }
  return domain;
}

/**
 * Create custom scale object from the value. When the scale is created from
 * this object, it should return the same value all time.
 * @param {string} attr Attribute.
 * @param {*} value Value.
 * @returns {Object} Custom scale object.
 * @private
 */
function _createScaleObjectForValue(attr, value) {
  return {
    type: 'linear',
    range: [value, value],
    domain: [],
    distance: 0,
    isValue: true
  };
}

/**
 * Create a regular scale object for a further use from the existing parameters.
 * @param {Array} domain Domain.
 * @param {Array} range Range.
 * @param {string} type Type.
 * @param {number} distance Distance.
 * @param {string} attr Attribute.
 * @returns {Object} Scale object.
 * @private
 */
function _createScaleObjectForFunction(domain, range, type, distance, attr) {
  return {
    domain,
    range,
    type,
    distance,
    attr,
    isValue: false
  };
}

/**
 * Get scale object from props. E. g. object like {xRange, xDomain, xDistance,
 * xType} is transformed into {range, domain, distance, type}.
 * @param {Object} props Props.
 * @param {string} attr Attribute.
 * @returns {*} Null or an object with the scale.
 * @private
 */
function _collectScaleObjectFromProps(props, attr) {
  const {_allData: data = []} = props;
  const value = props[attr];
  if (typeof value !== 'undefined') {
    return _createScaleObjectForValue(attr, value);
  }
  const filteredData = data.filter(d => d);
  const allData = [].concat(...filteredData);
  const range = props[`${attr}Range`];
  if (!range || !allData.length || !isObjectPropertyInUse(allData, attr)) {
    return null;
  }
  const distance = props[`${attr}Distance`] || 0;
  const type = props[`${attr}Type`] || LINEAR_SCALE_TYPE;
  const domain = props[`${attr}Domain`] || _getDomainByAttr(
      allData,
      attr,
      type
    );
  return _createScaleObjectForFunction(domain, range, type, distance, attr);
}

/**
 * Get the distance, the smallest and the largest value of the domain.
 * @param {Array} data Array of data for the single series.
 * @param {Object} scaleObject Scale object.
 * @returns {{domain0: number, domainN: number, distance: number}} Resuylt.
 * @private
 */
function _getScaleDistanceAndAdjustedDomain(data, scaleObject) {
  const {attr, domain} = scaleObject;
  const values = getUniquePropertyValues(data, attr);
  const index = _getSmallestDistanceIndex(values, scaleObject);
  let distance = 0;
  const adjustedDomain = [].concat(domain);

  adjustedDomain[0] -= (values[1] - values[0]) / 2;
  adjustedDomain[adjustedDomain.length - 1] += (values[values.length - 1] -
    values[values.length - 2]) / 2;
  // Fix log scale if it's too small.
  if (scaleObject.type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }

  const adjustedScaleFn = _getScaleFnFromScaleObject({
    ...scaleObject,
    domain: adjustedDomain
  });
  if (index) {
    distance = Math.abs(adjustedScaleFn(values[index]) -
      adjustedScaleFn(values[index - 1]));
  }

  return {
    domain0: adjustedDomain[0],
    domainN: adjustedDomain[adjustedDomain.length - 1],
    distance
  };
}

/**
 * Returns true if scale adjustments are possible for a given scale.
 * @param {Object} props Props.
 * @param {Object} scaleObject Scale object.
  * @returns {boolean} True if scale adjustments possible.
 * @private
 */
function _isScaleAdjustmentPossible(props, scaleObject) {
  const {
    type,
    attr} = scaleObject;
  const {
    _adjustBy: adjustBy = [],
    _adjustWhat: adjustWhat = []} = props;

  // The scale cannot be adjusted if there's no attributes to adjust, no
  // suitable values
  return adjustWhat.length &&
    adjustBy.length &&
    adjustBy.indexOf(attr) !== -1 &&
    type !== ORDINAL_SCALE_TYPE &&
    type !== CATEGORY_SCALE_TYPE;
}

/**
 * Retrieve a scale object or a value from the properties passed.
 * @param {Object} props Object of props.
 * @param {string} attr Attribute.
 * @returns {*} Scale object, value or null.
 */
export function getScaleObjectFromProps(props, attr) {
  // Create the initial scale object.
  const scaleObject = _collectScaleObjectFromProps(props, attr);

  if (!scaleObject) {
    return null;
  }

  // Make sure if it's possible to add space to the scale object. If not,
  // return the object immediately.
  if (!_isScaleAdjustmentPossible(props, scaleObject)) {
    return scaleObject;
  }

  const {
    _allData: allSeriesData,
    _adjustWhat: adjustWhat = []} = props;

  // Assign the initial values.
  const domainLength = scaleObject.domain.length;
  let scaleDomain0 = scaleObject.domain[0];
  let scaleDomainN = scaleObject.domain[domainLength - 1];
  let scaleDistance = scaleObject.distance;

  // Find the smallest left position of the domain, the largest right position
  // of the domain and the best distance for them.
  allSeriesData.forEach((data, index) => {
    if (adjustWhat.indexOf(index) === -1) {
      return;
    }
    if (data && data.length) {
      const {
        domain0,
        domainN,
        distance} = _getScaleDistanceAndAdjustedDomain(data, scaleObject);
      scaleDomain0 = Math.min(scaleDomain0, domain0);
      scaleDomainN = Math.max(scaleDomainN, domainN);
      scaleDistance = Math.max(scaleDistance, distance);
    }
  });

  scaleObject.domain[0] = scaleDomain0;
  scaleObject.domain[domainLength - 1] = scaleDomainN;
  scaleObject.distance = scaleDistance;

  return scaleObject;
}

/**
 * Get d3 scale for a given prop.
 * @param {Object} props Props.
 * @param {string} attr Attribute.
 * @returns {function} d3 scale function.
 */
export function getAttributeScale(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  return _getScaleFnFromScaleObject(scaleObject);
}

/**
 * Get prop functor (either a value or a function) for a given attribute.
 * @param {Object} props Series props.
 * @param {string} attr Property name.
 * @returns {*} Function or value.
 */
export function getAttributeFunctor(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  const fallbackValue = props[`_${attr}Value`];
  if (scaleObject) {
    const scaleFn = _getScaleFnFromScaleObject(scaleObject);
    return d => scaleFn(d.data ? d.data[attr] : d[attr], d);
  }
  return fallbackValue;
}

/**
 * Tries to get the string|number value of the attr and falls back to
 * a fallback property in case if the value is a scale.
 * @param {Object} props Series props.
 * @param {string} attr Property name.
 * @returns {*} Function or value.
 */
export function getAttributeValue(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  const fallbackValue = props[`_${attr}Value`];
  if (scaleObject) {
    if (!scaleObject.isValue) {
      warning(false, `Cannot use data defined ${attr} for this series` +
        `type. Using fallback value "${fallbackValue}" instead.`);
      return fallbackValue;
    }
    return scaleObject.range[0];
  }
  return fallbackValue;
}

/**
 * Get prop types by the attribute.
 * @param {string} attr Attribute.
 * @returns {Object} Object of xDomain, xRange, xType, xDistance and _xValue,
 * where x is an attribute passed to the function.
 */
export function getScalePropTypesByAttribute(attr) {
  return {
    [`_${attr}Value`]: React.PropTypes.any,
    [`${attr}Domain`]: React.PropTypes.array,
    [`${attr}Range`]: React.PropTypes.array,
    [`${attr}Type`]: React.PropTypes.oneOf(
      Object.keys(SCALE_FUNCTIONS)
    ),
    [`${attr}Distance`]: React.PropTypes.number
  };
}
