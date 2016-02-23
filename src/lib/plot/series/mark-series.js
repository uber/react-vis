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

import {DEFAULT_SIZE, DEFAULT_OPACITY} from '../../theme';

export default class MarkSeries extends AbstractSeries {

  static get displayName() {
    return 'MarkSeries';
  }

  static isDomainAdjustmentNeeded() {
    return false;
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
    const {size, onValueMouseOver, onSeriesMouseOver} = this.props;
    if (onValueMouseOver) {
      onValueMouseOver(d, size, size);
    }
    if (onSeriesMouseOver) {
      onSeriesMouseOver();
    }
  }

  _mouseOut(d) {
    const {size, onValueMouseOut, onSeriesMouseOut} = this.props;
    if (onValueMouseOut) {
      onValueMouseOut(d, size, size);
    }
    if (onSeriesMouseOut) {
      onSeriesMouseOut();
    }
  }

  onParentMouseMove(event) {
    const {onNearestX} = this.props;
    if (onNearestX) {
      onNearestX(...this._getOnNearestXParams(event));
    }
  }

  _updateSeries() {
    const container = getDOMNode(this.refs.container);
    const {data} = this.props;
    if (!data) {
      return;
    }
    const circles = d3.select(container).selectAll('circle')
      .data(data)
      .on('mouseover', this._mouseOver)
      .on('mouseout', this._mouseOut);

    // TODO(anton): radius should be the half of the size.
    this._applyTransition(circles)
      .attr('r', this._getAttributeFunctor('size') || DEFAULT_SIZE)
      .style('opacity', this._getAttributeFunctor('opacity') || DEFAULT_OPACITY)
      .style('fill', this._getAttributeFunctor('fill') ||
        this._getAttributeFunctor('color'))
      .style('stroke', this._getAttributeFunctor('stroke') ||
        this._getAttributeFunctor('color'))
      .attr('cx', this._getAttributeFunctor('x'))
      .attr('cy', this._getAttributeFunctor('y'));
  }

  render() {
    const {data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <g className="rv-xy-plot__series rv-xy-plot__series--mark"
         ref="container"
         transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => <circle style={{opacity: 0}} key={i}/>)}
      </g>
    );
  }

}
