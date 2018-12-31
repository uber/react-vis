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

import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';

import {transformValueToString} from 'utils/data-utils';

import {getAttributeFunctor} from 'utils/scales-utils';

/*
 * Hint provides two options for placement of hint:
 * a) around a data point in one of four quadrants (imagine the point bisected
 *    by two axes -vertical, horizontal- creating 4 quadrants around a data
 *    point).
 * b) **New** pin to an edge of chart/plot area and position along that edge
 *    using data point's other dimension value.
 *
 * To support these two options, deprecate one Hint props (orientation) with two
 * new Hint align prop object (horizontal, vertical) with following values:
 *
 *   horizontal: auto, left, right, leftEdge, rightEdge
 *   vertical: auto, bottom, top, bottomEdge, topEdge
 *
 * Thus, the following ALIGN constants are the values for horizontal
 * and vertical
 */
const ALIGN = {
  AUTO: 'auto',
  LEFT: 'left',
  RIGHT: 'right',
  LEFT_EDGE: 'leftEdge',
  RIGHT_EDGE: 'rightEdge',
  BOTTOM: 'bottom',
  TOP: 'top',
  BOTTOM_EDGE: 'bottomEdge',
  TOP_EDGE: 'topEdge'
};

/**
 * For backwards support, retain the ORIENTATION prop constants
 */
const ORIENTATION = {
  BOTTOM_LEFT: 'bottomleft',
  BOTTOM_RIGHT: 'bottomright',
  TOP_LEFT: 'topleft',
  TOP_RIGHT: 'topright'
};

/**
 * Default format function for the value.
 * @param {Object} value Value.
 * @returns {Array} title-value pairs.
 */
function defaultFormat(value) {
  return Object.keys(value).map(function getProp(key) {
    return {title: key, value: transformValueToString(value[key])};
  });
}

class Hint extends PureComponent {
  static get defaultProps() {
    return {
      format: defaultFormat,
      align: {
        horizontal: ALIGN.AUTO,
        vertical: ALIGN.AUTO
      },
      style: {}
    };
  }

  static get propTypes() {
    return {
      marginTop: PropTypes.number,
      marginLeft: PropTypes.number,
      innerWidth: PropTypes.number,
      innerHeight: PropTypes.number,
      scales: PropTypes.object,
      value: PropTypes.object,
      format: PropTypes.func,
      style: PropTypes.object,
      align: PropTypes.shape({
        horizontal: PropTypes.oneOf([
          ALIGN.AUTO,
          ALIGN.LEFT,
          ALIGN.RIGHT,
          ALIGN.LEFT_EDGE,
          ALIGN.RIGHT_EDGE
        ]),
        vertical: PropTypes.oneOf([
          ALIGN.AUTO,
          ALIGN.BOTTOM,
          ALIGN.TOP,
          ALIGN.BOTTOM_EDGE,
          ALIGN.TOP_EDGE
        ])
      }),
      getAlignStyle: PropTypes.func,
      orientation: PropTypes.oneOf([
        ORIENTATION.BOTTOM_LEFT,
        ORIENTATION.BOTTOM_RIGHT,
        ORIENTATION.TOP_LEFT,
        ORIENTATION.TOP_RIGHT
      ])
    };
  }

  /**
   * Obtain align object with horizontal and vertical settings
   * but convert any AUTO values to the non-auto ALIGN depending on the
   * values of x and y.
   * @param {number} x X value.
   * @param {number} y Y value.
   * @returns {Object} Align object w/ horizontal, vertical prop strings.
   * @private
   */
  _getAlign(x, y) {
    const {
      innerWidth,
      innerHeight,
      orientation,
      align: {horizontal, vertical}
    } = this.props;
    const align = orientation
      ? this._mapOrientationToAlign(orientation)
      : {horizontal, vertical};
    if (horizontal === ALIGN.AUTO) {
      align.horizontal = x > innerWidth / 2 ? ALIGN.LEFT : ALIGN.RIGHT;
    }
    if (vertical === ALIGN.AUTO) {
      align.vertical = y > innerHeight / 2 ? ALIGN.TOP : ALIGN.BOTTOM;
    }
    return align;
  }

  /**
   * Get the class names from align values.
   * @param {Object} align object with horizontal and vertical prop strings.
   * @returns {string} Class names.
   * @private
   */
  _getAlignClassNames(align) {
    const {orientation} = this.props;
    const orientationClass = orientation
      ? `rv-hint--orientation-${orientation}`
      : '';
    return `${orientationClass} rv-hint--horizontalAlign-${align.horizontal}
     rv-hint--verticalAlign-${align.vertical}`;
  }

