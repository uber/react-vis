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

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @param {Object} defaultMargins Object with default margins.
 * @returns {Object} Dimensions of the component.
 */
export function getInnerDimensions(props, defaultMargins) {
  const {margin, width, height} = props;
  const marginProps = {
    ...defaultMargins,
    ...(
      typeof margin === 'number' ?
      {
        left: margin,
        right: margin,
        top: margin,
        bottom: margin
      } :
        margin
    )
  };
  const {
    left: marginLeft = 0,
    top: marginTop = 0,
    right: marginRight = 0,
    bottom: marginBottom = 0
  } = marginProps;
  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}

export const MarginPropType = PropTypes.oneOfType([
  PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number
  }),
  PropTypes.number
]);
