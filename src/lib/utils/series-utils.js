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

import AbstractSeries from '../plot/series/abstract-series';

import {DISCRETE_COLOR_RANGE, DEFAULT_OPACITY} from '../theme';

/**
 * Check if the component is series or not.
 * @param {React.Component} child Component.
 * @returns {boolean} True if the child is series, false otherwise.
 */
export function isSeriesChild(child) {
  const {prototype} = child.type;
  return prototype instanceof AbstractSeries;
}

/**
 * Get all series from the 'children' object of the component.
 * @param {Object} children Children.
 * @returns {Array} Array of children.
 */
export function getSeriesChildren(children) {
  return React.Children.toArray(children).filter(child =>
  child && isSeriesChild(child));
}

/**
 * Collect the map of repetitions of the series type for all children.
 * @param {Array} children Array of children.
 * @returns {{}} Map of repetitions where sameTypeTotal is the total amount and
 * sameTypeIndex is always 0.
 */
function collectSeriesTypesInfo(children) {
  const result = {};
  children.filter(isSeriesChild).forEach(child => {
    const {displayName} = child.type;
    if (!result[displayName]) {
      result[displayName] = {
        sameTypeTotal: 0,
        sameTypeIndex: 0
      };
    }
    result[displayName].sameTypeTotal++;
  });
  return result;
}

export function getStackedData(children, attr) {
  const childData = [];
  let prevIndex = -1;
  children.forEach((child, childIndex) => {
    if (!child) {
      childData.push(null);
      return;
    }
    const {data} = child.props;
    if (!attr || !data || !data.length) {
      childData.push(data);
      return;
    }
    const attr0 = `${attr}0`;
    childData.push(data.map((d, dIndex) => {
      let prevValue = 0;
      if (prevIndex >= 0) {
        const prevD = childData[prevIndex][dIndex];
        prevValue = prevD[attr0] + prevD[attr];
      }
      return {
        [attr0]: prevValue,
        ...d
      };
    }));
    prevIndex = childIndex;
  });
  return childData;
}

/**
 * Get the list of series props for a child.
 * @param {Array} children Array of all children.
 * @returns {Array} Array of series props for each child. If a child is not a
 * series, than it's undefined.
 */
export function getSeriesPropsFromChildren(children) {
  const result = [];
  const seriesTypesInfo = collectSeriesTypesInfo(children);
  let seriesIndex = 0;
  const _opacityValue = DEFAULT_OPACITY;
  children.forEach(child => {
    let props;
    if (isSeriesChild(child)) {
      const seriesTypeInfo = seriesTypesInfo[child.type.displayName];
      const _colorValue = DISCRETE_COLOR_RANGE[seriesIndex %
        DISCRETE_COLOR_RANGE.length];
      props = {
        ...seriesTypeInfo,
        seriesIndex,
        ref: `series${seriesIndex}`,
        _colorValue,
        _opacityValue
      };
      seriesTypeInfo.sameTypeIndex++;
      seriesIndex++;
    }
    result.push(props);
  });
  return result;
}
