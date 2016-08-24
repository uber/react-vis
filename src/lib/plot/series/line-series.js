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
import * as d3Shape from 'd3-shape';

import AbstractSeries from './abstract-series';
import Animation from '../../animation';

import {DEFAULT_OPACITY} from '../../theme';

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

const animatedProps = [
  'xRange', 'yRange', 'xDomain', 'yDomain', 'colorRange', 'colorDomain',
  'opacityRange', 'opacityDomain', 'strokeRange', 'strokeDomain',
  'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
  'data'
];

const defaultProps = {
  strokeStyle: 'solid',
  opacity: 1
};

const propTypes = {
  ...AbstractSeries.propTypes,
  strokeStyle: React.PropTypes.oneOf(Object.keys(STROKE_STYLES))
};

class LineSeries extends AbstractSeries {

  render() {
    const {data, animation} = this.props;
    if (!data) {
      return null;
    }
    if (animation) {
      return (
        <Animation {...{animatedProps}} {...animation}>
          <LineSeries {...this.props} animation={null}/>
        </Animation>
      );
    }

    const {strokeStyle, strokeWidth, marginLeft, marginTop} = this.props;

    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');
    const stroke = this._getAttributeValue('stroke') ||
      this._getAttributeValue('color');
    const opacity = this._getAttributeValue('opacity') || DEFAULT_OPACITY;
    const line = d3Shape.line().x(x).y(y);
    const d = line(data);

    return (
      <path
        d={d}
        className="rv-xy-plot__series rv-xy-plot__series--line"
        transform={`translate(${marginLeft},${marginTop})`}
        onMouseOver={this._mouseOver}
        onMouseOut={this._mouseOut}
        onClick={this._click}
        style={{
          opacity,
          strokeDasharray: STROKE_STYLES[strokeStyle],
          strokeWidth,
          stroke
        }}/>
    );
  }
}

LineSeries.displayName = 'LineSeries';
LineSeries.defaultProps = defaultProps;
LineSeries.propTypes = propTypes;

export default LineSeries;
