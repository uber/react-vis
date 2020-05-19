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

import {rgb} from 'd3-color';

import {DEFAULT_SIZE, DEFAULT_OPACITY} from 'theme';
import {getAttributeFunctor} from 'utils/scales-utils';

import AbstractSeries from './abstract-series';

class MarkSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return true;
  }

  static renderLayer(props, ctx) {
    const {data, marginLeft, marginTop} = props;

    const x = getAttributeFunctor(props, 'x');
    const y = getAttributeFunctor(props, 'y');
    const size = getAttributeFunctor(props, 'size') || (p => DEFAULT_SIZE);
    const fill =
      getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
    const stroke =
      getAttributeFunctor(props, 'stroke') ||
      getAttributeFunctor(props, 'color');
    const opacity = getAttributeFunctor(props, 'opacity');

    data.forEach(row => {
      const fillColor = rgb(fill(row));
      const strokeColor = rgb(stroke(row));
      const rowOpacity = opacity(row) || DEFAULT_OPACITY;
      ctx.beginPath();
      ctx.arc(
        x(row) + marginLeft,
        y(row) + marginTop,
        size(row),
        0,
        2 * Math.PI
      );
      ctx.fillStyle = `rgba(${fillColor.r}, ${fillColor.g}, ${
        fillColor.b
      }, ${rowOpacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${
        strokeColor.b
      }, ${rowOpacity})`;
      ctx.stroke();
    });
  }

  render() {
    return null;
  }
}

MarkSeriesCanvas.displayName = 'MarkSeriesCanvas';

MarkSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes
};

export default MarkSeriesCanvas;
