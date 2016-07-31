'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXIS_ORIENTATIONS = undefined;
exports.getAxisFnByOrientation = getAxisFnByOrientation;
exports.getTicksTotalFromSize = getTicksTotalFromSize;

var _d3Axis = require('d3-axis');

var _d3Axis2 = _interopRequireDefault(_d3Axis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AXIS_FNS = {
  left: _d3Axis2.default.axisLeft,
  right: _d3Axis2.default.axisRight,
  top: _d3Axis2.default.axisTop,
  bottom: _d3Axis2.default.axisBottom
}; // Copyright (c) 2016 Uber Technologies, Inc.
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

var AXIS_ORIENTATIONS = exports.AXIS_ORIENTATIONS = Object.keys(AXIS_FNS);

function getAxisFnByOrientation(orientation) {
  return AXIS_FNS[orientation];
}

/**
 * Get total amount of ticks from a given size in pixels.
 * @param {number} size Size of the axis in pixels.
 * @returns {number} Total amount of ticks.
 */
function getTicksTotalFromSize(size) {
  if (size < 700) {
    if (size > 300) {
      return 10;
    }
    return 5;
  }
  return 20;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvYXhpcy11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7UUErQmdCLHNCLEdBQUEsc0I7UUFTQSxxQixHQUFBLHFCOztBQXBCaEI7Ozs7OztBQUVBLElBQU0sV0FBVztBQUNmLFFBQU0saUJBQU8sUUFERTtBQUVmLFNBQU8saUJBQU8sU0FGQztBQUdmLE9BQUssaUJBQU8sT0FIRztBQUlmLFVBQVEsaUJBQU87QUFKQSxDQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9PLElBQU0sZ0RBQW9CLE9BQU8sSUFBUCxDQUFZLFFBQVosQ0FBMUI7O0FBRUEsU0FBUyxzQkFBVCxDQUFnQyxXQUFoQyxFQUE2QztBQUNsRCxTQUFPLFNBQVMsV0FBVCxDQUFQO0FBQ0Q7Ozs7Ozs7QUFPTSxTQUFTLHFCQUFULENBQStCLElBQS9CLEVBQXFDO0FBQzFDLE1BQUksT0FBTyxHQUFYLEVBQWdCO0FBQ2QsUUFBSSxPQUFPLEdBQVgsRUFBZ0I7QUFDZCxhQUFPLEVBQVA7QUFDRDtBQUNELFdBQU8sQ0FBUDtBQUNEO0FBQ0QsU0FBTyxFQUFQO0FBQ0QiLCJmaWxlIjoiYXhpcy11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBkM0F4aXMgZnJvbSAnZDMtYXhpcyc7XG5cbmNvbnN0IEFYSVNfRk5TID0ge1xuICBsZWZ0OiBkM0F4aXMuYXhpc0xlZnQsXG4gIHJpZ2h0OiBkM0F4aXMuYXhpc1JpZ2h0LFxuICB0b3A6IGQzQXhpcy5heGlzVG9wLFxuICBib3R0b206IGQzQXhpcy5heGlzQm90dG9tXG59O1xuXG5leHBvcnQgY29uc3QgQVhJU19PUklFTlRBVElPTlMgPSBPYmplY3Qua2V5cyhBWElTX0ZOUyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBeGlzRm5CeU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gIHJldHVybiBBWElTX0ZOU1tvcmllbnRhdGlvbl07XG59XG5cbi8qKlxuICogR2V0IHRvdGFsIGFtb3VudCBvZiB0aWNrcyBmcm9tIGEgZ2l2ZW4gc2l6ZSBpbiBwaXhlbHMuXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBTaXplIG9mIHRoZSBheGlzIGluIHBpeGVscy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRvdGFsIGFtb3VudCBvZiB0aWNrcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpY2tzVG90YWxGcm9tU2l6ZShzaXplKSB7XG4gIGlmIChzaXplIDwgNzAwKSB7XG4gICAgaWYgKHNpemUgPiAzMDApIHtcbiAgICAgIHJldHVybiAxMDtcbiAgICB9XG4gICAgcmV0dXJuIDU7XG4gIH1cbiAgcmV0dXJuIDIwO1xufVxuIl19