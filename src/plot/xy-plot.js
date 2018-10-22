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
import equal from 'deep-equal';

import {
  extractScalePropsFromProps,
  getMissingScaleProps,
  getOptionalScaleProps,
  getXYPlotValues
} from 'utils/scales-utils';
import {
  getStackedData,
  getSeriesChildren,
  getSeriesPropsFromChildren
} from 'utils/series-utils';
import {
  getInnerDimensions,
  MarginPropType,
  DEFAULT_MARGINS
} from 'utils/chart-utils';
import {AnimationPropType} from 'animation';
import {
  CONTINUOUS_COLOR_RANGE,
  EXTENDED_DISCRETE_COLOR_RANGE,
  SIZE_RANGE,
  OPACITY_TYPE
} from 'theme';

import CanvasWrapper from './series/canvas-wrapper';

const ATTRIBUTES = [
  'x',
  'y',
  'radius',
  'angle',
  'color',
  'fill',
  'stroke',
  'opacity',
  'size'
];

/**
 * Remove parents from tree formatted data. deep-equal doesnt play nice with data
 * that has circular structures, so we make every node single directional by pruning the parents.
 * @param {Array} data - the data object to have circular deps resolved in
 * @returns {Array} the sanitized data
 */
function cleanseData(data) {
  return data.map(series => {
    if (!Array.isArray(series)) {
      return series;
    }
    return series.map(row => ({...row, parent: null}));
  });
}

/**
 * Wrapper on the deep-equal method for checking equality of next props vs current props
 * @param {Object} scaleMixins - Scale object.
 * @param {Object} nextScaleMixins - Scale object.
 * @param {Boolean} hasTreeStructure - Whether or not to cleanse the data of possible cyclic structures
 * @returns {Boolean} whether or not the two mixins objects are equal
 */
function checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, hasTreeStructure) {
  const newMixins = {
    ...nextScaleMixins,
    _allData: hasTreeStructure
      ? cleanseData(nextScaleMixins._allData)
      : nextScaleMixins._allData
  };
  const oldMixins = {
    ...scaleMixins,
    _allData: hasTreeStructure
      ? cleanseData(scaleMixins._allData)
      : scaleMixins._allData
  };
  // it's hard to say if this function is reasonable?
  return equal(newMixins, oldMixins);
}

class XYPlot extends React.Component {
  static get defaultProps() {
    return {
      className: ''
    };
  }

  static get propTypes() {
    return {
      animation: AnimationPropType,
      className: PropTypes.string,
      dontCheckIfEmpty: PropTypes.bool,
      height: PropTypes.number.isRequired,
      margin: MarginPropType,
      onClick: PropTypes.func,
      onDoubleClick: PropTypes.func,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      onMouseMove: PropTypes.func,
      onTouchStart: PropTypes.func,
      onTouchMove: PropTypes.func,
      onTouchEnd: PropTypes.func,
      onTouchCancel: PropTypes.func,
      onWheel: PropTypes.func,
      stackBy: PropTypes.oneOf(ATTRIBUTES),
      style: PropTypes.object,
      width: PropTypes.number.isRequired
    };
  }

  constructor(props) {
    super(props);
    const {stackBy} = props;
    const children = getSeriesChildren(props.children);
    const data = getStackedData(children, stackBy);
    this.state = {
      scaleMixins: this._getScaleMixins(data, props),
      data
    };
  }

  componentWillReceiveProps(nextProps) {
    const children = getSeriesChildren(nextProps.children);
    const nextData = getStackedData(children, nextProps.stackBy);
    const {scaleMixins} = this.state;
    const nextScaleMixins = this._getScaleMixins(nextData, nextProps);
    if (
      !checkIfMixinsAreEqual(
        nextScaleMixins,
        scaleMixins,
        nextProps.hasTreeStructure
      )
    ) {
      this.setState({
        scaleMixins: nextScaleMixins,
        data: nextData
      });
    }
  }

