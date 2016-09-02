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

const propTypes = {
  title: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  orientation: React.PropTypes.oneOf(['vertical', 'horizontal']).isRequired
};

const defaultProps = {
  disabled: false
};

function DiscreteColorLegendItem({onClick, title, color, disabled,
  orientation}) {
  let className = `rv-discrete-color-legend-item ${orientation}`;
  if (disabled) {
    className += ' disabled';
  }
  if (onClick) {
    className += ' clickable';
  }
  return (
    <div {...{className, onClick}}>
      <span
        className="rv-discrete-color-legend-item__color"
        style={disabled ? null : {background: color}} />
      <span className="rv-discrete-color-legend-item__title">
        {title}
      </span>
    </div>
  );
}

DiscreteColorLegendItem.propTypes = propTypes;
DiscreteColorLegendItem.defaultProps = defaultProps;
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';

export default DiscreteColorLegendItem;
