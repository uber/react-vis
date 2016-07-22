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
const d3Selection = require('d3-selection');

import AbstractSeries from './abstract-series';
import {getDOMNode} from '../../utils/react-utils';

class HeatmapSeries extends AbstractSeries {

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'x' || attr === 'y';
    return {isDomainAdjustmentNeeded};
  }

  componentDidMount() {
    this._updateSeries();
  }

  componentDidUpdate() {
    this._updateSeries();
  }

  _updateSeries() {
    const container = getDOMNode(this.refs.container);
    const {data} = this.props;
    const xDistance = this._getScaleDistance('x');
    const yDistance = this._getScaleDistance('y');
    if (!data) {
      return;
    }
    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');

    const rects = d3Selection.select(container).selectAll('rect')
      .data(data)
      .on('mouseover', this._mouseOverWithValue)
      .on('mouseout', this._mouseOutWithValue)
      .on('click', this._clickWithValue);

    this._applyTransition(rects)
      .style('opacity', this._getAttributeFunctor('opacity'))
      .style('fill', this._getAttributeFunctor('fill') ||
        this._getAttributeFunctor('color'))
      .style('stroke', this._getAttributeFunctor('stroke') ||
        this._getAttributeFunctor('color'))
      .attr('x', function getX(d) {
        return x(d) - xDistance / 2;
      })
      .attr('y', function getY(d) {
        return y(d) - yDistance / 2;
      })
      .attr('width', xDistance)
      .attr('height', yDistance);
  }

  render() {
    const {data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <g
        className="rv-xy-plot__series rv-xy-plot__series--heatmap"
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => <rect style={{opacity: 0}} key={i}/>)}
      </g>
    );
  }
}

HeatmapSeries.displayName = 'HeatmapSeries';

export default HeatmapSeries;
