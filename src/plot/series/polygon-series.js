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

import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';

import AbstractSeries from './abstract-series';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--polygon';
const DEFAULT_COLOR = '#12939A';

const generatePath = (data, xFunctor, yFunctor) =>
  `${data.reduce(
    (res, row, i) => `${res} ${i ? 'L' : 'M'}${xFunctor(row)} ${yFunctor(row)}`,
    ''
  )} Z`;

class PolygonSeries extends AbstractSeries {
  static get propTypes() {
    return {
      ...AbstractSeries.propTypes
    };
  }

  render() {
    const {
      animation,
      color,
      className,
      data,
      marginLeft,
      marginTop,
      style
    } = this.props;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <PolygonSeries {...this.props} animation={null} />
        </Animation>
      );
    }
    const xFunctor = this._getAttributeFunctor('x');
    const yFunctor = this._getAttributeFunctor('y');

    return (
      <path
        {...{
          className: `${predefinedClassName} ${className}`,
          onMouseOver: e => this._seriesMouseOverHandler(data, e),
          onMouseOut: e => this._seriesMouseOutHandler(data, e),
          onClick: this._seriesClickHandler,
          onContextMenu: this._seriesRightClickHandler,
          fill: color || DEFAULT_COLOR,
          style,
          d: generatePath(data, xFunctor, yFunctor),
          transform: `translate(${marginLeft},${marginTop})`
        }}
      />
    );
  }
}

PolygonSeries.displayName = 'PolygonSeries';

export default PolygonSeries;
