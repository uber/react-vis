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
import PropTypes from 'prop-types';

import AbstractSeries from './abstract-series';
import LineSeries from './line-series';
import MarkSeries from './mark-series';

const propTypes = {
  ...LineSeries.propTypes,
  lineStyle: PropTypes.object,
  markStyle: PropTypes.object
};

class LineMarkSeries extends AbstractSeries {
  static get defaultProps() {
    return {
      ...LineSeries.defaultProps,
      lineStyle: {},
      markStyle: {}
    };
  }

  render() {
    const {lineStyle, markStyle, style} = this.props;
    return (
      <g className="rv-xy-plot__series rv-xy-plot__series--linemark">
        <LineSeries {...this.props} style={{...style, ...lineStyle}} />
        <MarkSeries {...this.props} style={{...style, ...markStyle}} />
      </g>
    );
  }
}

LineMarkSeries.displayName = 'LineMarkSeries';
LineMarkSeries.propTypes = propTypes;

export default LineMarkSeries;
