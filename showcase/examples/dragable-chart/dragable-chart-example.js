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

import React from 'react';
import PropTypes from 'prop-types';
import DragMarker from './drag-marker';

import {scaleLinear} from 'd3-scale';
import {
  XYPlot,
  XAxis,
  YAxis,
  makeWidthFlexible,
  Voronoi,
  LineSeries,
  VerticalGridLines
} from 'index';

function getRandomSeriesData(xMax, yMax) {
  return Array(xMax)
  .fill()
  .map((e, x) => ({x, y: Math.floor(Math.random() * yMax) + 1}));
}

const PLOT_MARGIN = {
  top: 50,
  left: 50,
  right: 10
};
const PLOT_HEIGHT = 300;
const PLOT_DOMAIN = {
  x: [0, 100],
  y: [0, 10]
};
const seriesData = getRandomSeriesData(PLOT_DOMAIN.x[1], PLOT_DOMAIN.y[1]);

class DragableChartExample extends React.Component {
  state = {
    isDrawing: false,
    selectionStart: null,
    selectionEnd: null,
    hoveredX: null
  };

  onMouseLeave = () => this.setState({isDrawing: false})
  onMouseDown = node => this.setState({isDrawing: true, selectionStart: node.x, selectionEnd: null});
  onMouseUp = node => this.setState({isDrawing: false});
  onHover = node => this.setState(nextState =>
    ({selectionEnd: nextState.isDrawing ? node.x : nextState.selectionEnd, hoveredX: node.x}));

  render() {
    const PLOT_WIDTH = this.props.width;
    const x = scaleLinear().domain(PLOT_DOMAIN.x).range([PLOT_MARGIN.left, PLOT_WIDTH - PLOT_MARGIN.right]);
    const y = scaleLinear().domain(PLOT_DOMAIN.y).range([PLOT_HEIGHT, 0]);
    return (
      <div>
        <XYPlot
          onMouseLeave={this.onMouseLeave}
          width={PLOT_WIDTH}
          height={PLOT_HEIGHT}
          margin={PLOT_MARGIN}
          xDomain={x.domain()}
          yDomain={y.domain()}
        >
          <XAxis />
          <YAxis />
          <LineSeries curve={'curveMonotoneX'} data={seriesData} />
          {this.state.hoveredX !== null && <VerticalGridLines tickValues={[this.state.hoveredX]} />}

          <Voronoi
            extent={[[PLOT_MARGIN.left, PLOT_MARGIN.top], [PLOT_WIDTH, PLOT_HEIGHT]]}
            nodes={seriesData}
            onHover={this.onHover}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            x={d => x(d.x)}
            y={d => 0}
          />

          {this.state.isDrawing && this.state.selectionEnd !== null &&
            <DragMarker
              selectionStart={x(this.state.selectionStart)}
              selectionEnd={x(this.state.selectionEnd)} />}
        </XYPlot>

        <div style={{marginLeft: '50px'}}>
          <p><strong>selectionStart:</strong> {this.state.selectionStart}</p>
          <p><strong>selectionEnd:</strong> {this.state.selectionEnd}</p>
          <p><strong>isDrawing:</strong> {this.state.isDrawing.toString()}</p>
        </div>
      </div>
    );
  }
}

DragableChartExample.propTypes = {
  width: PropTypes.number
};

export default makeWidthFlexible(DragableChartExample);
