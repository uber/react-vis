'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _barSeries = require('./bar-series');

var _barSeries2 = _interopRequireDefault(_barSeries);

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

var HorizontalBarSeries = function (_AbstractSeries) {
  _inherits(HorizontalBarSeries, _AbstractSeries);

  function HorizontalBarSeries() {
    _classCallCheck(this, HorizontalBarSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HorizontalBarSeries).apply(this, arguments));
  }

  _createClass(HorizontalBarSeries, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_barSeries2.default, _extends({}, this.props, {
        linePosAttr: 'y',
        valuePosAttr: 'x',
        lineSizeAttr: 'height',
        valueSizeAttr: 'width'
      }));
    }
  }], [{
    key: 'getParentConfig',
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === 'y';
      var zeroBaseValue = attr === 'x';
      return {
        isDomainAdjustmentNeeded: isDomainAdjustmentNeeded,
        zeroBaseValue: zeroBaseValue
      };
    }
  }]);

  return HorizontalBarSeries;
}(_abstractSeries2.default);

HorizontalBarSeries.displayName = 'HorizontalBarSeries';

exports.default = HorizontalBarSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvaG9yaXpvbnRhbC1iYXItc2VyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxtQjs7Ozs7Ozs7Ozs7NkJBV0s7QUFDUCxhQUNFLGdFQUNNLEtBQUssS0FEWDtBQUVFLHFCQUFZLEdBRmQ7QUFHRSxzQkFBYSxHQUhmO0FBSUUsc0JBQWEsUUFKZjtBQUtFLHVCQUFjO0FBTGhCLFNBREY7QUFTRDs7O29DQW5Cc0IsSSxFQUFNO0FBQzNCLFVBQU0sMkJBQTJCLFNBQVMsR0FBMUM7QUFDQSxVQUFNLGdCQUFnQixTQUFTLEdBQS9CO0FBQ0EsYUFBTztBQUNMLDBEQURLO0FBRUw7QUFGSyxPQUFQO0FBSUQ7Ozs7OztBQWVILG9CQUFvQixXQUFwQixHQUFrQyxxQkFBbEM7O2tCQUVlLG1CIiwiZmlsZSI6Imhvcml6b250YWwtYmFyLXNlcmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuL2Fic3RyYWN0LXNlcmllcyc7XG5pbXBvcnQgQmFyU2VyaWVzIGZyb20gJy4vYmFyLXNlcmllcyc7XG5cbmNsYXNzIEhvcml6b250YWxCYXJTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldFBhcmVudENvbmZpZyhhdHRyKSB7XG4gICAgY29uc3QgaXNEb21haW5BZGp1c3RtZW50TmVlZGVkID0gYXR0ciA9PT0gJ3knO1xuICAgIGNvbnN0IHplcm9CYXNlVmFsdWUgPSBhdHRyID09PSAneCc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRG9tYWluQWRqdXN0bWVudE5lZWRlZCxcbiAgICAgIHplcm9CYXNlVmFsdWVcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFyU2VyaWVzXG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICBsaW5lUG9zQXR0cj1cInlcIlxuICAgICAgICB2YWx1ZVBvc0F0dHI9XCJ4XCJcbiAgICAgICAgbGluZVNpemVBdHRyPVwiaGVpZ2h0XCJcbiAgICAgICAgdmFsdWVTaXplQXR0cj1cIndpZHRoXCJcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5Ib3Jpem9udGFsQmFyU2VyaWVzLmRpc3BsYXlOYW1lID0gJ0hvcml6b250YWxCYXJTZXJpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBIb3Jpem9udGFsQmFyU2VyaWVzO1xuIl19