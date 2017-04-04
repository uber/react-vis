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
import {AbstractSeries} from 'react-vis';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--label';

class Label extends AbstractSeries {

  render() {
    const {
      allowOffsetToBeReversed,
      className,
      data,
      marginLeft,
      marginTop,
      xOffset,
      xRange,
      yOffset,
      yRange
    } = this.props;

    if (!data) {
      return null;
    }

    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');

    return (
      <g className={`${predefinedClassName} ${className}`}
         ref="container"
         transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => {
          const xVal = xFunctor(d);
          const yVal = yFunctor(d);
          const leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
          const aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;

          const attrs = {
            alignmentBaseline: aboveMiddle ? 'text-before-edge' : 'text-after-edge',
            className: 'rv-xy-plot__series--label-text',
            key: i,
            onClick: e => this._valueClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
            textAnchor: leftOfMiddle ? 'start' : 'end',
            x: xVal + ((allowOffsetToBeReversed && leftOfMiddle) ? -1 : 1) * (xOffset || 0),
            y: yVal + ((allowOffsetToBeReversed && aboveMiddle) ? -1 : 1) * (yOffset || 0)
          };
          const label = d.label || `Point ${i}`;
          return (<text {...attrs} >{label}</text>);
        })}
      </g>
    );
  }
}

export default Label;
