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

import React from 'react';

/**
 * Property type for the animation.
 */
export const AnimationPropType = React.PropTypes.oneOfType([
  React.PropTypes.shape({
    duration: React.PropTypes.number
  }),
  React.PropTypes.bool
]);

/**
 * Object with default settings for the lib's animation.
 * @const
 */
export const DEFAULT_ANIMATION = {
  duration: 100
};

/**
 * Applies d3.transition to the given selection if transition is set in props.
 * @param {{animation:*}} props The object with the component's props.
 * @param {d3.selection} elements D3's selection of elements that should be
 * animated.
 * @returns {d3.selection} The new d3 selection with the animation applied.
 */
export function applyTransition(props, elements) {
  let {animation} = props;
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
export function getCSSAnimation(props, style) {
  let {animation} = props;
  let transition = 'none';
  if (animation) {
    // Fallback to default animation if no animation is passed.
    if (!(animation instanceof Object)) {
      animation = DEFAULT_ANIMATION;
    }
    const keys = Object.keys(style);
    // Create a string of visualized parameters and filter out those, which
    // don't have values.
    const animationKeys = keys
      .filter(key => Boolean(style[key]))
      .map(key => `${key} ${animation.duration / 1000}s`);
    if (animationKeys.length) {
      transition = animationKeys.join(',');
    }
  }
  return {
    transition,
    ... style
  };
}
