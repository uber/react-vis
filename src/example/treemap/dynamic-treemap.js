// Copyright (c) 2016 Uber Technologies, Inc.
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
import window from 'global/window';

import {Treemap} from '../../';

export default class DynamicTreemapExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      treemapData: this._getRandomData()
    };
  }

  componentDidMount() {
    window.setInterval(
      () => this.setState({treemapData: this._getRandomData()}),
      5000
    );
  }

  _getRandomData() {
    const totalLeaves = Math.random() * 20;
    const leaves = [];
    let title;
    for (let i = 0; i < totalLeaves; i++) {
      title = Math.random();
      if (Math.random() > 0.5) {
        title = (
          <b>{title}</b>
        );
      }
      leaves.push({
        title,
        size: Math.random() * 1000,
        color: Math.random()
      });
    }
    return {
      title: '',
      color: 1,
      children: leaves
    };
  }

  render() {
    return (
      <Treemap
        animation={true}
        data={this.state.treemapData}
        height={300}
        width={350}/>
    );
  }

}
