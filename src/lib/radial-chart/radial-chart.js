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
import equal from 'deep-equal';
import d3 from 'd3';

import {
  getAttributeFunctor,
  getAttributeValue} from '../utils/scales-utils';

import {getInnerDimensions} from '../utils/chart-utils';

import {AnimationPropType, applyTransition} from '../utils/animation-utils';

import {
  OPACITY_RANGE,
  DISCRETE_COLOR_RANGE} from '../theme';

import {getDOMNode} from '../utils/react-utils';

const ATTRIBUTES = [
  'angle',
  'radius',
  'innerRadius',
  'color',
  'opacity',
  'fill',
  'stroke'
];

/**
 * Walk through the data and assign color property to the data points if it
 * doesn't exist.
 * @param {Array} data Array of data.
 * @returns {Array} New array of data points.
 */
function assignColorsToData(data) {
  return data.map((d, color) => {
    return {color, ...d};
  });
}

export default class RadialChart extends React.Component {
  static get propTypes() {
    return {
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      margin: React.PropTypes.shape({
        left: React.PropTypes.number,
        top: React.PropTypes.number,
        right: React.PropTypes.number,
        bottom: React.PropTypes.number
      }),
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      margin: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    };
  }

  constructor(props) {
    super(props);
    const data = assignColorsToData(props.data);
    this.state = {
      scaleProps: this._getAllScaleProps(props, data),
      data
    };
  }

  componentDidMount() {
    this._updateChart();
  }

  componentWillReceiveProps(nextProps) {
    const nextData = assignColorsToData(nextProps.data);
    const {scaleProps} = this.state;
    const nextscaleProps = this._getAllScaleProps(nextProps, nextData);
    if (!equal(nextscaleProps, scaleProps)) {
      this.setState({
        scaleProps: nextscaleProps,
        data: nextData
      });
    }
  }

  componentDidUpdate() {
    this._updateChart();
  }

  /**
   * Get the list of scale-related settings that should be applied by default.
   * @param {Object} props Object of props.
   * @returns {Object} Defaults.
   * @private
   */
  _getScaleDefaults(props) {
    const {innerWidth, innerHeight} = getInnerDimensions(props);
    const radius = Math.min(innerWidth / 2, innerHeight / 2);
    return {
      radiusRange: [0, radius],
      _radiusValue: radius,
      opacityRange: OPACITY_RANGE,
      colorRange: DISCRETE_COLOR_RANGE,
      colorType: 'category'
    };
  }

  /**
   * Get the map of scales from the props.
   * @param {Object} props Props.
   * @param {Object} data Array of all data.
   * @returns {Object} Map of scales.
   * @private
   */
  _getAllScaleProps(props, data) {
    const attrProps = {};
    const defaults = this._getScaleDefaults(props);
    Object.keys(props).forEach(key => {
      const attr = ATTRIBUTES.find(a => key.indexOf(a) === 0);
      if (!attr) {
        return;
      }
      attrProps[key] = props[key];
    });
    return {
      ...defaults,
      ...attrProps,
      _allData: data,
      _adjustBy: [],
      _adjustWhat: []
    };
  }

  /**
   * Apply transition to the elements and return the new elements instead.
   * @param {d3.selection} elements Elements.
   * @returns {d3.selection} Animated elements if animation is available.
   * @protected
   */
  _applyTransition(elements) {
    return applyTransition(this.props, elements);
  }

  /**
   * Get attribute functor.
   * @param {string} attr Attribute name.
   * @returns {*} Functor.
   * @protected
   */
  _getAttributeFunctor(attr) {
    return getAttributeFunctor(this.state.scaleProps, attr);
  }

  /**
   * Get the attribute value if it is available.
   * @param {string} attr Attribute name.
   * @returns {*} Attribute value if available, fallback value or undefined
   * otherwise.
   * @protected
   */
  _getAttributeValue(attr) {
    return getAttributeValue(this.state.scaleProps, attr);
  }

  /**
   * Update the radial chart. Assign new styles and positions to the sections.
   * @private
   */
  _updateChart() {
    const {data} = this.state;
    const container = getDOMNode(this.refs.container);
    const pie = d3.layout.pie()
      .sort(null)
      .value(d => d.angle);

    const radiusFn = this._getAttributeFunctor('radius');
    const innerRadiusFn = this._getAttributeFunctor('innerRadius');
    if (!radiusFn) {
      return;
    }
    const arc = d3.svg.arc()
      .outerRadius(radiusFn)
      .innerRadius(innerRadiusFn);

    const sections = d3.select(container).selectAll('path')
      .data(pie(data));
    this._applyTransition(sections)
      .attr('d', arc)
      .style('opacity', this._getAttributeValue('opacity'))
      .style('fill', this._getAttributeFunctor('fill') ||
        this._getAttributeFunctor('color'))
      .style('stroke', this._getAttributeFunctor('stroke'));
  }

  render() {
    const {data, width, height} = this.props;
    const {innerWidth, innerHeight} = getInnerDimensions(this.props);
    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className="rv-radial-chart">
        <svg
          width={width}
          height={height}
          className="rv-radial-chart__svg">
          <g
            className="rv-radial-chart__series--pie"
            transform={`translate(${innerWidth / 2},${innerHeight / 2})`}
            ref="container">
            {data.map((d, i) => <path key={i}/>)}
          </g>
        </svg>
      </div>
    );
  }
}
