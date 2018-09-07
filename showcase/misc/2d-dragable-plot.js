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

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Highlight,
  Hint
} from 'index';

import {generateSeededRandom} from '../showcase-utils';
const seededRandom = generateSeededRandom(3);

// randomly generated data
const data = [...new Array(30)].map(row => ({x: seededRandom() * 5, y: seededRandom() * 10}));

export default class BidirectionDragChart extends React.Component {
  state = {
    filter: null,
    hovered: null,
    highlighting: false
  }

  render() {
    const {filter, hovered, highlighting} = this.state;

    const highlightPoint = d => {
      if (!filter) {
        return false;
      }
      const leftRight = d.x <= filter.right && d.x >= filter.left;
      const upDown = d.y <= filter.top && d.y >= filter.bottom;
      return leftRight && upDown;
    };

    const numSelectedPoints = filter ? data.filter(highlightPoint).length : 0;
    return (
      <div>
        <XYPlot
          width={300}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <Highlight
            drag
            onBrushStart={() => this.setState({highlighting: true})}
            onBrush={area => this.setState({filter: area})}
            onBrushEnd={area => this.setState({highlighting: false, filter: area})}
            onDragStart={area => this.setState({highlighting: true})}
            onDrag={area => this.setState({filter: area})}
            onDragEnd={area => this.setState({highlighting: false, filter: area})}/>
          <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            opacity="0.8"
            sizeRange={[5, 15]}
            style={{pointerEvents: highlighting ? 'none' : ''}}
            colorType="literal"
            getColor={d => highlightPoint(d) ? '#EF5D28' : '#12939A'}
            onValueMouseOver={d => this.setState({hovered: d})}
            onValueMouseOut={d => this.setState({hovered: false})}
            data={data}/>
          {hovered && <Hint value={hovered}/>}
        </XYPlot>
        <p>{`There are ${numSelectedPoints} selected points`}</p>
      </div>
    );
  }
}
