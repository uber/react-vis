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

import PropTypes from 'prop-types';
import {COORDINATE_SYSTEM, PathLayer} from 'deck.gl';
import {rgb} from 'd3-color';

import {DEFAULT_OPACITY} from 'theme';

import AbstractSeries from './abstract-series';
import {getAttributeFunctor} from 'utils/scales-utils';

class LineSeriesGL extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isDeckGL() {
    return true;
  }

  static renderLayer(props) {
    const {
      data,
      opacity,
      seriesId,
      strokeWidth,
      onValueMouseOver,
      onValueClick,
      fp64
    } = props;

    const x = getAttributeFunctor(props, 'x');
    const y = getAttributeFunctor(props, 'y');
    const fill = getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
    const opacityScale = getAttributeFunctor(props, 'opacity');

    return new PathLayer({
      id: seriesId,
      data: [data],
      getPath: p => p.map(row => [x(row), y(row)]),
      getColor: p => {
        const color = rgb(fill(p));
        return [color.r, color.g, color.b, (opacityScale(p) || DEFAULT_OPACITY) * 255];
      },
      getWidth: p => Number(strokeWidth) || 1,
      opacity: (opacity || DEFAULT_OPACITY),
      projectionMode: COORDINATE_SYSTEM.IDENTITY,
      pickable: true,
      onHover: row => onValueMouseOver(row.object),
      onClick: row => onValueClick(row.object),
      fp64
    });
  }

  render() {
    return null;
  }
}

LineSeriesGL.displayName = 'LineSeriesGL';
LineSeriesGL.defaultProps = {
  onValueMouseOver: () => {},
  onValueClick: () => {},
  fp64: false
};
LineSeriesGL.propTypes = {
  ...AbstractSeries.propTypes,
  seriesId: PropTypes.string.isRequired
};

export default LineSeriesGL;
