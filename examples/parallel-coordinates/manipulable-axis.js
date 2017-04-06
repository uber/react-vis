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
import {range} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {format} from 'd3-format';

const predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis';

const animatedProps = [
  'xRange', 'yRange', 'xDomain', 'yDomain',
  'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
  'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'
];

function generatePoints({axisStart, axisEnd, numberOfTicks, axisDomain}) {
  let left = Math.min(axisStart.x, axisEnd.x);
  let right = Math.max(axisStart.x, axisEnd.x);
  // generate the linear projection of the axis direction
  let slope = (axisStart.y - axisEnd.y) / (axisStart.x - axisEnd.x);
  let offset = axisStart.y - slope * axisStart.x;
  // address the special case when the slope is infinite
  if (axisStart.x === axisEnd.x) {
    left = Math.min(axisStart.y, axisEnd.y);
    right = Math.max(axisStart.y, axisEnd.y);
    slope = 0;
    offset = axisStart.x;
  }
  // construct a linear band of points, then map them
  const pointSlope = (right - left) / (numberOfTicks);
  const axisScale = scaleLinear().domain([left, right]).range(axisDomain.sort());

  return {
    slope: axisStart.x === axisEnd.x ? Infinity : slope,
    points: range(left, right + pointSlope, pointSlope)
      // this may be wrong for other directions, that remains to be seen
      .map(val => ({y: val, x: slope * val + offset, text: axisScale(val)}))
  };
}

function renderTicks(props) {
  const {axisDomain, numberOfTicks, axisStart, axisEnd, tickValue} = props;
  const {points} = generatePoints({axisStart, axisEnd, numberOfTicks, axisDomain});

  return points
    .map((point, index) => {
      const tickProps = {
        x1: 0,
        x2: 5,
        y1: 0,
        y2: 0
      };

      const textProps = {
        x: 5,
        y: 0
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

class ManipulableAxis extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      marginLeft,
      marginTop,
      axisStart,
      axisEnd,
      axisDomain,
      numberOfTicks,
      tickValue
    } = this.props;

    if (animation) {
      return (
        <Animation {...this.props} {...{animatedProps}}>
          <ManipulableAxis {...this.props} animation={null}/>
        </Animation>
      );
    }

    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');
    return (
      <g className={`${predefinedClassName} ${className}`}
         ref="container"
         transform={`translate(${marginLeft},${marginTop})`}>
        <line {...{
          x1: xFunctor({x: axisStart.x}),
          x2: xFunctor({x: axisEnd.x}),
          y1: yFunctor({y: axisStart.y}),
          y2: yFunctor({y: axisEnd.y})
        }} className="rv-xy-plot__axis__line"/>
        <g className="rv-xy-manipulable-axis__ticks">
          {renderTicks({
            axisDomain,
            numberOfTicks,
            tickValue,
            axisStart: {x: xFunctor(axisStart), y: yFunctor(axisStart)},
            axisEnd: {x: xFunctor(axisEnd), y: yFunctor(axisEnd)}
          })}
        </g>
      </g>
    );
  }
}

const DEFAULT_FORMAT = format('.2r');

ManipulableAxis.defaultProps = {
  className: '',
  numberOfTicks: 10,
  tickValue: d => DEFAULT_FORMAT(d)
};
ManipulableAxis.displayName = 'ManipulableAxis';
export default ManipulableAxis;
