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

import {getDOMNode} from '../utils/react-utils';

const HEADER_REF = 'headerRef';
const DATA_REF = 'dataRef';

export default class Table extends React.Component {

  static get displayName() {
    return 'Table';
  }

  static get propTypes() {
    return {
      header: React.PropTypes.array.isRequired,
      data: React.PropTypes.array.isRequired,
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      cellHeight: React.PropTypes.number,
      cellWidth: React.PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      cellHeight: 32,
      cellWidth: 100
    };
  }

  constructor(props) {
    super(props);
    this._updateHeaderPosition = this._updateHeaderPosition.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
    this._renderDataRow = this._renderDataRow.bind(this);
  }

  /**
   * Get the width of the data block.
   * @returns {number} Width in pixels.
   * @private
   */
  _getDataBlockWidth() {
    const {header, cellWidth} = this.props;
    return header.length * cellWidth;
  }

  /**
   * Get the height of the data block.
   * @returns {number} Height of the data block in pixels.
   * @private
   */
  _getDataBlockHeight() {
    const {data, cellHeight} = this.props;
    return data.length * cellHeight;
  }

  /**
   * Render a single cell of the header.
   * @param {Object} cell Cell.
   * @param {Number} index Index of the header cell.
   * @returns {React.Component} Rendered cell.
   * @private
   */
  _renderHeaderCell(cell, index) {
    const {cellWidth, cellHeight} = this.props;
    let cellContent;
    if (cell instanceof Object) {
      cellContent = cell;
    } else {
      cellContent = (
        <div
          className="rv-table__header__cell__content">
          {cell}
        </div>
      );
    }
    return (
      <div
        className="rv-table__header__cell"
        key={index}
        style={{
          top: 0,
          left: `${index * cellWidth}px`,
          width: `${cellWidth}px`,
          height: `${cellHeight}px`,
          lineHeight: `${cellHeight}px`
        }}>
        {cellContent}
      </div>
    );
  }

  /**
   * Render the table header.
   * @returns {*} Table header.
   * @private
   */
  _renderHeader() {
    const {header} = this.props;
    if (!header) {
      return null;
    }
    return (
      <div
        className="rv-table__header"
        ref={HEADER_REF}
        style={{width: `${this._getDataBlockWidth()}px`}}>
        {header.map(this._renderHeaderCell)}
      </div>
    );
  }

  /**
   * Set the position of the header according to the scroll position of data.
   * @private
   */
  _updateHeaderPosition() {
    const headerElement = getDOMNode(this.refs[HEADER_REF]);
    const dataElement = getDOMNode(this.refs[DATA_REF]);
    headerElement.style.left = `${-dataElement.scrollLeft}px`;
  }

  /**
   * Render the data row.
   * @param {Array} row Row of data.
   * @param {number} rowIndex Index of the row.
   * @returns {React.Component} Rendered row.
   * @private
   */
  _renderDataRow(row, rowIndex) {
    const {cellHeight, cellWidth} = this.props;
    let cellIndex = 0;
    return row.map((cell, columnIndex) => {
      const isHtml = cell instanceof Object;
      return (
        <div
          className="rv-table__data__cell"
          key={cellIndex++}
          style={{
            top: `${rowIndex * cellHeight}px`,
            left: `${columnIndex * cellWidth}px`,
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
            lineHeight: `${cellHeight}px`
          }}>
          {isHtml ?
            cell :
            <div
              className="rv-table__data__cell__content">
              {cell}
            </div>
          }
        </div>
      );
    });
  }

  /**
   * Render all the data for an array.
   * @returns {React.Component} Rendered data.
   * @private
   */
  _renderData() {
    const {data, cellHeight} = this.props;

    const outerHeight = this.props.height - cellHeight;
    const outerWidth = this.props.width;
    const innerWidth = this._getDataBlockWidth();
    const innerHeight = this._getDataBlockHeight();

    return (
      <div
        className="rv-table__data"
        style={{
          height: `${outerHeight}px`,
          width: `${outerWidth}px`,
          marginTop: `${cellHeight}px`
        }}
        ref={DATA_REF}
        onScroll={this._updateHeaderPosition}>
        <div
          className="rv-table__data-inner"
          style={{
            height: `${innerHeight}px`,
            width: `${innerWidth}px`
          }}>
          {data.map(this._renderDataRow)}
        </div>
      </div>
    );
  }

  render() {
    const {height, width} = this.props;
    return (
      <div
        className="rv-table"
        style={{
          height: `${height}px`,
          width: `${width}px`
        }}>
        {this._renderHeader()}
        {this._renderData()}
      </div>
    );
  }
}
