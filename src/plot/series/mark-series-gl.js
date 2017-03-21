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
import DeckGL, {
  ScatterplotLayer, OrthographicViewport, COORDINATE_SYSTEM
} from 'deck.gl';
import {rgb} from 'd3-color';

import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
import {DEFAULT_SIZE, DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';

class MarkSeriesGL extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  _renderScatterplotLayer(props) {
    const {data, _renderKey, seriesId} = props;
    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');
    const sizeFunctor = this._getAttributeFunctor('size');
    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const opacityFunctor = this._getAttributeFunctor('opacity');

    return new ScatterplotLayer({
      id: seriesId,
      data,
      getPosition: p => [xFunctor(p), yFunctor(p)],
      getRadius: p => sizeFunctor(p) || DEFAULT_SIZE,
      getColor: p => {
        const color = rgb(fillFunctor(p));
        return [color.r, color.g, color.b, (opacityFunctor(p) || DEFAULT_OPACITY) * 255];
      },
      opacity: 1,
      projectionMode: COORDINATE_SYSTEM.IDENTITY,
      updateTriggers: {
        getPosition: _renderKey,
        getColor: _renderKey,
        getRadius: _renderKey
      },
      // there's a bug that the radius calculated with project_scale
      radiusMinPixels: 2
    });
  }

  render() {
    const {
      animation,
      className,
      data,
      marginLeft,
      marginTop,
      marginBottom,
      marginRight,
      innerHeight,
      innerWidth
    } = this.props;

    if (!data) {
      return null;
    }
    const width = innerWidth + marginLeft + marginRight;
    const height = innerHeight + marginTop + marginBottom;
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <MarkSeriesGL {...this.props} animation={null}/>
        </Animation>
      );
    }

    const glViewport = new OrthographicViewport({
      width: width || 0,
      height: height || 0,
      left: -marginLeft,
      top: -marginTop
    });
    return (
      <div className={`${predefinedClassName} ${className}`}>
        {innerHeight && innerWidth && <DeckGL width={width} height={height} viewport={glViewport}
          style={{position: 'absolute', top: '0px', left: '0px'}}
          layers={[this._renderScatterplotLayer(this.props)]}/>}
      </div>
    );
  }
}

MarkSeriesGL.displayName = 'MarkSeriesGL';
MarkSeriesGL.propTypes = {
  ...AbstractSeries.propTypes,
  seriesId: PropTypes.string.isRequired
};

export default MarkSeriesGL;
