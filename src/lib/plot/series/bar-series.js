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
import AbstractSeries from './abstract-series';
import Animation from '../../animation';
import {ANIMATED_SERIES_PROPS} from '../../utils/series-utils';

const predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--bar';

class BarSeries extends AbstractSeries {

  static get propTypes() {
    return {
      ... AbstractSeries.propTypes,
      linePosAttr: React.PropTypes.string,
      valuePosAttr: React.PropTypes.string,
      lineSizeAttr: React.PropTypes.string,
      valueSizeAttr: React.PropTypes.string
    };
  }

  _getScackParams() {
    const {_stackBy, valuePosAttr} = this.props;
    let {
      sameTypeTotal = 1,
      sameTypeIndex = 0
    } = this.props;
    if (_stackBy === valuePosAttr) {
      sameTypeTotal = 1;
      sameTypeIndex = 0;
    }
    return {sameTypeTotal, sameTypeIndex};
  }

  render() {
    const {
      animation,
      className,
      data,
      linePosAttr,
      lineSizeAttr,
      marginLeft,
      marginTop,
      valuePosAttr,
      valueSizeAttr
    } = this.props;

    if (!data) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <BarSeries {...this.props} animation={null}/>
        </Animation>
      );
    }

    const {sameTypeTotal, sameTypeIndex} = this._getScackParams();

    const distance = this._getScaleDistance(linePosAttr);
    const lineFunctor = this._getAttributeFunctor(linePosAttr);
    const valueFunctor = this._getAttributeFunctor(valuePosAttr);
    const value0Functor = this._getAttr0Functor(valuePosAttr);
    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const strokeFunctor = this._getAttributeFunctor('stroke') ||
      this._getAttributeFunctor('color');
    const opacityFunctor = this._getAttributeFunctor('opacity');

    const itemSize = (distance / 2) * 0.85;

    return (
      <g className={`${predefinedClassName} ${className}`}
        ref="container"
        transform={`translate(${marginLeft},${marginTop})`}>
        {data.map((d, i) => {
          const attrs = {
            style: {
              opacity: opacityFunctor && opacityFunctor(d),
              stroke: strokeFunctor && strokeFunctor(d),
              fill: fillFunctor && fillFunctor(d)
            },
            [linePosAttr]: lineFunctor(d) - itemSize +
            (itemSize * 2 / sameTypeTotal * sameTypeIndex),
            [lineSizeAttr]: itemSize * 2 / sameTypeTotal,
            [valuePosAttr]: Math.min(value0Functor(d), valueFunctor(d)),
            [valueSizeAttr]: Math.abs(-value0Functor(d) + valueFunctor(d)),
            onClick: e => this._valueClickHandler(d, e),
            onMouseOver: e => this._valueMouseOverHandler(d, e),
            onMouseOut: e => this._valueMouseOutHandler(d, e),
            key: i
          };
          return (<rect {...attrs} />);
        })}
      </g>
    );
  }
}

BarSeries.displayName = 'BarSeries';

export default BarSeries;
