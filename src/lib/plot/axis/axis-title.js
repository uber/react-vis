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
import {ORIENTATION} from '../../utils/axis-utils';

const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;

const propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  orientation: React.PropTypes.oneOf([
    LEFT, RIGHT, TOP, BOTTOM
  ]).isRequired,
  title: React.PropTypes.string.isRequired
};

function AxisTitle({orientation, width, height, title}) {
  const x = orientation === LEFT ? width : 0;
  const y = orientation === TOP ? height : 0;
  let style;
  if (orientation === LEFT) {
    style = {
      transform: 'translate(1em, 0) rotate(-90deg)',
      textAnchor: 'end'
    };
  } else if (orientation === RIGHT) {
    style = {
      transform: 'translate(-1em, 0) rotate(-90deg)',
      textAnchor: 'end'
    };
  } else if (orientation === BOTTOM) {
    style = {
      transform: `translate(${width}px, -6px)`,
      textAnchor: 'end'
    }
  }
  return (
    <g transform={`translate(${x}, ${y})`} className="rv-xy-plot__axis__title">
      <g style={style}>
        <text>{title}</text>
      </g>
    </g>
  );
}

AxisTitle.displayName = 'AxisTitle';
AxisTitle.propTypes = propTypes;

export default AxisTitle;

