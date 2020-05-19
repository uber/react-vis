// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

import {
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  scaleLog,
  scaleTime,
  scaleUtc
} from 'd3-scale';
import {extent} from 'd3-array';
import {set} from 'd3-collection';
import {hsl} from 'd3-color';

import PropTypes from 'prop-types';

import {warning} from './react-utils';
import {getUniquePropertyValues, addValueToArray} from './data-utils';

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
 * Literal scale.
 * Differs slightly from d3's identity scale in that it does not coerce value
 * into numbers, it simply returns exactly what you give it
 * @type {string}
 * @const
 */
const LITERAL_SCALE_TYPE = 'literal';

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
 * Time UTC scale name.
 * @type {string}
 * @const
 */
const TIME_UTC_SCALE_TYPE = 'time-utc';

/**
 * Scale functions that are supported in the library.
 * @type {Object}
 * @const
 */
const SCALE_FUNCTIONS = {
  [LINEAR_SCALE_TYPE]: scaleLinear,
  [ORDINAL_SCALE_TYPE]: scalePoint,
  [CATEGORY_SCALE_TYPE]: scaleOrdinal,
  [LITERAL_SCALE_TYPE]: literalScale,
  [LOG_SCALE_TYPE]: scaleLog,
  [TIME_SCALE_TYPE]: scaleTime,
  [TIME_UTC_SCALE_TYPE]: scaleUtc
};

/**
 * Attrs for which a scale can be set up at XYPlot level
 * @type {Array}
 * @const
 */

const XYPLOT_ATTR = ['color', 'fill', 'opacity', 'stroke'];

/**
 * Title case a given string
 * @param {String} str Array of values.
 * @returns {String} titlecased string
 */
function toTitleCase(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

/**
 * Find the smallest distance between the values on a given scale and return
 * the index of the element, where the smallest distance was found.
 * It returns the first occurrence of i where
 * `scale(value[i]) - scale(value[i - 1])` is minimal
 * @param {Array} values Array of values.
 * @param {Object} scaleObject Scale object.
 * @returns {number} Index of an element where the smallest distance was found.
 * @private
 */
export function _getSmallestDistanceIndex(values, scaleObject) {
  const scaleFn = getScaleFnFromScaleObject(scaleObject);
  let result = 0;
  if (scaleFn) {
    let nextValue;
    let currentValue = scaleFn(values[0]);
    let distance = Infinity;
    let nextDistance;

    for (let i = 1; i < values.length; i++) {
      nextValue = scaleFn(values[i]);
      nextDistance = Math.abs(nextValue - currentValue);
      if (nextDistance < distance) {
        distance = nextDistance;
        result = i;
      }
      currentValue = nextValue;
    }
  }
  return result;
}

/**
 * This is a workaround for issue that ordinal scale
 * does not have invert method implemented in d3-scale.
 * @param {Object} Ordinal d3-scale object.
 * @returns {void}
 * @private
 */

function addInvertFunctionToOrdinalScaleObject(scale) {
  if (scale.invert) { 
    return;
  }

  scale.invert = function invert(value) {
    const [lower, upper] = scale.range();
    const start = Math.min(lower, upper);
    const stop = Math.max(lower, upper);
    
    if (value < start + scale.padding() * scale.step()) {
      return scale.domain()[0];
    } 
    
    if (value > stop - scale.padding() * scale.step()) { 
      return scale.domain()[scale.domain().length - 1];
    }

    const index = Math.floor((value - start - scale.padding() * scale.step()) / scale.step());
    return scale.domain()[index];
  }
}

/**
 * Crate a scale function from the scale object.
 * @param {Object} scaleObject Scale object.
 - scaleObject.domain {Array}
 - scaleObject.range {Array}
 - scaleObject.type {string}
 - scaleObject.attr {string}
 * @returns {*} Scale function.
 * @private
 */
export function getScaleFnFromScaleObject(scaleObject) {
  if (!scaleObject) {
    return null;
  }
  const {type, domain, range} = scaleObject;
  const modDomain =
    domain[0] === domain[1]
      ? domain[0] === 0
        ? [-1, 0]
        : [-domain[0], domain[0]]
      : domain;
  if (type === LITERAL_SCALE_TYPE) {
    return literalScale(range[0]);
  }
  const scale = SCALE_FUNCTIONS[type]()
    .domain(modDomain)
    .range(range);
  if (type === ORDINAL_SCALE_TYPE) {
    scale.padding(0.5);
	  addInvertFunctionToOrdinalScaleObject(scale);
  }
  return scale;
}

/**
 * Get the domain from the array of data.
 * @param {Array} allData All data.
 * @param {function} accessor - accessor for main value.
 * @param {function} accessor0 - accessor for the naught value.
 * @param {string} type Scale type.
 * @returns {Array} Domain.
 * @private
 */
export function getDomainByAccessor(allData, accessor, accessor0, type) {
  let domain;

  // Collect both attr and available attr0 values from the array of data.
  const values = allData.reduce((data, d) => {
    const value = accessor(d);
    const value0 = accessor0(d);
    if (_isDefined(value)) {
      data.push(value);
    }
    if (_isDefined(value0)) {
      data.push(value0);
    }
    return data;
  }, []);

  if (!values.length) {
    return [];
  }

  // Create proper domain depending on the type of the scale.
  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    domain = extent(values);
  } else {
    domain = set(values).values();
  }
  return domain;
}

