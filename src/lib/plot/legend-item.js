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

import React, {Component} from 'react';
import LegendPill from './legend-pill';

class LegendItem extends Component {

  static get propTypes() {
    return {
      color: React.PropTypes.string,
      index: React.PropTypes.number,
      label: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      color: 'black'
    };
  }

  render() {
    const {props: {color, index, label}} = this;

    return (
      <div
        className="rv-xy-plot__legend__item"
        key={index}
      >
        <LegendPill color={color} label={label}/>
        <h6 className="rv-xy-plot__legend__item__title">
          {label || `Series ${index}`}
        </h6>
      </div>
    );
  }
}

LegendItem.displayName = 'LegendItem';

export default LegendItem;
