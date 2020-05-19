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
import LesMisData from './les-mis-data.json';

import './force-directed.scss';
import ForceDirectedGraph from './force-directed-graph';

export default class ForceDirectedExample extends React.Component {
  state = {
    strength: Math.random() * 60 - 30
  };

  render() {
    const {strength} = this.state;
    return (
      <div className="force-directed-example">
        <button
          className="showcase-button"
          onClick={() => this.setState({strength: Math.random() * 60 - 30})}
        >
          {' '}
          REWEIGHT{' '}
        </button>
        <ForceDirectedGraph
          data={LesMisData}
          height={500}
          width={500}
          animation
          strength={strength}
        />
      </div>
    );
  }
}
