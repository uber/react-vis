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
import DiscreteColorLegendItem from './discrete-color-legend-item';
import {DISCRETE_COLOR_RANGE} from '../theme';

const propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([
      React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        color: React.PropTypes.string,
        disabled: React.PropTypes.bool
      }),
      React.PropTypes.string.isRequired
    ])
  ).isRequired,
  onItemClick: React.PropTypes.func,
  height: React.PropTypes.number,
  width: React.PropTypes.number
};

const defaultProps = {
  colors: DISCRETE_COLOR_RANGE
};

function fillItemsWithDefaults(items) {
  return items.map((item, i) => {
    return {
      title: item.title ? item.title : item,
      color: item.color ?
        item.color :
        DISCRETE_COLOR_RANGE[i % DISCRETE_COLOR_RANGE.length],
      disabled: Boolean(item.disabled)
    };
  });
}

function DiscreteColorLegend({items: initialItems, width, height,
  onItemClick}) {
  const updatedItems = fillItemsWithDefaults(initialItems);
  return (
    <div className="rv-discrete-color-legend" style={{width, height}}>
      {updatedItems.map((item, i) =>
        <DiscreteColorLegendItem
          {...item}
          key={i}
          onClick={onItemClick ?
            () => onItemClick(initialItems[i], i) :
            null} />
      )}
    </div>
  );
}

DiscreteColorLegend.displayName = 'DiscreteColorLegendItem';
DiscreteColorLegend.propTypes = propTypes;
DiscreteColorLegend.defaultProps = defaultProps;

export default DiscreteColorLegend;