  /**
   * Trigger click related callbacks if they are available.
   * @param {React.SyntheticEvent} event Click event.
   * @private
   */
  _clickHandler = event => {
    const {onClick} = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  /**
   * Trigger doule-click related callbacks if they are available.
   * @param {React.SyntheticEvent} event Double-click event.
   * @private
   */
  _doubleClickHandler = event => {
    const {onDoubleClick} = this.props;
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  /**
   * Prepare the child components (including series) for rendering.
   * @returns {Array} Array of child components.
   * @private
   */
  _getClonedChildComponents() {
    const props = this.props;
    const {animation} = this.props;
    const {scaleMixins, data} = this.state;
    const dimensions = getInnerDimensions(this.props, DEFAULT_MARGINS);
    const children = React.Children.toArray(this.props.children);
    const seriesProps = getSeriesPropsFromChildren(children);
    const XYPlotValues = getXYPlotValues(props, children);
    return children.map((child, index) => {
      let dataProps = null;
      if (seriesProps[index]) {
        // Get the index of the series in the list of props and retrieve
        // the data property from it.
        const {seriesIndex} = seriesProps[index];
        dataProps = {data: data[seriesIndex]};
      }
      return React.cloneElement(child, {
        ...dimensions,
        animation,
        ...(dataProps && child.type.prototype && child.type.prototype.render
          ? {
              ref: ref =>
                (this[`series${seriesProps[index].seriesIndex}`] = ref)
            }
          : {}),
        ...seriesProps[index],
        ...scaleMixins,
        ...child.props,
        ...XYPlotValues[index],
        ...dataProps
      });
    });
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

    const colorRanges = ['color', 'fill', 'stroke'].reduce((acc, attr) => {
      const range =
        props[`${attr}Type`] === 'category'
          ? EXTENDED_DISCRETE_COLOR_RANGE
          : CONTINUOUS_COLOR_RANGE;
      return {...acc, [`${attr}Range`]: range};
    }, {});

    return {
      xRange: [0, innerWidth],
      yRange: [innerHeight, 0],
      ...colorRanges,
      opacityType: OPACITY_TYPE,
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
    const filteredData = data.filter(d => d);
    const allData = [].concat(...filteredData);

    const defaultScaleProps = this._getDefaultScaleProps(props);
    const optionalScaleProps = getOptionalScaleProps(props);
    const userScaleProps = extractScalePropsFromProps(props, ATTRIBUTES);
    const missingScaleProps = getMissingScaleProps(
      {
        ...defaultScaleProps,
        ...optionalScaleProps,
        ...userScaleProps
      },
      allData,
      ATTRIBUTES
    );
    const children = getSeriesChildren(props.children);
    const zeroBaseProps = {};
    const adjustBy = new Set();
    const adjustWhat = new Set();
    children.forEach((child, index) => {
      if (!child || !data[index]) {
        return;
      }
      ATTRIBUTES.forEach(attr => {
        const {
          isDomainAdjustmentNeeded,
          zeroBaseValue
        } = child.type.getParentConfig(attr, child.props);
        if (isDomainAdjustmentNeeded) {
          adjustBy.add(attr);
          adjustWhat.add(index);
        }
        if (zeroBaseValue) {
          const specifiedDomain = props[`${attr}Domain`];
          zeroBaseProps[`${attr}BaseValue`] = specifiedDomain
            ? specifiedDomain[0]
            : 0;
        }
      });
    });
    return {
      ...defaultScaleProps,
      ...zeroBaseProps,
      ...userScaleProps,
      ...missingScaleProps,
      _allData: data,
      _adjustBy: Array.from(adjustBy),
      _adjustWhat: Array.from(adjustWhat),
      _stackBy: props.stackBy
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
    return (
      !data ||
      !data.length ||
      !data.some(series => series && series.some(d => d))
    );
  }

  /**
   * Trigger mouse-down related callbacks if they are available.
   * @param {React.SyntheticEvent} event Mouse down event.
   * @private
   */
  _mouseDownHandler = event => {
    const {onMouseDown, children} = this.props;
    if (onMouseDown) {
      onMouseDown(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentMouseDown) {
        component.onParentMouseDown(event);
      }
    });
  };

  /**
   * Trigger onMouseEnter handler if it was passed in props.
   * @param {React.SyntheticEvent} event Mouse enter event.
   * @private
   */
  _mouseEnterHandler = event => {
    const {onMouseEnter, children} = this.props;
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentMouseEnter) {
        component.onParentMouseEnter(event);
      }
    });
  };

