'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexibleXYPlot = exports.FlexibleHeightXYPlot = exports.FlexibleWidthXYPlot = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.makeHeightFlexible = makeHeightFlexible;
exports.makeVisFlexible = makeVisFlexible;
exports.makeWidthFlexible = makeWidthFlexible;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _xyPlot = require('./plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _reactUtils = require('./utils/react-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var CONTAINER_REF = 'container';

// As a performance enhancement, we want to only listen once
var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;

/**
 * Calls each subscriber, debounced to the
 */
function debounceEmitResize() {
  _window2.default.clearTimeout(timeoutId);
  timeoutId = _window2.default.setTimeout(emitResize, DEBOUNCE_DURATION);
}

/**
 * Calls each subscriber once syncronously.
 */
function emitResize() {
  resizeSubscribers.forEach(function (cb) {
    return cb();
  });
}

/**
 * Add the given callback to the list of subscribers to be caled when the
 * window resizes. Returns a function that, when called, removes the given
 * callback from the list of subscribers. This function is also resposible for
 * adding and removing the resize listener on `window`.
 *
 * @param {Function} cb - Subscriber callback function
 * @returns {Function} Unsubscribe function
 */
function subscribeToDebouncedResize(cb) {
  resizeSubscribers.push(cb);

  // if we go from zero to one Flexible components instances, add the listener
  if (resizeSubscribers.length === 1) {
    _window2.default.addEventListener('resize', debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(cb);

    // if we have no Flexible components, remove the listener
    if (resizeSubscribers.length === 0) {
      _window2.default.clearTimeout(timeoutId);
      _window2.default.removeEventListener('resize', debounceEmitResize);
    }
  };
}

/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} cb - Subscriber callback function
 */
function removeSubscriber(cb) {
  var index = resizeSubscribers.indexOf(cb);
  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}

/**
 * Helper for getting a display name for the child component
 * @param {*} Component React class for the child component.
 * @returns {String} The child components name
 */
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */

function makeFlexible(Component, isWidthFlexible, isHeightFlexible) {
  var ResultClass = function (_React$Component) {
    _inherits(ResultClass, _React$Component);

    _createClass(ResultClass, null, [{
      key: 'propTypes',
      get: function get() {
        var _Component$propTypes = Component.propTypes,
            height = _Component$propTypes.height,
            width = _Component$propTypes.width,
            otherPropTypes = _objectWithoutProperties(_Component$propTypes, ['height', 'width']); // eslint-disable-line no-unused-vars


        return otherPropTypes;
      }
    }]);

    function ResultClass(props) {
      _classCallCheck(this, ResultClass);

      var _this = _possibleConstructorReturn(this, (ResultClass.__proto__ || Object.getPrototypeOf(ResultClass)).call(this, props));

      _this._onResize = function () {
        var containerElement = (0, _reactUtils.getDOMNode)(_this[CONTAINER_REF]);
        var offsetHeight = containerElement.offsetHeight,
            offsetWidth = containerElement.offsetWidth;


        var newHeight = _this.state.height === offsetHeight ? {} : { height: offsetHeight };

        var newWidth = _this.state.width === offsetWidth ? {} : { width: offsetWidth };

        _this.setState(_extends({}, newHeight, newWidth));
      };

      _this.state = {
        height: 0,
        width: 0
      };
      return _this;
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */


    _createClass(ResultClass, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._onResize();
        this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        this._onResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cancelSubscription();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _state = this.state,
            height = _state.height,
            width = _state.width;

        var props = _extends({}, this.props, {
          animation: height === 0 && width === 0 ? null : this.props.animation
        });

        var updatedDimensions = _extends({}, isHeightFlexible ? { height: height } : {}, isWidthFlexible ? { width: width } : {});

        return _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref) {
              return _this2[CONTAINER_REF] = _ref;
            },
            style: { width: '100%', height: '100%' }
          },
          _react2.default.createElement(Component, _extends({}, updatedDimensions, props))
        );
      }
    }]);

    return ResultClass;
  }(_react2.default.Component);

  ResultClass.displayName = 'Flexible' + getDisplayName(Component);

  return ResultClass;
}

function makeHeightFlexible(component) {
  return makeFlexible(component, false, true);
}

function makeVisFlexible(component) {
  return makeFlexible(component, true, true);
}

function makeWidthFlexible(component) {
  return makeFlexible(component, true, false);
}

var FlexibleWidthXYPlot = exports.FlexibleWidthXYPlot = makeWidthFlexible(_xyPlot2.default);
var FlexibleHeightXYPlot = exports.FlexibleHeightXYPlot = makeHeightFlexible(_xyPlot2.default);
var FlexibleXYPlot = exports.FlexibleXYPlot = makeVisFlexible(_xyPlot2.default);