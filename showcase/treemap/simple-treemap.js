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

import Treemap from 'treemap';

import D3FlareData from './d3-flare-example.json';
import ShowcaseButton from '../showcase-components/showcase-button';

const MODE = [
  'circlePack',
  'partition',
  'partition-pivot',
  'squarify',
  'resquarify',
  'slice',
  'dice',
  'slicedice',
  'binary'
];

const STYLES = {
  SVG: {
    stroke: '#ddd',
    strokeWidth: '0.25',
    strokeOpacity: 0.5
  },
  DOM: {
    border: 'thin solid #ddd'
  }
};

export default class SimpleTreemapExample extends React.Component {
  state = {
    modeIndex: 0,
    useSVG: true
  }

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex = newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  }

  render() {
    const {modeIndex, useSVG} = this.state;

    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={() => this.setState({useSVG: !useSVG})}
            buttonContent={useSVG ? 'USE DOM' : 'USE SVG'} />
        </div>
        <div className="centered-and-flexed-controls">
          <ShowcaseButton onClick={this.updateModeIndex(false)} buttonContent={'PREV MODE'} />
          <div> {MODE[modeIndex]} </div>
          <ShowcaseButton onClick={this.updateModeIndex(true)} buttonContent={'NEXT MODE'} />
        </div>
        <Treemap {...{
          animation: true,
          className: 'nested-tree-example',
          colorType: 'literal',
          colorRange: ['#88572C'],
          data: D3FlareData,
          mode: MODE[modeIndex],
          renderMode: useSVG ? 'SVG' : 'DOM',
          height: 300,
          width: 350,
          margin: 10,
          style: STYLES[useSVG ? 'SVG' : 'DOM']
        }}/>
      </div>
    );
  }

}
