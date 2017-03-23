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

import React, {PropTypes} from 'react';
import {COORDINATE_SYSTEM, PathLayer} from 'deck.gl';
import {rgb} from 'd3-color';

import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
import {DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';
import DeckGLWrapper from './deck-gl-wrapper';
const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line';

class LineSeriesGL extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  render() {
    const {
      animation,
      className,
      data,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      marginBottom,
      marginRight,
      opacity,
      seriesId,
      strokeWidth,
      _renderKey
    } = this.props;

    if (!data) {
      return null;
    }
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <LineSeriesGL {...this.props} animation={null}/>
        </Animation>
      );
    }
    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');

    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const opacityFunctor = this._getAttributeFunctor('opacity');
    return (
      <div className={`${predefinedClassName} ${className}`}>
        <DeckGLWrapper {...{
          marginLeft,
          marginTop,
          marginBottom,
          marginRight,
          innerHeight,
          innerWidth,
          layers: [
            new PathLayer({
              id: seriesId,
              data: [data],
              getPath: p => p.map(row => [xFunctor(row), yFunctor(row)]),
              getColor: p => {
                const color = rgb(fillFunctor(p));
                return [color.r, color.g, color.b, (opacityFunctor(p) || DEFAULT_OPACITY) * 255];
              },
              getWidth: p => Number(strokeWidth) || 1,
              opacity: (opacity || DEFAULT_OPACITY),
              projectionMode: COORDINATE_SYSTEM.IDENTITY,
              updateTriggers: {
                getPath: _renderKey,
                getColor: _renderKey
              }
            })
          ]
        }} />
      </div>
    );
  }
}

LineSeriesGL.displayName = 'LineSeriesGL';
LineSeriesGL.propTypes = {
  ...AbstractSeries.propTypes,
  seriesId: PropTypes.string.isRequired
};

export default LineSeriesGL;
