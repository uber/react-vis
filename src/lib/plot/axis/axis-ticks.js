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
import {getAttributeScale} from '../../utils/scales-utils';

const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;

const propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  orientation: React.PropTypes.oneOf([
    LEFT, RIGHT, TOP, BOTTOM
  ]).isRequired
};

function _getTickTextAttributes(orientation) {
  const textAnchor = orientation === LEFT ?
    'end' :
    (orientation === RIGHT ? 'start' : 'middle');
  const dy = orientation === TOP ?
    '0' :
    (orientation === BOTTOM ? '0.72em': '0.32em');
  return {
    textAnchor,
    dy
  };
}

function _getTickFormatFn(scale, tickFormat) {
  return !tickFormat ?
    (scale.tickFormat ? scale.tickFormat() : v => v) :
    tickFormat;
}

function _getTickValues(scale, tickTotal, tickValues) {
  return !tickValues ?
    (scale.ticks ? scale.ticks(tickTotal) : scale.domain()) :
    tickValues;
}

function AxisTicks(props) {
  const {
    attr,
    orientation,
    width,
    height,
    tickSize,
    tickPadding,
    tickFormat,
    tickTotal,
    tickValues,
    tickSizeInner = tickSize,
    tickSizeOuter = tickSize
  } = props;

  const x = orientation === LEFT ? width : 0;
  const y = orientation === TOP ? height : 0;

  const isVertical = orientation === LEFT || orientation === RIGHT;
  const scale = getAttributeScale(props, attr);

  const wrap = (orientation === LEFT || orientation === TOP) ? -1 : 1;

  const values = _getTickValues(scale, tickTotal, tickValues);
  const tickFormatFn = _getTickFormatFn(scale, tickFormat);

  const tickXAttr = isVertical ? 'y' : 'x';
  const tickYAttr = isVertical ? 'x' : 'y';

  const ticks = values.map((v, i) => {
    const pos = scale(v);
    const text = tickFormatFn(v);
    const pathProps = {
      [`${tickXAttr}1`]: pos,
      [`${tickXAttr}2`]: pos,
      [`${tickYAttr}1`]: -wrap * tickSizeOuter,
      [`${tickYAttr}2`]: wrap * tickSizeInner
    };
    const textProps = {
      [tickXAttr]: pos,
      [tickYAttr]: wrap * (tickSizeOuter + tickPadding),
      ..._getTickTextAttributes(orientation)
    };
    return (
      <g key={i} className="rv-xy-plot__axis__tick">
        <line {...pathProps} className="rv-xy-plot__axis__tick__line"/>
        <text {...textProps} className="rv-xy-plot__axis__tick__text">
          {text}
        </text>
      </g>
    );
  });

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="rv-xy-plot__axis__ticks">
      {ticks}
    </g>
  );
}

AxisTicks.displayName = 'AxisTicks';
AxisTicks.propTypes = propTypes;

export default AxisTicks;

