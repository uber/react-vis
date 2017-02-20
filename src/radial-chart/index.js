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
import * as d3Shape from 'd3-shape';

import Animation from 'animation';
import {getInnerDimensions, MarginPropType} from 'utils/chart-utils';
import {AnimationPropType} from 'utils/animation-utils';
import {DEFAULT_OPACITY, OPACITY_TYPE, DISCRETE_COLOR_RANGE} from 'theme';
import {
  getAttributeFunctor,
  extractScalePropsFromProps,
  getMissingScaleProps
} from 'utils/scales-utils';

const NOOP = d => d;

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
      animation: AnimationPropType,
      height: PropTypes.number.isRequired,
      margin: MarginPropType,
      onSectionMouseOver: PropTypes.func,
      onSectionMouseOut: PropTypes.func,
      onSectionClick: PropTypes.func,
      showLabels: PropTypes.bool,
      width: PropTypes.number.isRequired
    };
  }

  constructor(props) {
    super(props);
    const data = assignColorsToData(props.data);
    const scaleProps = this._getAllScaleProps(props, data);
    const arc = this._getArcFromProps(scaleProps);
    this.state = {scaleProps, data, arc};
  }

  componentWillReceiveProps(nextProps) {
    const nextData = assignColorsToData(nextProps.data);
    const nextScaleProps = this._getAllScaleProps(nextProps, nextData);
    this.setState({
      scaleProps: this._getAllScaleProps(nextProps, nextData),
      data: nextData,
      arc: this._getArcFromProps(nextScaleProps)
    });
  }

  /**
   * Triggers a callback on a section if the callback is set.
   * @param {function} handler Callback function.
   * @param {Object} d Data point of the arc.
   * @param {Object} event Event.
   * @private
   */
  _sectionHandler(handler = NOOP, d, event) {
    const {arc} = this.state;
    const [x, y] = arc.centroid(d);
    handler(d.data, {event, x, y});
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
      opacityType: OPACITY_TYPE,
      _opacityValue: DEFAULT_OPACITY,
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

  /**
   * Generate the svg pie slices to be rendered
   * @param {Array} pieData - the d3 generate information for drawing slices
   * @param {Func} arc - the arc generator
   * @returns {function} the react content functor
   * @private
   */
  _renderPieSlice(pieData, arc) {
    const opacityFunctor = this._getAttributeFunctor('opacity');
    const fillFunctor = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
    const strokeFunctor = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
    return (d, i) => {
      return (<path {...{
        className: 'rv-radial-chart__series--pie__slice',
        d: arc(pieData[i]),
        style: {
          opacity: opacityFunctor && opacityFunctor(d),
          stroke: strokeFunctor && strokeFunctor(d),
          fill: fillFunctor && fillFunctor(d)
        },
        key: i
      }}/>);
    };
  }

  /**
   * Generate the svg labels to be rendered.
   * @param {Array} pieData - the d3 generate information for drawing slices
   * @returns {function} the react content functor
   * @private
   */
  _renderLabel(pieData) {
    const radiusFunctor = getAttributeFunctor(this.state.scaleProps, 'radius');
    return (d, i) => {
      // reject the label if its not affixed to the section
      const canRenderMainLabel = d.label && typeof d.label === 'string';
      const canRenderSubLabel = d.subLabel && typeof d.subLabel === 'string';
      if (!canRenderMainLabel && !canRenderSubLabel) {
        return;
      }
      // this equation finds the center of the pie wedge and place the label there
      // there is a quarter circle correction, due to where d3 places it's coord system
      const angle = (pieData[i].startAngle + pieData[i].endAngle) / 2 - Math.PI / 2;
      // we then translate a g to just outside the location of the wedge
      const xTrans = 1.1 * radiusFunctor(d) * Math.cos(angle);
      const yTrans = 1.1 * radiusFunctor(d) * Math.sin(angle);
      // finally we select which way we want the text to be oriented
      // if its on the left half of the circle, the it should be right aligned
      // and vice versa for the right half
      const textAnchor = (angle > 0.5 * Math.PI) && angle < (1.5 * Math.PI) ? 'end' : 'start';
      return (
        <g
          className="rv-radial-chart__series--pie-label-inner-wrapper"
          transform={`translate(${xTrans},${yTrans})`} key={`${i}-text-wrapper`}>
          {canRenderMainLabel && (<text
            className="rv-radial-chart__series--pie-label-primary"
            x="0"
            y="0"
            fontSize="12"
            textAnchor={textAnchor}
            >{d.label}</text>)}
          {canRenderSubLabel && (<text
            className="rv-radial-chart__series--pie-label-secondary"
            x="0"
            y="15"
            fontSize="10"
            textAnchor={textAnchor}
            >{d.subLabel}</text>)}
        </g>
      );
    };
  }

  /**
   * Generate invisible svg overlays for applying listeners to
   * @param {Array} pieData - the d3 generate information for drawing slices
   * @param {Func} arc - the arc generator
   * @returns {function} the react content functor
   * @private
   */
  _renderOverlay(pieData, arc) {
    const {
      onSectionMouseOver,
      onSectionMouseOut,
      onSectionClick
    } = this.props;

    return (d, i) => {
      return (<path {...{
        className: 'rv-radial-chart__series--pie__slice-overlay',
        d: arc(pieData[i]),
        style: {opacity: 0},
        onMouseEnter: e => this._sectionHandler(onSectionMouseOver, pieData[i], e),
        onMouseLeave: e => this._sectionHandler(onSectionMouseOut, pieData[i], e),
        onClick: e => this._sectionHandler(onSectionClick, pieData[i], e),
        key: `${i}-listeners`
      }}/>);
    };
  }

  render() {
    const {
      animation,
      height,
      showLabels,
      width
    } = this.props;

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
            transform={`translate(${width / 2},${height / 2})`}
            ref="container">
            <g className="rv-radial-chart__series--pie-slices-wrapper">
              {data.map(this._renderPieSlice(pieData, arc))}
            </g>
            <g className="rv-radial-chart__series--pie-labels-wrapper">
              {showLabels && data.map(this._renderLabel(pieData))}
            </g>
            <g className="rv-radial-chart__series--pie-overlays-wrapper">
              {data.map(this._renderOverlay(pieData, arc))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

RadialChart.displayName = 'RadialChart';

export default RadialChart;
