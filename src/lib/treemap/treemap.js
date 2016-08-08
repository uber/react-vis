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
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Color from 'd3-color';
import {getCSSAnimation, AnimationPropType} from '../utils/animation-utils';
import {getAttributeFunctor} from '../utils/scales-utils';
import {CONTINUOUS_COLOR_RANGE, DEFAULT_COLOR, OPACITY_RANGE} from '../theme';

const TREEMAP_TILE_MODES = {
  squarify: d3Hierarchy.treemapSquarify,
  slice: d3Hierarchy.treemapSlice,
  dice: d3Hierarchy.treemapDice,
  slicedice: d3Hierarchy.treemapSliceDice
};

function getFontColorFromBackground(background) {
  if (background) {
    return d3Color.hsl(background).l > 0.57 ? '#222' : '#fff';
  }
  return null;
}

class Treemap extends React.Component {

  static get propTypes() {
    return {
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      data: React.PropTypes.object.isRequired,
      mode: React.PropTypes.oneOf(
        Object.keys(TREEMAP_TILE_MODES)
      ),
      padding: React.PropTypes.number.isRequired,
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      mode: 'squarify',
      padding: 1,
      data: {
        children: []
      },
      colorRange: CONTINUOUS_COLOR_RANGE,
      _colorValue: DEFAULT_COLOR,
      opacityRange: OPACITY_RANGE,
      _opacityValue: 1
    };
  }

  constructor(props) {
    super(props);
    this._renderLeaf = this._renderLeaf.bind(this);
    this.state = {scales: this._getScaleFns(props)};
  }

  componentWillReceiveProps(props) {
    this.setState({scales: this._getScaleFns(props)});
  }

  /**
   * Get the map of scale functions from the given props.
   * @param {Object} props Props for the component.
   * @returns {Object} Map of scale functions.
   * @private
   */
  _getScaleFns(props) {
    const {data} = props;

    // Adding _allData property to the object to reuse the existing
    // getAttributeFunctor function.
    const compatibleProps = {
      ...props,
      _allData: data.children || []
    };
    return {
      opacity: getAttributeFunctor(compatibleProps, 'opacity'),
      color: getAttributeFunctor(compatibleProps, 'color')
    };
  }

  /**
   * Create the list of nodes to render.
   * @returns {Array} Array of nodes.
   * @private
   */
  _getNodesToRender() {
    const {data, height, width, mode, padding} = this.props;

    if (data) {
      const tileFn = TREEMAP_TILE_MODES[mode];
      return d3Hierarchy.treemap(tileFn)
        .tile(d3Hierarchy.treemapSquarify)
        .size([width, height])
        .padding(padding)(
          d3Hierarchy.hierarchy(data)
            .sort((a, b) => a.size - b.size)
            .sum(d => d.size)
        ).descendants();
    }
    return [];
  }

  _renderLeaf(node, i) {
    if (!i) {
      return null;
    }
    const {scales} = this.state;

    const background = scales.color(node);
    const opacity = scales.opacity(node);
    const color = getFontColorFromBackground(background);
    const {x0, x1, y0, y1, data: {title}} = node;

    const style = getCSSAnimation(this.props, {
      top: `${y0}px`,
      left: `${x0}px`,
      width: `${x1 - x0}px`,
      height: `${y1 - y0}px`,
      background,
      opacity,
      color
    });
    return (
      <div
        key={i}
        className="rv-treemap__leaf"
        style={style}>
        <div className="rv-treemap__leaf__content">{title}</div>
      </div>
    );
  }

  render() {
    const {width, height} = this.props;
    const nodes = this._getNodesToRender();
    return (
      <div
        className="rv-treemap"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}>
        {nodes.map(this._renderLeaf)}
      </div>
    );
  }

}

Treemap.displayName = 'Treemap';

export default Treemap;
