// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {FlexibleSankey} from 'index';

const SANKEY_PROPS = {
  nodes: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
  links: [
    {source: 0, target: 1, value: 10},
    {source: 0, target: 2, value: 20},
    {source: 1, target: 2, value: 20}
  ]
};

const defaultProps = {
  margin: {top: 10, left: 10, right: 10, bottom: 10}
};

const FlexibleSankeyExample = ({height, width}) => (
  <div style={{width: '100%', height: '100%'}} className="flexible-sankey">
    <FlexibleSankey {...SANKEY_PROPS} {...defaultProps} />
  </div>
);

export default FlexibleSankeyExample;
