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

import React, {PropTypes} from 'react';

import PureRenderComponent from 'pure-render-component';
import {getAttributeScale} from 'utils/scales-utils';
import Animation from 'animation';

import {
  getTicksTotalFromSize,
  getTickValues
} from '../utils/axis-utils';

import {AnimationPropType} from '../utils/animation-utils';

const propTypes = {
  centerX: PropTypes.number,
  centerY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,

  tickValues: PropTypes.array,
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

const animatedProps = [
  'xRange', 'yRange', 'xDomain', 'yDomain',
  'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
  'tickTotal'
];

class CircularGridLines extends PureRenderComponent {

  _getDefaultProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginLeft
    } = this.props;
    return {
      left: marginLeft,
      top: marginTop,
      width: innerWidth,
      height: innerHeight,
      tickTotal: getTicksTotalFromSize(Math.min(innerWidth, innerHeight))
    };
  }

  render() {
    const {animation, centerX, centerY} = this.props;
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={animatedProps}>
          <CircularGridLines {...this.props} animation={null}/>
        </Animation>
      );
    }

    const props = {
      ...this._getDefaultProps(),
      ...this.props
    };

    const {
      tickTotal,
      tickValues,
      marginLeft,
      marginTop
    } = props;

    const xScale = getAttributeScale(props, 'x');
    const yScale = getAttributeScale(props, 'y');
    const values = getTickValues(xScale, tickTotal, tickValues);
    return (
      <g
        transform={`translate(${xScale(centerX) + marginLeft},${yScale(centerY) + marginTop})`}
        className="rv-xy-plot__circular-grid-lines">
        {values.map((value, index) => {
          return (
            <circle
              {...{cx: 0, cy: 0, r: xScale(value)}}
              key={index}
              className="rv-xy-plot__circular-grid-lines__line" />
          );
        })}
      </g>
    );
  }
}

CircularGridLines.displayName = 'CircularGridLines';
CircularGridLines.propTypes = propTypes;
CircularGridLines.defaultProps = {
  centerX: 0,
  centerY: 0
};
CircularGridLines.requiresSVG = true;

export default CircularGridLines;
