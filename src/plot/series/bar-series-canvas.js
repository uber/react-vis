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
import {
  getAttributeFunctor,
  getScaleObjectFromProps,
  getAttr0Functor
} from 'utils/scales-utils';
import {getStackParams} from 'utils/series-utils';
import AbstractSeries from './abstract-series';

function getScaleDistance(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}

class BarSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return true;
  }

  static renderLayer(props, ctx) {
    const {
      data,
      linePosAttr,
      lineSizeAttr,
      valuePosAttr,
      marginTop,
      marginBottom
    } = props;
    if (!data || data.length === 0) {
      return;
    }

    const distance = getScaleDistance(props, linePosAttr);
    const line = getAttributeFunctor(props, linePosAttr);
    const value = getAttributeFunctor(props, valuePosAttr);
    const value0 = getAttr0Functor(props, valuePosAttr);
    const fill =
      getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
    const stroke =
      getAttributeFunctor(props, 'stroke') ||
      getAttributeFunctor(props, 'color');
    const opacity = getAttributeFunctor(props, 'opacity');

    const halfSpace = (distance / 2) * 0.85;
    // totalSpaceAvailable is the space we have available to draw all the
    // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)
    const totalSpaceAvailable = halfSpace * 2;

    const {sameTypeTotal, sameTypeIndex} = getStackParams(props);
    data.forEach(row => {
      const totalSpaceCenter = line(row);
      // totalSpaceStartingPoint is the first pixel were we can start drawing
      const totalSpaceStartingPoint = totalSpaceCenter - halfSpace;

      // spaceTakenByInterBarsPixels has the overhead space consumed by each bar of sameTypeTotal
      const spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
      // lineSize is the space we have available to draw sameTypeIndex bar
      const lineSize = (totalSpaceAvailable / sameTypeTotal) - spaceTakenByInterBarsPixels;

      const fillColor = rgb(fill(row));
      const strokeColor = rgb(stroke(row));
      const rowOpacity = opacity(row) || DEFAULT_OPACITY;

      // linePos is the first pixel were we can start drawing sameTypeIndex bar
      const linePos = totalSpaceStartingPoint + lineSize * sameTypeIndex + sameTypeIndex;
      const valuePos = Math.min(value0(row), value(row));
      const x = valuePosAttr === 'x' ? valuePos : linePos;
      const y = valuePosAttr === 'y' ? valuePos : linePos;

      const valueSize = Math.abs(-value0(row) + value(row));
      const height = lineSizeAttr === 'height' ? lineSize : valueSize;
      const width = lineSizeAttr === 'width' ? lineSize : valueSize;

      ctx.beginPath();
      ctx.rect(x + marginBottom, y + marginTop, width, height);
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

BarSeriesCanvas.displayName = 'BarSeriesCanvas';
BarSeriesCanvas.defaultProps = {
  ...AbstractSeries.defaultProps,
  linePosAttr: PropTypes.string.isRequired,
  valuePosAttr: PropTypes.string.isRequired,
  lineSizeAttr: PropTypes.string.isRequired,
  valueSizeAttr: PropTypes.string.isRequired
};

BarSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes
};

export default BarSeriesCanvas;
