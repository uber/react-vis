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
  getUniquePropertyValues,
  isObjectPropertyInUse,
  addValueToArray} from './data-utils';

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
  const attr0 = `${attr}0`;

  // Collect both attr and available attr0 values from the array of data.
  const values = allData.reduce((data, d) => {
    const value = d[attr];
    const value0 = d[attr0];
    data.push(value);
    if (_isDefined(value0)) {
      data.push(value0);
    }
    return data;
  }, []);

  // Create proper domain depending on the type of the scale.
  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    domain = d3.extent(values);
  } else {
    domain = d3.set(values).values();
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
  if (typeof value === 'undefined') {
    return null;
  }
  return {
    type: 'category',
    range: [value],
    domain: [],
    distance: 0,
    attr,
    baseValue: undefined,
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
 * @param {number} baseValue Base value.
 * @returns {Object} Scale object.
 * @private
 */
function _createScaleObjectForFunction(
  domain, range, type, distance, attr, baseValue) {
  return {
    domain,
    range,
    type,
    distance,
    attr,
    baseValue,
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
  const {
    _allData: data = [],
    [attr]: value,
    [`_${attr}Value`]: fallbackValue,
    [`${attr}Domain`]: initialDomain,
    [`${attr}Range`]: range,
    [`${attr}Distance`]: distance = 0,
    [`${attr}BaseValue`]: baseValue,
    [`${attr}Type`]: type = LINEAR_SCALE_TYPE} = props;

  // Return value-based scale if the value is assigned.
  if (typeof value !== 'undefined') {
    return _createScaleObjectForValue(attr, value);
  }
  const filteredData = data.filter(d => d);
  const allData = [].concat(...filteredData);

  // Make sure that the minimum necessary properties exist.
  if (!range || !allData.length || !isObjectPropertyInUse(allData, attr)) {
    // Try to use the fallback value if it is available.
    return _createScaleObjectForValue(attr, fallbackValue);
  }

  // Pick up the domain from the properties and create a new one if it's not
  // available.
  let domain = initialDomain || _getDomainByAttr(allData, attr, type);
  if (typeof baseValue !== 'undefined') {
    domain = addValueToArray(domain, baseValue);
  }

  return _createScaleObjectForFunction(
    domain,
    range,
    type,
    distance,
    attr,
    baseValue
  );
}

/**
 * Compute left domain adjustment for the given values.
 * @param {Array} values Array of values.
 * @returns {number} Domain adjustment.
 * @private
 */
function _computeLeftDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[1] - values[0]) / 2;
  }
  if (values.length === 1) {
    return values[0] - 0.5;
  }
  return 0;
}

/**
 * Compute right domain adjustment for the given values.
 * @param {Array} values Array of values.
 * @returns {number} Domain adjustment.
 * @private
 */
function _computeRightDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[values.length - 1] - values[values.length - 2]) / 2;
  }
  if (values.length === 1) {
    return values[0] - 0.5;
  }
  return 0;
}

/**
 * Compute distance for the given values.
 * @param {Array} values Array of values.
 * @param {Array} domain Domain.
 * @param {number} bestDistIndex Index of a best distance found.
 * @param {function} scaleFn Scale function.
 * @returns {number} Domain adjustment.
 * @private
 */
function _computeScaleDistance(values, domain, bestDistIndex, scaleFn) {
  if (values.length > 1) {
    // Avoid zero indexes.
    const i = Math.max(bestDistIndex, 1);
    return Math.abs(scaleFn(values[i]) - scaleFn(values[i - 1]));
  }
  if (values.length === 1) {
    return Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  }
  return 0;
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

  const adjustedDomain = [].concat(domain);

  adjustedDomain[0] -= _computeLeftDomainAdjustment(values);
  adjustedDomain[domain.length - 1] += _computeRightDomainAdjustment(values);
  // Fix log scale if it's too small.
  if (scaleObject.type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }

  const adjustedScaleFn = _getScaleFnFromScaleObject({
    ...scaleObject,
    domain: adjustedDomain
  });

  const distance = _computeScaleDistance(
    values, adjustedDomain, index, adjustedScaleFn);

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
  const {attr} = scaleObject;
  const {
    _adjustBy: adjustBy = [],
    _adjustWhat: adjustWhat = []} = props;

  // The scale cannot be adjusted if there's no attributes to adjust, no
  // suitable values
  return adjustWhat.length &&
    adjustBy.length &&
    adjustBy.indexOf(attr) !== -1;
}

