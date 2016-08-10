'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ANIMATION = exports.AnimationPropType = undefined;

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

// Not obvious: d3-transition adds .transition() method to the selection
// prototype (!!!). Do not remove this import.


exports.applyTransition = applyTransition;
exports.getCSSAnimation = getCSSAnimation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('d3-transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Property type for the animation.
 */
var AnimationPropType = exports.AnimationPropType = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.shape({
  duration: _react2.default.PropTypes.number
}), _react2.default.PropTypes.bool]);

/**
 * Object with default settings for the lib's animation.
 * @const
 */
var DEFAULT_ANIMATION = exports.DEFAULT_ANIMATION = {
  duration: 100
};

/**
 * Applies d3.transition to the given selection if transition is set in props.
 * @param {{animation:*}} props The object with the component's props.
 * @param {d3.selection} elements D3's selection of elements that should be
 * animated.
 * @returns {d3.selection} The new d3 selection with the animation applied.
 */
function applyTransition(props, elements) {
  var animation = props.animation;

  if (Boolean(animation)) {
    if (!(animation instanceof Object)) {
      animation = DEFAULT_ANIMATION;
    }
    return elements.transition().duration(animation.duration);
  }
  return elements;
}

/**
 * Transforms a regular CSS object into an object with CSS animation (e. g. adds
 * the `transition` property for all keys of an object).
 * @param {{animation: *}} props The object of component's props.
 * @param {Object} style A style object to apply animation to.
 * @returns {Object} New style object with CSS animation applied.
 */
function getCSSAnimation(props, style) {
  var animation = props.animation;

  var transition = 'none';
  if (animation) {
    // Fallback to default animation if no animation is passed.
    if (!(animation instanceof Object)) {
      animation = DEFAULT_ANIMATION;
    }
    var keys = Object.keys(style);
    // Create a string of visualized parameters and filter out those, which
    // don't have values.
    var animationKeys = keys.filter(function (key) {
      return Boolean(style[key]);
    }).map(function (key) {
      return key + ' ' + animation.duration / 1000 + 's';
    });
    if (animationKeys.length) {
      transition = animationKeys.join(',');
    }
  }
  return _extends({
    transition: transition
  }, style);
}