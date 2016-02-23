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

import {
  CONTINUOUS_COLOR_RANGE,
  DEFAULT_COLOR,
  OPACITY_RANGE} from '../theme';

function _c(className) {
  const prefix = 'rv-treemap';
  if (!className) {
    return prefix;
  }
  return `${prefix}__${className}`;
}

const DEFAULT_SCALES = {
  color: {
    range: CONTINUOUS_COLOR_RANGE
  },
  opacity: {
    range: OPACITY_RANGE
  }
};

export default class FixedTreemapVis extends React.Component {

  static get displayName() {
    return 'FixedTreemapVis';
  }

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
      }
    };
  }

  /**
   * Walk through the tree and collect all values from the tree.
   * @param {Object} data Tree object.
   * @param {string} propName Property name.
   * @returns {Array} Flat array of values.
   * @private
   */
  _collectValuesFromTree(data, propName) {
    let result = [];
    if (data[propName]) {
      result.push(data[propName]);
    }
    if (Array.isArray(data.children)) {
      data.children.forEach(function getValuesFromChildren(child) {
        result = result.concat(this._collectValuesFromTree(child, propName));
      }, this);
    }
    return result;
  }

  /**
   * Get the scale function from the options and from the array.
   * @param {Object} scaleOptions Scale options that are passed in props.
   * @param {Array} defaultDomain Default domain.
   * @param {Array} defaultRange Default range.
   * @returns {*} Scale function or undefined if scaleOptions are not defined.
   * @private
   */
  _getScaleFunction(scaleOptions, defaultDomain, defaultRange) {
    let domain;
    let range;
    let scaleFn;
    if (scaleOptions) {
      domain = scaleOptions.domain;
      range = scaleOptions.range;
      scaleFn = scaleOptions.scaleFn;
    }
    if (!scaleFn) {
      if (!domain) {
        domain = defaultDomain;
      }
      if (!range) {
        range = defaultRange;
      }
      scaleFn = d3.scale.linear().range(range).domain(domain);
    }
    return scaleFn;
  }

  _getColorScaleFunction(data) {
    const values = this._collectValuesFromTree(data, 'color');
    if (values.length) {
      const range = DEFAULT_SCALES.color.range;
      const domain = d3.extent(values);
      const options = this.props.scales ? this.props.scales.color : null;
      return this._getScaleFunction(options, domain, range);
    }
    return () => DEFAULT_COLOR;
  }

  _getOpacityScaleFunction(data) {
    const values = this._collectValuesFromTree(data, 'opacity');
    if (values.length) {
      const range = DEFAULT_SCALES.opacity.range;
      const domain = d3.extent(values);
      const options = this.props.scales ? this.props.scales.opacity : null;
      return this._getScaleFunction(options, domain, range);
    }
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

  render() {
    const data = this.props.data;
    const containerWidth = this.props.width;
    const containerHeight = this.props.height;

    const nodes = this._getNodesToRender();
    const colorScale = this._getColorScaleFunction(data);
    const opacityScale = this._getOpacityScaleFunction(data);

    return (
      <div
        className={_c()}
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`
        }}>
        {nodes.map(
          (node, i) => {
            // Don't draw the background for the first item: it's a container
            // for the entire treemap.
            const background = (colorScale && i !== 0) ?
              colorScale(node.color) : null;
            const opacity = opacityScale ? opacityScale(node.opacity) : null;
            const width = Math.max(0, node.dx - 1);
            const height = Math.max(0, node.dy - 1);
            const style = getCSSAnimation(this.props, {
              top: `${node.y}px`,
              left: `${node.x}px`,
              width: `${width}px`,
              height: `${height}px`,
              background,
              opacity
            });
            return (
              <div
                key={i}
                className={_c('leaf')}
                style={style}>
                {node.title}
              </div>
            );
          })
        }
      </div>
    );
  }

}
