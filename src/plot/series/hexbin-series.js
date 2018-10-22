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
import {hexbin} from 'd3-hexbin';
import {scaleLinear} from 'd3-scale';

import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
import {CONTINUOUS_COLOR_RANGE} from 'theme';
import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--hexbin';

function getColorDomain({countDomain}, hexes) {
  if (countDomain) {
    return countDomain;
  }
  return [0, Math.max(...hexes.map(row => row.length))];
}

class HexbinSeries extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      colorRange,
      data,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      radius,
      sizeHexagonsWithCount,
      style,
      xOffset,
      yOffset
    } = this.props;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <HexbinSeries {...this.props} animation={null} />
        </Animation>
      );
    }
    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');

    const hex = hexbin()
      .x(d => x(d) + xOffset)
      .y(d => y(d) + yOffset)
      .radius(radius)
      .size([innerWidth, innerHeight]);

    const hexagonPath = hex.hexagon();
    const hexes = hex(data);

    const countDomain = getColorDomain(this.props, hexes);
    const color = scaleLinear()
      .domain(countDomain)
      .range(colorRange);
    const size = scaleLinear()
      .domain(countDomain)
      .range([0, radius]);
    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {hexes.map((d, i) => {
          const attrs = {
            style,
            d: sizeHexagonsWithCount
              ? hex.hexagon(size(d.length))
              : hexagonPath,
            fill: color(d.length),
            transform: `translate(${d.x}, ${d.y})`,
            key: i,
            onClick: e => this._valueClickHandler(d, e),
            onContextMenu: e => this._valueRightClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e)
          };
          return <path {...attrs} />;
        })}
      </g>
    );
  }
}

HexbinSeries.propTypes = {
  ...AbstractSeries.propTypes,
  radius: PropTypes.number
};

HexbinSeries.defaultProps = {
  radius: 20,
  colorRange: CONTINUOUS_COLOR_RANGE,
  xOffset: 0,
  yOffset: 0
};

HexbinSeries.displayName = 'HexbinSeries';

export default HexbinSeries;
