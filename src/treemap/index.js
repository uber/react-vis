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

import React, {PropTypes} from 'react';
import {
  hierarchy,
  pack,
  treemapSquarify,
  treemapResquarify,
  treemapSlice,
  treemapDice,
  treemapSliceDice,
  treemapBinary,
  treemap
} from 'd3-hierarchy';

import {CONTINUOUS_COLOR_RANGE, DEFAULT_COLOR, DEFAULT_OPACITY, OPACITY_TYPE} from 'theme';
import {AnimationPropType} from 'utils/animation-utils';
import {getAttributeFunctor, getMissingScaleProps} from 'utils/scales-utils';

import TreemapLeaf from './treemap-leaf';

const TREEMAP_TILE_MODES = {
  squarify: treemapSquarify,
  resquarify: treemapResquarify,
  slice: treemapSlice,
  dice: treemapDice,
  slicedice: treemapSliceDice,
  binary: treemapBinary
};

const TREEMAP_LAYOUT_MODES = [
  'circlePack'
];

const NOOP = d => d;

const ATTRIBUTES = ['opacity', 'color'];

/**
 * Get the map of scale functions from the given props.
 * @param {Object} props Props for the component.
 * @returns {Object} Map of scale functions.
 * @private
 */
function _getScaleFns(props) {
  const {data} = props;
  const allData = data.children || [];

  // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.
  const compatibleProps = {
    ...props,
    ...getMissingScaleProps(props, allData, ATTRIBUTES),
    _allData: allData
  };
  return {
    opacity: getAttributeFunctor(compatibleProps, 'opacity'),
    color: getAttributeFunctor(compatibleProps, 'color')
  };
}

class Treemap extends React.Component {

  static get propTypes() {
    return {
      animation: AnimationPropType,
      data: PropTypes.object.isRequired,
      height: PropTypes.number.isRequired,
      mode: PropTypes.oneOf(
        Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)
      ),
      onLeafClick: PropTypes.func,
      onLeafMouseOver: PropTypes.func,
      onLeafMouseOut: PropTypes.func,
      useCirclePacking: PropTypes.bool,
      padding: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    };
  }

  static get defaultProps() {
    return {
      className: '',
      colorRange: CONTINUOUS_COLOR_RANGE,
      _colorValue: DEFAULT_COLOR,
      data: {
        children: []
      },
      mode: 'squarify',
      onLeafClick: NOOP,
      onLeafMouseOver: NOOP,
      onLeafMouseOut: NOOP,
      opacityType: OPACITY_TYPE,
      _opacityValue: DEFAULT_OPACITY,
      padding: 1
    };
  }

  constructor(props) {
    super(props);
    this.state = {scales: _getScaleFns(props)};
  }

  componentWillReceiveProps(props) {
    this.setState({scales: _getScaleFns(props)});
  }

  /**
   * Create the list of nodes to render.
   * @returns {Array} Array of nodes.
   * @private
   */
  _getNodesToRender() {
    const {data, height, width, mode, padding} = this.props;
    if (data && mode === 'circlePack') {
      const packingFunction = pack()
          .size([width, height])
          .padding(padding);
      const structuredInput = hierarchy(data)
        .sort((a, b) => a.size - b.size)
        .sum(d => d.size);
      return packingFunction(structuredInput).descendants();
    }
    if (data) {
      const tileFn = TREEMAP_TILE_MODES[mode];
      const treemapingFunction = treemap(tileFn)
        .tile(tileFn)
        .size([width, height])
        .padding(padding);
      const structuredInput = hierarchy(data)
        .sort((a, b) => a.size - b.size)
        .sum(d => d.size);

      return treemapingFunction(structuredInput).descendants();
    }
    return [];
  }

  render() {
    const {animation, className, height, mode, width} = this.props;
    const nodes = this._getNodesToRender();
    const useCirclePacking = mode === 'circlePack';
    return (
      <div
        className={`rv-treemap ${useCirclePacking ? 'rv-treemap-circle-packed' : ''} ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}>
        {nodes.map((node, index) => {
          // throw out the rootest node
          if (!useCirclePacking && !index) {
            return null;
          }

          const nodeProps = {
            animation,
            node,
            ...this.props,
            x0: useCirclePacking ? node.x : node.x0,
            x1: useCirclePacking ? node.x : node.x1,
            y0: useCirclePacking ? node.y : node.y0,
            y1: useCirclePacking ? node.y : node.y1,
            r: useCirclePacking ? node.r : 1,
            scales: this.state.scales
          };
          return (<TreemapLeaf {...nodeProps} key={`leaf-${index}`} />);
        })}
      </div>
    );
  }

}

Treemap.displayName = 'Treemap';

export default Treemap;
