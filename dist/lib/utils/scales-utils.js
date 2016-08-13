'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _SCALE_FUNCTIONS;

exports._getSmallestDistanceIndex = _getSmallestDistanceIndex;
exports.getScaleObjectFromProps = getScaleObjectFromProps;
exports.getAttributeScale = getAttributeScale;
exports.getAttributeFunctor = getAttributeFunctor;
exports.getAttr0Functor = getAttr0Functor;
exports.getAttributeValue = getAttributeValue;
exports.getScalePropTypesByAttribute = getScalePropTypesByAttribute;

var _d3Scale = require('d3-scale');

var _d3Scale2 = _interopRequireDefault(_d3Scale);

var _d3Array = require('d3-array');

var _d3Array2 = _interopRequireDefault(_d3Array);

var _d3Collection = require('d3-collection');

var _d3Collection2 = _interopRequireDefault(_d3Collection);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _dataUtils = require('./data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Copyright (c) 2016 Uber Technologies, Inc.
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

/**
 * Linear scale name.
 * @type {string}
 * @const
 */
var LINEAR_SCALE_TYPE = 'linear';

/**
 * Ordinal scale name.
 * @type {string}
 * @const
 */
var ORDINAL_SCALE_TYPE = 'ordinal';

/**
 * Category scale.
 * @type {string}
 * @const
 */
var CATEGORY_SCALE_TYPE = 'category';

/**
 * Log scale name.
 * @type {string}
 * @const
 */
var LOG_SCALE_TYPE = 'log';

/**
 * Time scale name.
 * @type {string}
 * @const
 */
var TIME_SCALE_TYPE = 'time';

/**
 * Time UTC scale name.
 * @type {string}
 * @const
 */
var TIME_UTC_SCALE_TYPE = 'time-utc';

/**
 * Scale functions that are supported in the library.
 * @type {Object}
 * @const
 */
var SCALE_FUNCTIONS = (_SCALE_FUNCTIONS = {}, _defineProperty(_SCALE_FUNCTIONS, LINEAR_SCALE_TYPE, _d3Scale2.default.scaleLinear), _defineProperty(_SCALE_FUNCTIONS, ORDINAL_SCALE_TYPE, _d3Scale2.default.scalePoint), _defineProperty(_SCALE_FUNCTIONS, CATEGORY_SCALE_TYPE, _d3Scale2.default.scaleOrdinal), _defineProperty(_SCALE_FUNCTIONS, LOG_SCALE_TYPE, _d3Scale2.default.scaleLog), _defineProperty(_SCALE_FUNCTIONS, TIME_SCALE_TYPE, _d3Scale2.default.scaleTime), _defineProperty(_SCALE_FUNCTIONS, TIME_UTC_SCALE_TYPE, _d3Scale2.default.scaleUtc), _SCALE_FUNCTIONS);

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
function _getSmallestDistanceIndex(values, scaleObject) {
  var scaleFn = _getScaleFnFromScaleObject(scaleObject);
  var result = 0;
  if (scaleFn) {
    var nextValue = void 0;
    var currentValue = scaleFn(values[0]);
    var distance = Infinity;
    var nextDistance = void 0;

    for (var i = 1; i < values.length; i++) {
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
 * Crate a scale function from the scale object.
 * @param {Object} scaleObject Scale object.
 * @returns {*} Scale function.
 * @private
 */
function _getScaleFnFromScaleObject(scaleObject) {
  if (!scaleObject) {
    return null;
  }
  var type = scaleObject.type;
  var domain = scaleObject.domain;
  var range = scaleObject.range;

  var scale = SCALE_FUNCTIONS[type]().domain(domain).range(range);
  if (type === ORDINAL_SCALE_TYPE) {
    scale.padding(0.5);
  }
  return scale;
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
  var domain = void 0;
  var attr0 = attr + '0';

  // Collect both attr and available attr0 values from the array of data.
  var values = allData.reduce(function (data, d) {
    var value = d[attr];
    var value0 = d[attr0];
    data.push(value);
    if (_isDefined(value0)) {
      data.push(value0);
    }
    return data;
  }, []);

  // Create proper domain depending on the type of the scale.
  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    domain = _d3Array2.default.extent(values);
  } else {
    domain = _d3Collection2.default.set(values).values();
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
    attr: attr,
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
function _createScaleObjectForFunction(domain, range, type, distance, attr, baseValue) {
  return {
    domain: domain,
    range: range,
    type: type,
    distance: distance,
    attr: attr,
    baseValue: baseValue,
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
  var _ref;

  var _props$_allData = props._allData;
  var data = _props$_allData === undefined ? [] : _props$_allData;
  var value = props[attr];
  var fallbackValue = props['_' + attr + 'Value'];
  var initialDomain = props[attr + 'Domain'];
  var range = props[attr + 'Range'];
  var _props$ = props[attr + 'Distance'];
  var distance = _props$ === undefined ? 0 : _props$;
  var baseValue = props[attr + 'BaseValue'];
  var _props$2 = props[attr + 'Type'];
  var type = _props$2 === undefined ? LINEAR_SCALE_TYPE : _props$2;

  // Return value-based scale if the value is assigned.

  if (typeof value !== 'undefined') {
    return _createScaleObjectForValue(attr, value);
  }
  var filteredData = data.filter(function (d) {
    return d;
  });
  var allData = (_ref = []).concat.apply(_ref, _toConsumableArray(filteredData));

  // Make sure that the minimum necessary properties exist.
  if (!range || !allData.length || !(0, _dataUtils.isObjectPropertyInUse)(allData, attr)) {
    // Try to use the fallback value if it is available.
    return _createScaleObjectForValue(attr, fallbackValue);
  }

  // Pick up the domain from the properties and create a new one if it's not
  // available.
  var domain = initialDomain || _getDomainByAttr(allData, attr, type);
  if (typeof baseValue !== 'undefined') {
    domain = (0, _dataUtils.addValueToArray)(domain, baseValue);
  }

  return _createScaleObjectForFunction(domain, range, type, distance, attr, baseValue);
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
    var i = Math.max(bestDistIndex, 1);
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
  var attr = scaleObject.attr;
  var domain = scaleObject.domain;

  var values = (0, _dataUtils.getUniquePropertyValues)(data, attr);
  var index = _getSmallestDistanceIndex(values, scaleObject);

  var adjustedDomain = [].concat(domain);

  adjustedDomain[0] -= _computeLeftDomainAdjustment(values);
  adjustedDomain[domain.length - 1] += _computeRightDomainAdjustment(values);
  // Fix log scale if it's too small.
  if (scaleObject.type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }

  var adjustedScaleFn = _getScaleFnFromScaleObject(_extends({}, scaleObject, {
    domain: adjustedDomain
  }));

  var distance = _computeScaleDistance(values, adjustedDomain, index, adjustedScaleFn);

  return {
    domain0: adjustedDomain[0],
    domainN: adjustedDomain[adjustedDomain.length - 1],
    distance: distance
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
  var attr = scaleObject.attr;
  var _props$_adjustBy = props._adjustBy;
  var adjustBy = _props$_adjustBy === undefined ? [] : _props$_adjustBy;
  var _props$_adjustWhat = props._adjustWhat;
  var adjustWhat = _props$_adjustWhat === undefined ? [] : _props$_adjustWhat;

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
  var allSeriesData = props._allData;
  var _props$_adjustWhat2 = props._adjustWhat;
  var adjustWhat = _props$_adjustWhat2 === undefined ? [] : _props$_adjustWhat2;

  // Assign the initial values.

  var domainLength = scaleObject.domain.length;
  var domain = scaleObject.domain;

  var scaleDomain0 = domain[0];
  var scaleDomainN = domain[domainLength - 1];
  var scaleDistance = scaleObject.distance;

  // Find the smallest left position of the domain, the largest right position
  // of the domain and the best distance for them.
  allSeriesData.forEach(function (data, index) {
    if (adjustWhat.indexOf(index) === -1) {
      return;
    }
    if (data && data.length) {
      var _getScaleDistanceAndA = _getScaleDistanceAndAdjustedDomain(data, scaleObject);

      var domain0 = _getScaleDistanceAndA.domain0;
      var domainN = _getScaleDistanceAndA.domainN;
      var distance = _getScaleDistanceAndA.distance;

      scaleDomain0 = Math.min(scaleDomain0, domain0);
      scaleDomainN = Math.max(scaleDomainN, domainN);
      scaleDistance = Math.max(scaleDistance, distance);
    }
  });

  scaleObject.domain = [scaleDomain0].concat(_toConsumableArray(domain.slice(1, -1)), [scaleDomainN]);

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
  var scaleFn = _getScaleFnFromScaleObject(scaleObject);
  var domain = scaleObject.domain;
  var range = scaleObject.range;

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
function getScaleObjectFromProps(props, attr) {
  // Create the initial scale object.
  var scaleObject = _collectScaleObjectFromProps(props, attr);

  if (!scaleObject) {
    return null;
  }

  // Make sure if it's possible to add space to the scale object. If not,
  // return the object immediately.
  if (!_isScaleAdjustmentPossible(props, scaleObject)) {
    return scaleObject;
  }

  var type = scaleObject.type;
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
function getAttributeScale(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
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
function getAttributeFunctor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    var _ret = function () {
      var scaleFn = _getScaleFnFromScaleObject(scaleObject);
      return {
        v: function v(d) {
          return scaleFn(_getAttrValue(d, attr));
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
function getAttr0Functor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    var _ret2 = function () {
      var attr0 = attr + '0';
      var domain = scaleObject.domain;
      var _scaleObject$baseValu = scaleObject.baseValue;
      var baseValue = _scaleObject$baseValu === undefined ? domain[0] : _scaleObject$baseValu;

      var scaleFn = _getScaleFnFromScaleObject(scaleObject);
      return {
        v: function v(d) {
          var value = _getAttrValue(d, attr0);
          return scaleFn(_isDefined(value) ? value : baseValue);
        }
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
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
function getAttributeValue(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    if (!scaleObject.isValue) {
      (0, _warning2.default)(false, 'Cannot use data defined ' + attr + ' for this series' + 'type. Using fallback value instead.');
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
function getScalePropTypesByAttribute(attr) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, '_' + attr + 'Value', _react2.default.PropTypes.any), _defineProperty(_ref2, attr + 'Domain', _react2.default.PropTypes.array), _defineProperty(_ref2, attr + 'Range', _react2.default.PropTypes.array), _defineProperty(_ref2, attr + 'Type', _react2.default.PropTypes.oneOf(Object.keys(SCALE_FUNCTIONS))), _defineProperty(_ref2, attr + 'Distance', _react2.default.PropTypes.number), _defineProperty(_ref2, attr + 'BaseValue', _react2.default.PropTypes.any), _ref2;
}