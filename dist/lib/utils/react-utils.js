'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2016 Uber Technologies, Inc.
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

exports.getDOMNode = getDOMNode;
exports.isReactDOMSupported = isReactDOMSupported;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$version$split = _react2.default.version.split('.');

var _React$version$split2 = _slicedToArray(_React$version$split, 2);

var major = _React$version$split2[0];
var minor = _React$version$split2[1];

var versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;

/**
 * Support React 0.13 and greater where refs are React components, not DOM
 * nodes.
 * @param {*} ref React's ref.
 * @returns {Element} DOM element.
 */
function getDOMNode(ref) {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }
  return ref;
}

function isReactDOMSupported() {
  return versionHigherThanThirteen;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvcmVhY3QtdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUErQmdCLFUsR0FBQSxVO1FBT0EsbUIsR0FBQSxtQjs7QUFsQmhCOzs7Ozs7MkJBRXVCLGdCQUFNLE9BQU4sQ0FBYyxLQUFkLENBQW9CLEdBQXBCLEM7Ozs7SUFBaEIsSztJQUFPLEs7O0FBQ2QsSUFBTSw0QkFBNEIsT0FBTyxLQUFQLElBQWdCLEVBQWhCLElBQXNCLE9BQU8sS0FBUCxJQUFnQixFQUF4RTs7Ozs7Ozs7QUFRTyxTQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUI7QUFDOUIsTUFBSSxDQUFDLHFCQUFMLEVBQTRCO0FBQzFCLFdBQU8sT0FBTyxJQUFJLFVBQUosRUFBZDtBQUNEO0FBQ0QsU0FBTyxHQUFQO0FBQ0Q7O0FBRU0sU0FBUyxtQkFBVCxHQUErQjtBQUNwQyxTQUFPLHlCQUFQO0FBQ0QiLCJmaWxlIjoicmVhY3QtdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBbbWFqb3IsIG1pbm9yXSA9IFJlYWN0LnZlcnNpb24uc3BsaXQoJy4nKTtcbmNvbnN0IHZlcnNpb25IaWdoZXJUaGFuVGhpcnRlZW4gPSBOdW1iZXIobWlub3IpID4gMTMgfHwgTnVtYmVyKG1ham9yKSA+IDEzO1xuXG4vKipcbiAqIFN1cHBvcnQgUmVhY3QgMC4xMyBhbmQgZ3JlYXRlciB3aGVyZSByZWZzIGFyZSBSZWFjdCBjb21wb25lbnRzLCBub3QgRE9NXG4gKiBub2Rlcy5cbiAqIEBwYXJhbSB7Kn0gcmVmIFJlYWN0J3MgcmVmLlxuICogQHJldHVybnMge0VsZW1lbnR9IERPTSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RE9NTm9kZShyZWYpIHtcbiAgaWYgKCFpc1JlYWN0RE9NU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gcmVmICYmIHJlZi5nZXRET01Ob2RlKCk7XG4gIH1cbiAgcmV0dXJuIHJlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhY3RET01TdXBwb3J0ZWQoKSB7XG4gIHJldHVybiB2ZXJzaW9uSGlnaGVyVGhhblRoaXJ0ZWVuO1xufVxuIl19