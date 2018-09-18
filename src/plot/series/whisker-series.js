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
import {DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--whisker';
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_CROSS_BAR_WIDTH = 6;

/**
 * Render whisker lines for a data point.
 * @param {Object} whiskerMarkProps All the properties of the whisker mark.
 * @private
 */
const renderWhiskerMark = whiskerMarkProps => (d, i) => {
  const {
    crossBarWidth,
    opacityFunctor,
    sizeFunctor,
    strokeFunctor,
    strokeWidth,
    style,
    valueClickHandler,
    valueMouseOutHandler,
    valueMouseOverHandler,
    valueRightClickHandler,
    xFunctor,
    yFunctor
  } = whiskerMarkProps;

  const r = sizeFunctor ? sizeFunctor(d) : 0;
  const cx = xFunctor(d);
  const cy = yFunctor(d);
  const positiveXVariance = xFunctor({x: d.x + d.xVariance / 2});
  const negativeXVariance = xFunctor({x: d.x - d.xVariance / 2});
  const positiveYVariance = yFunctor({y: d.y + d.yVariance / 2});
  const negativeYVariance = yFunctor({y: d.y - d.yVariance / 2});
  /**
   * Determine whether on not we should draw whiskers in each direction.
   * We need to see an actual variance value, and also have that value extend past the
   * radius "buffer" region in which we won't be drawing (if any).
   */
  const hasXWhiskers = positiveXVariance && cx + r < positiveXVariance;
  const hasYWhiskers = positiveYVariance && cy - r > positiveYVariance;
  if (!hasXWhiskers && !hasYWhiskers) {
    return null;
  }

  const styleAttr = {
    opacity: opacityFunctor ? opacityFunctor(d) : DEFAULT_OPACITY,
    stroke: strokeFunctor && strokeFunctor(d),
    strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH,
    ...style
  };
  const crossBarExtension = crossBarWidth / 2;

  const rightLineAttrs = {
    x1: cx + r,
    y1: cy,
    x2: positiveXVariance,
    y2: cy,
    style: styleAttr
  };
  const leftLineAttrs = {
    x1: cx - r,
    y1: cy,
    x2: negativeXVariance,
    y2: cy,
    style: styleAttr
  };
  const rightCrossBarAttrs = {
    x1: positiveXVariance,
    y1: cy - crossBarExtension,
    x2: positiveXVariance,
    y2: cy + crossBarExtension,
    style: styleAttr
  };
  const leftCrossBarAttrs = {
    x1: negativeXVariance,
    y1: cy - crossBarExtension,
    x2: negativeXVariance,
    y2: cy + crossBarExtension,
    style: styleAttr
  };

  const upperLineAttrs = {
    x1: cx,
    y1: cy - r,
    x2: cx,
    y2: positiveYVariance,
    style: styleAttr
  };
  const lowerLineAttrs = {
    x1: cx,
    y1: cy + r,
    x2: cx,
    y2: negativeYVariance,
    style: styleAttr
  };
  const upperCrossBarAttrs = {
    x1: cx - crossBarExtension,
    y1: positiveYVariance,
    x2: cx + crossBarExtension,
    y2: positiveYVariance,
    style: styleAttr
  };
  const lowerCrossBarAttrs = {
    x1: cx - crossBarExtension,
    y1: negativeYVariance,
    x2: cx + crossBarExtension,
    y2: negativeYVariance,
    style: styleAttr
  };

  return (
    <g
      className="mark-whiskers"
      key={i}
      onClick={e => valueClickHandler(d, e)}
      onContextMenu={e => valueRightClickHandler(d, e)}
      onMouseOver={e => valueMouseOverHandler(d, e)}
      onMouseOut={e => valueMouseOutHandler(d, e)}
    >
      {hasXWhiskers ? (
        <g className="x-whiskers">
          <line {...rightLineAttrs} />
          <line {...leftLineAttrs} />
          <line {...rightCrossBarAttrs} />
          <line {...leftCrossBarAttrs} />
        </g>
      ) : null}
      {hasYWhiskers ? (
        <g className="y-whiskers">
          <line {...upperLineAttrs} />
          <line {...lowerLineAttrs} />
          <line {...upperCrossBarAttrs} />
          <line {...lowerCrossBarAttrs} />
        </g>
      ) : null}
    </g>
  );
};

class WhiskerSeries extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      crossBarWidth,
      data,
      marginLeft,
      marginTop,
      strokeWidth,
      style
    } = this.props;
    if (!data) {
      return null;
    }
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <WhiskerSeries {...this.props} animation={null} />
        </Animation>
      );
    }

    const whiskerMarkProps = {
      crossBarWidth,
      opacityFunctor: this._getAttributeFunctor('opacity'),
      sizeFunctor: this._getAttributeFunctor('size'),
      strokeFunctor:
        this._getAttributeFunctor('stroke') ||
        this._getAttributeFunctor('color'),
      strokeWidth,
      style,
      xFunctor: this._getAttributeFunctor('x'),
      yFunctor: this._getAttributeFunctor('y'),
      valueClickHandler: this._valueClickHandler,
      valueRightClickHandler: this._valueRightClickHandler,
      valueMouseOverHandler: this._valueMouseOverHandler,
      valueMouseOutHandler: this._valueMouseOutHandler
    };

    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {data.map(renderWhiskerMark(whiskerMarkProps))}
      </g>
    );
  }
}

WhiskerSeries.displayName = 'WhiskerSeries';
WhiskerSeries.propTypes = {
  ...AbstractSeries.propTypes,
  strokeWidth: PropTypes.number
};
WhiskerSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  crossBarWidth: DEFAULT_CROSS_BAR_WIDTH,
  size: 0,
  strokeWidth: DEFAULT_STROKE_WIDTH
};
export default WhiskerSeries;
