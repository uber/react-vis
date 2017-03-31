// Copyright (c) 2017 Uber Technologies, Inc.
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

import HorizontalGrid from 'plot/horizontal-grid-lines';
import VerticalGrid from 'plot/vertical-grid-lines';
import XAxisBottom from 'plot/axis/x-axis';
import YAxisLeft from 'plot/axis/y-axis';

import {testRenderWithProps} from './test-utils';

const XYPLOT_XAXIS_PROPS = {
  xRange: [0, 1],
  xDomain: [0, 1],
  xType: 'linear',
  width: 100,
  height: 100,
  top: 0,
  left: 0
};

const XYPLOT_YAXIS_PROPS = {
  yRange: [0, 1],
  yDomain: [0, 1],
  yType: 'linear',
  width: 100,
  height: 100,
  top: 0,
  left: 0
};

testRenderWithProps(HorizontalGrid, XYPLOT_YAXIS_PROPS);
testRenderWithProps(VerticalGrid, XYPLOT_XAXIS_PROPS);
testRenderWithProps(XAxisBottom, XYPLOT_XAXIS_PROPS);
testRenderWithProps(YAxisLeft, XYPLOT_YAXIS_PROPS);
