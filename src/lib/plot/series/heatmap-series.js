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

import AbstractSeries from './abstract-series';
import {getDOMNode} from '../../utils/react-utils';

export default class HeatmapSeries extends AbstractSeries {

  static get displayName() {
    return 'HeatmapSeries';
  }

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'x' || attr === 'y';
    return {isDomainAdjustmentNeeded};
  }

  constructor(props) {
    super(props);
    this._mouseOver = this._mouseOver.bind(this);
    this._mouseOut = this._mouseOut.bind(this);
  }

  componentDidMount() {
    this._updateSeries();
  }

  componentDidUpdate() {
    this._updateSeries();
  }

  _mouseOver(d) {
    const {onValueMouseOver, onSeriesMouseOver} = this.props;
    if (onValueMouseOver) {
      onValueMouseOver(d, {event: d3.event});
    }
    if (onSeriesMouseOver) {
      onSeriesMouseOver({event: d3.event});
    }
  }

  _mouseOut(d) {
    const {onValueMouseOut, onSeriesMouseOut} = this.props;
    if (onValueMouseOut) {
      onValueMouseOut(d, {event: d3.event});
    }
    if (onSeriesMouseOut) {
      onSeriesMouseOut({event: d3.event});
    }
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

    const rects = d3.select(container).selectAll('rect')
      .data(data)
      .on('mouseover', this._mouseOver)
      .on('mouseout', this._mouseOut);

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
