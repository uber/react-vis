// Copyright (c) 2017 Uber Technologies, Inc.
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

import React, {useState} from 'react';

import {createData, getPPP} from './responsive-vis-utils';
import ResponsiveScatterplot, {
  getFeatures as getScatterplotFeatures
} from './responsive-scatterplot';
import ResponsiveBarChart, {
  getFeatures as getBarFeatures
} from './responsive-bar-chart';

import 'styles/examples.scss';
import './responsive-vis.scss';

const ASPECT_RATIO = 1.2;
const EXAMPLE_MARGIN = {left: 60, top: 60, bottom: 50, right: 50};

export default function ResponsiveVisDemo() {
  const [chartType, setChartType] = useState('barChart');
  const [data, setData] = useState(createData(5, true));
  const [visSize, setVisSize] = useState(400);
  const [dataSize, setDataSize] = useState(1);

  const ResponsiveChartType =
    chartType === 'barChart' ? ResponsiveBarChart : ResponsiveScatterplot;

  const handleTypeClick = chartType => () => {
    setChartType(chartType);
    setData(createData(~~Math.pow(10, dataSize), chartType === 'barChart'));
  };

  const width = visSize;
  const height = visSize * ASPECT_RATIO;
  const ppp = getPPP(width, height, data, 'TWOD');
  const featuresProps = {width, height, data, margin: EXAMPLE_MARGIN};
  const featuresToRender = (chartType === 'barChart'
    ? getBarFeatures
    : getScatterplotFeatures)(featuresProps);

  return (
    <div className="responsive-vis-example">
      <div className="controls-wrapper">
        <div className="responsive-controls">
          <div className="points-per-pixel-label">{`Points Per Pixel: ${ppp}`}</div>
          <div className="features-label">
            {`Features: ${Object.keys(featuresToRender).join(', ')}`}
          </div>
          <div className="chart-type-selector">
            <div
              className={
                chartType === 'scatterplot'
                  ? 'selected-chart-type'
                  : 'unselected-chart-type'
              }
              onClick={handleTypeClick('scatterplot')}
            >
              Scatterplot
            </div>
            <div
              className={
                chartType === 'barChart'
                  ? 'selected-chart-type'
                  : 'unselected-chart-type'
              }
              onClick={handleTypeClick('barChart')}
            >
              BarChart
            </div>
          </div>
          {`Data Size: ${~~Math.pow(10, dataSize)}`}
          <input
            onChange={e => {
              setDataSize(e.target.value);
              setData(
                createData(
                  ~~Math.pow(10, e.target.value),
                  chartType === 'barChart'
                )
              );
            }}
            type="range"
            min={1}
            max={6}
            step={0.1}
            value={dataSize}
          />

          {`Visualization size: ${visSize}`}
          <input
            onChange={e => setVisSize(~~e.target.value)}
            type="range"
            min={100}
            max={1000}
            value={visSize}
          />
        </div>
      </div>
      <ResponsiveChartType
        data={data}
        margin={EXAMPLE_MARGIN}
        height={height}
        width={width}
      />
    </div>
  );
}
