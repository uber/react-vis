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
  className: React.PropTypes.string,
  circlesTotal: React.PropTypes.number,
  endSize: React.PropTypes.number,
  endTitle: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  height: React.PropTypes.number,
  startSize: React.PropTypes.number,
  startTitle: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  width: React.PropTypes.number
};

const defaultProps = {
  circlesTotal: 10,
  className: '',
  endSize: 20,
  startSize: 2
};

function ContinuousSizeLegend({startTitle, endTitle, startSize, endSize,
  circlesTotal, height, width, className}) {
  const circles = [];
  const step = (endSize - startSize) / (circlesTotal - 1);

  for (let i = 0; i < circlesTotal; i++) {
    const size = step * i + startSize;
    circles.push(
      <div key={i} className="rv-bubble" style={{
        width: size,
        height: size,
        borderRadius: size / 2
      }} />
    );
    // Add the separator in order to justify the content (otherwise the tags
    // will be stacked together without any margins around).
    circles.push(' ');
  }
  return (
    <div className={`rv-continuous-size-legend ${className}`} style={{width, height}}>
      <div className="rv-bubbles" style={{height: endSize}}>
        {circles}
        <div className="rv-spacer" />
      </div>
      <div className="rv-legend-titles">
        <span className="rv-legend-titles__left">
          {startTitle}
        </span>
        <span className="rv-legend-titles__right">
          {endTitle}
        </span>
      </div>
    </div>
  );
}

ContinuousSizeLegend.displayName = 'ContinuousSizeLegend';
ContinuousSizeLegend.propTypes = propTypes;
ContinuousSizeLegend.defaultProps = defaultProps;

export default ContinuousSizeLegend;
