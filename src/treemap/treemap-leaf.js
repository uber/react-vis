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

import Animation, {AnimationPropType} from 'animation';
import {getFontColorFromBackground} from 'utils/scales-utils';

const ANIMATED_PROPS = [
  'colorRange',
  'colorDomain',
  'color',
  'opacityRange',
  'opacityDomain',
  'opacity',
  'x0',
  'x1',
  'y0',
  'y1',
  'r'
];

function TreemapLeaf(props) {
  const {
    animation,
    getLabel,
    mode,
    node,
    onLeafClick,
    onLeafMouseOver,
    onLeafMouseOut,
    r,
    scales,
    x0,
    x1,
    y0,
    y1,
    style
  } = props;

  if (animation) {
    return (
      <Animation {...props} animatedProps={ANIMATED_PROPS}>
        <TreemapLeaf {...props} animation={null} />
      </Animation>
    );
  }
  const useCirclePacking = mode === 'circlePack';
  const background = scales.color(node);
  const opacity = scales.opacity(node);
  const color = getFontColorFromBackground(background);
  const {data} = node;
  const title = getLabel(data);
  const leafStyle = {
    top: useCirclePacking ? y0 - r : y0,
    left: useCirclePacking ? x0 - r : x0,
    width: useCirclePacking ? r * 2 : x1 - x0,
    height: useCirclePacking ? r * 2 : y1 - y0,
    background,
    opacity,
    color,
    ...style,
    ...node.data.style
  };

  return (
    <div
      className={`rv-treemap__leaf ${
        useCirclePacking ? 'rv-treemap__leaf--circle' : ''
      }`}
      onMouseEnter={event => onLeafMouseOver(node, event)}
      onMouseLeave={event => onLeafMouseOut(node, event)}
      onClick={event => onLeafClick(node, event)}
      style={leafStyle}
    >
      <div className="rv-treemap__leaf__content">{title}</div>
    </div>
  );
}

TreemapLeaf.propTypes = {
  animation: AnimationPropType,
  height: PropTypes.number.isRequired,
  mode: PropTypes.string,
  node: PropTypes.object.isRequired,
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  scales: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  x0: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y0: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired
};
export default TreemapLeaf;
