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

import {
  VerticalBarSeries,
  FlexibleXYPlot,
  FlexibleRadarChart,
  FlexibleRadialChart,
  FlexibleSunburst,
  FlexibleTreemap,
  FlexibleSankey
} from 'index';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2}
];

const RADAR_PROPS = {
  data: [
    {
      neatExplosions: 7,
      wow: 10,
      dog: 8,
      sickMoves: 9,
      nice: 7
    }
  ],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1], getValue: d => d.neatExplosions},
    {name: 'wow', domain: [0, 11]},
    {name: 'sickMoves', domain: [0, 20]}
  ]
};

const RADIAL_PROPS = {
  data: [{angle: 1}, {angle: 5}, {angle: 2}]
};

const SANKEY_PROPS = {
  nodes: [{name: 'a'}, {name: 'b'}, {name: 'c'}],
  links: [
    {source: 0, target: 1, value: 10},
    {source: 0, target: 2, value: 20},
    {source: 1, target: 2, value: 20}
  ]
};

const SUNBURST_PROPS = {
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

const defaultProps = {
  margin: {top: 10, left: 10, right: 10, bottom: 10}
};

export const FlexibleCharts = ({height, width}) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw'
      }}
    >
      <div style={{width: '30%'}}>FlexibleXYPlot</div>
      <div style={{width: '30%'}}>FlexibleSankey</div>
      <div style={{width: '30%'}}>FlexibleTreemap</div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw',
        height: height || '30vh'
      }}
    >
      <div className="flexible-xyplot" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleXYPlot {...defaultProps}>
          <VerticalBarSeries data={data} />
        </FlexibleXYPlot>
      </div>
      <div className="flexible-sankey" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleSankey {...SANKEY_PROPS} {...defaultProps} />
      </div>
      <div className="flexible-treemap" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleTreemap {...TREEMAP_PROPS} padding={0} />
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw',
        marginTop: 50
      }}
    >
      <div style={{width: '30%'}}>FlexibleRadarChart</div>
      <div style={{width: '30%'}}>FlexibleRadialChart</div>
      <div style={{width: '30%'}}>FlexibleSunburst</div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw',
        height: height || '30vh'
      }}
    >
      <div className="flexible-radar-chart" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleRadarChart {...RADAR_PROPS} {...defaultProps} />
      </div>
      <div className="flexible-radial-chart" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleRadialChart {...RADIAL_PROPS} {...defaultProps} />
      </div>
      <div className="flexible-sunburst" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
        <FlexibleSunburst {...SUNBURST_PROPS} {...defaultProps} />
      </div>
    </div>
  </div>
);
