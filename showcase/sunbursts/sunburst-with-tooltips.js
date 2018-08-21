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

import {
  Hint,
  Sunburst
} from 'index';

import {
  EXTENDED_DISCRETE_COLOR_RANGE as COLORS
} from 'theme';

const DATA = {
  children: [
    {children: [
      {bigness: 1, children: [], clr: COLORS[1], name: 'excellent'},
      {bigness: 1, children: [], clr: COLORS[2], name: 'chart'}
    ], clr: COLORS[3]},
    {
      bigness: 1,
      children: [],
      clr: COLORS[4],
      name: 'cool',
      labelStyle: {
        fontSize: 15,
        fontWeight: 'bold'
      }
    },
    {bigness: 1, children: [], clr: COLORS[5], name: 'dogs'},
    {bigness: 1, children: [], clr: COLORS[6], name: 'sunglasses'},
    {children: [
      {bigness: 1, children: [], clr: COLORS[7], name: 'great'},
      {bigness: 1, children: [], clr: COLORS[8], name: 'label'}
    ], clr: COLORS[9]}
  ]
};

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px'
};
const boxStyle = {height: '10px', width: '10px'};

function buildValue(hoveredCell) {
  const {radius, angle, angle0} = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle)
  };
}

export default class SunburstWithTooltips extends React.Component {
  state = {
    hoveredCell: false
  }
  render() {
    const {hoveredCell} = this.state;
    return (
      <Sunburst
        data={DATA}
        style={{stroke: '#fff'}}
        onValueMouseOver={v => this.setState({hoveredCell: v.x && v.y ? v : false})}
        onValueMouseOut={v => this.setState({hoveredCell: false})}
        height={300}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        getLabel={d => d.name}
        getSize={d => d.bigness}
        getColor={d => d.clr}
        width={350}
        padAngle={() => 0.02}>
        {hoveredCell ? <Hint value={buildValue(hoveredCell)}>
          <div style={tipStyle}>
            <div style={{...boxStyle, background: hoveredCell.clr}}/>
            {hoveredCell.clr}
          </div>
        </ Hint> : null}
      </Sunburst>
    );
  }

}
