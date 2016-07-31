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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3RhYmxlL2R5bmFtaWMtdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFNBQVMsQ0FDYixTQURhLEVBRWIsU0FGYSxFQUdiLFNBSGEsRUFJYixTQUphLEVBS2IsU0FMYSxDQUFmOztJQVFxQixZOzs7QUFFbkIsd0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGdHQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhO0FBQ1gsaUJBQVcsTUFBSyxhQUFMLEVBREE7QUFFWCxtQkFBYSxNQUFLLGVBQUw7QUFGRixLQUFiO0FBRmlCO0FBTWxCOzs7O3dDQUVtQjtBQUFBOztBQUNsQix1QkFBTyxXQUFQLENBQ0U7QUFBQSxlQUFNLE9BQUssUUFBTCxDQUFjLEVBQUMsV0FBVyxPQUFLLGFBQUwsRUFBWixFQUFkLENBQU47QUFBQSxPQURGLEVBRUUsSUFGRjtBQUlEOzs7MkNBRXNCLEssRUFBTztBQUM1QixhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFVLG1CQURaO0FBRUUsaUJBQU87QUFDTCx3QkFBWSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixDQUEzQixDQUFQO0FBRFAsV0FGVDtBQUtHO0FBTEgsT0FERjtBQVNEOzs7b0NBRWU7QUFDZCxVQUFNLFNBQVMsRUFBZjtBQUNBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxFQUFwQixFQUF3QixHQUF4QixFQUE2QjtBQUMzQixlQUFPLENBQVAsSUFBWSxFQUFaO0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEVBQXBCLEVBQXdCLEdBQXhCLEVBQTZCO0FBQzNCLGlCQUFPLENBQVAsRUFBVSxJQUFWLENBQWUsS0FBSyxzQkFBTCxDQUE0QixLQUFLLE1BQUwsRUFBNUIsQ0FBZjtBQUNEO0FBQ0Y7QUFDRCxhQUFPLE1BQVA7QUFDRDs7O3NDQUVpQjtBQUNoQixVQUFNLFNBQVMsRUFBZjtBQUNBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxFQUFwQixFQUF3QixHQUF4QixFQUE2QjtBQUMzQixlQUFPLElBQVAsQ0FBWSxLQUFLLE1BQUwsRUFBWjtBQUNEO0FBQ0QsYUFBTyxNQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFDRSxjQUFNLEtBQUssS0FBTCxDQUFXLFNBRG5CO0FBRUUsZ0JBQVEsS0FBSyxLQUFMLENBQVcsV0FGckI7QUFHRSxlQUFPLEdBSFQ7QUFJRSxnQkFBUSxHQUpWLEdBREY7QUFPRDs7OztFQXhEdUMsZ0JBQU0sUzs7a0JBQTNCLFkiLCJmaWxlIjoiZHluYW1pYy10YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vLi4vbGliL3RhYmxlL3RhYmxlJztcblxuY29uc3QgQ09MT1JTID0gW1xuICAnIzEyOTM5QScsXG4gICcjNzlDN0UzJyxcbiAgJyMxQTMxNzcnLFxuICAnI0ZGOTgzMycsXG4gICcjRUY1RDI4J1xuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVFeGFtcGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGFibGVEYXRhOiB0aGlzLl9nZXRUYWJsZURhdGEoKSxcbiAgICAgIHRhYmxlSGVhZGVyOiB0aGlzLl9nZXRUYWJsZUhlYWRlcigpXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5zZXRJbnRlcnZhbChcbiAgICAgICgpID0+IHRoaXMuc2V0U3RhdGUoe3RhYmxlRGF0YTogdGhpcy5fZ2V0VGFibGVEYXRhKCl9KSxcbiAgICAgIDUwMDBcbiAgICApO1xuICB9XG5cbiAgX3JlbmRlckN1c3RvbVRhYmxlQ2VsbCh2YWx1ZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImN1c3RvbS10YWJsZS1jZWxsXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBDT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNildXG4gICAgICAgIH19PlxuICAgICAgICB7dmFsdWV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgX2dldFRhYmxlRGF0YSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA2MDsgaisrKSB7XG4gICAgICAgIHJlc3VsdFtpXS5wdXNoKHRoaXMuX3JlbmRlckN1c3RvbVRhYmxlQ2VsbChNYXRoLnJhbmRvbSgpKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBfZ2V0VGFibGVIZWFkZXIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSsrKSB7XG4gICAgICByZXN1bHQucHVzaChNYXRoLnJhbmRvbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFRhYmxlXG4gICAgICAgIGRhdGE9e3RoaXMuc3RhdGUudGFibGVEYXRhfVxuICAgICAgICBoZWFkZXI9e3RoaXMuc3RhdGUudGFibGVIZWFkZXJ9XG4gICAgICAgIHdpZHRoPXszNTB9XG4gICAgICAgIGhlaWdodD17MzAwfS8+XG4gICAgKTtcbiAgfVxuXG59XG4iXX0=