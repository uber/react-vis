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

import DiscreteColorLegendItem from 'legends/discrete-color-legend-item';
import {DISCRETE_COLOR_RANGE} from 'theme';

function DiscreteColorLegend({
  className,
  colors,
  height,
  items,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave,
  orientation,
  style,
  width
}) {
  return (
    <div
      className={`rv-discrete-color-legend ${orientation} ${className}`}
      style={{width, height, ...style}}
    >
      {items.map((item, i) => (
        <DiscreteColorLegendItem
          title={item.title ? item.title : item}
          color={item.color ? item.color : colors[i % colors.length]}
          strokeDasharray={item.strokeDasharray}
          strokeStyle={item.strokeStyle}
          strokeWidth={item.strokeWidth}
          disabled={Boolean(item.disabled)}
          orientation={orientation}
          key={i}
          onClick={onItemClick ? e => onItemClick(item, i, e) : null}
          onMouseEnter={
            onItemMouseEnter ? e => onItemMouseEnter(item, i, e) : null
          }
          onMouseLeave={
            onItemMouseEnter ? e => onItemMouseLeave(item, i, e) : null
          }
        />
      ))}
    </div>
  );
}

DiscreteColorLegend.displayName = 'DiscreteColorLegendItem';
DiscreteColorLegend.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        disabled: PropTypes.bool
      }),
      PropTypes.string.isRequired,
      PropTypes.element
    ])
  ).isRequired,
  onItemClick: PropTypes.func,
  onItemMouseEnter: PropTypes.func,
  onItemMouseLeave: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
};

DiscreteColorLegend.defaultProps = {
  className: '',
  colors: DISCRETE_COLOR_RANGE,
  orientation: 'vertical'
};

export default DiscreteColorLegend;
