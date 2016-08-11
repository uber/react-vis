'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectValueAccessor = getObjectValueAccessor;
exports.getUniquePropertyValues = getUniquePropertyValues;
exports.isObjectPropertyInUse = isObjectPropertyInUse;
exports.addValueToArray = addValueToArray;
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

/**
 * Get the value accessor function that gets a property from an object.
 * @param {string} propertyName Property name.
 * @returns {Function} Value accessor.
 */
function getObjectValueAccessor(propertyName) {
  return function (obj) {
    return obj[propertyName];
  };
}

/**
 * Get unique property values from an array.
 * @param {Array} arr Array of data.
 * @param {string} propertyName Prop name.
 * @returns {Array} Array of unique values.
 */
function getUniquePropertyValues(arr, propertyName) {
  var setOfValues = new Set(arr.map(getObjectValueAccessor(propertyName)));
  return Array.from(setOfValues);
}

/**
 * Check if the property is used in at least one object of the array.
 * @param {Array} arr Array of all data.
 * @param {string} propertyName Property name.
 * @returns {boolean} True if used.
 */
function isObjectPropertyInUse(arr, propertyName) {
  return Boolean(arr.find(function (d) {
    return d && typeof d[propertyName] !== 'undefined';
  }));
}

/**
 * Add zero to the domain.
 * @param {Array} arr Add zero to the domain.
 * @param {Number} value Add zero to domain.
 * @returns {Array} Adjusted domain.
 */
function addValueToArray(arr, value) {
  var result = [].concat(arr);
  if (result[0] > value) {
    result[0] = value;
  }
  if (result[result.length - 1] < value) {
    result[result.length - 1] = value;
  }
  return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvZGF0YS11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQXlCZ0Isc0IsR0FBQSxzQjtRQVVBLHVCLEdBQUEsdUI7UUFXQSxxQixHQUFBLHFCO1FBVUEsZSxHQUFBLGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBL0JULFNBQVMsc0JBQVQsQ0FBZ0MsWUFBaEMsRUFBOEM7QUFDbkQsU0FBTztBQUFBLFdBQU8sSUFBSSxZQUFKLENBQVA7QUFBQSxHQUFQO0FBQ0Q7Ozs7Ozs7O0FBUU0sU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUFzQyxZQUF0QyxFQUFvRDtBQUN6RCxNQUFNLGNBQWMsSUFBSSxHQUFKLENBQVEsSUFBSSxHQUFKLENBQVEsdUJBQXVCLFlBQXZCLENBQVIsQ0FBUixDQUFwQjtBQUNBLFNBQU8sTUFBTSxJQUFOLENBQVcsV0FBWCxDQUFQO0FBQ0Q7Ozs7Ozs7O0FBUU0sU0FBUyxxQkFBVCxDQUErQixHQUEvQixFQUFvQyxZQUFwQyxFQUFrRDtBQUN2RCxTQUFPLFFBQVEsSUFBSSxJQUFKLENBQVM7QUFBQSxXQUFLLEtBQUssT0FBTyxFQUFFLFlBQUYsQ0FBUCxLQUEyQixXQUFyQztBQUFBLEdBQVQsQ0FBUixDQUFQO0FBQ0Q7Ozs7Ozs7O0FBUU0sU0FBUyxlQUFULENBQXlCLEdBQXpCLEVBQThCLEtBQTlCLEVBQXFDO0FBQzFDLE1BQU0sU0FBUyxHQUFHLE1BQUgsQ0FBVSxHQUFWLENBQWY7QUFDQSxNQUFJLE9BQU8sQ0FBUCxJQUFZLEtBQWhCLEVBQXVCO0FBQ3JCLFdBQU8sQ0FBUCxJQUFZLEtBQVo7QUFDRDtBQUNELE1BQUksT0FBTyxPQUFPLE1BQVAsR0FBZ0IsQ0FBdkIsSUFBNEIsS0FBaEMsRUFBdUM7QUFDckMsV0FBTyxPQUFPLE1BQVAsR0FBZ0IsQ0FBdkIsSUFBNEIsS0FBNUI7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEIiwiZmlsZSI6ImRhdGEtdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgYWNjZXNzb3IgZnVuY3Rpb24gdGhhdCBnZXRzIGEgcHJvcGVydHkgZnJvbSBhbiBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIFByb3BlcnR5IG5hbWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFZhbHVlIGFjY2Vzc29yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0VmFsdWVBY2Nlc3Nvcihwcm9wZXJ0eU5hbWUpIHtcbiAgcmV0dXJuIG9iaiA9PiBvYmpbcHJvcGVydHlOYW1lXTtcbn1cblxuLyoqXG4gKiBHZXQgdW5pcXVlIHByb3BlcnR5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyIEFycmF5IG9mIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIFByb3AgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2YgdW5pcXVlIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXF1ZVByb3BlcnR5VmFsdWVzKGFyciwgcHJvcGVydHlOYW1lKSB7XG4gIGNvbnN0IHNldE9mVmFsdWVzID0gbmV3IFNldChhcnIubWFwKGdldE9iamVjdFZhbHVlQWNjZXNzb3IocHJvcGVydHlOYW1lKSkpO1xuICByZXR1cm4gQXJyYXkuZnJvbShzZXRPZlZhbHVlcyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGlzIHVzZWQgaW4gYXQgbGVhc3Qgb25lIG9iamVjdCBvZiB0aGUgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgQXJyYXkgb2YgYWxsIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIFByb3BlcnR5IG5hbWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB1c2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3RQcm9wZXJ0eUluVXNlKGFyciwgcHJvcGVydHlOYW1lKSB7XG4gIHJldHVybiBCb29sZWFuKGFyci5maW5kKGQgPT4gZCAmJiB0eXBlb2YgZFtwcm9wZXJ0eU5hbWVdICE9PSAndW5kZWZpbmVkJykpO1xufVxuXG4vKipcbiAqIEFkZCB6ZXJvIHRvIHRoZSBkb21haW4uXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgQWRkIHplcm8gdG8gdGhlIGRvbWFpbi5cbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSBBZGQgemVybyB0byBkb21haW4uXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFkanVzdGVkIGRvbWFpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFZhbHVlVG9BcnJheShhcnIsIHZhbHVlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdLmNvbmNhdChhcnIpO1xuICBpZiAocmVzdWx0WzBdID4gdmFsdWUpIHtcbiAgICByZXN1bHRbMF0gPSB2YWx1ZTtcbiAgfVxuICBpZiAocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA8IHZhbHVlKSB7XG4gICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=