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
import DeckGL, {
  ScatterplotLayer, OrthographicViewport, COORDINATE_SYSTEM
} from 'deck.gl';

// import Animation from 'animation';
// import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
// import {DEFAULT_SIZE, DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';

// const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';

class MarkSeriesGL extends AbstractSeries {
  _getDefaultProps() {
    const {
      innerWidth,
      innerHeight,
      marginTop,
      marginLeft
    } = this.props;
    return {
      left: marginLeft,
      top: marginTop,
      width: innerWidth,
      height: innerHeight
    };
  }

  static get requiresSVG() {
    return false;
  }

  _renderScatterplotLayer() {
    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');
    return new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: this.props.data,
      getPosition: p => [
        xFunctor(p),
        yFunctor(p)
        // p.radius * Math.cos(p.theta * DEGREE_TO_RADIAN) * size,
        // p.radius * Math.sin(p.theta * DEGREE_TO_RADIAN) * size
      ],
      getRadius: p => 2,
      getColor: p => [255, 0, 128, 196],
      updateTriggers: {
        getPosition: this.points._lastUpdate
      },
      projectionMode: COORDINATE_SYSTEM.IDENTITY,
      // there's a bug that the radius calculated with project_scale
      radiusMinPixels: 2
    });
  }

  render() {
    const {
      // animation,
      // className,
      data,
      // marginLeft,
      // marginTop,
      height,
      width
    } = this.props;
    if (!data) {
      return null;
    }
    // if (animation) {
    //   return (
    //     <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
    //       <MarkSeries {...this.props} animation={null}/>
    //     </Animation>
    //   );
    // }

    // const sizeFunctor = this._getAttributeFunctor('size');
    // const opacityFunctor = this._getAttributeFunctor('opacity');
    // const fillFunctor = this._getAttributeFunctor('fill') ||
    //   this._getAttributeFunctor('color');
    // const strokeFunctor = this._getAttributeFunctor('stroke') ||
    //   this._getAttributeFunctor('color');
    const left = -Math.min(width, height) / 2;
    const top = -Math.min(width, height) / 2;
    const glViewport = new OrthographicViewport({width, height, left, top});

    return (
      height && width && <DeckGL width={width} height={height} viewport={glViewport}
        style={{position: 'absolute', top: '0px', left: '0px'}}
        layers={[this._renderScatterplotLayer()]}/>
    );
  }
}

MarkSeriesGL.displayName = 'MarkSeriesGL';

export default MarkSeriesGL;
