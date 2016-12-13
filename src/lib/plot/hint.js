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

import PureRenderComponent from '../pure-render-component';
import {getAttributeFunctor} from '../utils/scales-utils';

const ORIENTATION = {
  AUTO: 'auto',
  TOPLEFT: 'topleft',
  BOTTOMLEFT: 'bottomleft',
  TOPRIGHT: 'topright',
  BOTTOMRIGHT: 'bottomright',
  EDGETOP_LEFT: 'edgetopLeft',
  EDGEBOTTOM_LEFT: 'edgebottomLeft',
  EDGETOP_RIGHT: 'edgetopRight',
  EDGEBOTTOM_RIGHT: 'edgebottomRight',
  TOP_EDGELEFT: 'topEdgeleft',
  BOTTOM_EDGELEFT: 'bottomEdgeleft',
  TOP_EDGERIGHT: 'topEdgeright',
  BOTTOM_EDGERIGHT: 'bottomEdgeright'
};

/**
 * Default format function for the value.
 * @param {Object} value Value.
 * @returns {Array} title-value pairs.
 */
function defaultFormat(value) {
  return Object.keys(value).map(function getProp(key) {
    return {title: key, value: value[key]};
  });
}

class Hint extends PureRenderComponent {

  static get propTypes() {
    return {
      marginTop: React.PropTypes.number,
      marginLeft: React.PropTypes.number,
      innerWidth: React.PropTypes.number,
      innerHeight: React.PropTypes.number,
      scales: React.PropTypes.object,
      value: React.PropTypes.object,
      format: React.PropTypes.func,
      orientation: React.PropTypes.oneOf([
        ORIENTATION.AUTO,
        ORIENTATION.TOPLEFT,
        ORIENTATION.BOTTOMLEFT,
        ORIENTATION.TOPRIGHT,
        ORIENTATION.BOTTOMRIGHT,
        ORIENTATION.EDGETOP_LEFT,
        ORIENTATION.EDGEBOTTOM_LEFT,
        ORIENTATION.EDGETOP_RIGHT,
        ORIENTATION.EDGEBOTTOM_RIGHT,
        ORIENTATION.TOP_EDGELEFT,
        ORIENTATION.BOTTOM_EDGELEFT,
        ORIENTATION.TOP_EDGERIGHT,
        ORIENTATION.BOTTOM_EDGERIGHT
      ])
    };
  }

  static get defaultProps() {
    return {
      format: defaultFormat,
      orientation: ORIENTATION.AUTO
    };
  }

  /**
   * Get the right coordinate of the hint.
   * When x undefined or null, edge case, pin right.
   * @param {number} x X.
   * @returns {{right: *}} Mixin.
   * @private
   */
  _getCSSRight(x) {
    const {
      innerWidth,
      marginRight
    } = this.props;
    return {
      right: x === undefined || x === null ? 0 : marginRight + innerWidth - x
    };
  }

  /**
   * Get the left coordinate of the hint.
   * When x undefined or null, edge case, pin left.
   * @param {number} x X.
   * @returns {{left: *}} Mixin.
   * @private
   */
  _getCSSLeft(x) {
    const {marginLeft} = this.props;
    return {
      left: x === undefined || x === null ? 0 : marginLeft + x
    };
  }

  /**
   * Get the bottom coordinate of the hint.
   * When y undefined or null, edge case, pin bottom.
   * @param {number} y Y.
   * @returns {{bottom: *}} Mixin.
   * @private
   */
  _getCSSBottom(y) {
    const {
      innerHeight,
      marginBottom
    } = this.props;
    return {
      bottom: y === undefined || y === null ? 0 : marginBottom + innerHeight - y
    };
  }

  /**
   * Get the top coordinate of the hint.
   * When y undefined or null, edge case, pin top.
   * @param {number} y Y.
   * @returns {{top: *}} Mixin.
   * @private
   */
  _getCSSTop(y) {
    const {marginTop} = this.props;
    return {
      top: y === undefined || y === null ? 0 : marginTop + y
    };
  }

