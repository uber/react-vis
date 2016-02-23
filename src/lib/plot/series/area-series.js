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

import {DEFAULT_OPACITY} from '../../theme';

export default class AreaSeries extends AbstractSeries {

  static get displayName() {
    return 'AreaSeries';
  }

  static isDomainAdjustmentNeeded() {
    return false;
  }

  constructor(props) {
    super(props);
    this._mouseOut = this._mouseOut.bind(this);
    this._mouseOver = this._mouseOver.bind(this);
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
    const lineElement = getDOMNode(this.refs.line);
    const {data, innerHeight} = this.props;
    if (!data) {
      return;
    }

    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');
    const fill = this._getAttributeValue('fill') ||
      this._getAttributeValue('color');

    const stroke = this._getAttributeValue('stroke') ||
      this._getAttributeValue('color');

    const line = d3.svg.area().x(x).y0(innerHeight).y1(y);
    const opacity = this._getAttributeValue('opacity') || DEFAULT_OPACITY;
    const d = line(data);

    const path = d3.select(lineElement)
      .on('mouseover', this._onMouseOver)
      .on('mouseout', this._onMouseOut);

    this._applyTransition(path)
      .attr('d', d)
      .style('stroke', stroke)
      .style('fill', fill)
      .style('opacity', opacity);
  }

  render() {
    const {data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <path
        ref="line"
        style={{opacity: 0}}
        className="rv-xy-plot__series rv-xy-plot__series--area"
        transform={`translate(${marginLeft},${marginTop})`}/>
    );
  }

}
