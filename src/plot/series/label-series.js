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

import React from 'react';
import PropTypes from 'prop-types';
import AbstractSeries from './abstract-series';
import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--label';

class LabelSeries extends AbstractSeries {

  render() {
    const {
      animation,
      allowOffsetToBeReversed,
      className,
      data,
      marginLeft,
      marginTop,
      xRange,
      yRange
    } = this.props;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <LabelSeries {...this.props} animation={null}/>
        </Animation>
      );
    }

    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');

    return (
      <g className={`${predefinedClassName} ${className}`}
         ref="container"
         transform={`translate(${marginLeft},${marginTop})`}>
        {data.reduce((res, d, i) => {
          const {label, style, xOffset, yOffset, rotation} = d;
          if (!label) {
            return res;
          }
          const xVal = xFunctor(d);
          const yVal = yFunctor(d);
          const leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
          const aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;

          const x = xVal + ((allowOffsetToBeReversed && leftOfMiddle) ? -1 : 1) * (xOffset || 0);
          const y = yVal + ((allowOffsetToBeReversed && aboveMiddle) ? -1 : 1) * (yOffset || 0);
          const attrs = {
            alignmentBaseline: aboveMiddle ? 'text-before-edge' : 'text-after-edge',
            className: 'rv-xy-plot__series--label-text',
            key: i,
            onClick: e => this._valueClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
            textAnchor: leftOfMiddle ? 'start' : 'end',
            x,
            y,
            transform: `rotate(${rotation},${x},${y})`,
            ...style
          };
          return res.concat([<text {...attrs} >{label}</text>]);
        }, [])}
      </g>
    );
  }
}

LabelSeries.propTypes = {
  animation: PropTypes.bool,
  allowOffsetToBeReversed: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    angle: PropTypes.number,
    radius: PropTypes.number,
    label: PropTypes.string,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  xRange: PropTypes.arrayOf(PropTypes.number),
  yRange: PropTypes.arrayOf(PropTypes.number)
};
LabelSeries.displayName = 'LabelSeries';
export default LabelSeries;
