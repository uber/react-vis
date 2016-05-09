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
import {getAttributeScale} from '../utils/scales-utils';
import {AXIS_ORIENTATIONS, getAxisFnByOrientation} from '../utils/axis-utils';

import {AnimationPropType, applyTransition} from '../utils/animation-utils';

class GridLines extends PureRenderComponent {

  static get propTypes() {
    return {
      tickSize: React.PropTypes.number,
      ticksTotal: React.PropTypes.number,
      values: React.PropTypes.array,
      attr: React.PropTypes.string.isRequired,
      orientation: React.PropTypes.oneOf(AXIS_ORIENTATIONS),
      top: React.PropTypes.number,
      left: React.PropTypes.number,
      marginTop: React.PropTypes.number,
      marginLeft: React.PropTypes.number,
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      top: 0,
      left: 0
    };
  }

  static get requiresSVG() {
    return true;
  }

  /**
   * Renders the grid lines in a given container.
   * @private
   */
  _render() {
    const {attr, tickSize, orientation, ticksTotal, values} = this.props;
    const scale = getAttributeScale(this.props, attr);
    if (!scale) {
      return;
    }
    const container = d3Selection.select(getDOMNode(this.refs.container));
    const axisFn = getAxisFnByOrientation(orientation);
    const axis = axisFn(scale)
      .tickFormat('')
      .tickSize(tickSize, 0, 0);
    if (!values) {
      axis.ticks(ticksTotal);
    } else {
      axis.tickValues(values);
    }
    applyTransition(this.props, container).call(axis);
  }

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const {top, left, marginTop, marginLeft} = this.props;
    return (
      <g
        transform={`translate(${marginLeft}, ${marginTop})`}
        className="rv-xy-plot__grid-lines">
          <g
            ref="container"
            transform={`translate(${left}, ${top})`}/>
      </g>
    );
  }
}

GridLines.displayName = 'GridLines';

export default GridLines;
