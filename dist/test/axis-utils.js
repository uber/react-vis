'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

require('babel-polyfill');

var _axisUtils = require('../lib/utils/axis-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('axis-utils/getTicksTotalFromSize', function t(assert) {
  assert.ok((0, _axisUtils.getTicksTotalFromSize)(0) === 5, 'Returns valid value for 0px');
  assert.ok((0, _axisUtils.getTicksTotalFromSize)(301) === 10, 'Returns valid value for 301px');
  assert.ok((0, _axisUtils.getTicksTotalFromSize)(701) === 20, 'Returns valid value for 701px');
  assert.end();
}); // Copyright (c) 2016 Uber Technologies, Inc.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2F4aXMtdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkE7Ozs7QUFDQTs7QUFFQTs7OztBQUVBLG9CQUFLLGtDQUFMLEVBQXlDLFNBQVMsQ0FBVCxDQUFXLE1BQVgsRUFBbUI7QUFDMUQsU0FBTyxFQUFQLENBQVUsc0NBQXNCLENBQXRCLE1BQTZCLENBQXZDLEVBQTBDLDZCQUExQztBQUNBLFNBQU8sRUFBUCxDQUFVLHNDQUFzQixHQUF0QixNQUErQixFQUF6QyxFQUE2QywrQkFBN0M7QUFDQSxTQUFPLEVBQVAsQ0FBVSxzQ0FBc0IsR0FBdEIsTUFBK0IsRUFBekMsRUFBNkMsK0JBQTdDO0FBQ0EsU0FBTyxHQUFQO0FBQ0QsQ0FMRCxFIiwiZmlsZSI6ImF4aXMtdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgdGVzdCBmcm9tICd0YXBlJztcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuXG5pbXBvcnQge2dldFRpY2tzVG90YWxGcm9tU2l6ZX0gZnJvbSAnLi4vbGliL3V0aWxzL2F4aXMtdXRpbHMnO1xuXG50ZXN0KCdheGlzLXV0aWxzL2dldFRpY2tzVG90YWxGcm9tU2l6ZScsIGZ1bmN0aW9uIHQoYXNzZXJ0KSB7XG4gIGFzc2VydC5vayhnZXRUaWNrc1RvdGFsRnJvbVNpemUoMCkgPT09IDUsICdSZXR1cm5zIHZhbGlkIHZhbHVlIGZvciAwcHgnKTtcbiAgYXNzZXJ0Lm9rKGdldFRpY2tzVG90YWxGcm9tU2l6ZSgzMDEpID09PSAxMCwgJ1JldHVybnMgdmFsaWQgdmFsdWUgZm9yIDMwMXB4Jyk7XG4gIGFzc2VydC5vayhnZXRUaWNrc1RvdGFsRnJvbVNpemUoNzAxKSA9PT0gMjAsICdSZXR1cm5zIHZhbGlkIHZhbHVlIGZvciA3MDFweCcpO1xuICBhc3NlcnQuZW5kKCk7XG59KTtcbiJdfQ==