/**
 * Adjust continuous scales (e.g. 'linear', 'log' and 'time') by adding the
 * space from the left and right of them and by computing the best distance.
 * @param {Object} props Props.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale object with adjustments.
 * @private
 */
function _adjustContinuousScale(props, scaleObject) {
  const {
    _allData: allSeriesData,
    _adjustWhat: adjustWhat = []} = props;

  // Assign the initial values.
  const domainLength = scaleObject.domain.length;
  const {domain} = scaleObject;
  let scaleDomain0 = domain[0];
  let scaleDomainN = domain[domainLength - 1];
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

  scaleObject.domain = [
    scaleDomain0,
    ...domain.slice(1, -1),
    scaleDomainN
  ];

  scaleObject.distance = scaleDistance;

  return scaleObject;
}

/**
 * Get an adjusted scale. Suitable for 'category' and 'ordinal' scales.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale object with adjustments.
 * @private
 */
function _adjustCategoricalScale(scaleObject) {
  const scaleFn = _getScaleFnFromScaleObject(scaleObject);
  const {domain, range} = scaleObject;
  if (domain.length > 1) {
    scaleObject.distance = scaleFn(domain[1]) - scaleFn(domain[0]);
  } else {
    scaleObject.distance = range[1] - range[0];
  }
  return scaleObject;
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

  const {type} = scaleObject;
  // Depending on what type the scale is, apply different adjustments. Distances
  // for the ordinal and category scales are even, equal domains cannot be
  // adjusted.
  if (type === ORDINAL_SCALE_TYPE || type === CATEGORY_SCALE_TYPE) {
    return _adjustCategoricalScale(scaleObject);
  }
  return _adjustContinuousScale(props, scaleObject);
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
 * Get the value of `attr` from the object.
 * @param {Object} d Object.
 * @param {string} attr Attribute.
 * @returns {*} Value of the point.
 * @private
 */
function _getAttrValue(d, attr) {
  return d.data ? d.data[attr] : d[attr];
}

function _isDefined(value) {
  return typeof value !== 'undefined';
}

/**
 * Get prop functor (either a value or a function) for a given attribute.
 * @param {Object} props Series props.
 * @param {string} attr Property name.
 * @returns {*} Function or value.
 */
export function getAttributeFunctor(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    const scaleFn = _getScaleFnFromScaleObject(scaleObject);
    return d => scaleFn(_getAttrValue(d, attr));
  }
  return null;
}

/**
 * Get the functor which extracts value form [attr]0 property. Use baseValue if
 * no attr0 property for a given object is defined. Fall back to domain[0] if no
 * base value is available.
 * @param {Object} props Object of props.
 * @param {string} attr Attribute name.
 * @returns {*} Function which returns value or null if no values available.
 */
export function getAttr0Functor(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    const attr0 = `${attr}0`;
    const {domain} = scaleObject;
    const {baseValue = domain[0]} = scaleObject;
    const scaleFn = _getScaleFnFromScaleObject(scaleObject);
    return d => {
      const value = _getAttrValue(d, attr0);
      return scaleFn(_isDefined(value) ? value : baseValue);
    };
  }
  return null;
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
  if (scaleObject) {
    if (!scaleObject.isValue) {
      warning(false, `Cannot use data defined ${attr} for this series` +
        `type. Using fallback value instead.`);
    }
    return scaleObject.range[0];
  }
  return null;
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
    [`${attr}Distance`]: React.PropTypes.number,
    [`${attr}BaseValue`]: React.PropTypes.any
  };
}
