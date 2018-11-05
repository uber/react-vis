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
import {DISCRETE_COLOR_RANGE} from 'theme';
import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';

const DEFAULT_LINK_COLOR = DISCRETE_COLOR_RANGE[1];
const DEFAULT_LINK_OPACITY = 0.7;

function SankeyLink(props) {
  const {
    animation,
    data,
    node,
    opacity,
    color,
    strokeWidth,
    style,
    onLinkClick,
    onLinkMouseOver,
    onLinkMouseOut
  } = props;
  if (animation) {
    return (
      <Animation {...props} animatedProps={ANIMATED_SERIES_PROPS}>
        <SankeyLink {...props} animation={null} />
      </Animation>
    );
  }
  return (
    <path
      d={data}
      {...style}
      className="rv-sankey__link"
      opacity={Number.isFinite(opacity) ? opacity : DEFAULT_LINK_OPACITY}
      stroke={color || DEFAULT_LINK_COLOR}
      onClick={e => onLinkClick(node, e)}
      onMouseOver={e => onLinkMouseOver(node, e)}
      onMouseOut={e => onLinkMouseOut(node, e)}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
}

SankeyLink.displayName = 'SankeyLink';
SankeyLink.requiresSVG = true;
export default SankeyLink;
