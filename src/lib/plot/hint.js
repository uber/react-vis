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
      offsetTop: React.PropTypes.number,
      offsetLeft: React.PropTypes.number,
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
      offsetTop: 0,
      offsetLeft: 0,
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
      marginRight,
      offsetLeft} = this.props;
    return {
      right: `${marginRight + offsetLeft + innerWidth - x}px`
    };
  }

  /**
   * Get the left coordinate of the hint.
   * @param {number} x X.
   * @returns {{left: *}} Mixin.
   * @private
   */
  _getCSSLeft(x) {
    const {
      marginLeft,
      offsetLeft} = this.props;
    return {
      left: `${marginLeft + offsetLeft + x}px`
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
      marginBottom,
      offsetTop} = this.props;
    return {
      bottom: `${marginBottom + offsetTop + innerHeight - y}px`
    };
  }

  /**
   * Get the top coordinate of the hint.
   * @param {number} y Y.
   * @returns {{top: *}} Mixin.
   * @private
   */
  _getCSSTop(y) {
    const {
      marginTop,
      offsetTop} = this.props;
    return {
      top: `${marginTop + offsetTop + y}px`
    };
  }

  /**
   * Get a CSS mixin for a proper positioning of the element.
   * @returns {Object} Object, that may contain `left` or `right, `top` or
   * `bottom` properties.
   * @private
   */
  _getPositionMixin() {
    const {
      value,
      innerWidth,
      innerHeight,
      orientation} = this.props;

    const x = getAttributeFunctor(this.props, 'x')(value);
    const y = getAttributeFunctor(this.props, 'y')(value);

    let xCSS;
    let yCSS;

    if (orientation === ORIENTATION_AUTO) {
      xCSS = (x > innerWidth / 2) ? this._getCSSRight(x) : this._getCSSLeft(x);
      yCSS = (y > innerHeight / 2) ? this._getCSSBottom(y) : this._getCSSTop(y);
    } else {
      if (orientation === ORIENTATION_BOTTOMLEFT ||
        orientation === ORIENTATION_BOTTOMRIGHT) {
        yCSS = this._getCSSBottom(y);
      } else {
        yCSS = this._getCSSTop(y);
      }
      if (orientation === ORIENTATION_TOPLEFT ||
        orientation === ORIENTATION_BOTTOMLEFT) {
        xCSS = this._getCSSLeft(x);
      } else {
        xCSS = this._getCSSRight(x);
      }
    }
    return {
      ...xCSS,
      ...yCSS
    };
  }

  render() {
    const {
      value,
      format,
      children} = this.props;

    return (
      <div
        className="rv-hint"
        style={{
          ... this._getPositionMixin(),
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
