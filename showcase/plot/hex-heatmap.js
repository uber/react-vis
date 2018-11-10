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

import React, {Component} from 'react';

import ShowcaseButton from '../showcase-components/showcase-button';

import {XYPlot, XAxis, YAxis, HexbinSeries, Borders, Hint} from 'index';

import DATA from '../datasets/old-faithful.json';

function updateData() {
  return DATA.map(row => ({
    waiting: row.waiting + (Math.random() - 0.5) * 10,
    eruptions: row.eruptions + (Math.random() - 0.5) * 2
  }));
}
export default class HexHeatmap extends Component {
  state = {
    data: DATA,
    hoveredNode: null,
    radius: 10,
    offset: 0
  };
  render() {
    const {data, radius, hoveredNode, offset} = this.state;

    return (
      <div>
        <XYPlot
          xDomain={[40, 100]}
          yDomain={[1.5, 8]}
          width={300}
          getX={d => d.waiting}
          getY={d => d.eruptions}
          onMouseLeave={() => this.setState({hoveredNode: null})}
          height={300}
        >
          <HexbinSeries
            animation
            className="hexbin-example"
            style={{
              stroke: '#125C77',
              strokeLinejoin: 'round'
            }}
            onValueMouseOver={d => this.setState({hoveredNode: d})}
            xOffset={offset}
            yOffset={offset}
            colorRange={['orange', 'cyan']}
            radius={radius}
            data={data}
          />
          <Borders style={{all: {fill: '#fff'}}} />
          <XAxis />
          <YAxis />
          {hoveredNode && (
            <Hint
              xType="literal"
              yType="literal"
              getX={d => d.x}
              getY={d => d.y}
              value={{
                x: hoveredNode.x,
                y: hoveredNode.y,
                value: hoveredNode.length
              }}
            />
          )}
        </XYPlot>
        <ShowcaseButton
          onClick={() => this.setState({data: updateData()})}
          buttonContent={'UPDATE DATA'}
        />
        <ShowcaseButton
          onClick={() =>
            this.setState({radius: (Math.random() - 0.5) * 10 + 10})
          }
          buttonContent={'UPDATE RADIUS'}
        />
        <ShowcaseButton
          onClick={() =>
            this.setState({offset: (Math.random() - 0.5) * 10 + 10})
          }
          buttonContent={'UPDATE OFFSET'}
        />
      </div>
    );
  }
}
