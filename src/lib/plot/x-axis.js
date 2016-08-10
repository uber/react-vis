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
import Axis from './axis';
import {ORIENTATION, getTicksTotalFromSize} from '../utils/axis-utils';

const {TOP, BOTTOM} = ORIENTATION;

const propTypes = {
  ...Axis.propTypes,
  orientation: React.PropTypes.oneOf([
    TOP, BOTTOM
  ])
};

const defaultProps = {
  orientation: BOTTOM,
  attr: 'x'
};

class XAxis extends PureRenderComponent {

  _getDefaultAxisProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginBottom,
      marginLeft,
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
    }
    return {
      tickTotal: getTicksTotalFromSize(innerWidth),
      top: 0,
      left: marginLeft,
      width: innerWidth,
      height: marginTop
    };
  }

  render() {
    const axisProps = {
      ...this._getDefaultAxisProps(),
      ...this.props
    };
    return (
      <Axis {...axisProps} />
    );
  }
}

XAxis.displayName = 'XAxis';
XAxis.propTypes = propTypes;
XAxis.defaultProps = defaultProps;
XAxis.requiresSVG = true;

export default XAxis;
