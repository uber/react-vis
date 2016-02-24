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
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  makeWidthFlexible,
  LineSeries,
  BarSeries,
  Crosshair} from '../../';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      data: this._getStateData()
    };
    this._crosshairValues = [];

    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestXs = [
      this._onNearestX.bind(this, 0),
      this._onNearestX.bind(this, 1)
    ];
    this._updateSeries = this._updateSeries.bind(this);
  }

  /**
   * Get the array of x and y pairs.
   * The function tries to avoid too large changes of the chart.
   * @param {number} total Total number of points
   * @returns {Array} Array of data.
   * @private
   */
  _getRandomSeriesData(total) {
    const result = [];
    let lastY = Math.random() * 40 - 20;
    let y;
    const firstY = lastY;
    for (let i = 0; i < total; i++) {
      y = Math.random() * firstY - firstY / 2 + lastY;
      result.push({
        x: i,
        y
      });
      lastY = y;
    }
    return result;
  }

  _getStateData() {
    const maxValues = Math.floor(Math.random() * 50);
    return [
      this._getRandomSeriesData(maxValues),
      this._getRandomSeriesData(maxValues)
    ];
  }

  _updateSeries() {
    this.setState({
      data: this._getStateData()
    });
  }

  /**
   * Event handler for onNearestX.
   * @param {number} seriesIndex Index of the series.
   * @param {Object} value Selected value.
   * @private
   */
  _onNearestX(seriesIndex, value) {
    this._crosshairValues = this._crosshairValues.concat();
    this._crosshairValues[seriesIndex] = value;
    this.setState({crosshairValues: this._crosshairValues});
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave() {
    this._crosshairValues = [];
    this.setState({crosshairValues: this._crosshairValues});
  }

  _formatCrosshairTitle(values) {
    return {
      title: 'X',
      value: values[0].x
    };
  }

  _formatCrosshairItems(values) {
    return values.map((v, i) => {
      return {
        title: `Series ${i}`,
        value: v.y
      };
    });
  }

  render() {
    return (
      <div className="example-with-click-me">
        <FlexibleXYPlot
          animation={{duration: 200}}
          onMouseLeave={this._onMouseLeave}
          height={300}>
          <HorizontalGridLines />
          <YAxis />
          <XAxis />
          <BarSeries
            onNearestX={this._onNearestXs[0]}
            data={this.state.data[0]}/>
          <LineSeries
            onNearestX={this._onNearestXs[1]}
            data={this.state.data[1]}/>
          <Crosshair
            itemsFormat={this._formatCrosshairItems}
            titleFormat={this._formatCrosshairTitle}
            values={this.state.crosshairValues}/>
        </FlexibleXYPlot>
        <button className="click-me" onClick={this._updateSeries}>
          Click to update
        </button>
      </div>
    );
  }
}
