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

import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {getAttributeScale} from 'utils/scales-utils';
import Animation, {AnimationPropType} from 'animation';

import {
  getTicksTotalFromSize,
  getTickValues,
  DIRECTION
} from '../utils/axis-utils';

const {VERTICAL, HORIZONTAL} = DIRECTION;

const propTypes = {
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  attr: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,

  style: PropTypes.object,

  tickValues: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  ),
  tickTotal: PropTypes.number,

  animation: AnimationPropType,

  // generally supplied by xyplot
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};

const defaultProps = {
  direction: VERTICAL
};

const animatedProps = [
  'xRange',
  'yRange',
  'xDomain',
  'yDomain',
  'width',
  'height',
  'marginLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'tickTotal'
];

class GridLines extends PureComponent {
  _getDefaultProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginLeft,
      direction
    } = this.props;
    return {
      left: marginLeft,
      top: marginTop,
      width: innerWidth,
      height: innerHeight,
      tickTotal: getTicksTotalFromSize(
        direction === VERTICAL ? innerWidth : innerHeight
      )
    };
  }

  render() {
    const {animation} = this.props;
    if (animation) {
      return (
        <Animation {...this.props} {...{animatedProps}}>
          <GridLines {...this.props} animation={null} />
        </Animation>
      );
    }

    const props = {
      ...this._getDefaultProps(),
      ...this.props
    };

    const {
      attr,
      direction,
      width,
      height,
      style,
      tickTotal,
      tickValues,
      top,
      left
    } = props;
    const isVertical = direction === VERTICAL;
    const tickXAttr = isVertical ? 'y' : 'x';
    const tickYAttr = isVertical ? 'x' : 'y';
    const length = isVertical ? height : width;

    const scale = getAttributeScale(props, attr);
    const values = getTickValues(scale, tickTotal, tickValues);

    return (
      <g
        transform={`translate(${left},${top})`}
        className="rv-xy-plot__grid-lines"
      >
        {values.map((v, i) => {
          const pos = scale(v);
          const pathProps = {
            [`${tickYAttr}1`]: pos,
            [`${tickYAttr}2`]: pos,
            [`${tickXAttr}1`]: 0,
            [`${tickXAttr}2`]: length
          };
          return (
            <line
              {...pathProps}
              key={i}
              className="rv-xy-plot__grid-lines__line"
              style={style}
            />
          );
        })}
      </g>
    );
  }
}

GridLines.displayName = 'GridLines';
GridLines.defaultProps = defaultProps;
GridLines.propTypes = propTypes;
GridLines.requiresSVG = true;

export default GridLines;
