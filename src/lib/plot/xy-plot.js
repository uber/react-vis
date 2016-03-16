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
  getStackedData,
  getSeriesChildren,
  getSeriesPropsFromChildren} from '../utils/series-utils';

import {getInnerDimensions} from '../utils/chart-utils';

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

class XYPlot extends React.Component {

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
      animation: AnimationPropType,
      stackBy: React.PropTypes.oneOf(ATTRIBUTES)
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
    const {children, stackBy} = props;
    const data = getStackedData(children, stackBy);
    this.state = {
      scaleMixins: this._getScaleMixins(data, props),
      data
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextData = getStackedData(nextProps.children, nextProps.stackBy);
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
   * @param {Event} event Native event.
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
   * @param {Event} event Native event.
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
      const attr = ATTRIBUTES.find(
        a => key.indexOf(a) === 0 || key.indexOf(`_${a}`) === 0);
      if (!attr) {
        return;
      }
      attrProps[key] = props[key];
    });

    const zeroBaseProps = {};
    ATTRIBUTES.forEach(attr => {
      getSeriesChildren(props.children).forEach((child, index) => {
        if (!child) {
          return;
        }
        const {zeroBaseValue} = child.type.getParentConfig(attr, child.props);
        if (zeroBaseValue) {
          zeroBaseProps[`${attr}BaseValue`] = 0;
        }
      });
    });

    const adjustBy = new Set();
    const adjustWhat = new Set();
    getSeriesChildren(props.children).forEach((child, index) => {
      if (!child) {
        return;
      }
      ATTRIBUTES.forEach(attr => {
        const {
          isDomainAdjustmentNeeded,
          zeroBaseValue} = child.type.getParentConfig(
          attr,
          child.props
        );
        if (isDomainAdjustmentNeeded) {
          adjustBy.add(attr);
          adjustWhat.add(index);
        }
        if (zeroBaseValue) {
          zeroBaseProps[`${attr}BaseValue`] = 0;
        }
      });
    });

    return {
      ...defaults,
      ...zeroBaseProps,
      ...attrProps,
      _allData: data,
      _adjustBy: Array.from(adjustBy),
      _adjustWhat: Array.from(adjustWhat)
    };
  }

  /**
   * Checks if the plot is empty or not.
   * Currently checks the data only.
   * @returns {boolean} True for empty.
   * @private
   */
  _isPlotEmpty() {
    const {data} = this.state;
    return !data || !data.length || ![].concat(...data).filter(d => d).length
  }

  /**
   * Prepare the child components (including series) for rendering.
   * @returns {Array} Array of child components.
   * @private
   */
  _getClonedChildComponents() {
    const {animation} = this.props;
    const {scaleMixins, data} = this.state;
    const dimensions = getInnerDimensions(this.props);
    const children = React.Children.toArray(this.props.children);
    const seriesProps = getSeriesPropsFromChildren(children);
    return children.map((child, index) => {
      const dataProps = data[index] ? {data: data[index]} : null;
      return React.cloneElement(child, {
        ...dimensions,
        animation,
        ...seriesProps[index],
        ...scaleMixins,
        ...child.props,
        ...dataProps
      });
    });
  }

  render() {
    const {width, height} = this.props;

    if (this._isPlotEmpty()) {
      return (
        <div
          className="rv-xy-plot"
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}/>
      );
    }
    const components = this._getClonedChildComponents();

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
          {components.filter(c => c && c.type.requiresSVG)}
        </svg>
        {components.filter(c => c && !c.type.requiresSVG)}
      </div>
    );
  }
}

XYPlot.displayName = 'XYPlot';

export default XYPlot;
