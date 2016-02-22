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
import GridLines from './grid-lines';
import {getScalePropTypesByAttribute} from '../utils/scales-utils';
import {getTicksTotalFromSize} from '../utils/axis-utils';

export default class VerticalGridLines extends PureRenderComponent {

  static get propTypes() {
    return {
      values: React.PropTypes.array,
      marginTop: React.PropTypes.number,
      marginLeft: React.PropTypes.number,
      innerWidth: React.PropTypes.number,
      innerHeight: React.PropTypes.number,
      ...getScalePropTypesByAttribute('x')
    };
  }

  static get requiresSVG() {
    return true;
  }

  render() {
    const {innerHeight, innerWidth} = this.props;
    return (
      <GridLines
        {...this.props}
        attr="x"
        orientation="bottom"
        top={innerHeight}
        ticksTotal={getTicksTotalFromSize(innerWidth)}
        tickSize={-innerHeight}/>
    );
  }
}
