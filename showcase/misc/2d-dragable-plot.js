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
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Highlight
} from 'index';

// randomly generated data
const data = [
  {x: 0.8111834460712419, y: 4.7937913352313295},
  {x: 4.4902187987089714, y: 6.372670583875724},
  {x: 1.5777662058185649, y: 9.456053103616782},
  {x: 2.341887242621008, y: 3.2712886842265276},
  {x: 0.19707914410472482, y: 3.7175957358023592},
  {x: 2.532478605071492, y: 9.011777896716458},
  {x: 3.4037600779532093, y: 2.229638642978935},
  {x: 4.062684941510309, y: 2.989659199707919},
  {x: 2.5417727285785174, y: 5.5557413920164205},
  {x: 4.3635704210044715, y: 9.778331309627838},
  {x: 4.550078029031786, y: 8.508033964369668},
  {x: 2.5334684246903336, y: 8.779544582729567},
  {x: 2.887572526145047, y: 5.2195596056069515},
  {x: 1.2589659105601603, y: 1.9173640293400895},
  {x: 1.081031771251727, y: 9.90898204262276},
  {x: 2.980448716590758, y: 6.0187399337446585},
  {x: 1.1970566186804288, y: 2.45586681142423},
  {x: 2.302270551825151, y: 5.716149095907612},
  {x: 3.8546093821188454, y: 8.636651397837436},
  {x: 2.552879030794426, y: 1.7784577888853548},
  {x: 0.978735451081858, y: 5.648089141097003},
  {x: 2.5274925664215155, y: 2.7338632303001043},
  {x: 2.963904533173837, y: 4.904890812594895},
  {x: 1.8581107421316956, y: 3.487270226058816},
  {x: 1.6712618357327624, y: 8.531815556091738},
  {x: 2.7971303680626756, y: 0.26558495089722856},
  {x: 3.433738780822236, y: 2.5965124723565935},
  {x: 0.8090984311301352, y: 1.494815452827365},
  {x: 3.0779963046402337, y: 1.575166939135999},
  {x: 2.0800428705988514, y: 8.151397029820517}
];

export default class BidirectionDragChart extends React.Component {
  state = {
    filter: null
  }
  render() {
    const {filter} = this.state;

    const highlightPoint = d => {
      if (!filter) {
        return false;
      }
      const leftRight = d.x <= filter.right && d.x >= filter.left;
      const upDown = d.y <= filter.top && d.y >= filter.bottom;
      return leftRight && upDown;
    };

    const numSelectedPoints = filter ? data.filter(highlightPoint).length : 0;
    return (
      <div>
        <XYPlot
          width={300}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />

          <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            opacity="0.8"
            sizeRange={[5, 15]}
            colorType="literal"
            getColor={d => highlightPoint(d) ? '#EF5D28' : '#12939A'}
            data={data}/>
          <Highlight
            allow={['y', 'x']}
            drag
            onBrush={area => this.setState({filter: area})}
            onDrag={area => this.setState({filter: area})}/>
        </XYPlot>
        <p>{`There are ${numSelectedPoints} selected points`}</p>
      </div>
    );
  }
}
