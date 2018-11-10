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

import React, {Component} from 'react';

import {XYPlot, LineSeries, MarkSeries} from 'index';

const scatterPlotData = [...Array(30).keys()].map(() => ({
  x: Math.random() * 10,
  y: Math.random() * 10
}));

const lineData = [...Array(3).keys()].map(() =>
  [...Array(10).keys()].map(x => ({x, y: Math.random() * 10}))
);

const allData = lineData.reduce((prev, curr, i) => {
  return [...prev, ...curr.map(d => ({...d, seriesNb: i}))];
}, []);

const defaultProps = {
  width: 400,
  height: 200,
  margin: {top: 5, left: 5, right: 5, bottom: 5}
};

export class ScatterPlotOnNearestXY extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    const data = scatterPlotData.map((d, i) => ({
      ...d,
      color: i === index ? 1 : 0
    }));
    return (
      <XYPlot
        {...defaultProps}
        xDomain={[-0.5, 9.5]}
        yDomain={[-0.5, 9.5]}
        size={5}
        colorDomain={[0, 1]}
        onMouseLeave={() => this.setState({index: null})}
      >
        <MarkSeries
          data={data}
          stroke="white"
          onNearestXY={(d, e) => this.setState({index: e.index})}
        />
      </XYPlot>
    );
  }
}

export class LineChartMouseOverSeries extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    return (
      <XYPlot
        {...defaultProps}
        onMouseLeave={() => this.setState({index: null})}
      >
        {lineData.map((d, i) => (
          <LineSeries
            data={d}
            key={`${i}`}
            stroke={i === index ? 'orange' : undefined}
          />
        ))}
        {lineData.map((d, i) => (
          <LineSeries
            data={d}
            key={`${i}-mouseover`}
            onSeriesMouseOut={() => this.setState({index: null})}
            onSeriesMouseOver={() => this.setState({index: i})}
            strokeWidth={10}
            stroke={index === i ? 'rgba(0,0,0,0.2)' : 'transparent'}
          />
        ))}
      </XYPlot>
    );
  }
}

export class LineChartMouseOverXY extends Component {
  constructor() {
    super();
    this.state = {highlightedSeries: null, pointUsed: null};
  }
  render() {
    const {pointUsed, highlightedSeries} = this.state;
    const data = allData.map((d, i) => ({
      ...d,
      color: i === pointUsed ? 'rgba(0,0,0,0.2)' : 'transparent'
    }));

    return (
      <XYPlot
        {...defaultProps}
        onMouseLeave={() =>
          this.setState({
            highlightedSeries: null,
            pointUsed: null
          })
        }
      >
        {lineData.map((d, i) => (
          <LineSeries
            data={d}
            key={`${i}`}
            stroke={i === highlightedSeries ? 'orange' : undefined}
          />
        ))}
        <MarkSeries
          data={data}
          colorType="literal"
          size={10}
          onNearestXY={({seriesNb}, {index}) =>
            this.setState({
              highlightedSeries: seriesNb,
              pointUsed: index
            })
          }
        />
      </XYPlot>
    );
  }
}

export class LinkedCharts extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }

  handleMouseOver = index => {
    this.setState({index});
  };

  render() {
    const {index} = this.state;
    return (
      <div>
        {lineData.map((d, i) => (
          <div key={i}>
            <LineChart
              data={d}
              index={index}
              handleMouseOver={this.handleMouseOver}
            />
          </div>
        ))}
      </div>
    );
  }
}

function LineChart({data, index, handleMouseOver}) {
  return (
    <XYPlot
      {...defaultProps}
      height={80}
      yDomain={[0, 10]}
      onMouseLeave={() => handleMouseOver(null)}
    >
      <LineSeries data={data} onNearestX={(d, e) => handleMouseOver(e.index)} />
      {index === null ? null : (
        <LineSeries
          data={[{x: index, y: 0}, {x: index, y: 10}]}
          opacity={0.5}
        />
      )}
      {index === null ? null : (
        <MarkSeries data={[data[index]]} stroke="white" />
      )}
    </XYPlot>
  );
}
