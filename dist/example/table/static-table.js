'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../../');

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

var TableExample = function (_React$Component) {
  _inherits(TableExample, _React$Component);

  function TableExample() {
    _classCallCheck(this, TableExample);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TableExample).apply(this, arguments));
  }

  _createClass(TableExample, [{
    key: '_getTableData',
    value: function _getTableData() {
      var result = [];
      for (var i = 0; i < 60; i++) {
        result[i] = [];
        for (var j = 0; j < 60; j++) {
          result[i].push(Math.random());
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
      return _react2.default.createElement(_.Table, {
        data: this._getTableData(),
        header: this._getTableHeader(),
        width: 350,
        height: 300 });
    }
  }]);

  return TableExample;
}(_react2.default.Component);

exports.default = TableExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3RhYmxlL3N0YXRpYy10YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLFk7Ozs7Ozs7Ozs7O29DQUVIO0FBQ2QsVUFBTSxTQUFTLEVBQWY7QUFDQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsZUFBTyxDQUFQLElBQVksRUFBWjtBQUNBLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxFQUFwQixFQUF3QixHQUF4QixFQUE2QjtBQUMzQixpQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLEtBQUssTUFBTCxFQUFmO0FBQ0Q7QUFDRjtBQUNELGFBQU8sTUFBUDtBQUNEOzs7c0NBRWlCO0FBQ2hCLFVBQU0sU0FBUyxFQUFmO0FBQ0EsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEVBQXBCLEVBQXdCLEdBQXhCLEVBQTZCO0FBQzNCLGVBQU8sSUFBUCxDQUFZLEtBQUssTUFBTCxFQUFaO0FBQ0Q7QUFDRCxhQUFPLE1BQVA7QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUNFLGNBQU0sS0FBSyxhQUFMLEVBRFI7QUFFRSxnQkFBUSxLQUFLLGVBQUwsRUFGVjtBQUdFLGVBQU8sR0FIVDtBQUlFLGdCQUFRLEdBSlYsR0FERjtBQU9EOzs7O0VBN0J1QyxnQkFBTSxTOztrQkFBM0IsWSIsImZpbGUiOiJzdGF0aWMtdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1RhYmxlfSBmcm9tICcuLi8uLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZUV4YW1wbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIF9nZXRUYWJsZURhdGEoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNjA7IGorKykge1xuICAgICAgICByZXN1bHRbaV0ucHVzaChNYXRoLnJhbmRvbSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIF9nZXRUYWJsZUhlYWRlcigpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpKyspIHtcbiAgICAgIHJlc3VsdC5wdXNoKE1hdGgucmFuZG9tKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VGFibGVcbiAgICAgICAgZGF0YT17dGhpcy5fZ2V0VGFibGVEYXRhKCl9XG4gICAgICAgIGhlYWRlcj17dGhpcy5fZ2V0VGFibGVIZWFkZXIoKX1cbiAgICAgICAgd2lkdGg9ezM1MH1cbiAgICAgICAgaGVpZ2h0PXszMDB9Lz5cbiAgICApO1xuICB9XG5cbn1cbiJdfQ==