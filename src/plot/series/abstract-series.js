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

import PropTypes from 'prop-types';
import {voronoi} from 'd3-voronoi';

import PureRenderComponent from 'pure-render-component';
import {AnimationPropType} from 'animation';
import {
  getAttributeFunctor,
  getAttr0Functor,
  getAttributeValue,
  getScaleObjectFromProps,
  getScalePropTypesByAttribute
} from 'utils/scales-utils';

const propTypes = {
  ...getScalePropTypesByAttribute('x'),
  ...getScalePropTypesByAttribute('y'),
  ...getScalePropTypesByAttribute('size'),
  ...getScalePropTypesByAttribute('opacity'),
  ...getScalePropTypesByAttribute('color'),
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  onNearestX: PropTypes.func,
  onNearestXY: PropTypes.func,
  animation: AnimationPropType
};

const defaultProps = {
  className: ''
};

class AbstractSeries extends PureRenderComponent {

  /**
   * Tells the rest of the world that it requires SVG to work.
   * @returns {boolean} Result.
   */
  static get requiresSVG() {
    return true;
  }

  /**
   * Get a default config for the parent.
   * @returns {Object} Empty config.
   */
  static getParentConfig() {
    return {};
  }

  /**
   * Get attribute functor.
   * @param {string} attr Attribute name
   * @returns {*} Functor.
   * @protected
   */
  _getAttributeFunctor(attr) {
    return getAttributeFunctor(this.props, attr);
  }

  /**
   * Get the attr0 functor.
   * @param {string} attr Attribute name.
   * @returns {*} Functor.
   * @private
   */
  _getAttr0Functor(attr) {
    return getAttr0Functor(this.props, attr);
  }

  /**
   * Get the attribute value if it is available.
   * @param {string} attr Attribute name.
   * @returns {*} Attribute value if available, fallback value or undefined
   * otherwise.
   * @protected
   */
  _getAttributeValue(attr) {
    return getAttributeValue(this.props, attr);
  }

  /**
   * Get the scale object distance by the attribute from the list of properties.
   * @param {string} attr Attribute name.
   * @returns {number} Scale distance.
   * @protected
   */
  _getScaleDistance(attr) {
    const scaleObject = getScaleObjectFromProps(this.props, attr);
    return scaleObject ? scaleObject.distance : 0;
  }

  _getXYCoordinateInContainer(event) {
    const {marginTop = 0, marginLeft = 0} = this.props;
    const {nativeEvent: {clientX, clientY}, currentTarget} = event;
    const rect = currentTarget.getBoundingClientRect();
    return {
      x: clientX - rect.left - currentTarget.clientLeft - marginLeft,
      y: clientY - rect.top - currentTarget.clientTop - marginTop
    };
  }

  _handleNearestX(event) {
    const {onNearestX, data} = this.props;
    let minDistance = Number.POSITIVE_INFINITY;
    let value = null;
    let valueIndex = null;

    const coordinate = this._getXYCoordinateInContainer(event);
    const xScaleFn = this._getAttributeFunctor('x');

    data.forEach((item, i) => {
      const currentCoordinate = xScaleFn(item);
      const newDistance = Math.abs(coordinate.x - currentCoordinate);
      if (newDistance < minDistance) {
        minDistance = newDistance;
        value = item;
        valueIndex = i;
      }
    });
    if (!value) {
      return;
    }
    onNearestX(value, {
      innerX: xScaleFn(value),
      index: valueIndex,
      event: event.nativeEvent
    });
  }

  _handleNearestXY(event) {
    const {onNearestXY, data} = this.props;

    const coordinate = this._getXYCoordinateInContainer(event);
    const xScaleFn = this._getAttributeFunctor('x');
    const yScaleFn = this._getAttributeFunctor('y');

    // Create a voronoi with each node center points
    const voronoiInstance = voronoi()
      .x(xScaleFn)
      .y(yScaleFn);

    const foundPoint = voronoiInstance(data).find(coordinate.x, coordinate.y);
    const value = foundPoint.data;

    if (!value) {
      return;
    }
    onNearestXY(value, {
      innerX: foundPoint.x,
      innerY: foundPoint.y,
      index: foundPoint.index,
      event: event.nativeEvent
    });
  }

  onParentMouseMove(event) {
    const {onNearestX, onNearestXY, data} = this.props;
    if ((!onNearestX && !onNearestXY) || !data) {
      return;
    }
    if (onNearestXY) {
      this._handleNearestXY(event);
    } else {
      this._handleNearestX(event);
    }
  }
}

AbstractSeries.displayName = 'AbstractSeries';
AbstractSeries.propTypes = propTypes;
AbstractSeries.defaultProps = defaultProps;

export default AbstractSeries;
