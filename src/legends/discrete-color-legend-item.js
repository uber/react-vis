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

const STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

function DiscreteColorLegendItem({
  color,
  strokeDasharray,
  strokeStyle,
  strokeWidth,
  disabled,
  onClick,
  orientation,
  onMouseEnter,
  onMouseLeave,
  title
}) {
  let className = `rv-discrete-color-legend-item ${orientation}`;
  if (disabled) {
    className += ' disabled';
  }
  if (onClick) {
    className += ' clickable';
  }
  const strokeDasharrayStyle = STROKE_STYLES[strokeStyle] || strokeDasharray;
  return (
    <div {...{className, onClick, onMouseEnter, onMouseLeave}}>
      <svg className="rv-discrete-color-legend-item__color" height={2} width={14}>
        <path
          className="rv-discrete-color-legend-item__color__path"
          d="M 0, 1 L 14, 1"
          style={{
            ...(strokeWidth ? {strokeWidth} : {}),
            ...(strokeDasharrayStyle ? {strokeDasharray: strokeDasharrayStyle} : {}),
            stroke: disabled ? null : color
          }}

        />
      </svg>
      <span className="rv-discrete-color-legend-item__title">{title}</span>
    </div>
  );
}

DiscreteColorLegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.defaultProps = {
  disabled: false,
  strokeStyle: 'solid'
};
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';

export default DiscreteColorLegendItem;
