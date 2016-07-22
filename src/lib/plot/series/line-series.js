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
const d3Shape = require('d3-shape');

import AbstractSeries from './abstract-series';
import {getDOMNode} from '../../utils/react-utils';

import {DEFAULT_OPACITY} from '../../theme';

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

class LineSeries extends AbstractSeries {

  static get defaultProps() {
    return {
      strokeStyle: 'solid',
      opacity: 1
    };
  }

  componentDidMount() {
    this._updateSeries();
  }

  componentDidUpdate() {
    this._updateSeries();
  }

  _updateSeries() {
    const lineElement = getDOMNode(this.refs.line);
    const {data} = this.props;
    if (!data) {
      return;
    }
    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');
    const stroke = this._getAttributeValue('stroke') ||
      this._getAttributeValue('color');
    const opacity = this._getAttributeValue('opacity') || DEFAULT_OPACITY;
    const line = d3Shape.line().x(x).y(y);
    const d = line(data);
    const path = d3Selection.select(lineElement)
      .on('mouseover', this._mouseOver)
      .on('mouseout', this._mouseOut)
      .on('click', this._click);
    this._applyTransition(path)
      .attr('d', d)
      .style('stroke', stroke)
      .style('opacity', opacity);
  }

  render() {
    const {data, strokeStyle, strokeWidth, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }
    return (
      <path
        ref="line"
        className="rv-xy-plot__series rv-xy-plot__series--line"
        transform={`translate(${marginLeft},${marginTop})`}
        style={{
          opacity: 0,
          strokeDasharray: STROKE_STYLES[strokeStyle],
          strokeWidth
        }}/>
    );
  }
}

LineSeries.displayName = 'LineSeries';

export default LineSeries;
