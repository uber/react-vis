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

import {FlexibleTreemap} from 'index';

const TREEMAP_PROPS = {
  data: {
    title: 'analytics',
    color: '#12939A',
    children: [
      {
        title: 'cluster',
        children: [
          {title: 'AgglomerativeCluster', color: '#12939A', size: 3938},
          {title: 'CommunityStructure', color: '#12939A', size: 3812},
          {title: 'HierarchicalCluster', color: '#12939A', size: 6714},
          {title: 'MergeEdge', color: '#12939A', size: 743}
        ]
      },
      {
        title: 'graph',
        children: [
          {title: 'BetweennessCentrality', color: '#12939A', size: 3534},
          {title: 'LinkDistance', color: '#12939A', size: 5731},
          {title: 'MaxFlowMinCut', color: '#12939A', size: 7840},
          {title: 'ShortestPaths', color: '#12939A', size: 5914},
          {title: 'SpanningTree', color: '#12939A', size: 3416}
        ]
      },
      {
        title: 'optimization',
        children: [{title: 'AspectRatioBanker', color: '#12939A', size: 7074}]
      }
    ]
  }
};

const FlexibleTreemapExample = ({height, width}) => (
  <div style={{width: '100%', height: '100%'}} className="flexible-treemap">
    <FlexibleTreemap {...TREEMAP_PROPS} padding={0} />
  </div>
);
export default FlexibleTreemapExample;