/**
 * Create custom scale object from the value. When the scale is created from
 * this object, it should return the same value all time.
 * @param {string} attr Attribute.
 * @param {*} value Value.
 * @param {string} type - the type of scale being used
 * @param {function} accessor - the accessor function
 * @param {function} accessor0 - the accessor function for the potential naught value
 * @returns {Object} Custom scale object.
 * @private
 */
function _createScaleObjectForValue(attr, value, type, accessor, accessor0) {
  if (type === LITERAL_SCALE_TYPE) {
    return {
      type: LITERAL_SCALE_TYPE,
      domain: [],
      range: [value],
      distance: 0,
      attr,
      baseValue: undefined,
      isValue: true,
      accessor,
      accessor0
    };
  }
  if (typeof value === 'undefined') {
    return null;
  }
  return {
    type: CATEGORY_SCALE_TYPE,
    range: [value],
    domain: [],
    distance: 0,
    attr,
    baseValue: undefined,
    isValue: true,
    accessor,
    accessor0
  };
}

/**
 * Create a regular scale object for a further use from the existing parameters.
 * @param {Array} domain - Domain.
 * @param {Array} range - Range.
 * @param {string} type - Type.
 * @param {number} distance - Distance.
 * @param {string} attr - Attribute.
 * @param {number} baseValue - Base value.
 * @param {function} accessor - Attribute accesor
 * @param {function} accessor0 - Attribute accesor for potential naught value
 * @returns {Object} Scale object.
 * @private
 */
function _createScaleObjectForFunction({
  domain,
  range,
  type,
  distance,
  attr,
  baseValue,
  accessor,
  accessor0
}) {
  return {
    domain,
    range,
    type,
    distance,
    attr,
    baseValue,
    isValue: false,
    accessor,
    accessor0
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
    [attr]: value,
    [`_${attr}Value`]: fallbackValue,
    [`${attr}Range`]: range,
    [`${attr}Distance`]: distance = 0,
    [`${attr}BaseValue`]: baseValue,
    [`${attr}Type`]: type = LINEAR_SCALE_TYPE,
    [`${attr}NoFallBack`]: noFallBack,
    [`get${toTitleCase(attr)}`]: accessor = d => d[attr],
    [`get${toTitleCase(attr)}0`]: accessor0 = d => d[`${attr}0`]
  } = props;

  let {[`${attr}Domain`]: domain} = props;
  // Return value-based scale if the value is assigned.
  if (!noFallBack && typeof value !== 'undefined') {
    return _createScaleObjectForValue(
      attr,
      value,
      props[`${attr}Type`],
      accessor,
      accessor0
    );
  }
  // Pick up the domain from the properties and create a new one if it's not
  // available.
  if (typeof baseValue !== 'undefined') {
    domain = addValueToArray(domain, baseValue);
  }

  // Make sure that the minimum necessary properties exist.
  if (!range || !domain || !domain.length) {
    // Try to use the fallback value if it is available.
    return _createScaleObjectForValue(
      attr,
      fallbackValue,
      props[`${attr}Type`],
      accessor,
      accessor0
    );
  }

  return _createScaleObjectForFunction({
    domain,
    range,
    type,
    distance,
    attr,
    baseValue,
    accessor,
    accessor0
  });
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
 * Normilize array of values with a single value.
 * @param {Array} arr Array of data.
 * @param {Array} values Array of values.
 * @param {string} attr Attribute.
 * @param {string} type Type.
 * @private
 */
function _normalizeValues(data, values, accessor0, type) {
  if (type === TIME_SCALE_TYPE && values.length === 1) {
    const attr0 = accessor0(data[0]);

    return [attr0, ...values];
  }

  return values;
}

/**
 * Get the distance, the smallest and the largest value of the domain.
 * @param {Array} data Array of data for the single series.
 * @param {Object} scaleObject Scale object.
 * @returns {{domain0: number, domainN: number, distance: number}} Result.
 * @private
 */
export function _getScaleDistanceAndAdjustedDomain(data, scaleObject) {
  const {domain, type, accessor, accessor0} = scaleObject;

  const uniqueValues = getUniquePropertyValues(data, accessor);

  // Fix time scale if a data has only one value.
  const values = _normalizeValues(data, uniqueValues, accessor0, type);
  const index = _getSmallestDistanceIndex(values, scaleObject);

  const adjustedDomain = [].concat(domain);

  adjustedDomain[0] -= _computeLeftDomainAdjustment(values);
  adjustedDomain[domain.length - 1] += _computeRightDomainAdjustment(values);
  // Fix log scale if it's too small.
  if (type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }

  const adjustedScaleFn = getScaleFnFromScaleObject({
    ...scaleObject,
    domain: adjustedDomain
  });

  const distance = _computeScaleDistance(
    values,
    adjustedDomain,
    index,
    adjustedScaleFn
  );

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
  const {_adjustBy: adjustBy = [], _adjustWhat: adjustWhat = []} = props;

  // The scale cannot be adjusted if there's no attributes to adjust, no
  // suitable values
  return adjustWhat.length && adjustBy.length && adjustBy.indexOf(attr) !== -1;
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
  const {_allData: allSeriesData, _adjustWhat: adjustWhat = []} = props;

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
      const {domain0, domainN, distance} = _getScaleDistanceAndAdjustedDomain(
        data,
        scaleObject
      );
      scaleDomain0 = Math.min(scaleDomain0, domain0);
      scaleDomainN = Math.max(scaleDomainN, domainN);
      scaleDistance = Math.max(scaleDistance, distance);
    }
  });

  scaleObject.domain = [scaleDomain0, ...domain.slice(1, -1), scaleDomainN];

  scaleObject.distance = scaleDistance;

  return scaleObject;
}

