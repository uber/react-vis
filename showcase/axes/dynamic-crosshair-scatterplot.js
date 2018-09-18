// Copyright (c) 2016-2017 Uber Technologies, Inc.
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
import {scaleLinear} from 'd3-scale';

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
  {x: 1, y: 4, size: 9},
  {x: 1, y: 5, size: 18},
  {x: 1, y: 10, size: 5},
  {x: 1, y: 11, size: 29},
  {x: 1, y: 13.9, size: 5},
  {x: 1, y: 14, size: 8},
  {x: 1.5, y: 11.8, size: 25},
  {x: 1.7, y: 9, size: 30},
  {x: 2, y: 5, size: 11},
  {x: 2.1, y: 11.8, size: 28},
  {x: 2.4, y: 7.9, size: 14},
  {x: 2.4, y: 13.5, size: 20},
  {x: 2.7, y: 13.7, size: 14},
  {x: 2.9, y: 7.7, size: 26},
  {x: 3, y: 5.4, size: 6}
].map((d, id) => ({...d, id}));

const getDomain = (data, key) => {
  const {min, max} = data.reduce(
    (acc, row) => ({
      min: Math.min(acc.min, row[key]),
      max: Math.max(acc.max, row[key])
    }),
    {min: Infinity, max: -Infinity}
  );
  return [min, max];
};

// magic numbers chosen for design
const sizeRange = [5, 13];
const margin = {top: 10, left: 40, bottom: 40, right: 10};
const width = 300;
const height = 300;

// Intentionally using explicit sales here to show another way of using the voronoi
const x = scaleLinear()
  .domain(getDomain(DATA, 'x'))
  .range([0, width]);
const y = scaleLinear()
  .domain(getDomain(DATA, 'y'))
  .range([height, 0]);

export default class Example extends React.Component {
  state = {
    selectedPointId: null,
    showVoronoi: true
  };

  render() {
    const {crosshairValues, selectedPointId, showVoronoi} = this.state;

    return (
      <div>
        <label style={{display: 'block'}}>
          <input
            type="checkbox"
            checked={showVoronoi}
            onChange={() => this.setState({showVoronoi: !showVoronoi})}
          />
          Show Voronoi
        </label>
        <XYPlot
          onMouseLeave={() =>
            this.setState({selectedPointId: null, crosshairValues: null})
          }
          width={width}
          height={height}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            colorType="literal"
            data={DATA}
            onNearestXY={(value, {index}) =>
              this.setState({
                selectedPointId: index,
                crosshairValues: [value]
              })
            }
            getColor={({id}) =>
              selectedPointId === id ? '#FF9833' : '#12939A'
            }
            sizeRange={sizeRange}
          />
          {crosshairValues && <Crosshair values={crosshairValues} />}
          {showVoronoi && (
            <Voronoi
              extent={[
                [margin.left, margin.top],
                [width - margin.right, height - margin.bottom]
              ]}
              nodes={DATA}
              polygonStyle={{stroke: 'rgba(0, 0, 0, .2)'}}
              x={d => x(d.x)}
              y={d => y(d.y)}
            />
          )}
        </XYPlot>
      </div>
    );
  }
}
