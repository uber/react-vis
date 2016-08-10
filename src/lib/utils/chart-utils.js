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

import {getSeriesChildren} from './series-utils';

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @returns {Object} Dimensions of the component.
 */
export function getInnerDimensions(props) {
  const {
    height,
    width,
    margin: {
      left: marginLeft = 0,
      top: marginTop = 0,
      right: marginRight = 0,
      bottom: marginBottom = 0}
    } = props;
  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}

/**
 * Collect data from the list of children.
 * @param {Object} props Props for the plot.
 * @returns {Array} Array of arrays with data.
 */
export function getDataFromChildren(props) {
  const {children} = props;
  return getSeriesChildren(children).map(child => child.props.data);
}
