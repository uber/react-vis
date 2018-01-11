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

import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeriesCanvas,
  LineMarkSeries,
  LineSeriesCanvas,
  LineSeries,
  Crosshair
} from 'index';

function getRandomData() {
  return (new Array(1000)).fill(0).map((row, i) => ({
    x: i,
    y: Math.random() * 20,
    color: Math.random() * 10
  }));
}

const randomData = getRandomData();

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

const nextType = {
  typeA: 'typeB',
  typeB: 'typeA'
};

const nextModeContent = {
  canvas: 'SWITCH TO SVG',
  svg: 'SWITCH TO CANVAS'
};

const drawModes = ['canvas', 'svg'];

export default class Example extends React.Component {
  state = {
    drawMode: 0,
    data: randomData,
    colorType: 'typeA',
    strokeWidth: 1,
    showMarks: true,
    value: false,
    hideComponent: false
  }

  render() {
    const {
      colorType,
      drawMode,
      data,
      hideComponent,
      strokeWidth,
      showMarks,
      value
    } = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      color: colorType === 'typeA' ? '#0D676C' : '#B52F93',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      strokeWidth,
      data,
      onNearestX: d => this.setState({value: d})
    };
    const SVGComponent = showMarks ? LineMarkSeries : LineSeries;
    const CanvasComponent = showMarks ? LineMarkSeriesCanvas : LineSeriesCanvas;

    const mode = drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
          <div> {`Mode: ${mode}`} </div>
          <ShowcaseButton
            onClick={() => this.setState({drawMode: (drawMode + 1) % 2})}
            buttonContent={nextModeContent[mode]} />
          <ShowcaseButton
            onClick={() => this.setState({showMarks: !showMarks})}
            buttonContent={showMarks ? 'HIDE MARKS' : 'SHOW MARKS'} />
          <ShowcaseButton
            onClick={() => this.setState({data: getRandomData()})}
            buttonContent={'UPDATE DATA'} />
          <ShowcaseButton
            onClick={() => this.setState({colorType: nextType[colorType]})}
            buttonContent={`TOGGLE COLOR to ${nextType[colorType]}`} />
          <ShowcaseButton
            onClick={() => this.setState({strokeWidth: strokeWidth === 1 ? 2 : 1})}
            buttonContent={'TOGGLE STROKEWIDTH'} />
          <ShowcaseButton
            onClick={() => this.setState({hideComponent: !hideComponent})}
            buttonContent={hideComponent ? 'SHOW' : 'HIDE'} />
        </div>
        {!hideComponent && <XYPlot
          onMouseLeave={() => this.setState({value: false})}
          width={600}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {mode === 'canvas' &&
            <CanvasComponent {...lineSeriesProps}/>}
          {mode === 'svg' &&
            <SVGComponent {...lineSeriesProps}/>}
          {value && <Crosshair values={[value]} />}
        </XYPlot>}
      </div>
    );
  }
}
