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
import * as d3Shape from 'd3-shape';
import Animation from '../animation';
import {
  getAttributeFunctor,
  extractScalePropsFromProps,
  getMissingScaleProps
} from '../utils/scales-utils';
import {getInnerDimensions, MarginPropType} from '../utils/chart-utils';
import {AnimationPropType} from '../utils/animation-utils';
import {OPACITY_RANGE, DISCRETE_COLOR_RANGE} from '../theme';

const ATTRIBUTES = [
  'angle',
  'radius',
  'innerRadius',
  'color',
  'opacity',
  'fill',
  'stroke'
];

const ANIMATED_PROPS = [
  'angleDomain', 'angleRange', 'angle',
  'radiusDomain', 'radiusRange', 'radius',
  'innerRadiusDomain', 'innerRadiusRange', 'innerRadius',
  'colorDomain', 'colorRange', 'color',
  'opacityDomain', 'opacityRange', 'opacity',
  'fillDomain', 'fillRange', 'fill',
  'strokeDomain', 'strokeRange', 'stroke',
  'data'
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
    const scaleProps = this._getAllScaleProps(props, data);
    const arc = this._getArcFromProps(scaleProps);
    this.state = {scaleProps, data, arc};
    this._sectionMouseOut = this._sectionMouseOut.bind(this);
    this._sectionMouseOver = this._sectionMouseOver.bind(this);
    this._sectionClick = this._sectionClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextData = assignColorsToData(nextProps.data);
    const {scaleProps} = this.state;
    const nextscaleProps = this._getAllScaleProps(nextProps, nextData);
    if (!equal(nextscaleProps, scaleProps)) {
      // console.log('????')
      this.setState({
        scaleProps: nextscaleProps,
        data: nextData,
        arc: this._getArcFromProps(scaleProps)
      });
    }
  }

  /**
   * Triggers a callback on a section if the callback is set.
   * @param {function} handler Callback function.
   * @param {Object} d Data point of the arc.
   * @param {Object} event Event.
   * @private
   */
  _triggerSectionHandler(handler, d, event) {
    if (handler) {
      const {arc} = this.state;
      const [x, y] = arc.centroid(d);
      handler(d.data, {event, x, y});
    }
  }

  /**
   * `mouseover` handler for the section.
   * @param {Object} d Data point.
   * @param {Object} event Event.
   * @private
   */
  _sectionMouseOver(d, event) {
    const {onSectionMouseOver} = this.props;
    this._triggerSectionHandler(onSectionMouseOver, d, event);
  }

  /**
   * `mouseout` handler for the section.
   * @param {Object} d Data point.
   * @param {Object} event Event.
   * @private
   */
  _sectionMouseOut(d, event) {
    const {onSectionMouseOut} = this.props;
    this._triggerSectionHandler(onSectionMouseOut, d, event);
  }

  /**
   * `click` handler for the section.
   * @param {Object} d Data point.
   * @param {Object} event Event.
   * @private
   */
  _sectionClick(d, event) {
    const {onSectionClick} = this.props;
    this._triggerSectionHandler(onSectionClick, d, event);
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
   * Get attribute functor.
   * @param {string} attr Attribute name.
   * @returns {*} Functor.
   * @protected
   */
  _getAttributeFunctor(attr) {
    return getAttributeFunctor(this.state.scaleProps, attr);
  }

  /**
   * Extract the arc function from the props.
   * @param {Object} scaleProps Scale props.
   * @returns {function} Arc function, null if radius is missing.
   * @private
   */
  _getArcFromProps(scaleProps) {
    const radiusFunctor = getAttributeFunctor(scaleProps, 'radius');
    const innerRadiusFunctor = getAttributeFunctor(scaleProps, 'innerRadius');
    if (!radiusFunctor) {
      return null;
    }
    return d3Shape.arc()
      .outerRadius(radiusFunctor)
      .innerRadius(innerRadiusFunctor);
  }

  render() {
    const {width, height, animation} = this.props;
    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_PROPS}>
          <RadialChart {...this.props} animation={null}/>
        </Animation>
      );
    }

    const {data, arc} = this.state;
    if (!data || !arc) {
      return null;
    }

    const {innerWidth, innerHeight} = getInnerDimensions(
      this.props,
      DEFAULT_MARGINS
    );
    const opacityFunctor = this._getAttributeFunctor('opacity');
    const fillFunctor = this._getAttributeFunctor('fill') ||
      this._getAttributeFunctor('color');
    const strokeFunctor = this._getAttributeFunctor('stroke') ||
      this._getAttributeFunctor('color');

    const pie = d3Shape.pie().sort(null).value(d => d.angle);
    const pieData = pie(data);

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
            {data.map((d, i) => <path {...{
              d: arc(pieData[i]),
              style: {
                opacity: opacityFunctor && opacityFunctor(d),
                stroke: strokeFunctor && strokeFunctor(d),
                fill: fillFunctor && fillFunctor(d)
              },
              onMouseOver: e => this._sectionMouseOver(pieData[i], e),
              onMouseOut: e => this._sectionMouseOut(pieData[i], e),
              onClick: e => this._sectionClick(pieData[i], e),
              key: i
            }}/>)}
          </g>
        </svg>
      </div>
    );
  }
}

RadialChart.displayName = 'RadialChart';

export default RadialChart;
