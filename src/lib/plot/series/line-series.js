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
import {ANIMATED_SERIES_PROPS} from '../../utils/series-utils';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line';

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

const defaultProps = {
  strokeStyle: 'solid',
  opacity: 1,
  curve: null
};

const propTypes = {
  ...AbstractSeries.propTypes,
  strokeStyle: React.PropTypes.oneOf(Object.keys(STROKE_STYLES)),
  curve: React.PropTypes.string
};

class LineSeries extends AbstractSeries {

  _renderLine(data, x, y, curve) {
    let line = d3Shape.line();
    if (curve !== null && d3Shape[curve]) {
      line = line.curve(d3Shape[curve]);
    }
    line = line.x(x).y(y);
    return line(data);
  }

  render() {
    const {animation, className, data} = this.props;
    if (!data) {
      return null;
    }
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <LineSeries {...this.props} animation={null}/>
        </Animation>
      );
    }

    const {strokeStyle, strokeWidth, marginLeft, marginTop, curve} = this.props;

    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');
    const stroke = this._getAttributeValue('stroke') ||
      this._getAttributeValue('color');
    const opacity = this._getAttributeValue('opacity') || DEFAULT_OPACITY;
    const d = this._renderLine(data, x, y, curve);

    return (
      <path
        d={d}
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
        onMouseOver={this._seriesMouseOverHandler}
        onMouseOut={this._seriesMouseOutHandler}
        onClick={this._seriesClickHandler}
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
