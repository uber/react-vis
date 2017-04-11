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

import {ScatterplotLayer, COORDINATE_SYSTEM} from 'deck.gl';
import {rgb} from 'd3-color';
import PropTypes from 'prop-types';

import {DEFAULT_SIZE, DEFAULT_OPACITY} from 'theme';
import {getAttributeFunctor} from 'utils/scales-utils';

import AbstractSeries from './abstract-series';

class MarkSeriesGL extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isDeckGL() {
    return true;
  }

  static renderLayer(props) {
    const {
      data,
      _renderKey,
      seriesId,
      colorDomain,
      colorRange,
      sizeDomain,
      sizeRange,
      fp64
    } = props;

    const xFunctor = getAttributeFunctor(props, 'x');
    const yFunctor = getAttributeFunctor(props, 'y');
    const sizeFunctor = getAttributeFunctor(props, 'size') || (p => DEFAULT_SIZE);
    const fillFunctor = getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
    const opacityFunctor = getAttributeFunctor(props, 'opacity');

    return new ScatterplotLayer({
      id: seriesId,
      data,
      getPosition: p => [xFunctor(p), yFunctor(p)],
      getRadius: p => sizeFunctor(p),
      getColor: p => {
        const color = rgb(fillFunctor(p));
        return [color.r, color.g, color.b, (opacityFunctor(p) || DEFAULT_OPACITY) * 255];
      },
      opacity: 1,
      projectionMode: COORDINATE_SYSTEM.IDENTITY,
      updateTriggers: {
        getPosition: _renderKey,
        getColor: colorDomain.concat(colorRange).concat([_renderKey]).join(''),
        getRadius: sizeDomain.concat(sizeRange).concat([_renderKey]).join('')
      },
      // there's a bug that the radius calculated with project_scale
      radiusMinPixels: 2,
      pickable: true,
      onHover: row => props.onValueMouseOver(row.object),
      onClick: row => props.onValueClick(row.object),
      fp64
    });
  }

  render() {
    return null;
  }
}

MarkSeriesGL.displayName = 'MarkSeriesGL';
MarkSeriesGL.defaultProps = {
  onValueMouseOver: () => {},
  onValueClick: () => {},
  fp64: false
};

MarkSeriesGL.propTypes = {
  ...AbstractSeries.propTypes,
  seriesId: PropTypes.string.isRequired,
  fp64: PropTypes.bool
};

export default MarkSeriesGL;
