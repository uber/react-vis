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
import {
  hierarchy,
  pack,
  partition,
  treemapSquarify,
  treemapResquarify,
  treemapSlice,
  treemapDice,
  treemapSliceDice,
  treemapBinary,
  treemap
} from 'd3-hierarchy';

import {
  CONTINUOUS_COLOR_RANGE,
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
  OPACITY_TYPE
} from 'theme';
import {AnimationPropType} from 'animation';
import {getAttributeFunctor, getMissingScaleProps} from 'utils/scales-utils';
import {MarginPropType, getInnerDimensions} from 'utils/chart-utils';

import TreemapDOM from './treemap-dom';
import TreemapSVG from './treemap-svg';

const TREEMAP_TILE_MODES = {
  squarify: treemapSquarify,
  resquarify: treemapResquarify,
  slice: treemapSlice,
  dice: treemapDice,
  slicedice: treemapSliceDice,
  binary: treemapBinary
};

const TREEMAP_LAYOUT_MODES = ['circlePack', 'partition', 'partition-pivot'];

const NOOP = d => d;

const ATTRIBUTES = ['opacity', 'color'];

const DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

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
  constructor(props) {
    super(props);
    this.state = {
      scales: _getScaleFns(props),
      ...getInnerDimensions(props, props.margin)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      scales: _getScaleFns(props),
      ...getInnerDimensions(props, props.margin)
    });
  }

  /**
   * Create the list of nodes to render.
   * @returns {Array} Array of nodes.
   * @private
   */
  _getNodesToRender() {
    const {innerWidth, innerHeight} = this.state;
    const {data, mode, padding, sortFunction, getSize} = this.props;
    if (!data) {
      return [];
    }

    if (mode === 'partition' || mode === 'partition-pivot') {
      const partitionFunction = partition()
        .size(
          mode === 'partition-pivot'
            ? [innerHeight, innerWidth]
            : [innerWidth, innerHeight]
        )
        .padding(padding);
      const structuredInput = hierarchy(data)
        .sum(getSize)
        .sort((a, b) => sortFunction(a, b, getSize));
      const mappedNodes = partitionFunction(structuredInput).descendants();
      if (mode === 'partition-pivot') {
        return mappedNodes.map(node => ({
          ...node,
          x0: node.y0,
          x1: node.y1,
          y0: node.x0,
          y1: node.x1
        }));
      }
      return mappedNodes;
    }
    if (mode === 'circlePack') {
      const packingFunction = pack()
        .size([innerWidth, innerHeight])
        .padding(padding);
      const structuredInput = hierarchy(data)
        .sum(getSize)
        .sort((a, b) => sortFunction(a, b, getSize));
      return packingFunction(structuredInput).descendants();
    }

    const tileFn = TREEMAP_TILE_MODES[mode];
    const treemapingFunction = treemap(tileFn)
      .tile(tileFn)
      .size([innerWidth, innerHeight])
      .padding(padding);
    const structuredInput = hierarchy(data)
      .sum(getSize)
      .sort((a, b) => sortFunction(a, b, getSize));
    return treemapingFunction(structuredInput).descendants();
  }

  render() {
    const {renderMode} = this.props;
    const {scales} = this.state;
    const nodes = this._getNodesToRender();
    const TreemapElement = renderMode === 'SVG' ? TreemapSVG : TreemapDOM;
    return <TreemapElement {...this.props} nodes={nodes} scales={scales} />;
  }
}

Treemap.displayName = 'Treemap';
Treemap.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideRootNode: PropTypes.bool,
  margin: MarginPropType,
  mode: PropTypes.oneOf(
    Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)
  ),
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  useCirclePacking: PropTypes.bool,
  padding: PropTypes.number.isRequired,
  sortFunction: PropTypes.func,
  width: PropTypes.number.isRequired,
  getSize: PropTypes.func,
  getColor: PropTypes.func
};

Treemap.defaultProps = {
  className: '',
  colorRange: CONTINUOUS_COLOR_RANGE,
  _colorValue: DEFAULT_COLOR,
  data: {
    children: []
  },
  hideRootNode: false,
  margin: DEFAULT_MARGINS,
  mode: 'squarify',
  onLeafClick: NOOP,
  onLeafMouseOver: NOOP,
  onLeafMouseOut: NOOP,
  opacityType: OPACITY_TYPE,
  _opacityValue: DEFAULT_OPACITY,
  padding: 1,
  sortFunction: (a, b, accessor) => {
    if (!accessor) {
      return 0;
    }
    return accessor(a) - accessor(b);
  },
  getSize: d => d.size,
  getColor: d => d.color,
  getLabel: d => d.title
};
export default Treemap;
