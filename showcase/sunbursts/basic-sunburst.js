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

function getTextPath(node) {
  const name = node.data && node.data.name || node.name || '';
  if (!node.parent) {
    return 'root';
  }

  return `${getTextPath(node.parent)} > ${name}`;
}

function getKeyPath(node) {
  // const name = node.data && node.data.name || node.name || '';
  if (!node.parent) {
    return 'root';
  }

  return [node.data.name].concat(getKeyPath(node.parent));
}

function decorateData(data) {
  if (!data.children) {
    return data;
  }
  // add a fill to all the uncolored cells
  if (!data.color) {
    data.style = {
      fill: '#223F9A'
    };
  }
  data.children.map(child => decorateData(child));
  return data;
}
const decoratedData = decorateData(D3FlareData);

export default class BasicSunburst extends React.Component {
  state = {
    value: false,
    subState: false,
    data: decoratedData
  }

  render() {
    const {subState, data} = this.state;
    return (
      <div className="basic-sunburst-example-wrapper">
        <Sunburst
          animation
          className="basic-sunburst-example"
          onValueMouseOver={node => {
            const yy = getTextPath(node.parent);
            const xx = getKeyPath(node.parent);
            // console.log(xx)
            // console.log(this)
            // debugger;
            this.setState({value: yy});
          }}
          onValueClick={node => {
            this.setState({subState: subState ? false : node});
          }}
          style={{
            stroke: '#ddd',
            strokeWidth: '1px'
          }}
          colorType="literal"
          data={data}
          height={300}
          width={350}/>
        {this.state.value}
      </div>
    );
  }

}