  /**
   * Trigger onMouseLeave handler if it was passed in props.
   * @param {React.SyntheticEvent} event Mouse leave event.
   * @private
   */
  _mouseLeaveHandler = event => {
    const {onMouseLeave, children} = this.props;
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentMouseLeave) {
        component.onParentMouseLeave(event);
      }
    });
  };

  /**
   * Trigger movement-related callbacks if they are available.
   * @param {React.SyntheticEvent} event Mouse move event.
   * @private
   */
  _mouseMoveHandler = event => {
    const {onMouseMove, children} = this.props;
    if (onMouseMove) {
      onMouseMove(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentMouseMove) {
        component.onParentMouseMove(event);
      }
    });
  };

  /**
   * Trigger mouse-up related callbacks if they are available.
   * @param {React.SyntheticEvent} event Mouse up event.
   * @private
   */
  _mouseUpHandler = event => {
    const {onMouseUp, children} = this.props;
    if (onMouseUp) {
      onMouseUp(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentMouseUp) {
        component.onParentMouseUp(event);
      }
    });
  };

  /**
   * Trigger onTouchCancel handler if it was passed in props.
   * @param {React.SyntheticEvent} event Touch Cancel event.
   * @private
   */
  _touchCancelHandler = event => {
    const {onTouchCancel} = this.props;
    if (onTouchCancel) {
      onTouchCancel(event);
    }
  };

  /**
   * Trigger onTouchEnd handler if it was passed in props.
   * @param {React.SyntheticEvent} event Touch End event.
   * @private
   */
  _touchEndHandler = event => {
    const {onTouchEnd} = this.props;
    if (onTouchEnd) {
      onTouchEnd(event);
    }
  };

  /**
   * Trigger touch movement-related callbacks if they are available.
   * @param {React.SyntheticEvent} event Touch move event.
   * @private
   */
  _touchMoveHandler = event => {
    const {onTouchMove, children} = this.props;
    if (onTouchMove) {
      onTouchMove(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentTouchMove) {
        component.onParentTouchMove(event);
      }
    });
  };

  /**
   * Trigger touch-start related callbacks if they are available.
   * @param {React.SyntheticEvent} event Touch start event.
   * @private
   */
  _touchStartHandler = event => {
    const {onTouchStart, children} = this.props;
    if (onTouchStart) {
      onTouchStart(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this[`series${index}`];
      if (component && component.onParentTouchStart) {
        component.onParentTouchStart(event);
      }
    });
  };

  /**
   * Trigger doule-click related callbacks if they are available.
   * @param {React.SyntheticEvent} event Double-click event.
   * @private
   */
  _wheelHandler = event => {
    const {onWheel} = this.props;
    if (onWheel) {
      onWheel(event);
    }
  };

  renderCanvasComponents(components, props) {
    const componentsToRender = components.filter(
      c => c && !c.type.requiresSVG && c.type.isCanvas
    );

    if (componentsToRender.length === 0) {
      return null;
    }
    const {
      marginLeft,
      marginTop,
      marginBottom,
      marginRight,
      innerHeight,
      innerWidth
    } = componentsToRender[0].props;
    return (
      <CanvasWrapper
        {...{
          innerHeight,
          innerWidth,
          marginLeft,
          marginTop,
          marginBottom,
          marginRight
        }}
      >
        {componentsToRender}
      </CanvasWrapper>
    );
  }

  render() {
    const {className, dontCheckIfEmpty, style, width, height} = this.props;

    if (!dontCheckIfEmpty && this._isPlotEmpty()) {
      return (
        <div
          className={`rv-xy-plot ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...this.props.style
          }}
        />
      );
    }
    const components = this._getClonedChildComponents();
    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className={`rv-xy-plot ${className}`}
      >
        <svg
          className="rv-xy-plot__inner"
          width={width}
          height={height}
          style={style}
          onClick={this._clickHandler}
          onDoubleClick={this._doubleClickHandler}
          onMouseDown={this._mouseDownHandler}
          onMouseUp={this._mouseUpHandler}
          onMouseMove={this._mouseMoveHandler}
          onMouseLeave={this._mouseLeaveHandler}
          onMouseEnter={this._mouseEnterHandler}
          onTouchStart={this._mouseDownHandler}
          onTouchMove={this._touchMoveHandler}
          onTouchEnd={this._touchEndHandler}
          onTouchCancel={this._touchCancelHandler}
          onWheel={this._wheelHandler}
        >
          {components.filter(c => c && c.type.requiresSVG)}
        </svg>
        {this.renderCanvasComponents(components, this.props)}
        {components.filter(c => c && !c.type.requiresSVG && !c.type.isCanvas)}
      </div>
    );
  }
}

XYPlot.displayName = 'XYPlot';

export default XYPlot;
