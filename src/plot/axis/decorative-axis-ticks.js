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
import {generatePoints, getAxisAngle} from 'utils/axis-utils';

// TODO WRITE JSDOC
export default function decorativeAxisTick(props) {
  const {axisDomain, numberOfTicks, axisStart, axisEnd, tickValue, tickSize, style} = props;
  const {points} = generatePoints({axisStart, axisEnd, numberOfTicks, axisDomain});
  // add a quarter rotation to make ticks orthogonal to axis
  const tickAngle = getAxisAngle(axisStart, axisEnd) + Math.PI / 2;
  return points
    .map((point, index) => {
      const tickProps = {
        x1: 0,
        y1: 0,
        x2: tickSize * Math.cos(tickAngle),
        y2: tickSize * Math.sin(tickAngle),
        ...style.ticks
      };

      const textProps = {
        x: tickSize * Math.cos(tickAngle),
        y: tickSize * Math.sin(tickAngle),
        textAnchor: 'start',
        ...style.text
      };
      return (
        <g key={index} transform={`translate(${point.x}, ${point.y})`} className="rv-xy-plot__axis__tick">
          <line {...tickProps} className="rv-xy-plot__axis__tick__line"/>
          <text {...textProps} className="rv-xy-plot__axis__tick__text">
            {tickValue(point.text)}
          </text>
        </g>
      );
    });
}
