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
import d3 from 'd3';

import PureRenderComponent from '../../pure-render-component';
import {
  getAttributeFunctor,
  getAttributeValue,
  getScaleObjectFromProps,
  getScalePropTypesByAttribute} from '../../utils/scales-utils';

import {AnimationPropType, applyTransition} from '../../utils/animation-utils';

export default class AbstractSeries extends PureRenderComponent {

  static get propTypes() {
    return {
      ...getScalePropTypesByAttribute('x'),
      ...getScalePropTypesByAttribute('y'),
      ...getScalePropTypesByAttribute('size'),
      ...getScalePropTypesByAttribute('opacity'),
      ...getScalePropTypesByAttribute('color'),
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      data: React.PropTypes.array,
      onValueMouseOver: React.PropTypes.func,
      onValueMouseOut: React.PropTypes.func,
      onSeriesMouseOver: React.PropTypes.func,
      onSeriesMouseOut: React.PropTypes.func,
      onNearestX: React.PropTypes.func,
      animation: AnimationPropType
    };
  }

  /**
   * Tells the rest of the world that it requires SVG to work.
   * @returns {boolean} Result.
   */
  static get requiresSVG() {
    return true;
  }

  /**
   * Get a default config for the parent.
   * @returns {Object} Empty config.
   */
  static getParentConfig() {
    return {};
  }

  /**
   * Get attribute functor.
   * @param {string} attr Attribute name
   * @returns {*} Functor.
   * @protected
   */
  _getAttributeFunctor(attr) {
    return getAttributeFunctor(this.props, attr);
  }

  /**
   * Get the attribute value if it is available.
   * @param {string} attr Attribute name.
   * @returns {*} Attribute value if available, fallback value or undefined
   * otherwise.
   * @protected
   */
  _getAttributeValue(attr) {
    return getAttributeValue(this.props, attr);
  }

  /**
   * Get the scale object distance by the attribute from the list of properties.
   * @param {string} attr Attribute name.
   * @returns {number} Scale distance.
   * @protected
   */
  _getScaleDistance(attr) {
    const scaleObject = getScaleObjectFromProps(this.props, attr);
    return scaleObject ? scaleObject.distance : 0;
  }

  _getScaleBaseValue(attr) {
    const scaleObject = getScaleObjectFromProps(this.props, attr);
    return scaleObject ? scaleObject.baseValue : 0;
  }

  /**
   * Get scale domain for the given attribute.
   * @param {string} attr Attribute.
   * @returns {*} Domain or null if not defined.
   * @protected
   */
  _getScaleDomain(attr) {
    const scaleObject = getScaleObjectFromProps(this.props, attr);
    return scaleObject ? scaleObject.domain : null;
  }

  /**
   * Apply transition to the elements and return the new elements instead.
   * @param {d3.selection} elements Elements.
   * @returns {d3.selection} Animated elements if animation is available.
   * @protected
   */
  _applyTransition(elements) {
    return applyTransition(this.props, elements);
  }

  onParentMouseMove(event) {
    const {marginLeft = 0, onNearestX, data} = this.props;
    if (!onNearestX || !data) {
      return;
    }
    let minDistance = Number.POSITIVE_INFINITY;
    let value = null;

    // TODO(antonb): WAT?
    d3.event = event.nativeEvent;
    const coordinate = d3.mouse(event.currentTarget)[0] - marginLeft;
    const xScaleFn = this._getAttributeFunctor('x');

    data.forEach(item => {
      const currentCoordinate = xScaleFn(item);
      const newDistance = Math.abs(coordinate - currentCoordinate);
      if (newDistance < minDistance) {
        minDistance = newDistance;
        value = item;
      }
    });
    if (!value) {
      return;
    }
    onNearestX(value, {
      innerX: xScaleFn(value),
      event: event.nativeEvent
    });
  }

}
