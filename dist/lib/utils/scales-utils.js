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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvc2NhbGVzLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQWlHZ0IseUIsR0FBQSx5QjtRQTRWQSx1QixHQUFBLHVCO1FBOEJBLGlCLEdBQUEsaUI7UUEwQkEsbUIsR0FBQSxtQjtRQWlCQSxlLEdBQUEsZTtRQXNCQSxpQixHQUFBLGlCO1FBa0JBLDRCLEdBQUEsNEI7O0FBMWhCaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsSUFBTSxvQkFBb0IsUUFBMUI7Ozs7Ozs7QUFPQSxJQUFNLHFCQUFxQixTQUEzQjs7Ozs7OztBQU9BLElBQU0sc0JBQXNCLFVBQTVCOzs7Ozs7O0FBT0EsSUFBTSxpQkFBaUIsS0FBdkI7Ozs7Ozs7QUFPQSxJQUFNLGtCQUFrQixNQUF4Qjs7Ozs7OztBQU9BLElBQU0sc0JBQXNCLFVBQTVCOzs7Ozs7O0FBT0EsSUFBTSw0RUFDSCxpQkFERyxFQUNpQixrQkFBUSxXQUR6QixxQ0FFSCxrQkFGRyxFQUVrQixrQkFBUSxVQUYxQixxQ0FHSCxtQkFIRyxFQUdtQixrQkFBUSxZQUgzQixxQ0FJSCxjQUpHLEVBSWMsa0JBQVEsUUFKdEIscUNBS0gsZUFMRyxFQUtlLGtCQUFRLFNBTHZCLHFDQU1ILG1CQU5HLEVBTW1CLGtCQUFRLFFBTjNCLG9CQUFOOzs7Ozs7Ozs7Ozs7QUFtQk8sU0FBUyx5QkFBVCxDQUFtQyxNQUFuQyxFQUEyQyxXQUEzQyxFQUF3RDtBQUM3RCxNQUFNLFVBQVUsMkJBQTJCLFdBQTNCLENBQWhCO0FBQ0EsTUFBSSxTQUFTLENBQWI7QUFDQSxNQUFJLE9BQUosRUFBYTtBQUNYLFFBQUksa0JBQUo7QUFDQSxRQUFJLGVBQWUsUUFBUSxPQUFPLENBQVAsQ0FBUixDQUFuQjtBQUNBLFFBQUksV0FBVyxRQUFmO0FBQ0EsUUFBSSxxQkFBSjs7QUFFQSxTQUFL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QVcsS0FBWCxJQUFvQixLQUFwQixHQUE0QixTQUFwQyxDQUFQO0FBQ0Q7QUFIRDtBQUxlOztBQUFBO0FBU2hCO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7Ozs7Ozs7OztBQVNNLFNBQVMsaUJBQVQsQ0FBMkIsS0FBM0IsRUFBa0MsSUFBbEMsRUFBd0M7QUFDN0MsTUFBTSxjQUFjLHdCQUF3QixLQUF4QixFQUErQixJQUEvQixDQUFwQjtBQUNBLE1BQUksV0FBSixFQUFpQjtBQUNmLFFBQUksQ0FBQyxZQUFZLE9BQWpCLEVBQTBCO0FBQ3hCLDZCQUFRLEtBQVIsRUFBZSw2QkFBMkIsSUFBM0IsNkRBQWY7QUFFRDtBQUNELFdBQU8sWUFBWSxLQUFaLENBQWtCLENBQWxCLENBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOzs7Ozs7OztBQVFNLFNBQVMsNEJBQVQsQ0FBc0MsSUFBdEMsRUFBNEM7QUFBQTs7QUFDakQsa0RBQ08sSUFEUCxZQUNxQixnQkFBTSxTQUFOLENBQWdCLEdBRHJDLDBCQUVNLElBRk4sYUFFcUIsZ0JBQU0sU0FBTixDQUFnQixLQUZyQywwQkFHTSxJQUhOLFlBR29CLGdCQUFNLFNBQU4sQ0FBZ0IsS0FIcEMsMEJBSU0sSUFKTixXQUltQixnQkFBTSxTQUFOLENBQWdCLEtBQWhCLENBQ2YsT0FBTyxJQUFQLENBQVksZUFBWixDQURlLENBSm5CLDBCQU9NLElBUE4sZUFPdUIsZ0JBQU0sU0FBTixDQUFnQixNQVB2QywwQkFRTSxJQVJOLGdCQVF3QixnQkFBTSxTQUFOLENBQWdCLEdBUnhDO0FBVUQiLCJmaWxlIjoic2NhbGVzLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGQzU2NhbGUgZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IGQzQXJyYXkgZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IGQzQ29sbGVjdGlvbiBmcm9tICdkMy1jb2xsZWN0aW9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuaW1wb3J0IHtcbiAgZ2V0VW5pcXVlUHJvcGVydHlWYWx1ZXMsXG4gIGlzT2JqZWN0UHJvcGVydHlJblVzZSxcbiAgYWRkVmFsdWVUb0FycmF5fSBmcm9tICcuL2RhdGEtdXRpbHMnO1xuXG4vKipcbiAqIExpbmVhciBzY2FsZSBuYW1lLlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5jb25zdCBMSU5FQVJfU0NBTEVfVFlQRSA9ICdsaW5lYXInO1xuXG4vKipcbiAqIE9yZGluYWwgc2NhbGUgbmFtZS5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAY29uc3RcbiAqL1xuY29uc3QgT1JESU5BTF9TQ0FMRV9UWVBFID0gJ29yZGluYWwnO1xuXG4vKipcbiAqIENhdGVnb3J5IHNjYWxlLlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5jb25zdCBDQVRFR09SWV9TQ0FMRV9UWVBFID0gJ2NhdGVnb3J5JztcblxuLyoqXG4gKiBMb2cgc2NhbGUgbmFtZS5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAY29uc3RcbiAqL1xuY29uc3QgTE9HX1NDQUxFX1RZUEUgPSAnbG9nJztcblxuLyoqXG4gKiBUaW1lIHNjYWxlIG5hbWUuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGNvbnN0XG4gKi9cbmNvbnN0IFRJTUVfU0NBTEVfVFlQRSA9ICd0aW1lJztcblxuLyoqXG4gKiBUaW1lIFVUQyBzY2FsZSBuYW1lLlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5jb25zdCBUSU1FX1VUQ19TQ0FMRV9UWVBFID0gJ3RpbWUtdXRjJztcblxuLyoqXG4gKiBTY2FsZSBmdW5jdGlvbnMgdGhhdCBhcmUgc3VwcG9ydGVkIGluIHRoZSBsaWJyYXJ5LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBjb25zdFxuICovXG5jb25zdCBTQ0FMRV9GVU5DVElPTlMgPSB7XG4gIFtMSU5FQVJfU0NBTEVfVFlQRV06IGQzU2NhbGUuc2NhbGVMaW5lYXIsXG4gIFtPUkRJTkFMX1NDQUxFX1RZUEVdOiBkM1NjYWxlLnNjYWxlUG9pbnQsXG4gIFtDQVRFR09SWV9TQ0FMRV9UWVBFXTogZDNTY2FsZS5zY2FsZU9yZGluYWwsXG4gIFtMT0dfU0NBTEVfVFlQRV06IGQzU2NhbGUuc2NhbGVMb2csXG4gIFtUSU1FX1NDQUxFX1RZUEVdOiBkM1NjYWxlLnNjYWxlVGltZSxcbiAgW1RJTUVfVVRDX1NDQUxFX1RZUEVdOiBkM1NjYWxlLnNjYWxlVXRjXG59O1xuXG4vKipcbiAqIEZpbmQgdGhlIHNtYWxsZXN0IGRpc3RhbmNlIGJldHdlZW4gdGhlIHZhbHVlcyBvbiBhIGdpdmVuIHNjYWxlIGFuZCByZXR1cm5cbiAqIHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCwgd2hlcmUgdGhlIHNtYWxsZXN0IGRpc3RhbmNlIHdhcyBmb3VuZC5cbiAqIEl0IHJldHVybnMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgaSB3aGVyZVxuICogYHNjYWxlKHZhbHVlW2ldKSAtIHNjYWxlKHZhbHVlW2kgLSAxXSlgIGlzIG1pbmltYWxcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBBcnJheSBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc2NhbGVPYmplY3QgU2NhbGUgb2JqZWN0LlxuICogQHJldHVybnMge251bWJlcn0gSW5kZXggb2YgYW4gZWxlbWVudCB3aGVyZSB0aGUgc21hbGxlc3QgZGlzdGFuY2Ugd2FzIGZvdW5kLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9nZXRTbWFsbGVzdERpc3RhbmNlSW5kZXgodmFsdWVzLCBzY2FsZU9iamVjdCkge1xuICBjb25zdCBzY2FsZUZuID0gX2dldFNjYWxlRm5Gcm9tU2NhbGVPYmplY3Qoc2NhbGVPYmplY3QpO1xuICBsZXQgcmVzdWx0ID0gMDtcbiAgaWYgKHNjYWxlRm4pIHtcbiAgICBsZXQgbmV4dFZhbHVlO1xuICAgIGxldCBjdXJyZW50VmFsdWUgPSBzY2FsZUZuKHZhbHVlc1swXSk7XG4gICAgbGV0IGRpc3RhbmNlID0gSW5maW5pdHk7XG4gICAgbGV0IG5leHREaXN0YW5jZTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXh0VmFsdWUgPSBzY2FsZUZuKHZhbHVlc1tpXSk7XG4gICAgICBuZXh0RGlzdGFuY2UgPSBNYXRoLmFicyhuZXh0VmFsdWUgLSBjdXJyZW50VmFsdWUpO1xuICAgICAgaWYgKG5leHREaXN0YW5jZSA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gbmV4dERpc3RhbmNlO1xuICAgICAgICByZXN1bHQgPSBpO1xuICAgICAgfVxuICAgICAgY3VycmVudFZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyYXRlIGEgc2NhbGUgZnVuY3Rpb24gZnJvbSB0aGUgc2NhbGUgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNjYWxlT2JqZWN0IFNjYWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHsqfSBTY2FsZSBmdW5jdGlvbi5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9nZXRTY2FsZUZuRnJvbVNjYWxlT2JqZWN0KHNjYWxlT2JqZWN0KSB7XG4gIGlmICghc2NhbGVPYmplY3QpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCB7dHlwZSwgZG9tYWluLCByYW5nZX0gPSBzY2FsZU9iamVjdDtcbiAgY29uc3Qgc2NhbGUgPSBTQ0FMRV9GVU5DVElPTlNbdHlwZV0oKS5kb21haW4oZG9tYWluKS5yYW5nZShyYW5nZSk7XG4gIGlmICh0eXBlID09PSBPUkRJTkFMX1NDQUxFX1RZUEUpIHtcbiAgICBzY2FsZS5wYWRkaW5nKDAuNSk7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZG9tYWluIGZyb20gdGhlIGFycmF5IG9mIGRhdGEuXG4gKiBAcGFyYW0ge0FycmF5fSBhbGxEYXRhIEFsbCBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFNjYWxlIHR5cGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IERvbWFpbi5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9nZXREb21haW5CeUF0dHIoYWxsRGF0YSwgYXR0ciwgdHlwZSkge1xuICBsZXQgZG9tYWluO1xuICBjb25zdCBhdHRyMCA9IGAke2F0dHJ9MGA7XG5cbiAgLy8gQ29sbGVjdCBib3RoIGF0dHIgYW5kIGF2YWlsYWJsZSBhdHRyMCB2YWx1ZXMgZnJvbSB0aGUgYXJyYXkgb2YgZGF0YS5cbiAgY29uc3QgdmFsdWVzID0gYWxsRGF0YS5yZWR1Y2UoKGRhdGEsIGQpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGRbYXR0cl07XG4gICAgY29uc3QgdmFsdWUwID0gZFthdHRyMF07XG4gICAgZGF0YS5wdXNoKHZhbHVlKTtcbiAgICBpZiAoX2lzRGVmaW5lZCh2YWx1ZTApKSB7XG4gICAgICBkYXRhLnB1c2godmFsdWUwKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sIFtdKTtcblxuICAvLyBDcmVhdGUgcHJvcGVyIGRvbWFpbiBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgdGhlIHNjYWxlLlxuICBpZiAodHlwZSAhPT0gT1JESU5BTF9TQ0FMRV9UWVBFICYmIHR5cGUgIT09IENBVEVHT1JZX1NDQUxFX1RZUEUpIHtcbiAgICBkb21haW4gPSBkM0FycmF5LmV4dGVudCh2YWx1ZXMpO1xuICB9IGVsc2Uge1xuICAgIGRvbWFpbiA9IGQzQ29sbGVjdGlvbi5zZXQodmFsdWVzKS52YWx1ZXMoKTtcbiAgfVxuICByZXR1cm4gZG9tYWluO1xufVxuXG4vKipcbiAqIENyZWF0ZSBjdXN0b20gc2NhbGUgb2JqZWN0IGZyb20gdGhlIHZhbHVlLiBXaGVuIHRoZSBzY2FsZSBpcyBjcmVhdGVkIGZyb21cbiAqIHRoaXMgb2JqZWN0LCBpdCBzaG91bGQgcmV0dXJuIHRoZSBzYW1lIHZhbHVlIGFsbCB0aW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEN1c3RvbSBzY2FsZSBvYmplY3QuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfY3JlYXRlU2NhbGVPYmplY3RGb3JWYWx1ZShhdHRyLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICByYW5nZTogW3ZhbHVlXSxcbiAgICBkb21haW46IFtdLFxuICAgIGRpc3RhbmNlOiAwLFxuICAgIGF0dHIsXG4gICAgYmFzZVZhbHVlOiB1bmRlZmluZWQsXG4gICAgaXNWYWx1ZTogdHJ1ZVxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgc2NhbGUgb2JqZWN0IGZvciBhIGZ1cnRoZXIgdXNlIGZyb20gdGhlIGV4aXN0aW5nIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0FycmF5fSBkb21haW4gRG9tYWluLlxuICogQHBhcmFtIHtBcnJheX0gcmFuZ2UgUmFuZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlLlxuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIERpc3RhbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJhc2VWYWx1ZSBCYXNlIHZhbHVlLlxuICogQHJldHVybnMge09iamVjdH0gU2NhbGUgb2JqZWN0LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2NyZWF0ZVNjYWxlT2JqZWN0Rm9yRnVuY3Rpb24oXG4gIGRvbWFpbiwgcmFuZ2UsIHR5cGUsIGRpc3RhbmNlLCBhdHRyLCBiYXNlVmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBkb21haW4sXG4gICAgcmFuZ2UsXG4gICAgdHlwZSxcbiAgICBkaXN0YW5jZSxcbiAgICBhdHRyLFxuICAgIGJhc2VWYWx1ZSxcbiAgICBpc1ZhbHVlOiBmYWxzZVxuICB9O1xufVxuXG4vKipcbiAqIEdldCBzY2FsZSBvYmplY3QgZnJvbSBwcm9wcy4gRS4gZy4gb2JqZWN0IGxpa2Uge3hSYW5nZSwgeERvbWFpbiwgeERpc3RhbmNlLFxuICogeFR5cGV9IGlzIHRyYW5zZm9ybWVkIGludG8ge3JhbmdlLCBkb21haW4sIGRpc3RhbmNlLCB0eXBlfS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIEF0dHJpYnV0ZS5cbiAqIEByZXR1cm5zIHsqfSBOdWxsIG9yIGFuIG9iamVjdCB3aXRoIHRoZSBzY2FsZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9jb2xsZWN0U2NhbGVPYmplY3RGcm9tUHJvcHMocHJvcHMsIGF0dHIpIHtcbiAgY29uc3Qge1xuICAgIF9hbGxEYXRhOiBkYXRhID0gW10sXG4gICAgW2F0dHJdOiB2YWx1ZSxcbiAgICBbYF8ke2F0dHJ9VmFsdWVgXTogZmFsbGJhY2tWYWx1ZSxcbiAgICBbYCR7YXR0cn1Eb21haW5gXTogaW5pdGlhbERvbWFpbixcbiAgICBbYCR7YXR0cn1SYW5nZWBdOiByYW5nZSxcbiAgICBbYCR7YXR0cn1EaXN0YW5jZWBdOiBkaXN0YW5jZSA9IDAsXG4gICAgW2Ake2F0dHJ9QmFzZVZhbHVlYF06IGJhc2VWYWx1ZSxcbiAgICBbYCR7YXR0cn1UeXBlYF06IHR5cGUgPSBMSU5FQVJfU0NBTEVfVFlQRX0gPSBwcm9wcztcblxuICAvLyBSZXR1cm4gdmFsdWUtYmFzZWQgc2NhbGUgaWYgdGhlIHZhbHVlIGlzIGFzc2lnbmVkLlxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBfY3JlYXRlU2NhbGVPYmplY3RGb3JWYWx1ZShhdHRyLCB2YWx1ZSk7XG4gIH1cbiAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBkKTtcbiAgY29uc3QgYWxsRGF0YSA9IFtdLmNvbmNhdCguLi5maWx0ZXJlZERhdGEpO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtaW5pbXVtIG5lY2Vzc2FyeSBwcm9wZXJ0aWVzIGV4aXN0LlxuICBpZiAoIXJhbmdlIHx8ICFhbGxEYXRhLmxlbmd0aCB8fCAhaXNPYmplY3RQcm9wZXJ0eUluVXNlKGFsbERhdGEsIGF0dHIpKSB7XG4gICAgLy8gVHJ5IHRvIHVzZSB0aGUgZmFsbGJhY2sgdmFsdWUgaWYgaXQgaXMgYXZhaWxhYmxlLlxuICAgIHJldHVybiBfY3JlYXRlU2NhbGVPYmplY3RGb3JWYWx1ZShhdHRyLCBmYWxsYmFja1ZhbHVlKTtcbiAgfVxuXG4gIC8vIFBpY2sgdXAgdGhlIGRvbWFpbiBmcm9tIHRoZSBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgYSBuZXcgb25lIGlmIGl0J3Mgbm90XG4gIC8vIGF2YWlsYWJsZS5cbiAgbGV0IGRvbWFpbiA9IGluaXRpYWxEb21haW4gfHwgX2dldERvbWFpbkJ5QXR0cihhbGxEYXRhLCBhdHRyLCB0eXBlKTtcbiAgaWYgKHR5cGVvZiBiYXNlVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9tYWluID0gYWRkVmFsdWVUb0FycmF5KGRvbWFpbiwgYmFzZVZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBfY3JlYXRlU2NhbGVPYmplY3RGb3JGdW5jdGlvbihcbiAgICBkb21haW4sXG4gICAgcmFuZ2UsXG4gICAgdHlwZSxcbiAgICBkaXN0YW5jZSxcbiAgICBhdHRyLFxuICAgIGJhc2VWYWx1ZVxuICApO1xufVxuXG4vKipcbiAqIENvbXB1dGUgbGVmdCBkb21haW4gYWRqdXN0bWVudCBmb3IgdGhlIGdpdmVuIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBBcnJheSBvZiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBEb21haW4gYWRqdXN0bWVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9jb21wdXRlTGVmdERvbWFpbkFkanVzdG1lbnQodmFsdWVzKSB7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiAodmFsdWVzWzFdIC0gdmFsdWVzWzBdKSAvIDI7XG4gIH1cbiAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gdmFsdWVzWzBdIC0gMC41O1xuICB9XG4gIHJldHVybiAwO1xufVxuXG4vKipcbiAqIENvbXB1dGUgcmlnaHQgZG9tYWluIGFkanVzdG1lbnQgZm9yIHRoZSBnaXZlbiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgQXJyYXkgb2YgdmFsdWVzLlxuICogQHJldHVybnMge251bWJlcn0gRG9tYWluIGFkanVzdG1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfY29tcHV0ZVJpZ2h0RG9tYWluQWRqdXN0bWVudCh2YWx1ZXMpIHtcbiAgaWYgKHZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuICh2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdIC0gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAyXSkgLyAyO1xuICB9XG4gIGlmICh2YWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHZhbHVlc1swXSAtIDAuNTtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBDb21wdXRlIGRpc3RhbmNlIGZvciB0aGUgZ2l2ZW4gdmFsdWVzLlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIEFycmF5IG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IGRvbWFpbiBEb21haW4uXG4gKiBAcGFyYW0ge251bWJlcn0gYmVzdERpc3RJbmRleCBJbmRleCBvZiBhIGJlc3QgZGlzdGFuY2UgZm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzY2FsZUZuIFNjYWxlIGZ1bmN0aW9uLlxuICogQHJldHVybnMge251bWJlcn0gRG9tYWluIGFkanVzdG1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfY29tcHV0ZVNjYWxlRGlzdGFuY2UodmFsdWVzLCBkb21haW4sIGJlc3REaXN0SW5kZXgsIHNjYWxlRm4pIHtcbiAgaWYgKHZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgLy8gQXZvaWQgemVybyBpbmRleGVzLlxuICAgIGNvbnN0IGkgPSBNYXRoLm1heChiZXN0RGlzdEluZGV4LCAxKTtcbiAgICByZXR1cm4gTWF0aC5hYnMoc2NhbGVGbih2YWx1ZXNbaV0pIC0gc2NhbGVGbih2YWx1ZXNbaSAtIDFdKSk7XG4gIH1cbiAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoc2NhbGVGbihkb21haW5bMV0pIC0gc2NhbGVGbihkb21haW5bMF0pKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRpc3RhbmNlLCB0aGUgc21hbGxlc3QgYW5kIHRoZSBsYXJnZXN0IHZhbHVlIG9mIHRoZSBkb21haW4uXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIGRhdGEgZm9yIHRoZSBzaW5nbGUgc2VyaWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHNjYWxlT2JqZWN0IFNjYWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHt7ZG9tYWluMDogbnVtYmVyLCBkb21haW5OOiBudW1iZXIsIGRpc3RhbmNlOiBudW1iZXJ9fSBSZXN1eWx0LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2dldFNjYWxlRGlzdGFuY2VBbmRBZGp1c3RlZERvbWFpbihkYXRhLCBzY2FsZU9iamVjdCkge1xuICBjb25zdCB7YXR0ciwgZG9tYWlufSA9IHNjYWxlT2JqZWN0O1xuICBjb25zdCB2YWx1ZXMgPSBnZXRVbmlxdWVQcm9wZXJ0eVZhbHVlcyhkYXRhLCBhdHRyKTtcbiAgY29uc3QgaW5kZXggPSBfZ2V0U21hbGxlc3REaXN0YW5jZUluZGV4KHZhbHVlcywgc2NhbGVPYmplY3QpO1xuXG4gIGNvbnN0IGFkanVzdGVkRG9tYWluID0gW10uY29uY2F0KGRvbWFpbik7XG5cbiAgYWRqdXN0ZWREb21haW5bMF0gLT0gX2NvbXB1dGVMZWZ0RG9tYWluQWRqdXN0bWVudCh2YWx1ZXMpO1xuICBhZGp1c3RlZERvbWFpbltkb21haW4ubGVuZ3RoIC0gMV0gKz0gX2NvbXB1dGVSaWdodERvbWFpbkFkanVzdG1lbnQodmFsdWVzKTtcbiAgLy8gRml4IGxvZyBzY2FsZSBpZiBpdCdzIHRvbyBzbWFsbC5cbiAgaWYgKHNjYWxlT2JqZWN0LnR5cGUgPT09IExPR19TQ0FMRV9UWVBFICYmIGRvbWFpblswXSA8PSAwKSB7XG4gICAgYWRqdXN0ZWREb21haW5bMF0gPSBNYXRoLm1pbihkb21haW5bMV0gLyAxMCwgMSk7XG4gIH1cblxuICBjb25zdCBhZGp1c3RlZFNjYWxlRm4gPSBfZ2V0U2NhbGVGbkZyb21TY2FsZU9iamVjdCh7XG4gICAgLi4uc2NhbGVPYmplY3QsXG4gICAgZG9tYWluOiBhZGp1c3RlZERvbWFpblxuICB9KTtcblxuICBjb25zdCBkaXN0YW5jZSA9IF9jb21wdXRlU2NhbGVEaXN0YW5jZShcbiAgICB2YWx1ZXMsIGFkanVzdGVkRG9tYWluLCBpbmRleCwgYWRqdXN0ZWRTY2FsZUZuKTtcblxuICByZXR1cm4ge1xuICAgIGRvbWFpbjA6IGFkanVzdGVkRG9tYWluWzBdLFxuICAgIGRvbWFpbk46IGFkanVzdGVkRG9tYWluW2FkanVzdGVkRG9tYWluLmxlbmd0aCAtIDFdLFxuICAgIGRpc3RhbmNlXG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHNjYWxlIGFkanVzdG1lbnRzIGFyZSBwb3NzaWJsZSBmb3IgYSBnaXZlbiBzY2FsZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2FsZU9iamVjdCBTY2FsZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBzY2FsZSBhZGp1c3RtZW50cyBwb3NzaWJsZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9pc1NjYWxlQWRqdXN0bWVudFBvc3NpYmxlKHByb3BzLCBzY2FsZU9iamVjdCkge1xuICBjb25zdCB7YXR0cn0gPSBzY2FsZU9iamVjdDtcbiAgY29uc3Qge1xuICAgIF9hZGp1c3RCeTogYWRqdXN0QnkgPSBbXSxcbiAgICBfYWRqdXN0V2hhdDogYWRqdXN0V2hhdCA9IFtdfSA9IHByb3BzO1xuXG4gIC8vIFRoZSBzY2FsZSBjYW5ub3QgYmUgYWRqdXN0ZWQgaWYgdGhlcmUncyBubyBhdHRyaWJ1dGVzIHRvIGFkanVzdCwgbm9cbiAgLy8gc3VpdGFibGUgdmFsdWVzXG4gIHJldHVybiBhZGp1c3RXaGF0Lmxlbmd0aCAmJlxuICAgIGFkanVzdEJ5Lmxlbmd0aCAmJlxuICAgIGFkanVzdEJ5LmluZGV4T2YoYXR0cikgIT09IC0xO1xufVxuXG4vKipcbiAqIEFkanVzdCBjb250aW51b3VzIHNjYWxlcyAoZS5nLiAnbGluZWFyJywgJ2xvZycgYW5kICd0aW1lJykgYnkgYWRkaW5nIHRoZVxuICogc3BhY2UgZnJvbSB0aGUgbGVmdCBhbmQgcmlnaHQgb2YgdGhlbSBhbmQgYnkgY29tcHV0aW5nIHRoZSBiZXN0IGRpc3RhbmNlLlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFByb3BzLlxuICogQHBhcmFtIHtPYmplY3R9IHNjYWxlT2JqZWN0IFNjYWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHsqfSBTY2FsZSBvYmplY3Qgd2l0aCBhZGp1c3RtZW50cy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIF9hZGp1c3RDb250aW51b3VzU2NhbGUocHJvcHMsIHNjYWxlT2JqZWN0KSB7XG4gIGNvbnN0IHtcbiAgICBfYWxsRGF0YTogYWxsU2VyaWVzRGF0YSxcbiAgICBfYWRqdXN0V2hhdDogYWRqdXN0V2hhdCA9IFtdfSA9IHByb3BzO1xuXG4gIC8vIEFzc2lnbiB0aGUgaW5pdGlhbCB2YWx1ZXMuXG4gIGNvbnN0IGRvbWFpbkxlbmd0aCA9IHNjYWxlT2JqZWN0LmRvbWFpbi5sZW5ndGg7XG4gIGNvbnN0IHtkb21haW59ID0gc2NhbGVPYmplY3Q7XG4gIGxldCBzY2FsZURvbWFpbjAgPSBkb21haW5bMF07XG4gIGxldCBzY2FsZURvbWFpbk4gPSBkb21haW5bZG9tYWluTGVuZ3RoIC0gMV07XG4gIGxldCBzY2FsZURpc3RhbmNlID0gc2NhbGVPYmplY3QuZGlzdGFuY2U7XG5cbiAgLy8gRmluZCB0aGUgc21hbGxlc3QgbGVmdCBwb3NpdGlvbiBvZiB0aGUgZG9tYWluLCB0aGUgbGFyZ2VzdCByaWdodCBwb3NpdGlvblxuICAvLyBvZiB0aGUgZG9tYWluIGFuZCB0aGUgYmVzdCBkaXN0YW5jZSBmb3IgdGhlbS5cbiAgYWxsU2VyaWVzRGF0YS5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xuICAgIGlmIChhZGp1c3RXaGF0LmluZGV4T2YoaW5kZXgpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkb21haW4wLFxuICAgICAgICBkb21haW5OLFxuICAgICAgICBkaXN0YW5jZX0gPSBfZ2V0U2NhbGVEaXN0YW5jZUFuZEFkanVzdGVkRG9tYWluKGRhdGEsIHNjYWxlT2JqZWN0KTtcbiAgICAgIHNjYWxlRG9tYWluMCA9IE1hdGgubWluKHNjYWxlRG9tYWluMCwgZG9tYWluMCk7XG4gICAgICBzY2FsZURvbWFpbk4gPSBNYXRoLm1heChzY2FsZURvbWFpbk4sIGRvbWFpbk4pO1xuICAgICAgc2NhbGVEaXN0YW5jZSA9IE1hdGgubWF4KHNjYWxlRGlzdGFuY2UsIGRpc3RhbmNlKTtcbiAgICB9XG4gIH0pO1xuXG4gIHNjYWxlT2JqZWN0LmRvbWFpbiA9IFtcbiAgICBzY2FsZURvbWFpbjAsXG4gICAgLi4uZG9tYWluLnNsaWNlKDEsIC0xKSxcbiAgICBzY2FsZURvbWFpbk5cbiAgXTtcblxuICBzY2FsZU9iamVjdC5kaXN0YW5jZSA9IHNjYWxlRGlzdGFuY2U7XG5cbiAgcmV0dXJuIHNjYWxlT2JqZWN0O1xufVxuXG4vKipcbiAqIEdldCBhbiBhZGp1c3RlZCBzY2FsZS4gU3VpdGFibGUgZm9yICdjYXRlZ29yeScgYW5kICdvcmRpbmFsJyBzY2FsZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc2NhbGVPYmplY3QgU2NhbGUgb2JqZWN0LlxuICogQHJldHVybnMgeyp9IFNjYWxlIG9iamVjdCB3aXRoIGFkanVzdG1lbnRzLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2FkanVzdENhdGVnb3JpY2FsU2NhbGUoc2NhbGVPYmplY3QpIHtcbiAgY29uc3Qgc2NhbGVGbiA9IF9nZXRTY2FsZUZuRnJvbVNjYWxlT2JqZWN0KHNjYWxlT2JqZWN0KTtcbiAgY29uc3Qge2RvbWFpbiwgcmFuZ2V9ID0gc2NhbGVPYmplY3Q7XG4gIGlmIChkb21haW4ubGVuZ3RoID4gMSkge1xuICAgIHNjYWxlT2JqZWN0LmRpc3RhbmNlID0gc2NhbGVGbihkb21haW5bMV0pIC0gc2NhbGVGbihkb21haW5bMF0pO1xuICB9IGVsc2Uge1xuICAgIHNjYWxlT2JqZWN0LmRpc3RhbmNlID0gcmFuZ2VbMV0gLSByYW5nZVswXTtcbiAgfVxuICByZXR1cm4gc2NhbGVPYmplY3Q7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYSBzY2FsZSBvYmplY3Qgb3IgYSB2YWx1ZSBmcm9tIHRoZSBwcm9wZXJ0aWVzIHBhc3NlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBPYmplY3Qgb2YgcHJvcHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUuXG4gKiBAcmV0dXJucyB7Kn0gU2NhbGUgb2JqZWN0LCB2YWx1ZSBvciBudWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVPYmplY3RGcm9tUHJvcHMocHJvcHMsIGF0dHIpIHtcbiAgLy8gQ3JlYXRlIHRoZSBpbml0aWFsIHNjYWxlIG9iamVjdC5cbiAgY29uc3Qgc2NhbGVPYmplY3QgPSBfY29sbGVjdFNjYWxlT2JqZWN0RnJvbVByb3BzKHByb3BzLCBhdHRyKTtcblxuICBpZiAoIXNjYWxlT2JqZWN0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgaWYgaXQncyBwb3NzaWJsZSB0byBhZGQgc3BhY2UgdG8gdGhlIHNjYWxlIG9iamVjdC4gSWYgbm90LFxuICAvLyByZXR1cm4gdGhlIG9iamVjdCBpbW1lZGlhdGVseS5cbiAgaWYgKCFfaXNTY2FsZUFkanVzdG1lbnRQb3NzaWJsZShwcm9wcywgc2NhbGVPYmplY3QpKSB7XG4gICAgcmV0dXJuIHNjYWxlT2JqZWN0O1xuICB9XG5cbiAgY29uc3Qge3R5cGV9ID0gc2NhbGVPYmplY3Q7XG4gIC8vIERlcGVuZGluZyBvbiB3aGF0IHR5cGUgdGhlIHNjYWxlIGlzLCBhcHBseSBkaWZmZXJlbnQgYWRqdXN0bWVudHMuIERpc3RhbmNlc1xuICAvLyBmb3IgdGhlIG9yZGluYWwgYW5kIGNhdGVnb3J5IHNjYWxlcyBhcmUgZXZlbiwgZXF1YWwgZG9tYWlucyBjYW5ub3QgYmVcbiAgLy8gYWRqdXN0ZWQuXG4gIGlmICh0eXBlID09PSBPUkRJTkFMX1NDQUxFX1RZUEUgfHwgdHlwZSA9PT0gQ0FURUdPUllfU0NBTEVfVFlQRSkge1xuICAgIHJldHVybiBfYWRqdXN0Q2F0ZWdvcmljYWxTY2FsZShzY2FsZU9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIF9hZGp1c3RDb250aW51b3VzU2NhbGUocHJvcHMsIHNjYWxlT2JqZWN0KTtcbn1cblxuLyoqXG4gKiBHZXQgZDMgc2NhbGUgZm9yIGEgZ2l2ZW4gcHJvcC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIEF0dHJpYnV0ZS5cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gZDMgc2NhbGUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVTY2FsZShwcm9wcywgYXR0cikge1xuICBjb25zdCBzY2FsZU9iamVjdCA9IGdldFNjYWxlT2JqZWN0RnJvbVByb3BzKHByb3BzLCBhdHRyKTtcbiAgcmV0dXJuIF9nZXRTY2FsZUZuRnJvbVNjYWxlT2JqZWN0KHNjYWxlT2JqZWN0KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZhbHVlIG9mIGBhdHRyYCBmcm9tIHRoZSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gZCBPYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUuXG4gKiBAcmV0dXJucyB7Kn0gVmFsdWUgb2YgdGhlIHBvaW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2dldEF0dHJWYWx1ZShkLCBhdHRyKSB7XG4gIHJldHVybiBkLmRhdGEgPyBkLmRhdGFbYXR0cl0gOiBkW2F0dHJdO1xufVxuXG5mdW5jdGlvbiBfaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIEdldCBwcm9wIGZ1bmN0b3IgKGVpdGhlciBhIHZhbHVlIG9yIGEgZnVuY3Rpb24pIGZvciBhIGdpdmVuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBTZXJpZXMgcHJvcHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBQcm9wZXJ0eSBuYW1lLlxuICogQHJldHVybnMgeyp9IEZ1bmN0aW9uIG9yIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXR0cmlidXRlRnVuY3Rvcihwcm9wcywgYXR0cikge1xuICBjb25zdCBzY2FsZU9iamVjdCA9IGdldFNjYWxlT2JqZWN0RnJvbVByb3BzKHByb3BzLCBhdHRyKTtcbiAgaWYgKHNjYWxlT2JqZWN0KSB7XG4gICAgY29uc3Qgc2NhbGVGbiA9IF9nZXRTY2FsZUZuRnJvbVNjYWxlT2JqZWN0KHNjYWxlT2JqZWN0KTtcbiAgICByZXR1cm4gZCA9PiBzY2FsZUZuKF9nZXRBdHRyVmFsdWUoZCwgYXR0cikpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZnVuY3RvciB3aGljaCBleHRyYWN0cyB2YWx1ZSBmb3JtIFthdHRyXTAgcHJvcGVydHkuIFVzZSBiYXNlVmFsdWUgaWZcbiAqIG5vIGF0dHIwIHByb3BlcnR5IGZvciBhIGdpdmVuIG9iamVjdCBpcyBkZWZpbmVkLiBGYWxsIGJhY2sgdG8gZG9tYWluWzBdIGlmIG5vXG4gKiBiYXNlIHZhbHVlIGlzIGF2YWlsYWJsZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBPYmplY3Qgb2YgcHJvcHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAqIEByZXR1cm5zIHsqfSBGdW5jdGlvbiB3aGljaCByZXR1cm5zIHZhbHVlIG9yIG51bGwgaWYgbm8gdmFsdWVzIGF2YWlsYWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHIwRnVuY3Rvcihwcm9wcywgYXR0cikge1xuICBjb25zdCBzY2FsZU9iamVjdCA9IGdldFNjYWxlT2JqZWN0RnJvbVByb3BzKHByb3BzLCBhdHRyKTtcbiAgaWYgKHNjYWxlT2JqZWN0KSB7XG4gICAgY29uc3QgYXR0cjAgPSBgJHthdHRyfTBgO1xuICAgIGNvbnN0IHtkb21haW59ID0gc2NhbGVPYmplY3Q7XG4gICAgY29uc3Qge2Jhc2VWYWx1ZSA9IGRvbWFpblswXX0gPSBzY2FsZU9iamVjdDtcbiAgICBjb25zdCBzY2FsZUZuID0gX2dldFNjYWxlRm5Gcm9tU2NhbGVPYmplY3Qoc2NhbGVPYmplY3QpO1xuICAgIHJldHVybiBkID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gX2dldEF0dHJWYWx1ZShkLCBhdHRyMCk7XG4gICAgICByZXR1cm4gc2NhbGVGbihfaXNEZWZpbmVkKHZhbHVlKSA/IHZhbHVlIDogYmFzZVZhbHVlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFRyaWVzIHRvIGdldCB0aGUgc3RyaW5nfG51bWJlciB2YWx1ZSBvZiB0aGUgYXR0ciBhbmQgZmFsbHMgYmFjayB0b1xuICogYSBmYWxsYmFjayBwcm9wZXJ0eSBpbiBjYXNlIGlmIHRoZSB2YWx1ZSBpcyBhIHNjYWxlLlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFNlcmllcyBwcm9wcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIFByb3BlcnR5IG5hbWUuXG4gKiBAcmV0dXJucyB7Kn0gRnVuY3Rpb24gb3IgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVWYWx1ZShwcm9wcywgYXR0cikge1xuICBjb25zdCBzY2FsZU9iamVjdCA9IGdldFNjYWxlT2JqZWN0RnJvbVByb3BzKHByb3BzLCBhdHRyKTtcbiAgaWYgKHNjYWxlT2JqZWN0KSB7XG4gICAgaWYgKCFzY2FsZU9iamVjdC5pc1ZhbHVlKSB7XG4gICAgICB3YXJuaW5nKGZhbHNlLCBgQ2Fubm90IHVzZSBkYXRhIGRlZmluZWQgJHthdHRyfSBmb3IgdGhpcyBzZXJpZXNgICtcbiAgICAgICAgYHR5cGUuIFVzaW5nIGZhbGxiYWNrIHZhbHVlIGluc3RlYWQuYCk7XG4gICAgfVxuICAgIHJldHVybiBzY2FsZU9iamVjdC5yYW5nZVswXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgcHJvcCB0eXBlcyBieSB0aGUgYXR0cmlidXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlLlxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IG9mIHhEb21haW4sIHhSYW5nZSwgeFR5cGUsIHhEaXN0YW5jZSBhbmQgX3hWYWx1ZSxcbiAqIHdoZXJlIHggaXMgYW4gYXR0cmlidXRlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZVByb3BUeXBlc0J5QXR0cmlidXRlKGF0dHIpIHtcbiAgcmV0dXJuIHtcbiAgICBbYF8ke2F0dHJ9VmFsdWVgXTogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgICBbYCR7YXR0cn1Eb21haW5gXTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgIFtgJHthdHRyfVJhbmdlYF06IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICBbYCR7YXR0cn1UeXBlYF06IFJlYWN0LlByb3BUeXBlcy5vbmVPZihcbiAgICAgIE9iamVjdC5rZXlzKFNDQUxFX0ZVTkNUSU9OUylcbiAgICApLFxuICAgIFtgJHthdHRyfURpc3RhbmNlYF06IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgW2Ake2F0dHJ9QmFzZVZhbHVlYF06IFJlYWN0LlByb3BUeXBlcy5hbnlcbiAgfTtcbn1cbiJdfQ==