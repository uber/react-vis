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

import {AbstractSeries} from 'react-vis';

const predefinedClassName =
  'rv-xy-plot__series rv-xy-plot__series--candlestick';

class CandlestickSeries extends AbstractSeries {
  render() {
    const {className, data, marginLeft, marginTop} = this.props;
    if (!data) {
      return null;
    }

    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');
    const strokeFunctor =
      this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
    const fillFunctor =
      this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
    const opacityFunctor = this._getAttributeFunctor('opacity');

    const distance = Math.abs(xFunctor(data[1]) - xFunctor(data[0])) * 0.2;

    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map((d, i) => {
          const xTrans = xFunctor(d);
          // Names of values borrowed from here https://en.wikipedia.org/wiki/Candlestick_chart
          const yHigh = yFunctor({...d, y: d.yHigh});
          const yOpen = yFunctor({...d, y: d.yOpen});
          const yClose = yFunctor({...d, y: d.yClose});
          const yLow = yFunctor({...d, y: d.yLow});

          const lineAttrs = {
            stroke: strokeFunctor && strokeFunctor(d)
          };

          const xWidth = distance * 2;
          return (
            <g
              transform={`translate(${xTrans})`}
              opacity={opacityFunctor ? opacityFunctor(d) : 1}
              key={i}
              onClick={e => this._valueClickHandler(d, e)}
              onMouseOver={e => this._valueMouseOverHandler(d, e)}
              onMouseOut={e => this._valueMouseOutHandler(d, e)}
            >
              <line
                x1={-xWidth}
                x2={xWidth}
                y1={yHigh}
                y2={yHigh}
                {...lineAttrs}
              />
              <line x1={0} x2={0} y1={yHigh} y2={yLow} {...lineAttrs} />
              <line
                x1={-xWidth}
                x2={xWidth}
                y1={yLow}
                y2={yLow}
                {...lineAttrs}
              />
              <rect
                x={-xWidth}
                width={Math.max(xWidth * 2, 0)}
                y={yOpen}
                height={Math.abs(yOpen - yClose)}
                fill={fillFunctor && fillFunctor(d)}
              />
            </g>
          );
        })}
      </g>
    );
  }
}

CandlestickSeries.displayName = 'CandlestickSeries';

export default CandlestickSeries;
