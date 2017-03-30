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

import {
  Crosshair,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  Voronoi
} from 'index';

const DATA = [
  {x: 1.4, y: 4, size: 10},
  {x: 1, y: 5, size: 9},
  {x: 2, y: 4, size: 11},
  {x: 2.1, y: 11.8, size: 28},
  {x: 3, y: 5.4, size: 6},
  {x: 1, y: 11.8, size: 25},
  {x: 1.5, y: 14, size: 12},
  {x: 2.7, y: 13.7, size: 14},
  {x: 1.7, y: 9, size: 30},
  {x: 2.4, y: 13.5, size: 20},
  {x: 1, y: 4, size: 18},
  {x: 2.4, y: 7.9, size: 14},
  {x: 1, y: 4, size: 5},
  {x: 2.9, y: 7.7, size: 26},
  {x: 1, y: 4, size: 29}
];

import {scaleLinear} from 'd3-scale';
const x = scaleLinear()
  .domain([1, 3])
  .range([40, 290]);
const y = scaleLinear()
  .domain([4, 14])
  .range([260, 10]);

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DATA,
      selectedPointId: null,
      showVoronoi: false
    };

    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestXY = this._onNearestXY.bind(this);
  }
  /**
   * Event handler for onNearestXY.
   * @param {Object} value Selected value.
   * @private
   */
  _onNearestXY(value, {index}) {
    this.setState({selectedPointId: index});
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave() {
    this.setState({selectedPointId: null});
  }

  render() {
    const {data, selectedPointId, showVoronoi} = this.state;
    return (
      <div>
        <label style={{display: 'block'}}>
          <input type="checkbox"
            checked={showVoronoi}
            onChange={e => this.setState({showVoronoi: !showVoronoi})}
          />
          Show Voronoi
        </label>
        <XYPlot
          onMouseLeave={this._onMouseLeave}
          width={300}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            colorType="literal"
            data={data.map((point, index) =>
              ({...point, color: selectedPointId === index ? '#FF9833' : '#12939A'}))}
            onNearestXY={this._onNearestXY}
            sizeRange={[5, 13]} />
          <Crosshair values={this.state.crosshairValues}/>
          <Voronoi
            extent={[[40, 10], [290, 260]]}
            nodes={data}
            polygonStyle={{stroke: showVoronoi ? 'rgba(0, 0, 0, .2)' : null}}
            x={d => x(d.x)}
            y={d => y(d.y)}
          />
        </XYPlot>
      </div>
    );
  }
}
