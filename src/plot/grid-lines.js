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

import PureRenderComponent from 'pure-render-component';
import {getAttributeScale} from 'utils/scales-utils';
import Animation from 'animation';

import {
  getTicksTotalFromSize,
  getTickValues,
  DIRECTION
} from '../utils/axis-utils';

import {AnimationPropType} from '../utils/animation-utils';

const {VERTICAL, HORIZONTAL} = DIRECTION;

const propTypes = {
  direction: React.PropTypes.oneOf([
    VERTICAL, HORIZONTAL
  ]),
  attr: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  top: React.PropTypes.number,
  left: React.PropTypes.number,

  tickValues: React.PropTypes.array,
  tickTotal: React.PropTypes.number,

  animation: AnimationPropType,

  // Not expected to be used by the users.
  // TODO: Add underscore to these properties later.
  marginTop: React.PropTypes.number,
  marginBottom: React.PropTypes.number,
  marginLeft: React.PropTypes.number,
  marginRight: React.PropTypes.number,
  innerWidth: React.PropTypes.number,
  innerHeight: React.PropTypes.number
};

const defaultProps = {
  direction: VERTICAL
};

const animatedProps = [
  'xRange', 'yRange', 'xDomain', 'yDomain',
  'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
  'tickTotal'
];

class GridLines extends PureRenderComponent {

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
        direction === VERTICAL ?
          innerWidth :
          innerHeight
      )
    };
  }

  render() {
    const {animation} = this.props;
    if (animation) {
      return (
        <Animation {...this.props} {...{animatedProps}}>
          <GridLines {...this.props} animation={null}/>
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
        className="rv-xy-plot__grid-lines">
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
              className="rv-xy-plot__grid-lines__line" />
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
