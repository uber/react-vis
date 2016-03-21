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

class BarSeries extends AbstractSeries {

  static get propTypes() {
    return {
      ... AbstractSeries.propTypes,
      linePosAttr: React.PropTypes.string,
      valuePosAttr: React.PropTypes.string,
      lineSizeAttr: React.PropTypes.string,
      valueSizeAttr: React.PropTypes.string
    };
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

  /**
   * Mouseover handler. Triggers mouseover-related actions if they were set.
   * @param {Object} d Data point.
   * @private
   */
  _mouseOver(d) {
    const {onValueMouseOver, onSeriesMouseOver} = this.props;
    if (onValueMouseOver) {
      onValueMouseOver(d, {event: d3.event});
    }
    if (onSeriesMouseOver) {
      onSeriesMouseOver({event: d3.event});
    }
  }

  /**
   * Mouseout handler. Triggers mouseout-related actions if they were set.
   * @param {Object} d Data point.
   * @private
   */
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
    const {
      _stackBy,
      data,
      lineSizeAttr,
      valuePosAttr,
      linePosAttr,
      valueSizeAttr} = this.props;

    let {
      sameTypeTotal = 1,
      sameTypeIndex = 0} = this.props;

    if (!data || !data.length) {
      return;
    }

    const distance = this._getScaleDistance(linePosAttr);
    const lineFunctor = this._getAttributeFunctor(linePosAttr);
    const valueFunctor = this._getAttributeFunctor(valuePosAttr);
    const value0Functor = this._getAttr0Functor(valuePosAttr);

    if (_stackBy === valuePosAttr) {
      sameTypeTotal = 1;
      sameTypeIndex = 0;
    }

    const rects = d3.select(container).selectAll('rect')
      .data(data)
      .on('mouseover', this._mouseOver)
      .on('mouseout', this._mouseOut);

    const itemSize = (distance / 2) * 0.85;

    this._applyTransition(rects)
      .style('opacity', this._getAttributeFunctor('opacity'))
      .style('fill', this._getAttributeFunctor('fill') ||
        this._getAttributeFunctor('color'))
      .style('stroke', this._getAttributeFunctor('stroke') ||
        this._getAttributeFunctor('color'))
      .attr(linePosAttr, d => lineFunctor(d) - itemSize +
        (itemSize * 2 / sameTypeTotal * sameTypeIndex)
      )
      .attr(lineSizeAttr, itemSize * 2 / sameTypeTotal)
      .attr(valuePosAttr,
        d => Math.min(value0Functor(d), valueFunctor(d)))
      .attr(valueSizeAttr,
        d => Math.abs(-value0Functor(d) + valueFunctor(d)));
  }

  render() {
    const {data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <g
        className="rv-xy-plot__series rv-xy-plot__series--bar"
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => <rect style={{opacity: 0}} key={i}/>)}
      </g>
    );
  }
}

BarSeries.displayName = 'BarSeries';

export default BarSeries;
