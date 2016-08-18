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
import PureRenderComponent from '../../pure-render-component';
import {ORIENTATION} from '../../utils/axis-utils';
import AxisLine from './axis-line';
import AxisTicks from './axis-ticks';
import AxisTitle from './axis-title';

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
  tickPadding: 8,
  tickTotal: 10,
  top: 0,
  left: 0,
  height: 0,
  width: 0
};

class Axis extends PureRenderComponent {
  render() {
    const {
      left,
      top,
      width,
      height,
      orientation,
      title
    } = this.props;

    return (
      <g
        transform={`translate(${left},${top})`}
        className="rv-xy-plot__axis">
        <AxisLine
          height={height}
          width={width}
          orientation={orientation}/>
        <AxisTicks {...this.props} />
        {title ?
          <AxisTitle
            title={title}
            height={height}
            width={width}
            orientation={orientation}/> :
          null}
      </g>
    );
  }
}

Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;

export default Axis;
