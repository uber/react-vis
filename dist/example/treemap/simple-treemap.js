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

var SimpleTreemapExample = function (_React$Component) {
  _inherits(SimpleTreemapExample, _React$Component);

  function SimpleTreemapExample() {
    _classCallCheck(this, SimpleTreemapExample);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTreemapExample).apply(this, arguments));
  }

  _createClass(SimpleTreemapExample, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_.Treemap, {
        data: {
          title: '',
          children: [{
            title: 'China',
            size: 1357
          }, {
            title: 'India',
            size: 1252
          }, {
            title: 'USA',
            size: 321
          }, {
            title: 'Indonesia',
            size: 249.9
          }, {
            title: 'Brasil',
            size: 200.4
          }, {
            title: 'Pakistan',
            size: 192
          }, {
            title: 'Nigeria',
            size: 173.6
          }]
        },
        height: 300,
        width: 350 });
    }
  }]);

  return SimpleTreemapExample;
}(_react2.default.Component);

exports.default = SimpleTreemapExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3RyZWVtYXAvc2ltcGxlLXRyZWVtYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQixvQjs7Ozs7Ozs7Ozs7NkJBRVY7QUFDUCxhQUNFO0FBQ0UsY0FBTTtBQUNKLGlCQUFPLEVBREg7QUFFSixvQkFBVSxDQUNSO0FBQ0UsbUJBQU8sT0FEVDtBQUVFLGtCQUFNO0FBRlIsV0FEUSxFQUtSO0FBQ0UsbUJBQU8sT0FEVDtBQUVFLGtCQUFNO0FBRlIsV0FMUSxFQVNSO0FBQ0UsbUJBQU8sS0FEVDtBQUVFLGtCQUFNO0FBRlIsV0FUUSxFQWFSO0FBQ0UsbUJBQU8sV0FEVDtBQUVFLGtCQUFNO0FBRlIsV0FiUSxFQWlCUjtBQUNFLG1CQUFPLFFBRFQ7QUFFRSxrQkFBTTtBQUZSLFdBakJRLEVBcUJSO0FBQ0UsbUJBQU8sVUFEVDtBQUVFLGtCQUFNO0FBRlIsV0FyQlEsRUF5QlI7QUFDRSxtQkFBTyxTQURUO0FBRUUsa0JBQU07QUFGUixXQXpCUTtBQUZOLFNBRFI7QUFrQ0UsZ0JBQVEsR0FsQ1Y7QUFtQ0UsZUFBTyxHQW5DVCxHQURGO0FBc0NEOzs7O0VBekMrQyxnQkFBTSxTOztrQkFBbkMsb0IiLCJmaWxlIjoic2ltcGxlLXRyZWVtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1RyZWVtYXB9IGZyb20gJy4uLy4uLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZVRyZWVtYXBFeGFtcGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUcmVlbWFwXG4gICAgICAgIGRhdGE9e3tcbiAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdDaGluYScsXG4gICAgICAgICAgICAgIHNpemU6IDEzNTdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnSW5kaWEnLFxuICAgICAgICAgICAgICBzaXplOiAxMjUyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aXRsZTogJ1VTQScsXG4gICAgICAgICAgICAgIHNpemU6IDMyMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdJbmRvbmVzaWEnLFxuICAgICAgICAgICAgICBzaXplOiAyNDkuOVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdCcmFzaWwnLFxuICAgICAgICAgICAgICBzaXplOiAyMDAuNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdQYWtpc3RhbicsXG4gICAgICAgICAgICAgIHNpemU6IDE5MlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdOaWdlcmlhJyxcbiAgICAgICAgICAgICAgc2l6ZTogMTczLjZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH19XG4gICAgICAgIGhlaWdodD17MzAwfVxuICAgICAgICB3aWR0aD17MzUwfS8+XG4gICAgKTtcbiAgfVxuXG59XG4iXX0=