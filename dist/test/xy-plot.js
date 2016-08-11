'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _verticalBarSeries = require('../lib/plot/series/vertical-bar-series');

var _verticalBarSeries2 = _interopRequireDefault(_verticalBarSeries);

var _xAxis = require('../lib/plot/x-axis');

var _xAxis2 = _interopRequireDefault(_xAxis);

var _xyPlot = require('../lib/plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2016 Uber Technologies, Inc.
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

(0, _tape2.default)('Render a stacked bar chart', function (assert) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _xyPlot2.default,
    { width: 300, height: 300, stackBy: 'y' },
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }]
    }),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 0 }] })
  ));

  var renderedVerticalBarsWrapper = wrapper.find(_verticalBarSeries2.default);

  assert.deepEqual(renderedVerticalBarsWrapper.at(0).prop('data'), [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }], 'First bar series data is the same');

  assert.deepEqual(renderedVerticalBarsWrapper.at(1).prop('data'), [{ x: 1, y: 2, y0: 0 }, { x: 2, y: 2, y0: 1 }, { x: 3, y: 2, y0: 2 }], 'Second bar series data contains y0 values');

  assert.end();
});

(0, _tape2.default)('Render a stacked bar chart with other children', function (assert) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _xyPlot2.default,
    { width: 300, height: 300, stackBy: 'y' },
    _react2.default.createElement(_xAxis2.default, null),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 0 }]
    }),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 2 }] }),
    _react2.default.createElement('div', null)
  ));

  var renderedVerticalBarsWrapper = wrapper.find(_verticalBarSeries2.default);

  assert.deepEqual(renderedVerticalBarsWrapper.at(0).prop('data'), [{ x: 1, y: 0 }], 'First bar series data is the same');

  assert.deepEqual(renderedVerticalBarsWrapper.at(1).prop('data'), [{ x: 1, y: 2, y0: 0 }], 'Second bar series data contains y0 values');

  assert.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L3h5LXBsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxvQkFBSyw0QkFBTCxFQUFtQyxrQkFBVTtBQUMzQyxNQUFNLFVBQVUscUJBQ2Q7QUFBQTtBQUFBLE1BQVEsT0FBTyxHQUFmLEVBQW9CLFFBQVEsR0FBNUIsRUFBaUMsU0FBUSxHQUF6QztBQUNFO0FBQ0UsWUFBTSxDQUNKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBREksRUFFSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUZJLEVBR0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFISTtBQURSLE1BREY7QUFRRTtBQUNFLFlBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBSEksQ0FEUjtBQVJGLEdBRGMsQ0FBaEI7O0FBa0JBLE1BQU0sOEJBQ0osUUFBUSxJQUFSLDZCQURGOztBQUdBLFNBQU8sU0FBUCxDQUNFLDRCQUE0QixFQUE1QixDQUErQixDQUEvQixFQUFrQyxJQUFsQyxDQUF1QyxNQUF2QyxDQURGLEVBRUUsQ0FDRSxFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQURGLEVBRUUsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGRixFQUdFLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBSEYsQ0FGRixFQU9FLG1DQVBGOztBQVVBLFNBQU8sU0FBUCxDQUNFLDRCQUE0QixFQUE1QixDQUErQixDQUEvQixFQUFrQyxJQUFsQyxDQUF1QyxNQUF2QyxDQURGLEVBRUUsQ0FDRSxFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUFhLElBQUksQ0FBakIsRUFERixFQUVFLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBQWEsSUFBSSxDQUFqQixFQUZGLEVBR0UsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFBYSxJQUFJLENBQWpCLEVBSEYsQ0FGRixFQU9FLDJDQVBGOztBQVVBLFNBQU8sR0FBUDtBQUNELENBM0NEOztBQTZDQSxvQkFBSyxnREFBTCxFQUF1RCxrQkFBVTtBQUMvRCxNQUFNLFVBQVUscUJBQ2Q7QUFBQTtBQUFBLE1BQVEsT0FBTyxHQUFmLEVBQW9CLFFBQVEsR0FBNUIsRUFBaUMsU0FBUSxHQUF6QztBQUNFLHdEQURGO0FBRUU7QUFDRSxZQUFNLENBQ0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFESTtBQURSLE1BRkY7QUFPRTtBQUNFLFlBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQURJLENBRFIsR0FQRjtBQWdCRTtBQWhCRixHQURjLENBQWhCOztBQXFCQSxNQUFNLDhCQUNKLFFBQVEsSUFBUiw2QkFERjs7QUFHQSxTQUFPLFNBQVAsQ0FDRSw0QkFBNEIsRUFBNUIsQ0FBK0IsQ0FBL0IsRUFBa0MsSUFBbEMsQ0FBdUMsTUFBdkMsQ0FERixFQUVFLENBQ0UsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFERixDQUZGLEVBS0UsbUNBTEY7O0FBUUEsU0FBTyxTQUFQLENBQ0UsNEJBQTRCLEVBQTVCLENBQStCLENBQS9CLEVBQWtDLElBQWxDLENBQXVDLE1BQXZDLENBREYsRUFFRSxDQUNFLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBQWEsSUFBSSxDQUFqQixFQURGLENBRkYsRUFLRSwyQ0FMRjs7QUFRQSxTQUFPLEdBQVA7QUFDRCxDQTFDRCIsImZpbGUiOiJ4eS1wbG90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHRlc3QgZnJvbSAndGFwZSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtzaGFsbG93fSBmcm9tICdlbnp5bWUnO1xuaW1wb3J0IFZlcnRpY2FsQmFyU2VyaWVzIGZyb20gJy4uL2xpYi9wbG90L3Nlcmllcy92ZXJ0aWNhbC1iYXItc2VyaWVzJztcbmltcG9ydCBYQXhpcyBmcm9tICcuLi9saWIvcGxvdC94LWF4aXMnO1xuaW1wb3J0IFhZUGxvdCBmcm9tICcuLi9saWIvcGxvdC94eS1wbG90JztcblxudGVzdCgnUmVuZGVyIGEgc3RhY2tlZCBiYXIgY2hhcnQnLCBhc3NlcnQgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdyhcbiAgICA8WFlQbG90IHdpZHRoPXszMDB9IGhlaWdodD17MzAwfSBzdGFja0J5PVwieVwiPlxuICAgICAgPFZlcnRpY2FsQmFyU2VyaWVzXG4gICAgICAgIGRhdGE9e1tcbiAgICAgICAgICB7eDogMSwgeTogMH0sXG4gICAgICAgICAge3g6IDIsIHk6IDF9LFxuICAgICAgICAgIHt4OiAzLCB5OiAyfVxuICAgICAgICBdfVxuICAgICAgLz5cbiAgICAgIDxWZXJ0aWNhbEJhclNlcmllc1xuICAgICAgICBkYXRhPXtbXG4gICAgICAgICAge3g6IDEsIHk6IDJ9LFxuICAgICAgICAgIHt4OiAyLCB5OiAxfSxcbiAgICAgICAgICB7eDogMywgeTogMH1cbiAgICAgICAgXX0vPlxuICAgIDwvWFlQbG90PlxuICApO1xuXG4gIGNvbnN0IHJlbmRlcmVkVmVydGljYWxCYXJzV3JhcHBlciA9XG4gICAgd3JhcHBlci5maW5kKFZlcnRpY2FsQmFyU2VyaWVzKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIHJlbmRlcmVkVmVydGljYWxCYXJzV3JhcHBlci5hdCgwKS5wcm9wKCdkYXRhJyksXG4gICAgW1xuICAgICAge3g6IDEsIHk6IDB9LFxuICAgICAge3g6IDIsIHk6IDF9LFxuICAgICAge3g6IDMsIHk6IDJ9XG4gICAgXSxcbiAgICAnRmlyc3QgYmFyIHNlcmllcyBkYXRhIGlzIHRoZSBzYW1lJ1xuICApO1xuXG4gIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgcmVuZGVyZWRWZXJ0aWNhbEJhcnNXcmFwcGVyLmF0KDEpLnByb3AoJ2RhdGEnKSxcbiAgICBbXG4gICAgICB7eDogMSwgeTogMiwgeTA6IDB9LFxuICAgICAge3g6IDIsIHk6IDIsIHkwOiAxfSxcbiAgICAgIHt4OiAzLCB5OiAyLCB5MDogMn1cbiAgICBdLFxuICAgICdTZWNvbmQgYmFyIHNlcmllcyBkYXRhIGNvbnRhaW5zIHkwIHZhbHVlcydcbiAgKTtcblxuICBhc3NlcnQuZW5kKCk7XG59KTtcblxudGVzdCgnUmVuZGVyIGEgc3RhY2tlZCBiYXIgY2hhcnQgd2l0aCBvdGhlciBjaGlsZHJlbicsIGFzc2VydCA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93KFxuICAgIDxYWVBsb3Qgd2lkdGg9ezMwMH0gaGVpZ2h0PXszMDB9IHN0YWNrQnk9XCJ5XCI+XG4gICAgICA8WEF4aXMgLz5cbiAgICAgIDxWZXJ0aWNhbEJhclNlcmllc1xuICAgICAgICBkYXRhPXtbXG4gICAgICAgICAge3g6IDEsIHk6IDB9XG4gICAgICAgIF19XG4gICAgICAvPlxuICAgICAgPFZlcnRpY2FsQmFyU2VyaWVzXG4gICAgICAgIGRhdGE9e1tcbiAgICAgICAgICB7eDogMSwgeTogMn1cbiAgICAgICAgXX0vPlxuICAgICAge1xuICAgICAgLypcbiAgICAgICAgRW1wdHkgZGl2IGhlcmUgaXMgaW50ZW50aW9uYWwsIGZvciB0ZXN0aW5nIHNlcmllcyBjaGlsZHJlbiBoYW5kbGluZ1xuICAgICAgICAqL1xuICAgICAgfVxuICAgICAgPGRpdj48L2Rpdj5cbiAgICA8L1hZUGxvdD5cbiAgKTtcblxuICBjb25zdCByZW5kZXJlZFZlcnRpY2FsQmFyc1dyYXBwZXIgPVxuICAgIHdyYXBwZXIuZmluZChWZXJ0aWNhbEJhclNlcmllcyk7XG5cbiAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICByZW5kZXJlZFZlcnRpY2FsQmFyc1dyYXBwZXIuYXQoMCkucHJvcCgnZGF0YScpLFxuICAgIFtcbiAgICAgIHt4OiAxLCB5OiAwfVxuICAgIF0sXG4gICAgJ0ZpcnN0IGJhciBzZXJpZXMgZGF0YSBpcyB0aGUgc2FtZSdcbiAgKTtcblxuICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgIHJlbmRlcmVkVmVydGljYWxCYXJzV3JhcHBlci5hdCgxKS5wcm9wKCdkYXRhJyksXG4gICAgW1xuICAgICAge3g6IDEsIHk6IDIsIHkwOiAwfVxuICAgIF0sXG4gICAgJ1NlY29uZCBiYXIgc2VyaWVzIGRhdGEgY29udGFpbnMgeTAgdmFsdWVzJ1xuICApO1xuXG4gIGFzc2VydC5lbmQoKTtcbn0pO1xuIl19