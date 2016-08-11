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

var SimpleRadialChart = function (_React$Component) {
  _inherits(SimpleRadialChart, _React$Component);

  function SimpleRadialChart() {
    _classCallCheck(this, SimpleRadialChart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleRadialChart).apply(this, arguments));
  }

  _createClass(SimpleRadialChart, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_.RadialChart, {
        radiusDomain: [0, 20],
        data: [{ angle: 1, radius: 10 }, { angle: 2, radius: 20 }, { angle: 5, radius: 5 }, { angle: 3, radius: 14 }, { angle: 5, radius: 12 }],
        width: 300,
        height: 300 });
    }
  }]);

  return SimpleRadialChart;
}(_react2.default.Component);

exports.default = SimpleRadialChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3JhZGlhbC1jaGFydC9jdXN0b20tcmFkaXVzLXJhZGlhbC1jaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLGlCOzs7Ozs7Ozs7Ozs2QkFDVjtBQUNQLGFBQ0U7QUFDRSxzQkFBYyxDQUFDLENBQUQsRUFBSSxFQUFKLENBRGhCO0FBRUUsY0FBTSxDQUNKLEVBQUMsT0FBTyxDQUFSLEVBQVcsUUFBUSxFQUFuQixFQURJLEVBRUosRUFBQyxPQUFPLENBQVIsRUFBVyxRQUFRLEVBQW5CLEVBRkksRUFHSixFQUFDLE9BQU8sQ0FBUixFQUFXLFFBQVEsQ0FBbkIsRUFISSxFQUlKLEVBQUMsT0FBTyxDQUFSLEVBQVcsUUFBUSxFQUFuQixFQUpJLEVBS0osRUFBQyxPQUFPLENBQVIsRUFBVyxRQUFRLEVBQW5CLEVBTEksQ0FGUjtBQVNFLGVBQU8sR0FUVDtBQVVFLGdCQUFRLEdBVlYsR0FERjtBQWFEOzs7O0VBZjRDLGdCQUFNLFM7O2tCQUFoQyxpQiIsImZpbGUiOiJjdXN0b20tcmFkaXVzLXJhZGlhbC1jaGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7UmFkaWFsQ2hhcnR9IGZyb20gJy4uLy4uLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZVJhZGlhbENoYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8UmFkaWFsQ2hhcnRcbiAgICAgICAgcmFkaXVzRG9tYWluPXtbMCwgMjBdfVxuICAgICAgICBkYXRhPXtbXG4gICAgICAgICAge2FuZ2xlOiAxLCByYWRpdXM6IDEwfSxcbiAgICAgICAgICB7YW5nbGU6IDIsIHJhZGl1czogMjB9LFxuICAgICAgICAgIHthbmdsZTogNSwgcmFkaXVzOiA1fSxcbiAgICAgICAgICB7YW5nbGU6IDMsIHJhZGl1czogMTR9LFxuICAgICAgICAgIHthbmdsZTogNSwgcmFkaXVzOiAxMn1cbiAgICAgICAgXX1cbiAgICAgICAgd2lkdGg9ezMwMH1cbiAgICAgICAgaGVpZ2h0PXszMDB9IC8+XG4gICAgKTtcbiAgfVxufVxuIl19