'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUtils = require('../utils/react-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Uber Technologies, Inc.
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

var HEADER_REF = 'headerRef';
var DATA_REF = 'dataRef';

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  _createClass(Table, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        header: _react2.default.PropTypes.array.isRequired,
        data: _react2.default.PropTypes.array.isRequired,
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        cellHeight: _react2.default.PropTypes.number,
        cellWidth: _react2.default.PropTypes.number
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        cellHeight: 32,
        cellWidth: 100
      };
    }
  }]);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));

    _this._updateHeaderPosition = _this._updateHeaderPosition.bind(_this);
    _this._renderHeaderCell = _this._renderHeaderCell.bind(_this);
    _this._renderDataRow = _this._renderDataRow.bind(_this);
    return _this;
  }

  /**
   * Get the width of the data block.
   * @returns {number} Width in pixels.
   * @private
   */


  _createClass(Table, [{
    key: '_getDataBlockWidth',
    value: function _getDataBlockWidth() {
      var _props = this.props;
      var header = _props.header;
      var cellWidth = _props.cellWidth;

      return header.length * cellWidth;
    }

    /**
     * Get the height of the data block.
     * @returns {number} Height of the data block in pixels.
     * @private
     */

  }, {
    key: '_getDataBlockHeight',
    value: function _getDataBlockHeight() {
      var _props2 = this.props;
      var data = _props2.data;
      var cellHeight = _props2.cellHeight;

      return data.length * cellHeight;
    }

    /**
     * Render a single cell of the header.
     * @param {Object} cell Cell.
     * @param {Number} index Index of the header cell.
     * @returns {React.Component} Rendered cell.
     * @private
     */

  }, {
    key: '_renderHeaderCell',
    value: function _renderHeaderCell(cell, index) {
      var _props3 = this.props;
      var cellWidth = _props3.cellWidth;
      var cellHeight = _props3.cellHeight;

      var cellContent = void 0;
      if (cell instanceof Object) {
        cellContent = cell;
      } else {
        cellContent = _react2.default.createElement(
          'div',
          {
            className: 'rv-table__header__cell__content' },
          cell
        );
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__header__cell',
          key: index,
          style: {
            top: 0,
            left: index * cellWidth + 'px',
            width: cellWidth + 'px',
            height: cellHeight + 'px',
            lineHeight: cellHeight + 'px'
          } },
        cellContent
      );
    }

    /**
     * Render the table header.
     * @returns {*} Table header.
     * @private
     */

  }, {
    key: '_renderHeader',
    value: function _renderHeader() {
      var header = this.props.header;

      if (!header) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__header',
          ref: HEADER_REF,
          style: { width: this._getDataBlockWidth() + 'px' } },
        header.map(this._renderHeaderCell)
      );
    }

    /**
     * Set the position of the header according to the scroll position of data.
     * @private
     */

  }, {
    key: '_updateHeaderPosition',
    value: function _updateHeaderPosition() {
      var headerElement = (0, _reactUtils.getDOMNode)(this.refs[HEADER_REF]);
      var dataElement = (0, _reactUtils.getDOMNode)(this.refs[DATA_REF]);
      headerElement.style.left = -dataElement.scrollLeft + 'px';
    }

    /**
     * Render the data row.
     * @param {Array} row Row of data.
     * @param {number} rowIndex Index of the row.
     * @returns {React.Component} Rendered row.
     * @private
     */

  }, {
    key: '_renderDataRow',
    value: function _renderDataRow(row, rowIndex) {
      var _props4 = this.props;
      var cellHeight = _props4.cellHeight;
      var cellWidth = _props4.cellWidth;

      var cellIndex = 0;
      return row.map(function (cell, columnIndex) {
        var isHtml = cell instanceof Object;
        return _react2.default.createElement(
          'div',
          {
            className: 'rv-table__data__cell',
            key: cellIndex++,
            style: {
              top: rowIndex * cellHeight + 'px',
              left: columnIndex * cellWidth + 'px',
              width: cellWidth + 'px',
              height: cellHeight + 'px',
              lineHeight: cellHeight + 'px'
            } },
          isHtml ? cell : _react2.default.createElement(
            'div',
            {
              className: 'rv-table__data__cell__content' },
            cell
          )
        );
      });
    }

    /**
     * Render all the data for an array.
     * @returns {React.Component} Rendered data.
     * @private
     */

  }, {
    key: '_renderData',
    value: function _renderData() {
      var _props5 = this.props;
      var data = _props5.data;
      var cellHeight = _props5.cellHeight;


      var outerHeight = this.props.height - cellHeight;
      var outerWidth = this.props.width;
      var innerWidth = this._getDataBlockWidth();
      var innerHeight = this._getDataBlockHeight();

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__data',
          style: {
            height: outerHeight + 'px',
            width: outerWidth + 'px',
            marginTop: cellHeight + 'px'
          },
          ref: DATA_REF,
          onScroll: this._updateHeaderPosition },
        _react2.default.createElement(
          'div',
          {
            className: 'rv-table__data-inner',
            style: {
              height: innerHeight + 'px',
              width: innerWidth + 'px'
            } },
          data.map(this._renderDataRow)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var height = _props6.height;
      var width = _props6.width;

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table',
          style: {
            height: height + 'px',
            width: width + 'px'
          } },
        this._renderHeader(),
        this._renderData()
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.displayName = 'Table';

exports.default = Table;