/**
 * Get an adjusted scale. Suitable for 'category' and 'ordinal' scales.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale object with adjustments.
 * @private
 */
export function _adjustCategoricalScale(scaleObject) {
  const scaleFn = getScaleFnFromScaleObject(scaleObject);
  const {domain, range} = scaleObject;
  if (domain.length > 1) {
    scaleObject.distance = Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  } else {
    scaleObject.distance = Math.abs(range[1] - range[0]);
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
  return getScaleFnFromScaleObject(scaleObject);
}

/**
 * Get the value of `attr` from the object.
 * @param {Object} d - data Object.
 * @param {Function} accessor - accessor function.
 * @returns {*} Value of the point.
 * @private
 */
function _getAttrValue(d, accessor) {
  return accessor(d.data ? d.data : d);
}

function _isDefined(value) {
  return typeof value !== 'undefined';
}

/*
 * Adds a percentage of padding to a given domain
 * @param {Array} domain X or Y domain to pad.
 * @param {Number} padding Percentage of padding to add to domain
 * @returns {Array} Padded Domain
 */
function _padDomain(domain, padding) {
  if (!domain) {
    return domain;
  }
  if (isNaN(parseFloat(domain[0])) || isNaN(parseFloat(domain[1]))) {
    return domain;
  }
  const [min, max] = domain;
  const domainPadding = (max - min) * (padding * 0.01);
  return [min - domainPadding, max + domainPadding];
}

/**
 * Get prop functor (either a value or a function) for a given attribute.
 * @param {Object} props Series props.
 * @param {Function} accessor - Property accessor.
 * @returns {*} Function or value.
 */
export function getAttributeFunctor(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    const scaleFn = getScaleFnFromScaleObject(scaleObject);
    return d => scaleFn(_getAttrValue(d, scaleObject.accessor));
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
    const {domain} = scaleObject;
    const {baseValue = domain[0]} = scaleObject;
    const scaleFn = getScaleFnFromScaleObject(scaleObject);
    return d => {
      const value = _getAttrValue(d, scaleObject.accessor0);
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
    if (!scaleObject.isValue && props[`_${attr}Value`] === undefined) {
      warning(
        `[React-vis] Cannot use data defined ${attr} for this ` +
          'series type. Using fallback value instead.'
      );
    }
    return props[`_${attr}Value`] || scaleObject.range[0];
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
    [`_${attr}Value`]: PropTypes.any,
    [`${attr}Domain`]: PropTypes.array,
    [`get${toTitleCase(attr)}`]: PropTypes.func,
    [`get${toTitleCase(attr)}0`]: PropTypes.func,
    [`${attr}Range`]: PropTypes.array,
    [`${attr}Type`]: PropTypes.oneOf(Object.keys(SCALE_FUNCTIONS)),
    [`${attr}Distance`]: PropTypes.number,
    [`${attr}BaseValue`]: PropTypes.any
  };
}

/**
 * Extract the list of scale properties from the entire props object.
 * @param {Object} props Props.
 * @param {Array<String>} attributes Array of attributes for the given
 * components (for instance, `['x', 'y', 'color']`).
 * @returns {Object} Collected props.
 */
export function extractScalePropsFromProps(props, attributes) {
  const result = {};
  Object.keys(props).forEach(key => {
    // this filtering is critical for extracting the correct accessors!
    const attr = attributes.find(a => {
      // width
      const isPlainSet = key.indexOf(a) === 0;
      // Ex: _data
      const isUnderscoreSet = key.indexOf(`_${a}`) === 0;
      // EX: getX
      const usesGet = key.indexOf(`get${toTitleCase(a)}`) === 0;
      return isPlainSet || isUnderscoreSet || usesGet;
    });
    if (!attr) {
      return;
    }
    result[key] = props[key];
  });
  return result;
}

/**
 * Extract the missing scale props from the given data and return them as
 * an object.
 * @param {Object} props Props.
 * @param {Array} data Array of all data.
 * @param {Array<String>} attributes Array of attributes for the given
 * components (for instance, `['x', 'y', 'color']`).
 * @returns {Object} Collected props.
 */
export function getMissingScaleProps(props, data, attributes) {
  const result = {};
  // Make sure that the domain is set pad it if specified
  attributes.forEach(attr => {
    if (!props[`get${toTitleCase(attr)}`]) {
      result[`get${toTitleCase(attr)}`] = d => d[attr];
    }
    if (!props[`get${toTitleCase(attr)}0`]) {
      result[`get${toTitleCase(attr)}0`] = d => d[`${attr}0`];
    }
    if (!props[`${attr}Domain`]) {
      result[`${attr}Domain`] = getDomainByAccessor(
        data,
        props[`get${toTitleCase(attr)}`] || result[`get${toTitleCase(attr)}`],
        props[`get${toTitleCase(attr)}0`] || result[`get${toTitleCase(attr)}0`],
        props[`${attr}Type`]
      );
      if (props[`${attr}Padding`]) {
        result[`${attr}Domain`] = _padDomain(
          result[`${attr}Domain`],
          props[`${attr}Padding`]
        );
      }
    }
  });

  return result;
}

/**
 * Return a d3 scale that returns the literal value that was given to it
 * @returns {function} literal scale.
 */
export function literalScale(defaultValue) {
  function scale(d) {
    if (d === undefined) {
      return defaultValue;
    }
    return d;
  }

  function response() {
    return scale;
  }

  scale.domain = response;
  scale.range = response;
  scale.unknown = response;
  scale.copy = response;

  return scale;
}

export function getFontColorFromBackground(background) {
  if (background) {
    return hsl(background).l > 0.57 ? '#222' : '#fff';
  }
  return null;
}

/**
 * Creates fallback values for series from scales defined at XYPlot level.
 * @param {Object} props Props of the XYPlot object.
 * @param {Array<Object>} children Array of components, children of XYPlot
 * @returns {Array<Object>} Collected props.
 */

export function getXYPlotValues(props, children) {
  const XYPlotScales = XYPLOT_ATTR.reduce((prev, attr) => {
    const {
      [`${attr}Domain`]: domain,
      [`${attr}Range`]: range,
      [`${attr}Type`]: type
    } = props;

    if (domain && range && type) {
      return {
        ...prev,
        [attr]: SCALE_FUNCTIONS[type]()
          .domain(domain)
          .range(range)
      };
    }
    return prev;
  }, {});

  return children.map(child =>
    XYPLOT_ATTR.reduce((prev, attr) => {
      if (child.props && child.props[attr] !== undefined) {
        const scaleInput = child.props[attr];
        const scale = XYPlotScales[attr];
        const fallbackValue = scale ? scale(scaleInput) : scaleInput;
        return {
          ...prev,
          [`_${attr}Value`]: fallbackValue
        };
      }
      return prev;
    }, {})
  );
}

const OPTIONAL_SCALE_PROPS = ['Padding'];
const OPTIONAL_SCALE_PROPS_REGS = OPTIONAL_SCALE_PROPS.map(
  str => new RegExp(`${str}$`, 'i')
);
/**
 * Get the list of optional scale-related settings for XYPlot
 * mostly just used to find padding properties
 * @param {Object} props Object of props.
 * @returns {Object} Optional Props.
 * @private
 */
export function getOptionalScaleProps(props) {
  return Object.keys(props).reduce((acc, prop) => {
    const propIsNotOptional = OPTIONAL_SCALE_PROPS_REGS.every(
      reg => !prop.match(reg)
    );
    if (propIsNotOptional) {
      return acc;
    }
    acc[prop] = props[prop];
    return acc;
  }, {});
}

export default {
  extractScalePropsFromProps,
  getAttributeScale,
  getAttributeFunctor,
  getAttr0Functor,
  getAttributeValue,
  getDomainByAccessor,
  getFontColorFromBackground,
  getMissingScaleProps,
  getOptionalScaleProps,
  getScaleObjectFromProps,
  getScalePropTypesByAttribute,
  getXYPlotValues,
  literalScale
};
