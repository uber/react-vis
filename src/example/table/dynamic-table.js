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

import Table from '../../lib/table/table';

const COLORS = [
  '#12939A',
  '#79C7E3',
  '#1A3177',
  '#FF9833',
  '#EF5D28'
];

export default class TableExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: this._getTableData(),
      tableHeader: this._getTableHeader()
    };
  }

  componentDidMount() {
    window.setInterval(
      () => this.setState({tableData: this._getTableData()}),
      5000
    );
  }

  _renderCustomTableCell(value) {
    return (
      <div
        className="custom-table-cell"
        style={{
          background: COLORS[Math.floor(Math.random() * 6)]
        }}>
        {value}
      </div>
    );
  }

  _getTableData() {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result[i] = [];
      for (let j = 0; j < 60; j++) {
        result[i].push(this._renderCustomTableCell(Math.random()));
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
        data={this.state.tableData}
        header={this.state.tableHeader}
        width={350}
        height={300}/>
    );
  }

}
