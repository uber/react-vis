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

import {XYPlot, PolygonSeries, XAxis, YAxis, GradientDefs} from 'index';

function buildTriangle(sideWidth, lowerLeftCoord) {
  const {x, y} = lowerLeftCoord;
  const triangle = [[{x, y}, {x, y: y + sideWidth}, {x: x + sideWidth, y}]];
  if (sideWidth < 0.5) {
    return triangle;
  }
  const newWidth = sideWidth * 0.5;
  const a = buildTriangle(newWidth, lowerLeftCoord);
  const b = buildTriangle(newWidth, {x: x + sideWidth, y});
  const c = buildTriangle(newWidth, {x, y: y + sideWidth});
  return triangle
    .concat(a)
    .concat(b)
    .concat(c);
}

const triangles = buildTriangle(7, {x: 0, y: 0});

export default class Example extends React.Component {
  state = {
    hoveredIndex: false
  };

  render() {
    const {hoveredIndex} = this.state;

    return (
      <XYPlot width={300} height={300}>
        <GradientDefs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#829AE3" stopOpacity="0" />
            <stop offset="100%" stopColor="#12939A" stopOpacity="1" />
          </radialGradient>
        </GradientDefs>
        <XAxis />
        <YAxis />
        {triangles.map((triangle, index) => {
          return (
            <PolygonSeries
              key={`triangle-${index}`}
              data={triangle}
              onSeriesMouseOver={() => this.setState({hoveredIndex: index})}
              onSeriesMouseOut={() => this.setState({hoveredIndex: false})}
              color={index !== hoveredIndex ? 'url(#grad1)' : null}
              style={{
                strokeWidth: 0.5,
                strokeOpacity: 1,
                opacity: 0.5,
                fill: index === hoveredIndex ? '#EF5D28' : null
              }}
            />
          );
        })}
      </XYPlot>
    );
  }
}
