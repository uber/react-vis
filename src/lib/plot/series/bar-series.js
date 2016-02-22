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

const VERTICAL_ORIENTATION = 'vertical';
const HORIZONTAL_ORIENTATION = 'horizontal';

export default class BarSeries extends AbstractSeries {

  static get displayName() {
    return 'BarSeries';
  }

  static get propTypes() {
    return {
      ... AbstractSeries.propTypes,
      orientation: React.PropTypes.oneOf([
        VERTICAL_ORIENTATION, HORIZONTAL_ORIENTATION
      ])
    };
  }

  static get defaultProps() {
    return {
      orientation: VERTICAL_ORIENTATION
    };
  }

  static isDomainAdjustmentNeeded(attr, props) {
    if (props.orientation === VERTICAL_ORIENTATION) {
      return attr === 'x';
    }
    return attr === 'y';
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
    const {seriesIndex, onValueMouseOver,
      onSeriesMouseOver} = this.props;
    if (onValueMouseOver) {
      onValueMouseOver(seriesIndex, d, 0, 0);
    }
    if (onSeriesMouseOver) {
      onSeriesMouseOver(seriesIndex);
    }
  }

  /**
   * Mouseout handler. Triggers mouseout-related actions if they were set.
   * @param {Object} d Data point.
   * @private
   */
  _mouseOut(d) {
    const {seriesIndex, onValueMouseOut, onSeriesMouseOut} = this.props;
    if (onValueMouseOut) {
      onValueMouseOut(seriesIndex, d, 0, 0);
    }
    if (onSeriesMouseOut) {
      onSeriesMouseOut(seriesIndex);
    }
  }

  onParentMouseMove(event) {
    const {onNearestX} = this.props;
    if (onNearestX) {
      onNearestX(...this._getOnNearestXParams(event));
    }
  }

  /**
   * Get necessary variables to get orientation from.
   * @returns {Object} Config.
   * @private
   */
  _getOrientationConfig() {
    const {
      orientation,
      innerWidth,
      innerHeight} = this.props;
    let result;
    if (orientation === VERTICAL_ORIENTATION) {
      result = {
        linePosAttr: 'x',
        valuePosAttr: 'y',
        lineSizeAttr: 'width',
        valueSizeAttr: 'height',
        lineSpace: innerWidth
      };
    } else {
      result = {
        linePosAttr: 'y',
        valuePosAttr: 'x',
        lineSizeAttr: 'height',
        valueSizeAttr: 'width',
        lineSpace: innerHeight
      };
    }
    return result;
  }

  _updateSeries() {
    const container = getDOMNode(this.refs.container);
    const {
      sameTypeTotal = 1,
      sameTypeIndex = 0,
      data} = this.props;

    const {
      lineSizeAttr,
      valuePosAttr,
      linePosAttr,
      valueSizeAttr} = this._getOrientationConfig();

    if (!data || !data.length) {
      return;
    }

    const distance = this._getScaleDistance(linePosAttr);
    const baseValue = data[0][valuePosAttr];
    const lineFunctor = this._getAttributeFunctor(linePosAttr);
    const valueFunctor = this._getAttributeFunctor(valuePosAttr);

    const rects = d3.select(container).selectAll('rect')
      .data(data)
      .on('mouseover', this._mouseOver)
      .on('mouseout', this._mouseOut);

    const baseCoordinate = valueFunctor({
      [valuePosAttr]: baseValue
    });
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
        d => Math.min(baseCoordinate, valueFunctor(d)))
      .attr(valueSizeAttr,
        d => Math.abs(-baseCoordinate + valueFunctor(d)));
  }

  render() {
    const {data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <g
        className="rch-chart__series rch-chart__series--bar"
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => <rect style={{opacity: 0}} key={i}/>)}
      </g>
    );
  }
}
