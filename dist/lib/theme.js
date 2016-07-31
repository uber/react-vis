'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var DISCRETE_COLOR_RANGE = exports.DISCRETE_COLOR_RANGE = ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'];

var CONTINUOUS_COLOR_RANGE = exports.CONTINUOUS_COLOR_RANGE = ['#EF5D28', '#FF9833'];

var SIZE_RANGE = exports.SIZE_RANGE = [1, 10];

var OPACITY_RANGE = exports.OPACITY_RANGE = [0.1, 1];

var DEFAULT_OPACITY = exports.DEFAULT_OPACITY = 1;

var DEFAULT_SIZE = exports.DEFAULT_SIZE = 5;

var DEFAULT_COLOR = exports.DEFAULT_COLOR = DISCRETE_COLOR_RANGE[0];

var DEFAULT_TICK_SIZE = exports.DEFAULT_TICK_SIZE = 7;

var DEFAULT_INTERPOLATION = exports.DEFAULT_INTERPOLATION = "linear";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdGhlbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CTyxJQUFNLHNEQUF1QixDQUNsQyxTQURrQyxFQUVsQyxTQUZrQyxFQUdsQyxTQUhrQyxFQUlsQyxTQUprQyxFQUtsQyxTQUxrQyxDQUE3Qjs7QUFRQSxJQUFNLDBEQUF5QixDQUNwQyxTQURvQyxFQUVwQyxTQUZvQyxDQUEvQjs7QUFLQSxJQUFNLGtDQUFhLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FBbkI7O0FBRUEsSUFBTSx3Q0FBZ0IsQ0FBQyxHQUFELEVBQU0sQ0FBTixDQUF0Qjs7QUFFQSxJQUFNLDRDQUFrQixDQUF4Qjs7QUFFQSxJQUFNLHNDQUFlLENBQXJCOztBQUVBLElBQU0sd0NBQWdCLHFCQUFxQixDQUFyQixDQUF0Qjs7QUFFQSxJQUFNLGdEQUFvQixDQUExQjs7QUFFQSxJQUFNLHdEQUF3QixRQUE5QiIsImZpbGUiOiJ0aGVtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBjb25zdCBESVNDUkVURV9DT0xPUl9SQU5HRSA9IFtcbiAgJyMxMjkzOUEnLFxuICAnIzc5QzdFMycsXG4gICcjMUEzMTc3JyxcbiAgJyNGRjk4MzMnLFxuICAnI0VGNUQyOCdcbl07XG5cbmV4cG9ydCBjb25zdCBDT05USU5VT1VTX0NPTE9SX1JBTkdFID0gW1xuICAnI0VGNUQyOCcsXG4gICcjRkY5ODMzJ1xuXTtcblxuZXhwb3J0IGNvbnN0IFNJWkVfUkFOR0UgPSBbMSwgMTBdO1xuXG5leHBvcnQgY29uc3QgT1BBQ0lUWV9SQU5HRSA9IFswLjEsIDFdO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9PUEFDSVRZID0gMTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0laRSA9IDU7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTE9SID0gRElTQ1JFVEVfQ09MT1JfUkFOR0VbMF07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJQ0tfU0laRSA9IDc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0lOVEVSUE9MQVRJT04gPSBcImxpbmVhclwiO1xuIl19