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
        _react2.default.createElement(_.VerticalGridLines, null),
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.XAxis, null),
        _react2.default.createElement(_.YAxis, null),
        _react2.default.createElement(_.LineSeries, {
          data: [{ x: 0, y: 1 }, { x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }] }),
        _react2.default.createElement(_.Hint, { value: { x: 1, y: 10 } }),
        _react2.default.createElement(
          _.Hint,
          { value: { x: 0.4, y: 14 }, orientation: 'bottomright' },
          _react2.default.createElement(
            'div',
            { className: 'custom-hint' },
            'This is a custom hint',
            _react2.default.createElement('br', null),
            'for a non-existent value'
          )
        )
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3Qvc3RhdGljLWhpbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBb0JBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTcUIsTzs7Ozs7Ozs7Ozs7NkJBQ1Y7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFLGlCQUFPLEdBRFQ7QUFFRSxrQkFBUSxHQUZWO0FBR0UsZ0VBSEY7QUFJRSxrRUFKRjtBQUtFLG9EQUxGO0FBTUUsb0RBTkY7QUFPRTtBQUNFLGdCQUFNLENBQ0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFESSxFQUVKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBRkksRUFHSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUhJLEVBSUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFKSSxDQURSLEdBUEY7QUFjRSxnREFBTSxPQUFPLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBQWIsR0FkRjtBQWVFO0FBQUE7QUFBQSxZQUFNLE9BQU8sRUFBQyxHQUFHLEdBQUosRUFBUyxHQUFHLEVBQVosRUFBYixFQUE4QixhQUFZLGFBQTFDO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQUE7QUFDdUIscURBRHZCO0FBQUE7QUFBQTtBQURGO0FBZkYsT0FERjtBQXdCRDs7OztFQTFCa0MsZ0JBQU0sUzs7a0JBQXRCLE8iLCJmaWxlIjoic3RhdGljLWhpbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgWFlQbG90LFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIFZlcnRpY2FsR3JpZExpbmVzLFxuICBIb3Jpem9udGFsR3JpZExpbmVzLFxuICBMaW5lU2VyaWVzLFxuICBIaW50fSBmcm9tICcuLi8uLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGFtcGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8WFlQbG90XG4gICAgICAgIHdpZHRoPXszMDB9XG4gICAgICAgIGhlaWdodD17MzAwfT5cbiAgICAgICAgPFZlcnRpY2FsR3JpZExpbmVzIC8+XG4gICAgICAgIDxIb3Jpem9udGFsR3JpZExpbmVzIC8+XG4gICAgICAgIDxYQXhpcyAvPlxuICAgICAgICA8WUF4aXMgLz5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICB7eDogMCwgeTogMX0sXG4gICAgICAgICAgICB7eDogMSwgeTogMTB9LFxuICAgICAgICAgICAge3g6IDIsIHk6IDV9LFxuICAgICAgICAgICAge3g6IDMsIHk6IDE1fVxuICAgICAgICAgIF19Lz5cbiAgICAgICAgPEhpbnQgdmFsdWU9e3t4OiAxLCB5OiAxMH19Lz5cbiAgICAgICAgPEhpbnQgdmFsdWU9e3t4OiAwLjQsIHk6IDE0fX0gb3JpZW50YXRpb249XCJib3R0b21yaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tLWhpbnRcIj5cbiAgICAgICAgICAgIFRoaXMgaXMgYSBjdXN0b20gaGludDxiciAvPlxuICAgICAgICAgICAgZm9yIGEgbm9uLWV4aXN0ZW50IHZhbHVlXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvSGludD5cbiAgICAgIDwvWFlQbG90PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==