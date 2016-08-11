'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _lineSeries = require('./line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _markSeries = require('./mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

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

var LineMarkSeries = function (_AbstractSeries) {
  _inherits(LineMarkSeries, _AbstractSeries);

  function LineMarkSeries() {
    _classCallCheck(this, LineMarkSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LineMarkSeries).apply(this, arguments));
  }

  _createClass(LineMarkSeries, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        { className: 'rv-xy-plot__series rv-xy-plot__series--linemark' },
        _react2.default.createElement(_lineSeries2.default, this.props),
        _react2.default.createElement(_markSeries2.default, this.props)
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return _lineSeries2.default.defaultProps;
    }
  }]);

  return LineMarkSeries;
}(_abstractSeries2.default);

LineMarkSeries.displayName = 'LineMarkSeries';

exports.default = LineMarkSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvbGluZS1tYXJrLXNlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sYzs7Ozs7Ozs7Ozs7NkJBTUs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFHLFdBQVUsaURBQWI7QUFDRSw0REFBZ0IsS0FBSyxLQUFyQixDQURGO0FBRUUsNERBQWdCLEtBQUssS0FBckI7QUFGRixPQURGO0FBTUQ7Ozt3QkFYeUI7QUFDeEIsYUFBTyxxQkFBVyxZQUFsQjtBQUNEOzs7Ozs7QUFZSCxlQUFlLFdBQWYsR0FBNkIsZ0JBQTdCOztrQkFFZSxjIiwiZmlsZSI6ImxpbmUtbWFyay1zZXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQWJzdHJhY3RTZXJpZXMgZnJvbSAnLi9hYnN0cmFjdC1zZXJpZXMnO1xuaW1wb3J0IExpbmVTZXJpZXMgZnJvbSAnLi9saW5lLXNlcmllcyc7XG5pbXBvcnQgTWFya1NlcmllcyBmcm9tICcuL21hcmstc2VyaWVzJztcblxuY2xhc3MgTGluZU1hcmtTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIExpbmVTZXJpZXMuZGVmYXVsdFByb3BzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZyBjbGFzc05hbWU9XCJydi14eS1wbG90X19zZXJpZXMgcnYteHktcGxvdF9fc2VyaWVzLS1saW5lbWFya1wiPlxuICAgICAgICA8TGluZVNlcmllcyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgPE1hcmtTZXJpZXMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICA8L2c+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lTWFya1Nlcmllcy5kaXNwbGF5TmFtZSA9ICdMaW5lTWFya1Nlcmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVNYXJrU2VyaWVzO1xuXG4iXX0=