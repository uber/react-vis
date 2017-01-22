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
  VerticalRectSeries,
  XYPlot,
  XAxis,
  Crosshair
} from 'react-vis';

import {
  createData,
  getPPP
} from './responsive-vis-utils';

import ResponsiveScatterplot, {SCATTERPLOT_FEATURES} from './responsive-scatterplot';
import ResponsiveBarChart, {BARCHART_FEATURES} from './responsive-bar-chart';

const ASPECT_RATIO = 1.2;
const THEME_COLORS = [
  '#12939A',
  '#79C7E3',
  '#1A3177',
  '#FF9833',
  '#EF5D28'
];

export default class ResponsiveVisDemo extends React.Component {

  state = {
    dataSize: 1,
    visSize: 400,
    data: createData(5, true),
    chartType: 'barChart'
  }

  renderControls() {
    const {chartType, data, dataSize, visSize} = this.state;
    const width = visSize;
    const height = visSize * ASPECT_RATIO;
    const ppp = getPPP(width, height, data, 'TWOD');
    const featuresToRender = this.refs[chartType] && this.refs[chartType].getFeatures() || {};

    const featuresToUse = (chartType === 'scatterplot' ? SCATTERPLOT_FEATURES : BARCHART_FEATURES);
    const featuresMax = featuresToUse.reduce((res, feature) => {
      return feature.max === Infinity ? res : Math.max(res, feature.max);
    }, 0);

    const mappedData = featuresToUse.map((feature, index) => {
      return {
        x0: Math.max(feature.min, 0),
        x: Math.min(feature.max, featuresMax),
        y0: feature.group,
        y: feature.group + 1,
        color: THEME_COLORS[feature.group]
      };
    }).reverse();

    return (<div className="responsive-controls">
      <div className="points-per-pixel-label">{`Points Per Pixel: ${ppp}`}</div>
      <div className="features-label">
        {`Features: ${Object.keys(featuresToRender).join(', ')}`}
      </div>
      <div className="chart-type-selector">
        <div
          className={chartType === 'scatterplot' ? 'selected-chart-type' : 'unselected-chart-type'}
          onClick={() => this.setState({
            chartType: 'scatterplot',
            data: createData((~~Math.pow(10, dataSize)), false)
          })}
          >
          Scatterplot
        </div>
        <div
          className={chartType === 'barChart' ? 'selected-chart-type' : 'unselected-chart-type'}
          onClick={() => this.setState({
            chartType: 'barChart',
            data: createData((~~Math.pow(10, dataSize)), true)
          })}
          >
          BarChart
        </div>
      </div>
      {`Data Size: ${(~~Math.pow(10, dataSize))}`}
      <input
        onChange={e => {
          this.setState({
            dataSize: e.target.value,
            data: createData(~~Math.pow(10, e.target.value), this.state.chartType === 'barChart')
          });
        }}
        type="range"
        min={1}
        max={6}
        step={0.1}
        value={dataSize}
        />

      {`Visualization size: ${visSize}`}
      <input
        onChange={e => this.setState({visSize: ~~e.target.value})}
        type="range"
        min={100}
        max={1000}
        value={visSize}
        />
      <div className="responsive-vis-example-diagram">
        <XYPlot height={100} width={600}>
          <XAxis />
          <VerticalRectSeries
            className="responsive-indicator"
            xDomain={[0, featuresMax]}
            colorType="literal"
            data={mappedData}/>
          <Crosshair values={[{x: Math.min(ppp, featuresMax)}]} >PPP</Crosshair>
        </XYPlot>
      </div>
    </div>);
  }

  render() {
    const {chartType, data, visSize} = this.state;
    const margin = {left: 60, top: 60, bottom: 50, right: 50};

    return (
      <div className="responsive-vis-example">
        <div className="responsive-explanation">
          This demo explores the concept of "Responsive Data Visualization"
          (As coined by Nick Rabinowitz). The basic notion is lifted from responsive design:
          some features work for some screen resolutions, while others do not.
          Responsive design determines whether or not to use a given feature by
          consulting an aspect ratio (width by height). Through this notation we are
          able to create beautiful web experiences that work seemlessly between phones,
          tablets, and computers. Taking this idea on step
          farther we introduce a third element into the fray: data size.
          <br />
          <br />
          In data visualization, we often need to create applications that work with
          enmorous ranges of sizes of data. Sometimes the data might be small (10 - 100 rows),
          or it might be gigantic (100k-1M+ row): throughout the entire range it just needs to work.
          Again, following our cues from responsive design, we note that maybe labels on
          scatterplots look great when you have under 50 data points, but bad when you have 2000.
          Checkout Nick's
          <a href="http://nrabinowitz.github.io/rdv/"> original demo </a>
           for more details on the theory, as well to see his rad implementation in
           raw d3.

        </div>
        <div className="responsive-vis-example-main-content">
          {this.renderControls()}

          {chartType === 'scatterplot' && <ResponsiveScatterplot
              data={data}
              ref="scatterplot"
              margin={margin}
              height={ASPECT_RATIO * visSize}
              width={visSize} />}
          {
            // TODO Add a orientation prop
          }
          {chartType === 'barChart' && <ResponsiveBarChart
            data={data}
            height={ASPECT_RATIO * visSize}
            margin={margin}
            ref="barChart"
            width={visSize} />}
        </div>
      </div>
    );
  }
}
