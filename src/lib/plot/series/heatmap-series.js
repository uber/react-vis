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
import AbstractSeries from './abstract-series';
import Animation from '../../animation';
import {ANIMATED_SERIES_PROPS} from '../../utils/series-utils';

class HeatmapSeries extends AbstractSeries {

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'x' || attr === 'y';
    return {isDomainAdjustmentNeeded};
  }

  render() {
    const {data, marginLeft, marginTop, animation} = this.props;
    if (!data) {
      return null;
    }
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <HeatmapSeries {...this.props} animation={null}/>
        </Animation>
      );
    }
    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');
    const opacityFunctor = this._getAttributeFunctor('opacity');
    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const strokeFunctor = this._getAttributeFunctor('stroke') ||
      this._getAttributeFunctor('color');
    const xDistance = this._getScaleDistance('x');
    const yDistance = this._getScaleDistance('y');
    return (
      <g
        className="rv-xy-plot__series rv-xy-plot__series--heatmap"
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => {
          const attrs = {
            style: {
              stroke: strokeFunctor && strokeFunctor(d),
              fill: fillFunctor && fillFunctor(d),
              opacity: opacityFunctor && opacityFunctor(d)
            },
            x: xFunctor(d) - xDistance / 2,
            y: yFunctor(d) - yDistance / 2,
            width: xDistance,
            height: yDistance,
            key: i,
            onClick: e => this._clickWithValue(d, e),
            onMouseOver: e => this._mouseOverWithValue(d, e),
            onMouseOut: e => this._mouseOutWithValue(d, e)
          };
          return (<rect {...attrs} />);
        })}
      </g>
    );
  }
}

HeatmapSeries.displayName = 'HeatmapSeries';

export default HeatmapSeries;
