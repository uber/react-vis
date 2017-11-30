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
import ShowcaseButton from '../showcase-components/showcase-button';

function _getRandomData(total) {
  const totalLeaves = total || Math.random() * 20;
  const leaves = [];
  for (let i = 0; i < totalLeaves; i++) {
    leaves.push({
      name: total ? total : String(Math.random()).slice(0, 3),
      size: Math.random() * 1000,
      color: Math.random(),
      style: {
        border: 'thin solid red'
      }
    });
  }
  return {
    title: '',
    color: 1,
    children: leaves
  };
}

export default class DynamicTreemapExample extends React.Component {
  state = {
    hoveredNode: false,
    treemapData: _getRandomData(20),
    useCirclePacking: false
  }

  render() {
    const {hoveredNode, useCirclePacking} = this.state;
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({hoveredNode: x}),
      onLeafMouseOut: () => this.setState({hoveredNode: false}),
      onLeafClick: () => this.setState({treemapData: _getRandomData()}),
      height: 300,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
      width: 350
    };
    return (
      <div className="dynamic-treemap-example">
        <ShowcaseButton
          onClick={() => this.setState({useCirclePacking: !useCirclePacking})}
          buttonContent={'TOGGLE CIRCLE PACK'} />
        <Treemap {...treeProps}/>
        click above to the update data
        {hoveredNode && hoveredNode.value}
      </div>
    );
  }

}
