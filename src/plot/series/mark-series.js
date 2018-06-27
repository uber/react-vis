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

import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
import {warning} from 'utils/react-utils';
import {DEFAULT_SIZE, DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';
const DEFAULT_STROKE_WIDTH = 1;

class MarkSeries extends AbstractSeries {
  _renderCircle(d, i, strokeWidth, style, scalingFunctions) {
    const {
      fill,
      opacity,
      size,
      stroke,
      x,
      y
    } = scalingFunctions;

    const attrs = {
      r: size ? size(d) : DEFAULT_SIZE,
      cx: x(d),
      cy: y(d),
      style: {
        opacity: opacity ? opacity(d) : DEFAULT_OPACITY,
        stroke: stroke && stroke(d),
        fill: fill && fill(d),
        strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH,
        ...style
      },
      key: i,
      onClick: e => this._valueClickHandler(d, e),
      onContextMenu: e => this._valueRightClickHandler(d, e),
      onMouseOver: e => this._valueMouseOverHandler(d, e),
      onMouseOut: e => this._valueMouseOutHandler(d, e)
    };
    return <circle {...attrs} />;
  }

  render() {
    const {
      animation,
      className,
      data,
      marginLeft,
      marginTop,
      strokeWidth,
      style
    } = this.props;

    if (this.props.nullAccessor) {
      warning('nullAccessor has been renamed to getNull', true);
    }

    const getNull = this.props.nullAccessor || this.props.getNull;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <MarkSeries {...this.props} animation={null} />
        </Animation>
      );
    }

    const scalingFunctions = {
      fill: this._getAttributeFunctor('fill') || this._getAttributeFunctor('color'),
      opacity: this._getAttributeFunctor('opacity'),
      size: this._getAttributeFunctor('size'),
      stroke: this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color'),
      x: this._getAttributeFunctor('x'),
      y: this._getAttributeFunctor('y')
    };

    return (
      <g
        className={`${predefinedClassName} ${className}`}
        ref={ref => (this.container = ref)}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map((d, i) => {
          return getNull(d) && this._renderCircle(d, i, strokeWidth, style, scalingFunctions);
        })}
      </g>
    );
  }
}

MarkSeries.displayName = 'MarkSeries';
MarkSeries.propTypes = {
  ...AbstractSeries.propTypes,
  getNull: PropTypes.func,
  strokeWidth: PropTypes.number
};
MarkSeries.defaultProps = {
  getNull: () => true
};

export default MarkSeries;
