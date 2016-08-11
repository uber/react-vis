'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerDimensions = getInnerDimensions;
exports.getDataFromChildren = getDataFromChildren;

var _seriesUtils = require('./series-utils');

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @returns {Object} Dimensions of the component.
 */
function getInnerDimensions(props) {
  var height = props.height;
  var width = props.width;
  var _props$margin = props.margin;
  var _props$margin$left = _props$margin.left;
  var marginLeft = _props$margin$left === undefined ? 0 : _props$margin$left;
  var _props$margin$top = _props$margin.top;
  var marginTop = _props$margin$top === undefined ? 0 : _props$margin$top;
  var _props$margin$right = _props$margin.right;
  var marginRight = _props$margin$right === undefined ? 0 : _props$margin$right;
  var _props$margin$bottom = _props$margin.bottom;
  var marginBottom = _props$margin$bottom === undefined ? 0 : _props$margin$bottom;

  return {
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    width: width,
    height: height,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}

/**
 * Collect data from the list of children.
 * @param {Object} props Props for the plot.
 * @returns {Array} Array of arrays with data.
 */
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

function getDataFromChildren(props) {
  var children = props.children;

  return (0, _seriesUtils.getSeriesChildren)(children).map(function (child) {
    return child.props.data;
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvY2hhcnQtdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUEyQmdCLGtCLEdBQUEsa0I7UUEyQkEsbUIsR0FBQSxtQjs7QUFsQ2hCOzs7Ozs7O0FBT08sU0FBUyxrQkFBVCxDQUE0QixLQUE1QixFQUFtQztBQUFBLE1BRXRDLE1BRnNDLEdBU2xDLEtBVGtDLENBRXRDLE1BRnNDO0FBQUEsTUFHdEMsS0FIc0MsR0FTbEMsS0FUa0MsQ0FHdEMsS0FIc0M7QUFBQSxzQkFTbEMsS0FUa0MsQ0FJdEMsTUFKc0M7QUFBQSx5Q0FLcEMsSUFMb0M7QUFBQSxNQUs5QixVQUw4QixzQ0FLakIsQ0FMaUI7QUFBQSx3Q0FNcEMsR0FOb0M7QUFBQSxNQU0vQixTQU4rQixxQ0FNbkIsQ0FObUI7QUFBQSwwQ0FPcEMsS0FQb0M7QUFBQSxNQU83QixXQVA2Qix1Q0FPZixDQVBlO0FBQUEsMkNBUXBDLE1BUm9DO0FBQUEsTUFRNUIsWUFSNEIsd0NBUWIsQ0FSYTs7QUFVeEMsU0FBTztBQUNMLDBCQURLO0FBRUwsd0JBRks7QUFHTCw0QkFISztBQUlMLDhCQUpLO0FBS0wsZ0JBTEs7QUFNTCxrQkFOSztBQU9MLGlCQUFhLFNBQVMsWUFBVCxHQUF3QixTQVBoQztBQVFMLGdCQUFZLFFBQVEsVUFBUixHQUFxQjtBQVI1QixHQUFQO0FBVUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9NLFNBQVMsbUJBQVQsQ0FBNkIsS0FBN0IsRUFBb0M7QUFBQSxNQUNsQyxRQURrQyxHQUN0QixLQURzQixDQUNsQyxRQURrQzs7QUFFekMsU0FBTyxvQ0FBa0IsUUFBbEIsRUFBNEIsR0FBNUIsQ0FBZ0M7QUFBQSxXQUFTLE1BQU0sS0FBTixDQUFZLElBQXJCO0FBQUEsR0FBaEMsQ0FBUDtBQUNEIiwiZmlsZSI6ImNoYXJ0LXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtnZXRTZXJpZXNDaGlsZHJlbn0gZnJvbSAnLi9zZXJpZXMtdXRpbHMnO1xuXG4vKipcbiAqIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgY29tcG9uZW50IGZvciB0aGUgZnV0dXJlIHVzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IERpbWVuc2lvbnMgb2YgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElubmVyRGltZW5zaW9ucyhwcm9wcykge1xuICBjb25zdCB7XG4gICAgaGVpZ2h0LFxuICAgIHdpZHRoLFxuICAgIG1hcmdpbjoge1xuICAgICAgbGVmdDogbWFyZ2luTGVmdCA9IDAsXG4gICAgICB0b3A6IG1hcmdpblRvcCA9IDAsXG4gICAgICByaWdodDogbWFyZ2luUmlnaHQgPSAwLFxuICAgICAgYm90dG9tOiBtYXJnaW5Cb3R0b20gPSAwfVxuICAgIH0gPSBwcm9wcztcbiAgcmV0dXJuIHtcbiAgICBtYXJnaW5MZWZ0LFxuICAgIG1hcmdpblRvcCxcbiAgICBtYXJnaW5SaWdodCxcbiAgICBtYXJnaW5Cb3R0b20sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGlubmVySGVpZ2h0OiBoZWlnaHQgLSBtYXJnaW5Cb3R0b20gLSBtYXJnaW5Ub3AsXG4gICAgaW5uZXJXaWR0aDogd2lkdGggLSBtYXJnaW5MZWZ0IC0gbWFyZ2luUmlnaHRcbiAgfTtcbn1cblxuLyoqXG4gKiBDb2xsZWN0IGRhdGEgZnJvbSB0aGUgbGlzdCBvZiBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcyBmb3IgdGhlIHBsb3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIGFycmF5cyB3aXRoIGRhdGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhRnJvbUNoaWxkcmVuKHByb3BzKSB7XG4gIGNvbnN0IHtjaGlsZHJlbn0gPSBwcm9wcztcbiAgcmV0dXJuIGdldFNlcmllc0NoaWxkcmVuKGNoaWxkcmVuKS5tYXAoY2hpbGQgPT4gY2hpbGQucHJvcHMuZGF0YSk7XG59XG4iXX0=