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

import XYPlot from 'plot/xy-plot';
import PolygonSeries from 'plot/series/polygon-series';
import MarkSeries from 'plot/series/mark-series';
import LabelSeries from 'plot/series/label-series';

const MARGIN_ADJUST = 1.2;

class TreemapSVG extends React.Component {
  getCircularNodes() {
    const {
      animation,
      hideRootNode,
      nodes,
      onLeafMouseOver,
      onLeafMouseOut,
      onLeafClick,
      scales,
      style
    } = this.props;

    const {rows, minY, maxY, minX, maxX} = nodes.reduce(
      (acc, node, index) => {
        if (!index && hideRootNode) {
          return acc;
        }
        const {x, y, r} = node;
        return {
          maxY: Math.max(y + r, acc.maxY),
          minY: Math.min(y - r, acc.minY),
          maxX: Math.max(x + MARGIN_ADJUST * r, acc.maxX),
          minX: Math.min(x - MARGIN_ADJUST * r, acc.minX),
          rows: acc.rows.concat([
            {
              x,
              y,
              size: r,
              color: scales.color(node)
            }
          ])
        };
      },
      {
        rows: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      }
    );
    return {
      updatedNodes: (
        <MarkSeries
          animation={animation}
          className="rv-treemap__leaf rv-treemap__leaf--circle"
          onSeriesMouseEnter={onLeafMouseOver}
          onSeriesMouseLeave={onLeafMouseOut}
          onSeriesClick={onLeafClick}
          data={rows}
          colorType="literal"
          getColor={d => d.color}
          sizeType="literal"
          getSize={d => d.size}
          style={style}
        />
      ),
      minY,
      maxY,
      minX,
      maxX
    };
  }

  getNonCircularNodes() {
    const {
      animation,
      hideRootNode,
      nodes,
      onLeafMouseOver,
      onLeafMouseOut,
      onLeafClick,
      scales,
      style
    } = this.props;
    const {color} = scales;
    return nodes.reduce(
      (acc, node, index) => {
        if (!index && hideRootNode) {
          return acc;
        }
        const {x0, x1, y1, y0} = node;
        const x = x0;
        const y = y0;
        const nodeHeight = y1 - y0;
        const nodeWidth = x1 - x0;

        acc.maxY = Math.max(y + nodeHeight, acc.maxY);
        acc.minY = Math.min(y, acc.minY);
        acc.maxX = Math.max(x + nodeWidth, acc.maxX);
        acc.minX = Math.min(x, acc.minX);

        const data = [
          {x, y},
          {x, y: y + nodeHeight},
          {x: x + nodeWidth, y: y + nodeHeight},
          {x: x + nodeWidth, y}
        ];

        acc.updatedNodes = acc.updatedNodes.concat([
          <PolygonSeries
            animation={animation}
            className="rv-treemap__leaf"
            key={index}
            color={color(node)}
            type="literal"
            onSeriesMouseEnter={onLeafMouseOver}
            onSeriesMouseLeave={onLeafMouseOut}
            onSeriesClick={onLeafClick}
            data={data}
            style={{
              ...style,
              ...node.style
            }}
          />
        ]);
        return acc;
      },
      {
        updatedNodes: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      }
    );
  }

  render() {
    const {className, height, mode, nodes, width} = this.props;
    const useCirclePacking = mode === 'circlePack';

    const {minY, maxY, minX, maxX, updatedNodes} = useCirclePacking
      ? this.getCircularNodes()
      : this.getNonCircularNodes();

    const labels = nodes.reduce((acc, node) => {
      if (!node.data.title) {
        return acc;
      }
      return acc.concat({
        ...node.data,
        x: node.x0 || node.x,
        y: node.y0 || node.y,
        label: `${node.data.title}`
      });
    }, []);

    return (
      <XYPlot
        className={`rv-treemap ${
          useCirclePacking ? 'rv-treemap-circle-packed' : ''
        } ${className}`}
        width={width}
        height={height}
        yDomain={[maxY, minY]}
        xDomain={[minX, maxX]}
        colorType="literal"
        hasTreeStructure
        {...this.props}
      >
        {updatedNodes}
        <LabelSeries data={labels} />
      </XYPlot>
    );
  }
}

TreemapSVG.displayName = 'TreemapSVG';

export default TreemapSVG;
