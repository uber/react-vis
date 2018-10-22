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

import Animation from 'animation';
import {ORIENTATION, getTicksTotalFromSize} from 'utils/axis-utils';
import {getAttributeScale} from 'utils/scales-utils';

import AxisLine from './axis-line';
import AxisTicks from './axis-ticks';
import AxisTitle from './axis-title';

const defaultAnimatedProps = [
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
  'tickSize',
  'tickTotal',
  'tickSizeInner',
  'tickSizeOuter'
];

const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;

const propTypes = {
  orientation: PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM]),
  attr: PropTypes.string.isRequired,
  attrAxis: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  title: PropTypes.string,

  style: PropTypes.object,

  className: PropTypes.string,
  hideTicks: PropTypes.bool,
  hideLine: PropTypes.bool,
  on0: PropTypes.bool,
  tickLabelAngle: PropTypes.number,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  tickValues: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  ),
  tickFormat: PropTypes.func,
  tickTotal: PropTypes.number,

  // Not expected to be used by the users.
  // TODO: Add underscore to these properties later.
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};

const defaultProps = {
  className: '',
  on0: false,
  style: {},
  tickSize: 6,
  tickPadding: 8,
  orientation: BOTTOM
};

const predefinedClassName = 'rv-xy-plot__axis';
const VERTICAL_CLASS_NAME = 'rv-xy-plot__axis--vertical';
const HORIZONTAL_CLASS_NAME = 'rv-xy-plot__axis--horizontal';

class Axis extends PureComponent {
  /**
   * Define the default values depending on the data passed from the outside.
   * @returns {*} Object of default properties.
   * @private
   */
  _getDefaultAxisProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      orientation
    } = this.props;
    if (orientation === BOTTOM) {
      return {
        tickTotal: getTicksTotalFromSize(innerWidth),
        top: innerHeight + marginTop,
        left: marginLeft,
        width: innerWidth,
        height: marginBottom
      };
    } else if (orientation === TOP) {
      return {
        tickTotal: getTicksTotalFromSize(innerWidth),
        top: 0,
        left: marginLeft,
        width: innerWidth,
        height: marginTop
      };
    } else if (orientation === LEFT) {
      return {
        tickTotal: getTicksTotalFromSize(innerHeight),
        top: marginTop,
        left: 0,
        width: marginLeft,
        height: innerHeight
      };
    }
    return {
      tickTotal: getTicksTotalFromSize(innerHeight),
      top: marginTop,
      left: marginLeft + innerWidth,
      width: marginRight,
      height: innerHeight
    };
  }

  render() {
    const {animation} = this.props;

    if (animation) {
      const animatedProps = animation.nonAnimatedProps
        ? defaultAnimatedProps.filter(
            prop => animation.nonAnimatedProps.indexOf(prop) < 0
          )
        : defaultAnimatedProps;

      return (
        <Animation {...this.props} {...{animatedProps}}>
          <Axis {...this.props} animation={null} />
        </Animation>
      );
    }

    const props = {
      ...this._getDefaultAxisProps(),
      ...this.props
    };

    const {
      attrAxis,
      className,
      height,
      hideLine,
      hideTicks,
      left,
      marginTop,
      on0,
      orientation,
      position,
      style,
      title,
      top,
      width
    } = props;
    const isVertical = [LEFT, RIGHT].indexOf(orientation) > -1;
    const axisClassName = isVertical
      ? VERTICAL_CLASS_NAME
      : HORIZONTAL_CLASS_NAME;

    let leftPos = left;
    let topPos = top;
    if (on0) {
      const scale = getAttributeScale(props, attrAxis);
      if (isVertical) {
        leftPos = scale(0);
      } else {
        topPos = marginTop + scale(0);
      }
    }

    return (
      <g
        transform={`translate(${leftPos},${topPos})`}
        className={`${predefinedClassName} ${axisClassName} ${className}`}
        style={style}
      >
        {!hideLine && (
          <AxisLine
            height={height}
            width={width}
            orientation={orientation}
            style={{...style, ...style.line}}
          />
        )}
        {!hideTicks && (
          <AxisTicks {...props} style={{...style, ...style.ticks}} />
        )}
        {title ? (
          <AxisTitle
            position={position}
            title={title}
            height={height}
            width={width}
            style={{...style, ...style.title}}
            orientation={orientation}
          />
        ) : null}
      </g>
    );
  }
}

Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;

export default Axis;
