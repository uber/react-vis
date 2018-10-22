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
import {scaleLinear} from 'd3-scale';

import CarData from '../datasets/car-data.json';

import {XYPlot, DecorativeAxis, LineSeries} from 'index';

const DEFAULT_DOMAIN = {min: Infinity, max: -Infinity};
// begin by figuring out the domain of each of the columns
const domains = CarData.reduce((res, row) => {
  Object.keys(row).forEach(key => {
    if (!res[key]) {
      res[key] = {...DEFAULT_DOMAIN};
    }
    res[key] = {
      min: Math.min(res[key].min, row[key]),
      max: Math.max(res[key].max, row[key])
    };
  });
  return res;
}, {});
// use that to generate columns that map the data to a unit scale
const scales = Object.keys(domains).reduce((res, key) => {
  const domain = domains[key];
  res[key] = scaleLinear()
    .domain([domain.min, domain.max])
    .range([0, 1]);
  return res;
}, {});

// break each object into an array and rescale it
const mappedData = CarData.map(row => {
  return Object.keys(row)
    .filter(key => key !== 'name')
    .map(key => ({
      x: key,
      y: scales[key](Number(row[key]))
    }));
});

const MARGIN = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10
};

function ParallelCoordinatesExample(props) {
  return (
    <XYPlot
      width={500}
      height={300}
      xType="ordinal"
      margin={MARGIN}
      className="parallel-coordinates-example"
    >
      {mappedData.map((series, index) => {
        return <LineSeries data={series} key={`series-${index}`} />;
      })}
      {mappedData[0].map((cell, index) => {
        return (
          <DecorativeAxis
            key={`${index}-axis`}
            axisStart={{x: cell.x, y: 0}}
            axisEnd={{x: cell.x, y: 1}}
            axisDomain={[domains[cell.x].min, domains[cell.x].max]}
          />
        );
      })}
    </XYPlot>
  );
}

export default ParallelCoordinatesExample;
