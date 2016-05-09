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
import d3Selection from 'd3-selection';

import PureRenderComponent from '../pure-render-component';
import {getDOMNode} from '../utils/react-utils';
import {AXIS_ORIENTATION, getAxisFnByOrientation} from '../utils/axis-utils';
import {getAttributeScale} from '../utils/scales-utils';

import {AnimationPropType, applyTransition} from '../utils/animation-utils';

import {DEFAULT_TICK_SIZE} from '../theme';

/**
 * Get axis component for the chart/plot.
 * @param {string} displayName Display name for the component.
 * @param {string} classSet Class name postfix for the axis container.
 * @param {string} orientation d3's orientation.
 * @param {function(Number, Number, Object):Number} tickNumberCallback Callback
 *   to calculate the number of ticks passed.
 * @returns {React.Component} Axis component.
 */
class Axis extends PureRenderComponent {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      classSet: React.PropTypes.object,
      attr: React.PropTypes.string.isRequired,
      orientation: React.PropTypes.oneOf(AXIS_ORIENTATION),
      labelFormat: React.PropTypes.func,
      labelValues: React.PropTypes.array,
      tickValues: React.PropTypes.array,
      ticksTotal: React.PropTypes.number,
      tickSize: React.PropTypes.number,
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      tickSize: DEFAULT_TICK_SIZE
    };
  }

  static get requiresSVG() {
    return true;
  }

  /**
   * Set axis labels.
   * @param {Object} axis Axis object.
   * @returns {Object} Axis object.
   * @private
   */
  _setAxisLabels(axis) {
    const {labelFormat, labelValues, ticksTotal} = this.props;
    if (!labelValues) {
      axis.ticks(ticksTotal);
    } else {
      axis.tickValues(labelValues);
    }
    if (labelFormat) {
      axis.tickFormat(labelFormat);
    }
    axis.tickSize(0, 0);
    axis.tickSizeOuter(0);
    axis.tickPadding(14);
    return axis;
  }

  /**
   * Set axis ticks.
   * @param {Object} axis Axis object.
   * @returns {Object} Axis object.
   * @private
   */
  _setAxisTicks(axis) {
    const {tickValues, ticksTotal, tickSize} = this.props;
    if (!tickValues) {
      axis.ticks(ticksTotal);
    } else {
      axis.tickValues(tickValues);
    }
    axis.tickFormat('');
    axis.tickSize(tickSize);
    axis.tickSizeOuter(0);
    return axis;
  }

  /**
   * Renders the axis inside the existing container.
   * @private
   */
  _render() {
    const {orientation, attr} = this.props;
    const scale = getAttributeScale(this.props, attr);
    if (!scale) {
      return;
    }

    const {labels, ticks} = this.refs;
    const selectedLabels = d3Selection.select(getDOMNode(labels));
    const selectedTicks = d3Selection.select(getDOMNode(ticks));
    const axisFn = getAxisFnByOrientation(orientation);
    const axis = this._setAxisLabels(axisFn(scale));

    applyTransition(this.props, selectedLabels)
      .call(this._setAxisLabels(axis));
    applyTransition(this.props, selectedTicks)
      .call(this._setAxisTicks(axis));
  }

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const {title, left, top} = this.props;
    const hasTitle = title && title !== '';
    return (
      <g className="rv-xy-plot__axis"
         transform={`translate(${left},${top})`}
         ref="container">
        <g
          ref="labels"
          className="rv-xy-plot__axis__labels"/>
        <g
          ref="ticks"
          className="rv-xy-plot__axis__ticks"/>
        {hasTitle ?
          <g
            className="rv-xy-plot__axis__title"
            style={this.props.titleStyle}>
            <text>{title}</text>
          </g> :
          null
        }
      </g>
    );
  }
}

Axis.displayName = 'Axis';

export default Axis;
