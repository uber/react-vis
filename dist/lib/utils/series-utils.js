'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 Uber Technologies, Inc.
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

exports.isSeriesChild = isSeriesChild;
exports.getSeriesChildren = getSeriesChildren;
exports.getStackedData = getStackedData;
exports.getSeriesPropsFromChildren = getSeriesPropsFromChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _abstractSeries = require('../plot/series/abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Check if the component is series or not.
 * @param {React.Component} child Component.
 * @returns {boolean} True if the child is series, false otherwise.
 */
function isSeriesChild(child) {
  var prototype = child.type.prototype;

  return prototype instanceof _abstractSeries2.default;
}

/**
 * Get all series from the 'children' object of the component.
 * @param {Object} children Children.
 * @returns {Array} Array of children.
 */
function getSeriesChildren(children) {
  return _react2.default.Children.toArray(children).filter(function (child) {
    return child && isSeriesChild(child);
  });
}

/**
 * Collect the map of repetitions of the series type for all children.
 * @param {Array} children Array of children.
 * @returns {{}} Map of repetitions where sameTypeTotal is the total amount and
 * sameTypeIndex is always 0.
 */
function collectSeriesTypesInfo(children) {
  var result = {};
  children.filter(isSeriesChild).forEach(function (child) {
    var displayName = child.type.displayName;

    if (!result[displayName]) {
      result[displayName] = {
        sameTypeTotal: 0,
        sameTypeIndex: 0
      };
    }
    result[displayName].sameTypeTotal++;
  });
  return result;
}

/**
 * Collect the stacked data for all children in use. If the children don't have
 * the data (e.g. the child is invalid series or something else), then the child
 * is skipped.
 * Each next value of attr is equal to the previous value plus the difference
 * between attr0 and attr.
 * @param {Array} children Array of children.
 * @param {string} attr Attribute.
 * @returns {Array} New array of children for the series.
 */
function getStackedData(children, attr) {
  var childData = [];
  var prevIndex = -1;
  children.forEach(function (child, childIndex) {
    // Skip the children that are not series (e.g. don't have any data).
    if (!child) {
      childData.push(null);
      return;
    }
    var data = child.props.data;

    if (!attr || !data || !data.length) {
      childData.push(data);
      return;
    }
    var attr0 = attr + '0';
    childData.push(data.map(function (d, dIndex) {
      var _extends2;

      // In case if it's the first series don't try to override any values.
      if (prevIndex < 0) {
        return _extends({}, d);
      }
      // In case if the series is not the first, try to get the attr0 values
      // from the previous series.
      var prevD = childData[prevIndex][dIndex];
      return _extends({}, d, (_extends2 = {}, _defineProperty(_extends2, attr0, prevD[attr]), _defineProperty(_extends2, attr, prevD[attr] + d[attr] - (d[attr0] || 0)), _extends2));
    }));
    prevIndex = childIndex;
  });
  return childData;
}

/**
 * Get the list of series props for a child.
 * @param {Array} children Array of all children.
 * @returns {Array} Array of series props for each child. If a child is not a
 * series, than it's undefined.
 */
function getSeriesPropsFromChildren(children) {
  var result = [];
  var seriesTypesInfo = collectSeriesTypesInfo(children);
  var seriesIndex = 0;
  var _opacityValue = _theme.DEFAULT_OPACITY;
  children.forEach(function (child) {
    var props = void 0;
    if (isSeriesChild(child)) {
      var seriesTypeInfo = seriesTypesInfo[child.type.displayName];
      var _colorValue = _theme.DISCRETE_COLOR_RANGE[seriesIndex % _theme.DISCRETE_COLOR_RANGE.length];
      props = _extends({}, seriesTypeInfo, {
        seriesIndex: seriesIndex,
        ref: 'series' + seriesIndex,
        _colorValue: _colorValue,
        _opacityValue: _opacityValue
      });
      seriesTypeInfo.sameTypeIndex++;
      seriesIndex++;
    }
    result.push(props);
  });
  return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvc2VyaWVzLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBK0JnQixhLEdBQUEsYTtRQVVBLGlCLEdBQUEsaUI7UUFvQ0EsYyxHQUFBLGM7UUF3Q0EsMEIsR0FBQSwwQjs7QUFqR2hCOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7QUFPTyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEI7QUFBQSxNQUM1QixTQUQ0QixHQUNmLE1BQU0sSUFEUyxDQUM1QixTQUQ0Qjs7QUFFbkMsU0FBTyw2Q0FBUDtBQUNEOzs7Ozs7O0FBT00sU0FBUyxpQkFBVCxDQUEyQixRQUEzQixFQUFxQztBQUMxQyxTQUFPLGdCQUFNLFFBQU4sQ0FBZSxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLE1BQWpDLENBQXdDO0FBQUEsV0FDL0MsU0FBUyxjQUFjLEtBQWQsQ0FEc0M7QUFBQSxHQUF4QyxDQUFQO0FBRUQ7Ozs7Ozs7O0FBUUQsU0FBUyxzQkFBVCxDQUFnQyxRQUFoQyxFQUEwQztBQUN4QyxNQUFNLFNBQVMsRUFBZjtBQUNBLFdBQVMsTUFBVCxDQUFnQixhQUFoQixFQUErQixPQUEvQixDQUF1QyxpQkFBUztBQUFBLFFBQ3ZDLFdBRHVDLEdBQ3hCLE1BQU0sSUFEa0IsQ0FDdkMsV0FEdUM7O0FBRTlDLFFBQUksQ0FBQyxPQUFPLFdBQVAsQ0FBTCxFQUEwQjtBQUN4QixhQUFPLFdBQVAsSUFBc0I7QUFDcEIsdUJBQWUsQ0FESztBQUVwQix1QkFBZTtBQUZLLE9BQXRCO0FBSUQ7QUFDRCxXQUFPLFdBQVAsRUFBb0IsYUFBcEI7QUFDRCxHQVREO0FBVUEsU0FBTyxNQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OztBQVlNLFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQyxJQUFsQyxFQUF3QztBQUM3QyxNQUFNLFlBQVksRUFBbEI7QUFDQSxNQUFJLFlBQVksQ0FBQyxDQUFqQjtBQUNBLFdBQVMsT0FBVCxDQUFpQixVQUFDLEtBQUQsRUFBUSxVQUFSLEVBQXVCOztBQUV0QyxRQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1YsZ0JBQVUsSUFBVixDQUFlLElBQWY7QUFDQTtBQUNEO0FBTHFDLFFBTS9CLElBTitCLEdBTXZCLE1BQU0sS0FOaUIsQ0FNL0IsSUFOK0I7O0FBT3RDLFFBQUksQ0FBQyxJQUFELElBQVMsQ0FBQyxJQUFWLElBQWtCLENBQUMsS0FBSyxNQUE1QixFQUFvQztBQUNsQyxnQkFBVSxJQUFWLENBQWUsSUFBZjtBQUNBO0FBQ0Q7QUFDRCxRQUFNLFFBQVcsSUFBWCxNQUFOO0FBQ0EsY0FBVSxJQUFWLENBQWUsS0FBSyxHQUFMLENBQVMsVUFBQyxDQUFELEVBQUksTUFBSixFQUFlO0FBQUE7OztBQUVyQyxVQUFJLFlBQVksQ0FBaEIsRUFBbUI7QUFDakIsNEJBQVcsQ0FBWDtBQUNEOzs7QUFHRCxVQUFNLFFBQVEsVUFBVSxTQUFWLEVBQXFCLE1BQXJCLENBQWQ7QUFDQSwwQkFDSyxDQURMLDhDQUVHLEtBRkgsRUFFVyxNQUFNLElBQU4sQ0FGWCw4QkFHRyxJQUhILEVBR1UsTUFBTSxJQUFOLElBQWMsRUFBRSxJQUFGLENBQWQsSUFBeUIsRUFBRSxLQUFGLEtBQVksQ0FBckMsQ0FIVjtBQUtELEtBYmMsQ0FBZjtBQWNBLGdCQUFZLFVBQVo7QUFDRCxHQTNCRDtBQTRCQSxTQUFPLFNBQVA7QUFDRDs7Ozs7Ozs7QUFRTSxTQUFTLDBCQUFULENBQW9DLFFBQXBDLEVBQThDO0FBQ25ELE1BQU0sU0FBUyxFQUFmO0FBQ0EsTUFBTSxrQkFBa0IsdUJBQXVCLFFBQXZCLENBQXhCO0FBQ0EsTUFBSSxjQUFjLENBQWxCO0FBQ0EsTUFBTSxzQ0FBTjtBQUNBLFdBQVMsT0FBVCxDQUFpQixpQkFBUztBQUN4QixRQUFJLGNBQUo7QUFDQSxRQUFJLGNBQWMsS0FBZCxDQUFKLEVBQTBCO0FBQ3hCLFVBQU0saUJBQWlCLGdCQUFnQixNQUFNLElBQU4sQ0FBVyxXQUEzQixDQUF2QjtBQUNBLFVBQU0sY0FBYyw0QkFBcUIsY0FDdkMsNEJBQXFCLE1BREgsQ0FBcEI7QUFFQSwyQkFDSyxjQURMO0FBRUUsZ0NBRkY7QUFHRSx3QkFBYyxXQUhoQjtBQUlFLGdDQUpGO0FBS0U7QUFMRjtBQU9BLHFCQUFlLGFBQWY7QUFDQTtBQUNEO0FBQ0QsV0FBTyxJQUFQLENBQVksS0FBWjtBQUNELEdBakJEO0FBa0JBLFNBQU8sTUFBUDtBQUNEIiwiZmlsZSI6InNlcmllcy11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuLi9wbG90L3Nlcmllcy9hYnN0cmFjdC1zZXJpZXMnO1xuXG5pbXBvcnQge0RJU0NSRVRFX0NPTE9SX1JBTkdFLCBERUZBVUxUX09QQUNJVFl9IGZyb20gJy4uL3RoZW1lJztcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgY29tcG9uZW50IGlzIHNlcmllcyBvciBub3QuXG4gKiBAcGFyYW0ge1JlYWN0LkNvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNoaWxkIGlzIHNlcmllcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTZXJpZXNDaGlsZChjaGlsZCkge1xuICBjb25zdCB7cHJvdG90eXBlfSA9IGNoaWxkLnR5cGU7XG4gIHJldHVybiBwcm90b3R5cGUgaW5zdGFuY2VvZiBBYnN0cmFjdFNlcmllcztcbn1cblxuLyoqXG4gKiBHZXQgYWxsIHNlcmllcyBmcm9tIHRoZSAnY2hpbGRyZW4nIG9iamVjdCBvZiB0aGUgY29tcG9uZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGNoaWxkcmVuIENoaWxkcmVuLlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBjaGlsZHJlbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcmllc0NoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIHJldHVybiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5maWx0ZXIoY2hpbGQgPT5cbiAgY2hpbGQgJiYgaXNTZXJpZXNDaGlsZChjaGlsZCkpO1xufVxuXG4vKipcbiAqIENvbGxlY3QgdGhlIG1hcCBvZiByZXBldGl0aW9ucyBvZiB0aGUgc2VyaWVzIHR5cGUgZm9yIGFsbCBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGNoaWxkcmVuIEFycmF5IG9mIGNoaWxkcmVuLlxuICogQHJldHVybnMge3t9fSBNYXAgb2YgcmVwZXRpdGlvbnMgd2hlcmUgc2FtZVR5cGVUb3RhbCBpcyB0aGUgdG90YWwgYW1vdW50IGFuZFxuICogc2FtZVR5cGVJbmRleCBpcyBhbHdheXMgMC5cbiAqL1xuZnVuY3Rpb24gY29sbGVjdFNlcmllc1R5cGVzSW5mbyhjaGlsZHJlbikge1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY2hpbGRyZW4uZmlsdGVyKGlzU2VyaWVzQ2hpbGQpLmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGNvbnN0IHtkaXNwbGF5TmFtZX0gPSBjaGlsZC50eXBlO1xuICAgIGlmICghcmVzdWx0W2Rpc3BsYXlOYW1lXSkge1xuICAgICAgcmVzdWx0W2Rpc3BsYXlOYW1lXSA9IHtcbiAgICAgICAgc2FtZVR5cGVUb3RhbDogMCxcbiAgICAgICAgc2FtZVR5cGVJbmRleDogMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmVzdWx0W2Rpc3BsYXlOYW1lXS5zYW1lVHlwZVRvdGFsKys7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbGxlY3QgdGhlIHN0YWNrZWQgZGF0YSBmb3IgYWxsIGNoaWxkcmVuIGluIHVzZS4gSWYgdGhlIGNoaWxkcmVuIGRvbid0IGhhdmVcbiAqIHRoZSBkYXRhIChlLmcuIHRoZSBjaGlsZCBpcyBpbnZhbGlkIHNlcmllcyBvciBzb21ldGhpbmcgZWxzZSksIHRoZW4gdGhlIGNoaWxkXG4gKiBpcyBza2lwcGVkLlxuICogRWFjaCBuZXh0IHZhbHVlIG9mIGF0dHIgaXMgZXF1YWwgdG8gdGhlIHByZXZpb3VzIHZhbHVlIHBsdXMgdGhlIGRpZmZlcmVuY2VcbiAqIGJldHdlZW4gYXR0cjAgYW5kIGF0dHIuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGlsZHJlbiBBcnJheSBvZiBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIEF0dHJpYnV0ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gTmV3IGFycmF5IG9mIGNoaWxkcmVuIGZvciB0aGUgc2VyaWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhY2tlZERhdGEoY2hpbGRyZW4sIGF0dHIpIHtcbiAgY29uc3QgY2hpbGREYXRhID0gW107XG4gIGxldCBwcmV2SW5kZXggPSAtMTtcbiAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGNoaWxkSW5kZXgpID0+IHtcbiAgICAvLyBTa2lwIHRoZSBjaGlsZHJlbiB0aGF0IGFyZSBub3Qgc2VyaWVzIChlLmcuIGRvbid0IGhhdmUgYW55IGRhdGEpLlxuICAgIGlmICghY2hpbGQpIHtcbiAgICAgIGNoaWxkRGF0YS5wdXNoKG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7ZGF0YX0gPSBjaGlsZC5wcm9wcztcbiAgICBpZiAoIWF0dHIgfHwgIWRhdGEgfHwgIWRhdGEubGVuZ3RoKSB7XG4gICAgICBjaGlsZERhdGEucHVzaChkYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYXR0cjAgPSBgJHthdHRyfTBgO1xuICAgIGNoaWxkRGF0YS5wdXNoKGRhdGEubWFwKChkLCBkSW5kZXgpID0+IHtcbiAgICAgIC8vIEluIGNhc2UgaWYgaXQncyB0aGUgZmlyc3Qgc2VyaWVzIGRvbid0IHRyeSB0byBvdmVycmlkZSBhbnkgdmFsdWVzLlxuICAgICAgaWYgKHByZXZJbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIHsuLi5kfTtcbiAgICAgIH1cbiAgICAgIC8vIEluIGNhc2UgaWYgdGhlIHNlcmllcyBpcyBub3QgdGhlIGZpcnN0LCB0cnkgdG8gZ2V0IHRoZSBhdHRyMCB2YWx1ZXNcbiAgICAgIC8vIGZyb20gdGhlIHByZXZpb3VzIHNlcmllcy5cbiAgICAgIGNvbnN0IHByZXZEID0gY2hpbGREYXRhW3ByZXZJbmRleF1bZEluZGV4XTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmQsXG4gICAgICAgIFthdHRyMF06IHByZXZEW2F0dHJdLFxuICAgICAgICBbYXR0cl06IHByZXZEW2F0dHJdICsgZFthdHRyXSAtIChkW2F0dHIwXSB8fCAwKVxuICAgICAgfTtcbiAgICB9KSk7XG4gICAgcHJldkluZGV4ID0gY2hpbGRJbmRleDtcbiAgfSk7XG4gIHJldHVybiBjaGlsZERhdGE7XG59XG5cbi8qKlxuICogR2V0IHRoZSBsaXN0IG9mIHNlcmllcyBwcm9wcyBmb3IgYSBjaGlsZC5cbiAqIEBwYXJhbSB7QXJyYXl9IGNoaWxkcmVuIEFycmF5IG9mIGFsbCBjaGlsZHJlbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2Ygc2VyaWVzIHByb3BzIGZvciBlYWNoIGNoaWxkLiBJZiBhIGNoaWxkIGlzIG5vdCBhXG4gKiBzZXJpZXMsIHRoYW4gaXQncyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXJpZXNQcm9wc0Zyb21DaGlsZHJlbihjaGlsZHJlbikge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3Qgc2VyaWVzVHlwZXNJbmZvID0gY29sbGVjdFNlcmllc1R5cGVzSW5mbyhjaGlsZHJlbik7XG4gIGxldCBzZXJpZXNJbmRleCA9IDA7XG4gIGNvbnN0IF9vcGFjaXR5VmFsdWUgPSBERUZBVUxUX09QQUNJVFk7XG4gIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGxldCBwcm9wcztcbiAgICBpZiAoaXNTZXJpZXNDaGlsZChjaGlsZCkpIHtcbiAgICAgIGNvbnN0IHNlcmllc1R5cGVJbmZvID0gc2VyaWVzVHlwZXNJbmZvW2NoaWxkLnR5cGUuZGlzcGxheU5hbWVdO1xuICAgICAgY29uc3QgX2NvbG9yVmFsdWUgPSBESVNDUkVURV9DT0xPUl9SQU5HRVtzZXJpZXNJbmRleCAlXG4gICAgICAgIERJU0NSRVRFX0NPTE9SX1JBTkdFLmxlbmd0aF07XG4gICAgICBwcm9wcyA9IHtcbiAgICAgICAgLi4uc2VyaWVzVHlwZUluZm8sXG4gICAgICAgIHNlcmllc0luZGV4LFxuICAgICAgICByZWY6IGBzZXJpZXMke3Nlcmllc0luZGV4fWAsXG4gICAgICAgIF9jb2xvclZhbHVlLFxuICAgICAgICBfb3BhY2l0eVZhbHVlXG4gICAgICB9O1xuICAgICAgc2VyaWVzVHlwZUluZm8uc2FtZVR5cGVJbmRleCsrO1xuICAgICAgc2VyaWVzSW5kZXgrKztcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gocHJvcHMpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==