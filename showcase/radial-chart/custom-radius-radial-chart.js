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

import {CircularGridLines, RadialChart} from 'index';

const DATA = [
  {
    angle: 1,
    id: 1,
    radius: 10
  },
  {
    angle: 2,
    label: 'Super Custom label',
    subLabel: 'With annotation',
    id: 2,
    radius: 20
  },
  {
    angle: 5,
    id: 3,
    radius: 5,
    label: 'Alt Label'
  },
  {
    angle: 3,
    id: 4,
    radius: 14
  },
  {
    angle: 5,
    id: 5,
    radius: 12,
    subLabel: 'Sub Label only'
  }
];

function mapData(hoveredSection) {
  return DATA.map((row, index) => {
    return {
      ...row,
      innerRadius: hoveredSection === index + 1 ? row.radius - 1 : null,
      opacity: !hoveredSection || hoveredSection === index + 1 ? 1 : 0.6
    };
  });
}

export default class SimpleRadialChart extends Component {
  state = {
    hoveredSection: false
  };

  render() {
    const {hoveredSection} = this.state;
    return (
      <RadialChart
        animation
        showLabels
        radiusDomain={[0, 20]}
        data={mapData(hoveredSection)}
        labelsAboveChildren
        onValueMouseOver={row => this.setState({hoveredSection: row.id})}
        onMouseLeave={() => this.setState({hoveredSection: false})}
        width={600}
        height={300}
      >
        <CircularGridLines tickTotal={20} rRange={[0, 150]} />
      </RadialChart>
    );
  }
}
