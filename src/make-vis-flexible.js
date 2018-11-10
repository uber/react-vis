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

import React from 'react';
import window from 'global/window';

import XYPlot from 'plot/xy-plot';
import {getDOMNode} from 'utils/react-utils';

const CONTAINER_REF = 'container';

// As a performance enhancement, we want to only listen once
const resizeSubscribers = [];
const DEBOUNCE_DURATION = 100;
let timeoutId = null;

/**
 * Calls each subscriber, debounced to the
 */
function debounceEmitResize() {
  window.clearTimeout(timeoutId);
  timeoutId = window.setTimeout(emitResize, DEBOUNCE_DURATION);
}

/**
 * Calls each subscriber once syncronously.
 */
function emitResize() {
  resizeSubscribers.forEach(cb => cb());
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
    window.addEventListener('resize', debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(cb);

    // if we have no Flexible components, remove the listener
    if (resizeSubscribers.length === 0) {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', debounceEmitResize);
    }
  };
}

/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} cb - Subscriber callback function
 */
function removeSubscriber(cb) {
  const index = resizeSubscribers.indexOf(cb);
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
  const ResultClass = class extends React.Component {
    static get propTypes() {
      const {height, width, ...otherPropTypes} = Component.propTypes; // eslint-disable-line no-unused-vars
      return otherPropTypes;
    }

    constructor(props) {
      super(props);
      this.state = {
        height: 0,
        width: 0
      };
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */
    _onResize = () => {
      const containerElement = getDOMNode(this[CONTAINER_REF]);
      const {offsetHeight, offsetWidth} = containerElement;

      const newHeight =
        this.state.height === offsetHeight ? {} : {height: offsetHeight};

      const newWidth =
        this.state.width === offsetWidth ? {} : {width: offsetWidth};

      this.setState({
        ...newHeight,
        ...newWidth
      });
    };

    componentDidMount() {
      this._onResize();
      this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
    }

    componentWillReceiveProps() {
      this._onResize();
    }

    componentWillUnmount() {
      this.cancelSubscription();
    }

    render() {
      const {height, width} = this.state;
      const props = {
        ...this.props,
        animation: height === 0 && width === 0 ? null : this.props.animation
      };

      const updatedDimensions = {
        ...(isHeightFlexible ? {height} : {}),
        ...(isWidthFlexible ? {width} : {})
      };

      return (
        <div
          ref={ref => (this[CONTAINER_REF] = ref)}
          style={{width: '100%', height: '100%'}}
        >
          <Component {...updatedDimensions} {...props} />
        </div>
      );
    }
  };

  ResultClass.displayName = `Flexible${getDisplayName(Component)}`;

  return ResultClass;
}

export function makeHeightFlexible(component) {
  return makeFlexible(component, false, true);
}

export function makeVisFlexible(component) {
  return makeFlexible(component, true, true);
}

export function makeWidthFlexible(component) {
  return makeFlexible(component, true, false);
}

export const FlexibleWidthXYPlot = makeWidthFlexible(XYPlot);
export const FlexibleHeightXYPlot = makeHeightFlexible(XYPlot);
export const FlexibleXYPlot = makeVisFlexible(XYPlot);
