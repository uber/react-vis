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
import * as d3Selection from 'd3-selection';
import * as d3Shape from 'd3-shape';
import {
  getAttributeFunctor,
  extractScalePropsFromProps,
  getMissingScaleProps
} from '../utils/scales-utils';
import {getInnerDimensions, MarginPropType} from '../utils/chart-utils';
import {AnimationPropType, applyTransition} from '../utils/animation-utils';
import {OPACITY_RANGE, DISCRETE_COLOR_RANGE} from '../theme';
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

const DEFAULT_MARGINS = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10
};

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

class RadialChart extends React.Component {
  static get propTypes() {
    return {
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      margin: MarginPropType,
      animation: AnimationPropType,
      onSectionMouseOver: React.PropTypes.func,
      onSectionMouseOut: React.PropTypes.func,
      onSectionClick: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    const data = assignColorsToData(props.data);
    this.state = {
      scaleProps: this._getAllScaleProps(props, data),
      data
    };
    this._sectionMouseOut = this._sectionMouseOut.bind(this);
    this._sectionMouseOver = this._sectionMouseOver.bind(this);
    this._sectionClick = this._sectionClick.bind(this);
    this._arc = null;
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
   * Triggers a callback on a section if the callback is set.
   * @param {function} handler Callback function.
   * @param {Object} d Data point of the arc.
   * @private
   */
  _triggerSectionHandler(handler, d) {
    if (handler) {
      const [x, y] = this._arc.centroid(d);
      handler(d.data, {event: d3Selection.event, x, y});
    }
  }

  /**
   * `mouseover` handler for the section.
   * @param {Object} d Data point.
   * @private
   */
  _sectionMouseOver(d) {
    const {onSectionMouseOver} = this.props;
    this._triggerSectionHandler(onSectionMouseOver, d);
  }

  /**
   * `mouseout` handler for the section.
   * @param {Object} d Data point.
   * @private
   */
  _sectionMouseOut(d) {
    const {onSectionMouseOut} = this.props;
    this._triggerSectionHandler(onSectionMouseOut, d);
  }

  /**
   * `click` handler for the section.
   * @param {Object} d Data point.
   * @private
   */
  _sectionClick(d) {
    const {onSectionClick} = this.props;
    this._triggerSectionHandler(onSectionClick, d);
  }

  /**
   * Get the list of scale-related settings that should be applied by default.
   * @param {Object} props Object of props.
   * @returns {Object} Defaults.
   * @private
   */
  _getDefaultScaleProps(props) {
    const {innerWidth, innerHeight} = getInnerDimensions(
      props,
      DEFAULT_MARGINS
    );
    const radius = Math.min(innerWidth / 2, innerHeight / 2);
    return {
      radiusRange: [0, radius],
      _radiusValue: radius,
      opacityRange: OPACITY_RANGE,
      _opacityValue: 1,
      colorRange: DISCRETE_COLOR_RANGE,
      colorType: 'category'
    };
  }

  /**
   * Get the map of scales from the props.
   * @param {Object} props Props.
   * @param {Array} data Array of all data.
   * @returns {Object} Map of scales.
   * @private
   */
  _getAllScaleProps(props, data) {
    const defaultScaleProps = this._getDefaultScaleProps(props);
    const userScaleProps = extractScalePropsFromProps(props, ATTRIBUTES);
    const missingScaleProps = getMissingScaleProps({
      ...defaultScaleProps,
      ...userScaleProps
    }, data, ATTRIBUTES);

    return {
      ...defaultScaleProps,
      ...userScaleProps,
      ...missingScaleProps,
      _allData: [],
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
   * Update the radial chart. Assign new styles and positions to the sections.
   * @private
   */
  _updateChart() {
    const {data} = this.state;
    const container = getDOMNode(this.refs.container);
    const pie = d3Shape.pie().sort(null).value(d => d.angle);

    const radiusFn = this._getAttributeFunctor('radius');
    const innerRadiusFn = this._getAttributeFunctor('innerRadius');
    if (!radiusFn) {
      return;
    }
    const arc = d3Shape.arc()
      .outerRadius(radiusFn)
      .innerRadius(innerRadiusFn);
    this._arc = arc;

    const sections = d3Selection.select(container).selectAll('path')
      .data(pie(data))
      .on('mouseover', this._sectionMouseOver)
      .on('mouseout', this._sectionMouseOut);
    this._applyTransition(sections)
      .attr('d', arc)
      .style('opacity', this._getAttributeFunctor('opacity'))
      .style('fill', this._getAttributeFunctor('fill') ||
        this._getAttributeFunctor('color'))
      .style('stroke', this._getAttributeFunctor('stroke'));
  }

  render() {
    const {data, width, height} = this.props;
    const {innerWidth, innerHeight} = getInnerDimensions(
      this.props,
      DEFAULT_MARGINS
    );
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

RadialChart.displayName = 'RadialChart';

export default RadialChart;
