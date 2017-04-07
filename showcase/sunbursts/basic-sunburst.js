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

import Sunburst from 'sunburst';

import D3FlareData from '../treemap/d3-flare-example.json';

function getKeyPath(node) {
  if (!node.parent) {
    return 'root';
  }

  return [node.data.name].concat(getKeyPath(node.parent));
}

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  // add a fill to all the uncolored cells
  if (!data.color) {
    data.style = {
      fill: '#223F9A'
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && data.name && keyPath.indexOf(data.name) === -1 ? 0.2 : 1
  };

  return data;
}

const decoratedData = updateData(D3FlareData, false);

export default class BasicSunburst extends React.Component {
  state = {
    pathValue: false,
    data: decoratedData
  }

  render() {
    const {data, pathValue} = this.state;
    return (
      <div className="basic-sunburst-example-wrapper">
        <Sunburst
          animation
          className="basic-sunburst-example"
          hideRootNode
          onValueMouseOver={node => {
            const path = getKeyPath(node.parent);
            this.setState({
              pathValue: Array.isArray(path) && path.join(' > ') || path,
              data: updateData(decoratedData, path)
            });
          }}
          onSeriesMouseOut={() => this.setState({
            pathValue: false,
            data: updateData(decoratedData, false)
          })}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5'
          }}
          colorType="literal"
          data={data}
          height={300}
          width={350}/>
        {pathValue}
      </div>
    );
  }

}
