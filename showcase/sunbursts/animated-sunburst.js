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

import {Sunburst} from 'index';
import ShowcaseButton from '../showcase-components/showcase-button';

function randomLeaf() {
  return {
    size: Math.random() * 1000,
    color: Math.random()
  };
}

function updateData() {
  const totalLeaves = Math.random() * 20;
  const leaves = [];
  for (let i = 0; i < totalLeaves; i++) {
    const leaf = randomLeaf();
    if (Math.random() > 0.8) {
      leaf.children = [...new Array(3)].map(() => randomLeaf());
    }
    leaves.push(leaf);
  }
  return {
    title: '',
    color: 1,
    children: leaves
  };
}

const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00'];

export default class AnimatedSunburst extends React.Component {
  state = {
    data: updateData()
  }

  render() {
    const {data} = this.state;
    return (
      <div className="animated-sunburst-example-wrapper">
        <ShowcaseButton
          onClick={() => this.setState({data: updateData()})}
          buttonContent={'UPDATE'} />
        <Sunburst
          animation={{damping: 20, stiffness: 300}}
          data={data}
          colorType={'category'}
          colorRange={DIVERGING_COLOR_SCALE}
          style={{stroke: '#fff'}}
          height={300}
          width={350}/>
      </div>
    );
  }

}
