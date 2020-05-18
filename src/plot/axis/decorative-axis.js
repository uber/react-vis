// Copyright (c) 2017 Uber Technologies, Inc.
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
import {format} from 'd3-format';
import PropTypes from 'prop-types';

import AbstractSeries from 'plot/series/abstract-series';
import DecorativeAxisTicks from './decorative-axis-ticks';
import {XYPlotAxisLine} from '../styled-components';
import Animation from 'animation';
import {getCombinedClassName} from 'utils/styling-utils';

const predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis';

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
  'tickSize',
  'tickTotal',
  'tickSizeInner',
  'tickSizeOuter'
];

class DecorativeAxis extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      marginLeft,
      marginTop,
      axisStart,
      axisEnd,
      axisDomain,
      numberOfTicks,
      tickValue,
      tickSize,
      style
    } = this.props;

    if (animation) {
      return (
        <Animation {...this.props} {...{animatedProps}}>
          <DecorativeAxis {...this.props} animation={null} />
        </Animation>
      );
    }

    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');

    return (
      <g
        className={getCombinedClassName(predefinedClassName, className)}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        <XYPlotAxisLine
          {...{
            x1: x({x: axisStart.x}),
            x2: x({x: axisEnd.x}),
            y1: y({y: axisStart.y}),
            y2: y({y: axisEnd.y}),
            ...style.line
          }}
        />
        <g className="rv-xy-manipulable-axis__ticks">
          {DecorativeAxisTicks({
            axisDomain,
            axisEnd: {x: x(axisEnd), y: y(axisEnd)},
            axisStart: {x: x(axisStart), y: y(axisStart)},
            numberOfTicks,
            tickValue,
            tickSize,
            style
          })}
        </g>
      </g>
    );
  }
}

const DEFAULT_FORMAT = format('.2r');

DecorativeAxis.defaultProps = {
  className: '',
  numberOfTicks: 10,
  tickValue: d => DEFAULT_FORMAT(d),
  tickSize: 5,
  style: {
    line: {
      strokeWidth: 1
    },
    ticks: {
      strokeWidth: 2
    },
    text: {}
  }
};
DecorativeAxis.propTypes = {
  ...AbstractSeries.propTypes,
  axisDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  axisEnd: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  axisStart: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  className: PropTypes.string,
  numberOfTicks: PropTypes.number,
  tickValue: PropTypes.func,
  tickSize: PropTypes.number,
  style: PropTypes.shape({
    line: PropTypes.object,
    ticks: PropTypes.object,
    text: PropTypes.object
  })
};
DecorativeAxis.displayName = 'DecorativeAxis';
export default DecorativeAxis;
