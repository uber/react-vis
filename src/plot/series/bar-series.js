// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

import PropTypes from 'prop-types';

import Animation from 'animation';
import {ANIMATED_SERIES_PROPS, getStackParams} from 'utils/series-utils';

import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--bar';

class BarSeries extends AbstractSeries {

  static get propTypes() {
    return {
      ... AbstractSeries.propTypes,
      linePosAttr: PropTypes.string,
      valuePosAttr: PropTypes.string,
      lineSizeAttr: PropTypes.string,
      valueSizeAttr: PropTypes.string,
      cluster: PropTypes.string
    };
  }

  render() {
    const {
      animation,
      className,
      data,
      linePosAttr,
      lineSizeAttr,
      marginLeft,
      marginTop,
      style,
      valuePosAttr,
      valueSizeAttr
    } = this.props;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <BarSeries {...this.props} animation={null}/>
        </Animation>
      );
    }

    const {sameTypeTotal, sameTypeIndex} = getStackParams(this.props);

    const distance = this._getScaleDistance(linePosAttr);
    const lineFunctor = this._getAttributeFunctor(linePosAttr);
    const valueFunctor = this._getAttributeFunctor(valuePosAttr);
    const value0Functor = this._getAttr0Functor(valuePosAttr);
    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const strokeFunctor = this._getAttributeFunctor('stroke') ||
      this._getAttributeFunctor('color');
    const opacityFunctor = this._getAttributeFunctor('opacity');

    const halfSpace = (distance / 2) * 0.85;

    return (
      <g className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => {
          // totalSpaceAvailable is the space we have available to draw all the
          // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)
          const totalSpaceAvailable = halfSpace * 2;
          const totalSpaceCenter = lineFunctor(d);
          // totalSpaceStartingPoint is the first pixel were we can start
          // drawing bars
          const totalSpaceStartingPoint = totalSpaceCenter - halfSpace;

          // When sameTypeTotal > 1, we want to provide equal space per each
          // bar we want to draw. The initial idea would be to divide the
          // totalSpaceAvailable by the number of bars we need to draw (sameTypeTotal).
          // If we do that, the pixel where one bar ends would be the same pixel were
          // the next bar starts (so the bars would be overlapped by 1 pixel).
          // To avoid that, we need to move the second bar 1 pixel to the right. But then
          // the third bar would overlap with the second one by 2 pixels.
          // We move the third bar 2 pixels to the right, but then the fourth one gets
          // overlapped by 3 pixels. By continuing with this movements, the last
          // bar of the sequence should get moved sameTypeTotal-1 pixels to the right.
          // But now the issue is that the last bar would be exceeding (by
          // sameTypeTotal-1 pixels) the space we had available for all bars (totalSpaceAvailable).

          // The solution then is to extract an equal portion of that exceeding space
          // from the space available for each bar. That's what we are calculating
          // into spaceTakenByInterBarsPixels, and we then use it to calculate
          // the space available per each bar (spacePerBar)
          const spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
          const spacePerBar = (totalSpaceAvailable / sameTypeTotal) - spaceTakenByInterBarsPixels;
          const barStartingPoint = totalSpaceStartingPoint + spacePerBar * sameTypeIndex +
            sameTypeIndex;

          const attrs = {
            style: {
              opacity: opacityFunctor && opacityFunctor(d),
              stroke: strokeFunctor && strokeFunctor(d),
              fill: fillFunctor && fillFunctor(d),
              ...style
            },
            [linePosAttr]: barStartingPoint,
            [lineSizeAttr]: spacePerBar,
            [valuePosAttr]: Math.min(value0Functor(d), valueFunctor(d)),
            [valueSizeAttr]: Math.abs(-value0Functor(d) + valueFunctor(d)),
            onClick: e => this._valueClickHandler(d, e),
            onContextMenu: e => this._valueRightClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
            key: i
          };
          return (<rect {...attrs} />);
        })}
      </g>
    );
  }
}

BarSeries.displayName = 'BarSeries';

export default BarSeries;
