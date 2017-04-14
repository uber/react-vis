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
    const {data, strokeWidth, strokeDasharray} = props;
    if (!data || data.length === 0) {
      return;
    }

    const x = getAttributeFunctor(props, 'x');
    const y = getAttributeFunctor(props, 'y');
    const stroke = getAttributeValue(props, 'stroke') || getAttributeValue(props, 'color');
    const strokeColor = rgb(stroke);
    const newOpacity = getAttributeValue(props, 'opacity');
    const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;

    ctx.beginPath();
    ctx.moveTo(x(data[0]), y(data[0]));
    data.forEach(row => ctx.lineTo(x(row), y(row)));

    ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${opacity})`;
    ctx.lineWidth = strokeWidth;
    if (strokeDasharray) {
      ctx.setLineDash(strokeDasharray);
    }
    ctx.stroke();
    // set back to default
    ctx.lineWidth = 1;
  }

  render() {
    return null;
  }
}

LineSeriesCanvas.displayName = 'LineSeriesCanvas';
LineSeriesCanvas.defaultProps = {
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string
};

LineSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
  strokeWidth: 1
};

export default LineSeriesCanvas;
