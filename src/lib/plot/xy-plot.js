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

import {
  getSeriesChildren,
  getSeriesPropsFromChildren} from '../utils/series-utils';

import {
  getInnerDimensions,
  getDataFromChildren} from '../utils/chart-utils';

import {
  CONTINUOUS_COLOR_RANGE,
  SIZE_RANGE,
  OPACITY_RANGE} from '../theme';

const ATTRIBUTES = [
  'x',
  'y',
  'color',
  'fill',
  'stroke',
  'opacity',
  'size'
];

import {AnimationPropType} from '../utils/animation-utils';

export default class XYPlot extends React.Component {

  static get displayName() {
    return 'XYPlot';
  }

  static get propTypes() {
    return {
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      margin: React.PropTypes.oneOfType([React.PropTypes.shape({
        left: React.PropTypes.number,
        top: React.PropTypes.number,
        right: React.PropTypes.number,
        bottom: React.PropTypes.number
      }), React.PropTypes.number]),
      onMouseLeave: React.PropTypes.func,
      onMouseMove: React.PropTypes.func,
      onMouseEnter: React.PropTypes.func,
      animation: AnimationPropType
    };
  }

  static get defaultProps() {
    return {
      margin: {
        left: 40,
        right: 10,
        top: 10,
        bottom: 40
      }
    };
  }

  constructor(props) {
    super(props);
    this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
    this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    const data = getDataFromChildren(props);
    this.state = {
      scaleMixins: this._getScaleMixins(data, props),
      data
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextData = getDataFromChildren(nextProps);
    const {scaleMixins} = this.state;
    const nextScaleMixins = this._getScaleMixins(nextData, nextProps);
    if (!equal(nextScaleMixins, scaleMixins)) {
      this.setState({
        scaleMixins: nextScaleMixins,
        data: nextData
      });
    }
  }

  /**
   * Trigger movement-related callbacks if they are available.
   * @param {React.SyntheticEvent} event Mouse move event.
   * @private
   */
  _mouseMoveHandler(event) {
    const {onMouseMove, children} = this.props;
    if (onMouseMove) {
      onMouseMove(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this.refs[`series${index}`];
      if (component && component.onParentMouseMove) {
        component.onParentMouseMove(event);
      }
    });
  }

  /**
   * Trigger onMouseLeave handler if it was passed in props.
   * @private
   */
  _mouseLeaveHandler(event) {
    const {onMouseLeave} = this.props;
    if (onMouseLeave) {
      onMouseLeave({event});
    }
  }

  /**
   * Trigger onMouseEnter handler if it was passed in props.
   * @private
   */
  _mouseEnterHandler(event) {
    const {onMouseEnter} = this.props;
    if (onMouseEnter) {
      onMouseEnter({event});
    }
  }

  /**
   * Get the list of scale-related settings that should be applied by default.
   * @param {Object} props Object of props.
   * @returns {Object} Defaults.
   * @private
   */
  _getScaleDefaults(props) {
    const {innerWidth, innerHeight} = getInnerDimensions(props);
    return {
      xRange: [0, innerWidth],
      yRange: [innerHeight, 0],
      colorRange: CONTINUOUS_COLOR_RANGE,
      opacityRange: OPACITY_RANGE,
      sizeRange: SIZE_RANGE
    };
  }

  /**
   * Get the map of scales from the props, apply defaults to them and then pass
   * them further.
   * @param {Object} data Array of all data.
   * @param {Object} props Props of the component.
   * @returns {Object} Map of scale-related props.
   * @private
   */
  _getScaleMixins(data, props) {
    const attrProps = {};
    const defaults = this._getScaleDefaults(props);
    Object.keys(props).forEach(key => {
      const attr = ATTRIBUTES.find(a => key.indexOf(a) === 0);
      if (!attr) {
        return;
      }
      attrProps[key] = props[key];
    });

    const adjustBy = new Set();
    const adjustWhat = new Set();
    getSeriesChildren(props.children).forEach((child, index) => {
      if (!child) {
        return;
      }
      ATTRIBUTES.forEach(attr => {
        if (child.type.isDomainAdjustmentNeeded(attr, child.props)) {
          adjustBy.add(attr);
          adjustWhat.add(index);
        }
      });
    });

    return {
      ...defaults,
      ...attrProps,
      _allData: data,
      _adjustBy: Array.from(adjustBy),
      _adjustWhat: Array.from(adjustWhat)
    };
  }

  render() {
    const {width, height, animation} = this.props;
    const {scaleMixins, data} = this.state;

    if (!data || !data.length || ![].concat(...data).filter(d => d).length) {
      return (
        <div
          className="rv-xy-plot"
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}/>
      );
    }
    const dimensions = getInnerDimensions(this.props);
    const children = React.Children.toArray(this.props.children);
    const svgComponents = [];
    const htmlComponents = [];

    children.forEach(child => {
      if (child.type.requiresSVG) {
        svgComponents.push(child);
      } else {
        htmlComponents.push(child);
      }
    });

    const seriesProps = getSeriesPropsFromChildren(svgComponents);

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className="rv-xy-plot">
        <svg
          className="rv-xy-plot__inner"
          width={width}
          height={height}
          onMouseMove={this._mouseMoveHandler}
          onMouseLeave={this._mouseLeaveHandler}
          onMouseEnter={this._mouseEnterHandler}>
          {svgComponents.map((child, index) => {
            return React.cloneElement(child, {
              ...dimensions,
              animation,
              ...seriesProps[index],
              ...scaleMixins,
              ...child.props
            });
          })}
        </svg>
        {htmlComponents.map(child =>
          React.cloneElement(child, {
            ...dimensions,
            animation,
            ...scaleMixins,
            ...child.props
          })
        )}
      </div>
    );
  }
}
