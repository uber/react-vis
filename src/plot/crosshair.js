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

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  const value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: 'x',
      value: transformValueToString(value.x)
    };
  }
}

/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function defaultItemsFormat(values) {
  return values.map((v, i) => {
    if (v) {
      return {value: v.y, title: i};
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(v => Boolean(v));
}

class Crosshair extends PureComponent {
  static get defaultProps() {
    return {
      titleFormat: defaultTitleFormat,
      itemsFormat: defaultItemsFormat,
      style: {
        line: {},
        title: {},
        box: {}
      }
    };
  }

  static get propTypes() {
    return {
      className: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.object
        ])
      ),
      series: PropTypes.object,
      innerWidth: PropTypes.number,
      innerHeight: PropTypes.number,
      marginLeft: PropTypes.number,
      marginTop: PropTypes.number,
      orientation: PropTypes.oneOf(['left', 'right']),
      itemsFormat: PropTypes.func,
      titleFormat: PropTypes.func,
      style: PropTypes.shape({
        line: PropTypes.object,
        title: PropTypes.object,
        box: PropTypes.object
      })
    };
  }

  /**
   * Render crosshair items (title + value for each series).
   * @returns {*} Array of React classes with the crosshair values.
   * @private
   */
  _renderCrosshairItems() {
    const {values, itemsFormat} = this.props;
    const items = itemsFormat(values);
    if (!items) {
      return null;
    }
    return items.filter(i => i).map(function renderValue(item, i) {
      return (
        <div className="rv-crosshair__item" key={`item${i}`}>
          <span className="rv-crosshair__item__title">{item.title}</span>
          {': '}
          <span className="rv-crosshair__item__value">{item.value}</span>
        </div>
      );
    });
  }

  /**
   * Render crosshair title.
   * @returns {*} Container with the crosshair title.
   * @private
   */
  _renderCrosshairTitle() {
    const {values, titleFormat, style} = this.props;
    const titleItem = titleFormat(values);
    if (!titleItem) {
      return null;
    }
    return (
      <div className="rv-crosshair__title" key="title" style={style.title}>
        <span className="rv-crosshair__title__title">{titleItem.title}</span>
        {': '}
        <span className="rv-crosshair__title__value">{titleItem.value}</span>
      </div>
    );
  }

  render() {
    const {
      children,
      className,
      values,
      marginTop,
      marginLeft,
      innerWidth,
      innerHeight,
      style
    } = this.props;
    const value = getFirstNonEmptyValue(values);
    if (!value) {
      return null;
    }
    const x = getAttributeFunctor(this.props, 'x');
    const innerLeft = x(value);

    const {
      orientation = innerLeft > innerWidth / 2 ? 'left' : 'right'
    } = this.props;
    const left = marginLeft + innerLeft;
    const top = marginTop;
    const innerClassName = `rv-crosshair__inner rv-crosshair__inner--${orientation}`;

    return (
      <div
        className={`rv-crosshair ${className}`}
        style={{left: `${left}px`, top: `${top}px`}}
      >
        <div
          className="rv-crosshair__line"
          style={{height: `${innerHeight}px`, ...style.line}}
        />

        <div className={innerClassName}>
          {children ? (
            children
          ) : (
            <div className="rv-crosshair__inner__content" style={style.box}>
              <div>
                {this._renderCrosshairTitle()}
                {this._renderCrosshairItems()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Crosshair.displayName = 'Crosshair';

export default Crosshair;
