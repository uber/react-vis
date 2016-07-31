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
          xType: 'linear',
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
          data: [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 15 }] })
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3QvY3VzdG9tLXNjYWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCLE87Ozs7Ozs7Ozs7OzZCQUNWO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRSxpQkFBTSxRQURSO0FBRUUsaUJBQU8sR0FGVDtBQUdFLGtCQUFRLEdBSFY7QUFJRSxrRUFKRjtBQUtFLGdFQUxGO0FBTUUsaURBQU8sT0FBTSxRQUFiLEdBTkY7QUFPRSxpREFBTyxPQUFNLFFBQWIsR0FQRjtBQVFFO0FBQ0UsZ0JBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBSEksRUFJSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQUpJLENBRFIsR0FSRjtBQWVFO0FBQ0UsZ0JBQU0sSUFEUixHQWZGO0FBaUJFO0FBQ0UsZ0JBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBSEksRUFJSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQUpJLENBRFI7QUFqQkYsT0FERjtBQTJCRDs7OztFQTdCa0MsZ0JBQU0sUzs7a0JBQXRCLE8iLCJmaWxlIjoiY3VzdG9tLXNjYWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIFhZUGxvdCxcbiAgWEF4aXMsXG4gIFlBeGlzLFxuICBIb3Jpem9udGFsR3JpZExpbmVzLFxuICBWZXJ0aWNhbEdyaWRMaW5lcyxcbiAgTGluZVNlcmllc30gZnJvbSAnLi4vLi4vJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFhZUGxvdFxuICAgICAgICB4VHlwZT1cImxpbmVhclwiXG4gICAgICAgIHdpZHRoPXszMDB9XG4gICAgICAgIGhlaWdodD17MzAwfT5cbiAgICAgICAgPEhvcml6b250YWxHcmlkTGluZXMgLz5cbiAgICAgICAgPFZlcnRpY2FsR3JpZExpbmVzIC8+XG4gICAgICAgIDxYQXhpcyB0aXRsZT1cIlggQXhpc1wiIC8+XG4gICAgICAgIDxZQXhpcyB0aXRsZT1cIlkgQXhpc1wiIC8+XG4gICAgICAgIDxMaW5lU2VyaWVzXG4gICAgICAgICAgZGF0YT17W1xuICAgICAgICAgICAge3g6IDEsIHk6IDN9LFxuICAgICAgICAgICAge3g6IDIsIHk6IDV9LFxuICAgICAgICAgICAge3g6IDMsIHk6IDE1fSxcbiAgICAgICAgICAgIHt4OiA0LCB5OiAxMn1cbiAgICAgICAgICBdfS8+XG4gICAgICAgIDxMaW5lU2VyaWVzXG4gICAgICAgICAgZGF0YT17bnVsbH0vPlxuICAgICAgICA8TGluZVNlcmllc1xuICAgICAgICAgIGRhdGE9e1tcbiAgICAgICAgICAgIHt4OiAxLCB5OiAxMH0sXG4gICAgICAgICAgICB7eDogMiwgeTogNH0sXG4gICAgICAgICAgICB7eDogNCwgeTogMn0sXG4gICAgICAgICAgICB7eDogNSwgeTogMTV9XG4gICAgICAgICAgXX0vPlxuICAgICAgPC9YWVBsb3Q+XG4gICAgKTtcbiAgfVxufVxuIl19