  /**
   * Convert the "automatic" orientation to the real one depending on the values
   * of x and y.
   * @param {number} x X value.
   * @param {number} y Y value.
   * @returns {string} Orientation.
   * @private
   */
  _getOrientationFromAuto(x, y) {
    const {
      innerWidth,
      innerHeight} = this.props;
    if (x > innerWidth / 2) {
      if (y > innerHeight / 2) {
        return ORIENTATION.TOPLEFT;
      }
      return ORIENTATION.BOTTOMLEFT;
    }
    if (y > innerHeight / 2) {
      return ORIENTATION.TOPRIGHT;
    }
    return ORIENTATION.BOTTOMRIGHT;
  }

  /**
   * Get a CSS mixin for a proper positioning of the element.
   * @param {string} orientation Orientation.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @returns {Object} Object, that may contain `left` or `right, `top` or
   * `bottom` properties.
   * @private
   */
  _getOrientationStyle(orientation, x, y) {
    return {
      ...this._getXCSS(orientation, x),
      ...this._getYCSS(orientation, y)
    };
  }

  _getYCSS(orientation, y) {
    // obtain yCSS
    switch (orientation) {
    case ORIENTATION.EDGETOP_LEFT:
    case ORIENTATION.EDGETOP_RIGHT:
      // this pins x to top edge
      return this._getCSSTop(null);
    case ORIENTATION.EDGEBOTTOM_LEFT:
    case ORIENTATION.EDGEBOTTOM_RIGHT:
      // this pins x to bottom edge
      return this._getCSSBottom(null);
    case ORIENTATION.BOTTOMLEFT:
    case ORIENTATION.BOTTOMRIGHT:
    case ORIENTATION.BOTTOM_EDGELEFT:
    case ORIENTATION.BOTTOM_EDGERIGHT:
      // this places hint text to the bottom of center, so set its top edge
      return this._getCSSTop(y);
    default:
      // this places hint text to the top of center, so set its bottom edge
      return this._getCSSBottom(y);
    }
  }

  _getXCSS(orientation, x) {
    // obtain xCSS
    switch(orientation) {
    case ORIENTATION.TOP_EDGELEFT:
    case ORIENTATION.BOTTOM_EDGELEFT:
      // this pins x to left edge
      return this._getCSSLeft(null);
    case ORIENTATION.TOP_EDGERIGHT:
    case ORIENTATION.BOTTOM_EDGERIGHT:
      // this pins x to left edge
      return this._getCSSRight(null);
    case ORIENTATION.TOPLEFT:
    case ORIENTATION.BOTTOMLEFT:
    case ORIENTATION.EDGETOP_LEFT:
    case ORIENTATION.EDGEBOTTOM_LEFT:
      // this places hint text to the left of center, so set its right edge
      return this._getCSSRight(x);
    default:
      // this places hint text to the right of center, so set its left edge
      return this._getCSSLeft(x);
    }
  }

  /**
   * Get the class name from orientation value.
   * @param {string} orientation Orientation.
   * @returns {string} Class name.
   * @private
   */
  _getOrientationClassName(orientation) {
    return `rv-hint--orientation-${orientation}`;
  }

  /**
   * Get the position for the hint and the appropriate class name.
   * @returns {{style: Object, className: string}} Style and className for the
   * hint.
   * @private
   */
  _getPositionInfo() {
    const {
      value,
      orientation: initialOrientation} = this.props;

    const x = getAttributeFunctor(this.props, 'x')(value);
    const y = getAttributeFunctor(this.props, 'y')(value);

    const orientation = initialOrientation === ORIENTATION.AUTO ?
      this._getOrientationFromAuto(x, y) : initialOrientation;

    return {
      style: this._getOrientationStyle(orientation, x, y),
      className: this._getOrientationClassName(orientation)
    };
  }

  render() {
    const {
      value,
      format,
      children} = this.props;

    const {style, className} = this._getPositionInfo();
    return (
      <div
        className={`rv-hint ${className}`}
        style={{
          ... style,
          position: 'absolute'
        }}>
        {children ?
          children :
          <div className="rv-hint__content">
            {format(value).map((formattedProp, i) =>
              <div key={`rv-hint${i}`}>
                <span className="rv-hint__title">{formattedProp.title}</span>
                {': '}
                <span className="rv-hint__value">{formattedProp.value}</span>
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

Hint.displayName = 'Hint';
Hint.ORIENTATION = ORIENTATION;

export default Hint;
