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
import PropTypes from 'prop-types';
import {stack as d3Stack, stackOffsetWiggle} from 'd3-shape';
import {range, transpose} from 'd3-array';

import {
  XYPlot,
  makeWidthFlexible,
  AreaSeries
} from 'react-vis';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const NUMBER_OF_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;

const bump = (aggregatingData, samplesPerLayer) => {
  const x = 1 / (0.1 + Math.random());
  const y = 2 * Math.random() - 0.5;
  const z = 10 / (0.1 + Math.random());

  return aggregatingData.map((v, i) => {
    const w = (i / samplesPerLayer - y) * z;
    return v + (x * Math.exp(-w * w));
  });
};

// Inspired by Bostock's version of Lee Byron’s test data generator.
function bumps(samplesPerLayer, bumpsPerLayer) {
  const dataOutline = (new Array(samplesPerLayer)).fill(0);
  return range(bumpsPerLayer).reduce(res => bump(res, samplesPerLayer), dataOutline);
}

function generateData() {
  const stack = d3Stack().keys(range(NUMBER_OF_LAYERS)).offset(stackOffsetWiggle);
  const transposed = transpose(range(NUMBER_OF_LAYERS).map(() => bumps(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)));
  return stack(transposed).map(series => series.map((row, x) => ({x, y0: row[0], y: row[1]})));
}

class Example extends React.Component {
  state = {
    data: generateData(),
    hoveredIndex: false
  }

  render() {
    const {forFrontPage} = this.props;
    const {data, hoveredIndex} = this.state;
    return (
      <div className="streamgraph-example">
        {!forFrontPage && (<button
          className="showcase-button"
          onClick={() => this.setState({data: generateData()})}>
          {'Click me!'}
          </button>)}
        <div className="streamgraph">
          <FlexibleXYPlot
            animation
            onMouseLeave={() => this.setState({hoveredIndex: false})}
            height={300}>
            {data.map((series, index) => (
              <AreaSeries
                key={index}
                curve="curveNatural"
                className={`${index === hoveredIndex ? 'highlighted-stream' : ''}`}
                onSeriesMouseOver={() => this.setState({hoveredIndex: index})}
                data={series} />
            ))}
          </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  forFrontPage: PropTypes.bool
};

export default Example;