  /**
   * Get a CSS mixin for a proper positioning of the element.
   * @param {Object} align object with horizontal and vertical prop strings.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @returns {Object} Object, that may contain `left` or `right, `top` or
   * `bottom` properties.
   * @private
   */
  _getAlignStyle(align, x, y) {
    return {
      ...this._getXCSS(align.horizontal, x),
      ...this._getYCSS(align.vertical, y)
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
    if (y === undefined || y === null) {
      return {
        bottom: 0
      };
    }

    const {innerHeight, marginBottom} = this.props;
    return {
      bottom: marginBottom + innerHeight - y
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
    if (x === undefined || x === null) {
      return {
        left: 0
      };
    }

    const {marginLeft} = this.props;
    return {
      left: marginLeft + x
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
    if (x === undefined || x === null) {
      return {
        right: 0
      };
    }

    const {innerWidth, marginRight} = this.props;
    return {
      right: marginRight + innerWidth - x
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
    if (y === undefined || y === null) {
      return {
        top: 0
      };
    }

    const {marginTop} = this.props;
    return {
      top: marginTop + y
    };
  }

  /**
   * Get the position for the hint and the appropriate class name.
   * @returns {{style: Object, className: string}} Style and className for the
   * hint.
   * @private
   */
  _getPositionInfo() {
    const {value, getAlignStyle} = this.props;

    const x = getAttributeFunctor(this.props, 'x')(value);
    const y = getAttributeFunctor(this.props, 'y')(value);

    const align = this._getAlign(x, y);

    return {
      position: getAlignStyle
        ? getAlignStyle(align, x, y)
        : this._getAlignStyle(align, x, y),
      className: this._getAlignClassNames(align)
    };
  }

  _getXCSS(horizontal, x) {
    // obtain xCSS
    switch (horizontal) {
      case ALIGN.LEFT_EDGE:
        // this pins x to left edge
        return this._getCSSLeft(null);
      case ALIGN.RIGHT_EDGE:
        // this pins x to left edge
        return this._getCSSRight(null);
      case ALIGN.LEFT:
        // this places hint text to the left of center, so set its right edge
        return this._getCSSRight(x);
      case ALIGN.RIGHT:
      default:
        // this places hint text to the right of center, so set its left edge
        // default case should not be possible but if it happens set to RIGHT
        return this._getCSSLeft(x);
    }
  }

  _getYCSS(verticalAlign, y) {
    // obtain yCSS
    switch (verticalAlign) {
      case ALIGN.TOP_EDGE:
        // this pins x to top edge
        return this._getCSSTop(null);
      case ALIGN.BOTTOM_EDGE:
        // this pins x to bottom edge
        return this._getCSSBottom(null);
      case ALIGN.BOTTOM:
        // this places hint text to the bottom of center, so set its top edge
        return this._getCSSTop(y);
      case ALIGN.TOP:
      default:
        // this places hint text to the top of center, so set its bottom edge
        // default case should not be possible but if it happens set to BOTTOM
        return this._getCSSBottom(y);
    }
  }

  _mapOrientationToAlign(orientation) {
    // TODO: print warning that this feature is deprecated and support will be
    // removed in next major release.
    switch (orientation) {
      case ORIENTATION.BOTTOM_LEFT:
        return {
          horizontal: ALIGN.LEFT,
          vertical: ALIGN.BOTTOM
        };
      case ORIENTATION.BOTTOM_RIGHT:
        return {
          horizontal: ALIGN.RIGHT,
          vertical: ALIGN.BOTTOM
        };
      case ORIENTATION.TOP_LEFT:
        return {
          horizontal: ALIGN.LEFT,
          vertical: ALIGN.TOP
        };
      case ORIENTATION.TOP_RIGHT:
        return {
          horizontal: ALIGN.RIGHT,
          vertical: ALIGN.TOP
        };
      default:
        // fall back to horizontalAlign, verticalAlign that are either
        // provided or defaulted to AUTO.  So, don't change things
        break;
    }
  }

  render() {
    const {value, format, children, style} = this.props;

    const {position, className} = this._getPositionInfo();
    return (
      <div
        className={`rv-hint ${className}`}
        style={{
          ...style,
          ...position,
          position: 'absolute'
        }}
      >
        {children ? (
          children
        ) : (
          <div className="rv-hint__content" style={style.content}>
            {format(value).map((formattedProp, i) => (
              <div key={`rv-hint${i}`} style={style.row}>
                <span className="rv-hint__title" style={style.title}>
                  {formattedProp.title}
                </span>
                {': '}
                <span className="rv-hint__value" style={style.value}>
                  {formattedProp.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Hint.displayName = 'Hint';
Hint.ORIENTATION = ORIENTATION;
Hint.ALIGN = ALIGN;

export default Hint;
