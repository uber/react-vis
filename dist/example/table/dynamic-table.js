'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _table = require('../../lib/table/table');

var _table2 = _interopRequireDefault(_table);

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

var COLORS = ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'];

var TableExample = function (_React$Component) {
  _inherits(TableExample, _React$Component);

  function TableExample(props) {
    _classCallCheck(this, TableExample);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableExample).call(this, props));

    _this.state = {
      tableData: _this._getTableData(),
      tableHeader: _this._getTableHeader()
    };
    return _this;
  }

  _createClass(TableExample, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _window2.default.setInterval(function () {
        return _this2.setState({ tableData: _this2._getTableData() });
      }, 5000);
    }
  }, {
    key: '_renderCustomTableCell',
    value: function _renderCustomTableCell(value) {
      return _react2.default.createElement(
        'div',
        {
          className: 'custom-table-cell',
          style: {
            background: COLORS[Math.floor(Math.random() * 6)]
          } },
        value
      );
    }
  }, {
    key: '_getTableData',
    value: function _getTableData() {
      var result = [];
      for (var i = 0; i < 60; i++) {
        result[i] = [];
        for (var j = 0; j < 60; j++) {
          result[i].push(this._renderCustomTableCell(Math.random()));
        }
      }
      return result;
    }
  }, {
    key: '_getTableHeader',
    value: function _getTableHeader() {
      var result = [];
      for (var i = 0; i < 60; i++) {
        result.push(Math.random());
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_table2.default, {
        data: this.state.tableData,
        header: this.state.tableHeader,
        width: 350,
        height: 300 });
    }
  }]);

  return TableExample;
}(_react2.default.Component);

exports.default = TableExample;