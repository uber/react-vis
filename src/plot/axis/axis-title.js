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

import {ORIENTATION} from 'utils/axis-utils';

// Assuming that 16px = 1em
const ADJUSTMENT_FOR_TEXT_SIZE = 16;
const MARGIN = 6;
const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;
const defaultProps = {
  position: 'end'
};

/**
 * Compute transformations, keyed by orientation
 * @param {number} width - width of axis
 * @param {number} height - height of axis
 * @returns {Object} Object of transformations, keyed by orientation
 */
const transformation = (width, height) => ({
  [LEFT]: {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: MARGIN,
      rotation: -90,
      textAnchor: 'end'
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: 'middle'
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: 'start'
    }
  },
  [RIGHT]: {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: MARGIN,
      rotation: -90,
      textAnchor: 'end'
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: 'middle'
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: 'start'
    }
  },
  [TOP]: {
    start: {
      x: MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'start'
    },
    middle: {
      x: width / 2 - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'middle'
    },
    end: {
      x: width - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: 'end'
    }
  },
  [BOTTOM]: {
    start: {
      x: MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'start'
    },
    middle: {
      x: width / 2 - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'middle'
    },
    end: {
      x: width - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: 'end'
    }
  }
});

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired
};

function AxisTitle({orientation, position, width, height, style, title}) {
  const outerGroupTranslateX = orientation === LEFT ? width : 0;
  const outerGroupTranslateY = orientation === TOP ? height : 0;
  const outerGroupTransform = `translate(${outerGroupTranslateX}, ${outerGroupTranslateY})`;
  const {x, y, rotation, textAnchor} = transformation(width, height)[
    orientation
  ][position];
  const innerGroupTransform = `translate(${x}, ${y}) rotate(${rotation})`;

  return (
    <g transform={outerGroupTransform} className="rv-xy-plot__axis__title">
      <g style={{textAnchor, ...style}} transform={innerGroupTransform}>
        <text style={style}>{title}</text>
      </g>
    </g>
  );
}

AxisTitle.displayName = 'AxisTitle';
AxisTitle.propTypes = propTypes;
AxisTitle.defaultProps = defaultProps;
export default AxisTitle;
