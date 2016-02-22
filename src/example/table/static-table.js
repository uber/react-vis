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

import {Table} from '../../';

export default class TableExample extends React.Component {

  _getTableData() {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result[i] = [];
      for (let j = 0; j < 60; j++) {
        result[i].push(Math.random());
      }
    }
    return result;
  }

  _getTableHeader() {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result.push(Math.random());
    }
    return result;
  }

  render() {
    return (
      <Table
        data={this._getTableData()}
        header={this._getTableHeader()}
        width={350}
        height={300}/>
    );
  }

}
