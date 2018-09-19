// Copyright (c) 2017 Uber Technologies, Inc.
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
import PropTypes from 'prop-types';
import {rgb} from 'd3-color';
import * as d3Shape from 'd3-shape';
import React from 'react';

import {DEFAULT_OPACITY} from 'theme';
import {getAttributeFunctor, getAttributeValue} from 'utils/scales-utils';
import AbstractSeries from './abstract-series';

class LineSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return true;
  }

  static renderLayer(props, ctx) {
    const {
      curve,
      data,
      marginLeft,
      marginTop,
      strokeWidth,
      strokeDasharray
    } = props;
    if (!data || data.length === 0) {
      return;
    }

    const x = getAttributeFunctor(props, 'x');
    const y = getAttributeFunctor(props, 'y');
    const stroke =
      getAttributeValue(props, 'stroke') || getAttributeValue(props, 'color');
    const strokeColor = rgb(stroke);
    const newOpacity = getAttributeValue(props, 'opacity');
    const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
    let line = d3Shape
      .line()
      .x(row => x(row) + marginLeft)
      .y(row => y(row) + marginTop);
    if (typeof curve === 'string' && d3Shape[curve]) {
      line = line.curve(d3Shape[curve]);
    } else if (typeof curve === 'function') {
      line = line.curve(curve);
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${
      strokeColor.b
    }, ${opacity})`;
    ctx.lineWidth = strokeWidth;

    if (strokeDasharray) {
      ctx.setLineDash(strokeDasharray);
    }

    line.context(ctx)(data);
    ctx.stroke();
    ctx.closePath();
    // set back to default
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
  }

  render() {
    return <div />;
  }
}

LineSeriesCanvas.displayName = 'LineSeriesCanvas';
LineSeriesCanvas.defaultProps = {
  ...AbstractSeries.defaultProps,
  strokeWidth: 2
};

LineSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
  strokeWidth: PropTypes.number
};

export default LineSeriesCanvas;
