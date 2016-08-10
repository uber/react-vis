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
import PureRenderComponent from '../pure-render-component';
import {getAttributeScale} from '../utils/scales-utils';
import {ORIENTATION} from '../utils/axis-utils';

const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;

const propTypes = {
  orientation: React.PropTypes.oneOf([
    LEFT, RIGHT, TOP, BOTTOM
  ]),
  attr: React.PropTypes.string.isRequired,

  tickSize: React.PropTypes.number,
  tickSizeInner: React.PropTypes.number,
  tickSizeOuter: React.PropTypes.number,
  tickPadding: React.PropTypes.number,
  tickValues: React.PropTypes.array,
  tickFormat: React.PropTypes.func,
  tickTotal: React.PropTypes.number,

  width: React.PropTypes.number,
  height: React.PropTypes.number,
  top: React.PropTypes.number,
  left: React.PropTypes.number
};

const defaultProps = {
  tickSize: 6,
  tickPadding: 2,
  tickTotal: 10,
  top: 0,
  left: 0,
  height: 0,
  width: 0
};

function _getTextAnchorFromOrientation(orientation) {
  if (orientation === LEFT) {
    return 'end';
  }
  if (orientation === RIGHT) {
    return 'start';
  }
  return 'middle';
}

function _getDyFromOrientation(orientation) {
  if (orientation === TOP) {
    return '0';
  }
  if (orientation === BOTTOM) {
    return '0.72em';
  }
  return '0.32em';
}

class Axis extends PureRenderComponent {

  _getTickFormatFn(scale) {
    const {tickFormat} = this.props;
    return !tickFormat ?
      (scale.tickFormat ? scale.tickFormat() : v => v) :
      tickFormat;
  }

  _getTickValues(scale) {
    const {tickTotal, tickValues} = this.props;
    return !tickValues ?
      (scale.ticks ? scale.ticks(tickTotal) : scale.domain()) :
      tickValues;
  }

  _getLineCoordinates() {
    const {width, height, orientation} = this.props;
    if (orientation === LEFT) {
      return {
        x1: width,
        x2: width,
        y1: 0,
        y2: height
      };
    }
    if (orientation === RIGHT) {
      return {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: height
      };
    }
    if (orientation === TOP) {
      return {
        x1: 0,
        x2: width,
        y1: height,
        y2: height
      };
    }
    return {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0
    };
  }

  _renderTicks() {
    const {
      attr,
      tickSize,
      tickPadding,
      orientation
    } = this.props;
    const isVertical = orientation === LEFT || orientation === RIGHT;
    const {
      tickSizeInner = tickSize,
      tickSizeOuter = tickSize
    } = this.props;
    const scale = getAttributeScale(this.props, attr);

    const wrap = (orientation === LEFT || orientation === TOP) ? -1 : 1;

    const values = this._getTickValues(scale);
    const tickFormatFn = this._getTickFormatFn(scale);

    const tickXAttr = isVertical ? 'y' : 'x';
    const tickYAttr = isVertical ? 'x' : 'y';

    const dy = _getDyFromOrientation(orientation);
    const textAnchor = _getTextAnchorFromOrientation(orientation);

    return values.map((v, i) => {
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
        dy,
        textAnchor
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
  }

  render() {
    const {left, top} = this.props;
    const lineProps = this._getLineCoordinates();

    return (
      <g
        transform={`translate(${left},${top})`}
        className="rv-xy-plot__axis">
        <line {...lineProps} className="rv-xy-plot__axis__line"/>
        <g
          transform={`translate(${lineProps.x1}, ${lineProps.y1})`}
          className="rv-xy-plot__axis__ticks">
          {this._renderTicks()}
        </g>
      </g>
    );
  }
}

Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;

export default Axis;
