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

import React, {Component} from 'react';
import RadarChart from 'radar-chart';
import {Hint, RadarChartStraightGridLines} from 'index';

const DATA = [
  {
    name: 'Mercedes',
    mileage: 3,
    price: 2.5,
    safety: 8,
    performance: 5,
    interior: 4,
    warranty: 4.5,
    fill: 'rgba(114,172,240,0.4)',
    stroke: 'rgba(114,172,240,0.2)'
  },
  {
    name: 'Honda',
    mileage: 4.5,
    price: 5,
    safety: 7.5,
    performance: 2.5,
    interior: 3,
    warranty: 4,
    fill: 'rgba(154,102,220,0.4)',
    stroke: 'rgba(154,102,220,0.2)'
  }
];

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px'
};

export default class RadarChartWithTooltips extends Component {
  state = {
    hoveredCell: false
  };

  render() {
    const {hoveredCell} = this.state;

    return (
      <RadarChart
        data={DATA}
        tickFormat={t => {
          return '';
        }}
        domains={[
          {
            name: 'mileage',
            domain: [0, 5],
            tickFormat: t => {
              if (t < 5 && t > 0) {
                return Math.round(t);
              }
              return '';
            }
          },
          {
            name: 'price',
            domain: [0, 5],
            getValue: d => d.price
          },
          {name: 'safety', domain: [0, 10], getValue: d => d.safety},
          {name: 'performance', domain: [0, 5], getValue: d => d.performance},
          {name: 'interior', domain: [0, 5], getValue: d => d.interior},
          {name: 'warranty', domain: [0, 5], getValue: d => d.warranty}
        ]}
        width={450}
        height={350}
        onValueMouseOver={v => {
          this.setState({hoveredCell: v});
        }}
        onValueMouseOut={v => this.setState({hoveredCell: false})}
        margin={{top: 30, right: 60, left: 60, bottom: 30}}
        style={{
          background: 'transparent',
          polygons: {
            strokeWidth: 1,
            strokeOpacity: 0.8,
            fillOpacity: 0.8
          },
          labels: {
            textAnchor: 'middle'
          },
          axes: {
            line: {
              strokeWidth: 0,
              strokeOpacity: 0
            },
            ticks: {
              fillOpacity: 0,
              strokeOpacity: 0
            },
            text: {}
          }
        }}
        colorRange={['transparent']}
        hideInnerMostValues={false}
        renderAxesOverPolygons={true}
        numberOfGridlines={0}
      >
        {hoveredCell && (
          <Hint value={hoveredCell}>
            <div style={tipStyle}>
              {hoveredCell.domain}: {hoveredCell.value}
            </div>
          </Hint>
        )}
        <RadarChartStraightGridLines
          numberOfGridlines={5}
          numberOfDomains={6}
          width={450}
          height={350}
          margin={{top: 30, right: 60, left: 60, bottom: 30}}
          style={{
            marginTop: '-350px',
            polygons: {
              stroke: '#cccccc'
            }
          }}
        />
      </RadarChart>
    );
  }
}
