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

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _.XYPlot,
        {
          width: 300,
          height: 300 },
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.VerticalGridLines, null),
        _react2.default.createElement(_.XAxis, { title: 'X Axis' }),
        _react2.default.createElement(_.YAxis, { title: 'Y Axis' }),
        _react2.default.createElement(_.LineSeries, {
          data: [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }] }),
        _react2.default.createElement(_.LineSeries, {
          data: null }),
        _react2.default.createElement(_.LineSeries, {
          interpolation: 'monotoneX',
          data: [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }] })
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3QvbGluZS1jaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCLE87Ozs7Ozs7Ozs7OzZCQUNWO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRSxpQkFBTyxHQURUO0FBRUUsa0JBQVEsR0FGVjtBQUdFLGtFQUhGO0FBSUUsZ0VBSkY7QUFLRSxpREFBTyxPQUFNLFFBQWIsR0FMRjtBQU1FLGlEQUFPLE9BQU0sUUFBYixHQU5GO0FBT0U7QUFDRSxnQkFBTSxDQUNKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBREksRUFFSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUZJLEVBR0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFISSxFQUlKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBSkksQ0FEUixHQVBGO0FBY0U7QUFDRSxnQkFBTSxJQURSLEdBZEY7QUFnQkU7QUFDRSx5QkFBYyxXQURoQjtBQUVFLGdCQUFNLENBQ0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFESSxFQUVKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBRkksRUFHSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUhJLEVBSUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFKSSxDQUZSO0FBaEJGLE9BREY7QUEyQkQ7Ozs7RUE3QmtDLGdCQUFNLFM7O2tCQUF0QixPIiwiZmlsZSI6ImxpbmUtY2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBYWVBsb3QsXG4gIFhBeGlzLFxuICBZQXhpcyxcbiAgSG9yaXpvbnRhbEdyaWRMaW5lcyxcbiAgVmVydGljYWxHcmlkTGluZXMsXG4gIExpbmVTZXJpZXN9IGZyb20gJy4uLy4uLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxYWVBsb3RcbiAgICAgICAgd2lkdGg9ezMwMH1cbiAgICAgICAgaGVpZ2h0PXszMDB9PlxuICAgICAgICA8SG9yaXpvbnRhbEdyaWRMaW5lcyAvPlxuICAgICAgICA8VmVydGljYWxHcmlkTGluZXMgLz5cbiAgICAgICAgPFhBeGlzIHRpdGxlPVwiWCBBeGlzXCIgLz5cbiAgICAgICAgPFlBeGlzIHRpdGxlPVwiWSBBeGlzXCIgLz5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICB7eDogMSwgeTogM30sXG4gICAgICAgICAgICB7eDogMiwgeTogNX0sXG4gICAgICAgICAgICB7eDogMywgeTogMTV9LFxuICAgICAgICAgICAge3g6IDQsIHk6IDEyfVxuICAgICAgICAgIF19Lz5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBkYXRhPXtudWxsfS8+XG4gICAgICAgIDxMaW5lU2VyaWVzXG4gICAgICAgICAgaW50ZXJwb2xhdGlvbj1cIm1vbm90b25lWFwiXG4gICAgICAgICAgZGF0YT17W1xuICAgICAgICAgICAge3g6IDEsIHk6IDEwfSxcbiAgICAgICAgICAgIHt4OiAyLCB5OiA0fSxcbiAgICAgICAgICAgIHt4OiAzLCB5OiAyfSxcbiAgICAgICAgICAgIHt4OiA0LCB5OiAxNX1cbiAgICAgICAgICBdfS8+XG4gICAgICA8L1hZUGxvdD5cbiAgICApO1xuICB9XG59XG4iXX0=