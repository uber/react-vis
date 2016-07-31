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

var VerticalBarSeries = function (_AbstractSeries) {
  _inherits(VerticalBarSeries, _AbstractSeries);

  function VerticalBarSeries() {
    _classCallCheck(this, VerticalBarSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VerticalBarSeries).apply(this, arguments));
  }

  _createClass(VerticalBarSeries, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_barSeries2.default, _extends({}, this.props, {
        linePosAttr: 'x',
        valuePosAttr: 'y',
        lineSizeAttr: 'width',
        valueSizeAttr: 'height'
      }));
    }
  }], [{
    key: 'getParentConfig',
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === 'x';
      var zeroBaseValue = attr === 'y';
      return {
        isDomainAdjustmentNeeded: isDomainAdjustmentNeeded,
        zeroBaseValue: zeroBaseValue
      };
    }
  }]);

  return VerticalBarSeries;
}(_abstractSeries2.default);

VerticalBarSeries.displayName = 'VerticalBarSeries';

exports.default = VerticalBarSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvdmVydGljYWwtYmFyLXNlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBb0JBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0saUI7Ozs7Ozs7Ozs7OzZCQVdLO0FBQ1AsYUFDRSxnRUFDTSxLQUFLLEtBRFg7QUFFRSxxQkFBWSxHQUZkO0FBR0Usc0JBQWEsR0FIZjtBQUlFLHNCQUFhLE9BSmY7QUFLRSx1QkFBYztBQUxoQixTQURGO0FBU0Q7OztvQ0FuQnNCLEksRUFBTTtBQUMzQixVQUFNLDJCQUEyQixTQUFTLEdBQTFDO0FBQ0EsVUFBTSxnQkFBZ0IsU0FBUyxHQUEvQjtBQUNBLGFBQU87QUFDTCwwREFESztBQUVMO0FBRkssT0FBUDtBQUlEOzs7Ozs7QUFlSCxrQkFBa0IsV0FBbEIsR0FBZ0MsbUJBQWhDOztrQkFFZSxpQiIsImZpbGUiOiJ2ZXJ0aWNhbC1iYXItc2VyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEFic3RyYWN0U2VyaWVzIGZyb20gJy4vYWJzdHJhY3Qtc2VyaWVzJztcbmltcG9ydCBCYXJTZXJpZXMgZnJvbSAnLi9iYXItc2VyaWVzJztcblxuY2xhc3MgVmVydGljYWxCYXJTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldFBhcmVudENvbmZpZyhhdHRyKSB7XG4gICAgY29uc3QgaXNEb21haW5BZGp1c3RtZW50TmVlZGVkID0gYXR0ciA9PT0gJ3gnO1xuICAgIGNvbnN0IHplcm9CYXNlVmFsdWUgPSBhdHRyID09PSAneSc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRG9tYWluQWRqdXN0bWVudE5lZWRlZCxcbiAgICAgIHplcm9CYXNlVmFsdWVcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFyU2VyaWVzXG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICBsaW5lUG9zQXR0cj1cInhcIlxuICAgICAgICB2YWx1ZVBvc0F0dHI9XCJ5XCJcbiAgICAgICAgbGluZVNpemVBdHRyPVwid2lkdGhcIlxuICAgICAgICB2YWx1ZVNpemVBdHRyPVwiaGVpZ2h0XCJcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5WZXJ0aWNhbEJhclNlcmllcy5kaXNwbGF5TmFtZSA9ICdWZXJ0aWNhbEJhclNlcmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFZlcnRpY2FsQmFyU2VyaWVzO1xuIl19