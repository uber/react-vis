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

const ORIENTATION_AUTO = 'auto';
const ORIENTATION_TOPLEFT = 'topleft';
const ORIENTATION_BOTTOMLEFT = 'bottomleft';
const ORIENTATION_TOPRIGHT = 'topright';
const ORIENTATION_BOTTOMRIGHT = 'bottomright';

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

export default class Hint extends PureRenderComponent {
  static get displayName() {
    return 'Hint';
  }

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
        ORIENTATION_AUTO,
        ORIENTATION_BOTTOMLEFT,
        ORIENTATION_BOTTOMRIGHT,
        ORIENTATION_TOPLEFT,
        ORIENTATION_TOPRIGHT
      ])
    };
  }

  static get defaultProps() {
    return {
      format: defaultFormat,
      orientation: ORIENTATION_AUTO
    };
  }

  /**
   * Get the right coordinate of the hint.
   * @param {number} x X.
   * @returns {{right: *}} Mixin.
   * @private
   */
  _getCSSRight(x) {
    const {
      innerWidth,
      marginRight} = this.props;
    return {
      right: `${marginRight + innerWidth - x}px`
    };
  }

  /**
   * Get the left coordinate of the hint.
   * @param {number} x X.
   * @returns {{left: *}} Mixin.
   * @private
   */
  _getCSSLeft(x) {
    const {marginLeft} = this.props;
    return {
      left: `${marginLeft + x}px`
    };
  }

  /**
   * Get the bottom coordinate of the hint.
   * @param {number} y Y.
   * @returns {{bottom: *}} Mixin.
   * @private
   */
  _getCSSBottom(y) {
    const {
      innerHeight,
      marginBottom} = this.props;
    return {
      bottom: `${marginBottom + innerHeight - y}px`
    };
  }

  /**
   * Get the top coordinate of the hint.
   * @param {number} y Y.
   * @returns {{top: *}} Mixin.
   * @private
   */
  _getCSSTop(y) {
    const {marginTop} = this.props;
    return {
      top: `${marginTop + y}px`
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
        return ORIENTATION_TOPLEFT;
      }
      return ORIENTATION_BOTTOMLEFT;
    }
    if (y > innerHeight / 2) {
      return ORIENTATION_TOPRIGHT;
    }
    return ORIENTATION_BOTTOMRIGHT;
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
    let xCSS;
    let yCSS;

    if (orientation === ORIENTATION_BOTTOMLEFT ||
      orientation === ORIENTATION_BOTTOMRIGHT) {
      yCSS = this._getCSSTop(y);
    } else {
      yCSS = this._getCSSBottom(y);
    }
    if (orientation === ORIENTATION_TOPLEFT ||
      orientation === ORIENTATION_BOTTOMLEFT) {
      xCSS = this._getCSSRight(x);
    } else {
      xCSS = this._getCSSLeft(x);
    }

    return {
      ...xCSS,
      ...yCSS
    };
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

    const orientation = initialOrientation === ORIENTATION_AUTO ?
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
