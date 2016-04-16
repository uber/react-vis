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
import d3 from 'd3';

import {getCSSAnimation, AnimationPropType} from '../utils/animation-utils';
import {getAttributeFunctor} from '../utils/scales-utils';

import {
  CONTINUOUS_COLOR_RANGE,
  DEFAULT_COLOR,
  OPACITY_RANGE} from '../theme';

function getFontColorFromBackground(background) {
  if (background) {
    return d3.hsl(background).l > 0.57 ? '#222' : '#fff';
  }
  return null;
}

class Treemap extends React.Component {

  static get propTypes() {
    return {
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      data: React.PropTypes.object.isRequired,
      mode: React.PropTypes.string.isRequired,
      padding: React.PropTypes.number.isRequired,
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      mode: 'squarify',
      padding: 0,
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
    const data = this.props.data;
    const height = this.props.height;
    const width = this.props.width;
    const mode = this.props.mode;
    const padding = this.props.padding;
    let nodes = [];
    let layout;
    if (data) {
      layout = d3.layout.treemap()
        .padding(padding)
        .mode(mode)
        .sort((a, b) => a.size - b.size);
      nodes = layout
        .size([width, height])
        .value(d => d.size)
        .sticky(true)
        .nodes(data);
    }

    return nodes;
  }

  _renderLeaf(node, i) {
    if (!i) {
      return null;
    }
    const {scales} = this.state;

    const background = scales.color(node);
    const opacity = scales.opacity(node);
    const color = getFontColorFromBackground(background);
    const width = Math.max(0, node.dx - 1);
    const height = Math.max(0, node.dy - 1);
    const style = getCSSAnimation(this.props, {
      top: `${node.y}px`,
      left: `${node.x}px`,
      width: `${width}px`,
      height: `${height}px`,
      background,
      opacity,
      color
    });
    return (
      <div
        key={i}
        className="rv-treemap__leaf"
        style={style}>
        <div className="rv-treemap__leaf__content">{node.title}</div>
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
