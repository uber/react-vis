'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ANIMATION = exports.AnimationPropType = undefined;

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

// Not obvious: d3-transition adds .transition() method to the selection
// prototype (!!!). Do not remove this import.


exports.applyTransition = applyTransition;
exports.getCSSAnimation = getCSSAnimation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('d3-transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Property type for the animation.
 */
var AnimationPropType = exports.AnimationPropType = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.shape({
  duration: _react2.default.PropTypes.number
}), _react2.default.PropTypes.bool]);

/**
 * Object with default settings for the lib's animation.
 * @const
 */
var DEFAULT_ANIMATION = exports.DEFAULT_ANIMATION = {
  duration: 100
};

/**
 * Applies d3.transition to the given selection if transition is set in props.
 * @param {{animation:*}} props The object with the component's props.
 * @param {d3.selection} elements D3's selection of elements that should be
 * animated.
 * @returns {d3.selection} The new d3 selection with the animation applied.
 */
function applyTransition(props, elements) {
  var animation = props.animation;

  if (Boolean(animation)) {
    if (!(animation instanceof Object)) {
      animation = DEFAULT_ANIMATION;
    }
    return elements.transition().duration(animation.duration);
  }
  return elements;
}

/**
 * Transforms a regular CSS object into an object with CSS animation (e. g. adds
 * the `transition` property for all keys of an object).
 * @param {{animation: *}} props The object of component's props.
 * @param {Object} style A style object to apply animation to.
 * @returns {Object} New style object with CSS animation applied.
 */
function getCSSAnimation(props, style) {
  var animation = props.animation;

  var transition = 'none';
  if (animation) {
    // Fallback to default animation if no animation is passed.
    if (!(animation instanceof Object)) {
      animation = DEFAULT_ANIMATION;
    }
    var keys = Object.keys(style);
    // Create a string of visualized parameters and filter out those, which
    // don't have values.
    var animationKeys = keys.filter(function (key) {
      return Boolean(style[key]);
    }).map(function (key) {
      return key + ' ' + animation.duration / 1000 + 's';
    });
    if (animationKeys.length) {
      transition = animationKeys.join(',');
    }
  }
  return _extends({
    transition: transition
  }, style);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbHMvYW5pbWF0aW9uLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtRGdCLGUsR0FBQSxlO1FBa0JBLGUsR0FBQSxlOztBQWpEaEI7Ozs7QUFJQTs7Ozs7OztBQUtPLElBQU0sZ0RBQW9CLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FDekQsZ0JBQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQjtBQUNwQixZQUFVLGdCQUFNLFNBQU4sQ0FBZ0I7QUFETixDQUF0QixDQUR5RCxFQUl6RCxnQkFBTSxTQUFOLENBQWdCLElBSnlDLENBQTFCLENBQTFCOzs7Ozs7QUFXQSxJQUFNLGdEQUFvQjtBQUMvQixZQUFVO0FBRHFCLENBQTFCOzs7Ozs7Ozs7QUFXQSxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0MsUUFBaEMsRUFBMEM7QUFBQSxNQUMxQyxTQUQwQyxHQUM3QixLQUQ2QixDQUMxQyxTQUQwQzs7QUFFL0MsTUFBSSxRQUFRLFNBQVIsQ0FBSixFQUF3QjtBQUN0QixRQUFJLEVBQUUscUJBQXFCLE1BQXZCLENBQUosRUFBb0M7QUFDbEMsa0JBQVksaUJBQVo7QUFDRDtBQUNELFdBQU8sU0FBUyxVQUFULEdBQXNCLFFBQXRCLENBQStCLFVBQVUsUUFBekMsQ0FBUDtBQUNEO0FBQ0QsU0FBTyxRQUFQO0FBQ0Q7Ozs7Ozs7OztBQVNNLFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQyxLQUFoQyxFQUF1QztBQUFBLE1BQ3ZDLFNBRHVDLEdBQzFCLEtBRDBCLENBQ3ZDLFNBRHVDOztBQUU1QyxNQUFJLGFBQWEsTUFBakI7QUFDQSxNQUFJLFNBQUosRUFBZTs7QUFFYixRQUFJLEVBQUUscUJBQXFCLE1BQXZCLENBQUosRUFBb0M7QUFDbEMsa0JBQVksaUJBQVo7QUFDRDtBQUNELFFBQU0sT0FBTyxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWI7OztBQUdBLFFBQU0sZ0JBQWdCLEtBQ25CLE1BRG1CLENBQ1o7QUFBQSxhQUFPLFFBQVEsTUFBTSxHQUFOLENBQVIsQ0FBUDtBQUFBLEtBRFksRUFFbkIsR0FGbUIsQ0FFZjtBQUFBLGFBQVUsR0FBVixTQUFpQixVQUFVLFFBQVYsR0FBcUIsSUFBdEM7QUFBQSxLQUZlLENBQXRCO0FBR0EsUUFBSSxjQUFjLE1BQWxCLEVBQTBCO0FBQ3hCLG1CQUFhLGNBQWMsSUFBZCxDQUFtQixHQUFuQixDQUFiO0FBQ0Q7QUFDRjtBQUNEO0FBQ0U7QUFERixLQUVNLEtBRk47QUFJRCIsImZpbGUiOiJhbmltYXRpb24tdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vLyBOb3Qgb2J2aW91czogZDMtdHJhbnNpdGlvbiBhZGRzIC50cmFuc2l0aW9uKCkgbWV0aG9kIHRvIHRoZSBzZWxlY3Rpb25cbi8vIHByb3RvdHlwZSAoISEhKS4gRG8gbm90IHJlbW92ZSB0aGlzIGltcG9ydC5cbmltcG9ydCAnZDMtdHJhbnNpdGlvbic7XG5cbi8qKlxuICogUHJvcGVydHkgdHlwZSBmb3IgdGhlIGFuaW1hdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IEFuaW1hdGlvblByb3BUeXBlID0gUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgZHVyYXRpb246IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgfSksXG4gIFJlYWN0LlByb3BUeXBlcy5ib29sXG5dKTtcblxuLyoqXG4gKiBPYmplY3Qgd2l0aCBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGUgbGliJ3MgYW5pbWF0aW9uLlxuICogQGNvbnN0XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0FOSU1BVElPTiA9IHtcbiAgZHVyYXRpb246IDEwMFxufTtcblxuLyoqXG4gKiBBcHBsaWVzIGQzLnRyYW5zaXRpb24gdG8gdGhlIGdpdmVuIHNlbGVjdGlvbiBpZiB0cmFuc2l0aW9uIGlzIHNldCBpbiBwcm9wcy5cbiAqIEBwYXJhbSB7e2FuaW1hdGlvbjoqfX0gcHJvcHMgVGhlIG9iamVjdCB3aXRoIHRoZSBjb21wb25lbnQncyBwcm9wcy5cbiAqIEBwYXJhbSB7ZDMuc2VsZWN0aW9ufSBlbGVtZW50cyBEMydzIHNlbGVjdGlvbiBvZiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZVxuICogYW5pbWF0ZWQuXG4gKiBAcmV0dXJucyB7ZDMuc2VsZWN0aW9ufSBUaGUgbmV3IGQzIHNlbGVjdGlvbiB3aXRoIHRoZSBhbmltYXRpb24gYXBwbGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5VHJhbnNpdGlvbihwcm9wcywgZWxlbWVudHMpIHtcbiAgbGV0IHthbmltYXRpb259ID0gcHJvcHM7XG4gIGlmIChCb29sZWFuKGFuaW1hdGlvbikpIHtcbiAgICBpZiAoIShhbmltYXRpb24gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICBhbmltYXRpb24gPSBERUZBVUxUX0FOSU1BVElPTjtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzLnRyYW5zaXRpb24oKS5kdXJhdGlvbihhbmltYXRpb24uZHVyYXRpb24pO1xuICB9XG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgcmVndWxhciBDU1Mgb2JqZWN0IGludG8gYW4gb2JqZWN0IHdpdGggQ1NTIGFuaW1hdGlvbiAoZS4gZy4gYWRkc1xuICogdGhlIGB0cmFuc2l0aW9uYCBwcm9wZXJ0eSBmb3IgYWxsIGtleXMgb2YgYW4gb2JqZWN0KS5cbiAqIEBwYXJhbSB7e2FuaW1hdGlvbjogKn19IHByb3BzIFRoZSBvYmplY3Qgb2YgY29tcG9uZW50J3MgcHJvcHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgQSBzdHlsZSBvYmplY3QgdG8gYXBwbHkgYW5pbWF0aW9uIHRvLlxuICogQHJldHVybnMge09iamVjdH0gTmV3IHN0eWxlIG9iamVjdCB3aXRoIENTUyBhbmltYXRpb24gYXBwbGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENTU0FuaW1hdGlvbihwcm9wcywgc3R5bGUpIHtcbiAgbGV0IHthbmltYXRpb259ID0gcHJvcHM7XG4gIGxldCB0cmFuc2l0aW9uID0gJ25vbmUnO1xuICBpZiAoYW5pbWF0aW9uKSB7XG4gICAgLy8gRmFsbGJhY2sgdG8gZGVmYXVsdCBhbmltYXRpb24gaWYgbm8gYW5pbWF0aW9uIGlzIHBhc3NlZC5cbiAgICBpZiAoIShhbmltYXRpb24gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICBhbmltYXRpb24gPSBERUZBVUxUX0FOSU1BVElPTjtcbiAgICB9XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHN0eWxlKTtcbiAgICAvLyBDcmVhdGUgYSBzdHJpbmcgb2YgdmlzdWFsaXplZCBwYXJhbWV0ZXJzIGFuZCBmaWx0ZXIgb3V0IHRob3NlLCB3aGljaFxuICAgIC8vIGRvbid0IGhhdmUgdmFsdWVzLlxuICAgIGNvbnN0IGFuaW1hdGlvbktleXMgPSBrZXlzXG4gICAgICAuZmlsdGVyKGtleSA9PiBCb29sZWFuKHN0eWxlW2tleV0pKVxuICAgICAgLm1hcChrZXkgPT4gYCR7a2V5fSAke2FuaW1hdGlvbi5kdXJhdGlvbiAvIDEwMDB9c2ApO1xuICAgIGlmIChhbmltYXRpb25LZXlzLmxlbmd0aCkge1xuICAgICAgdHJhbnNpdGlvbiA9IGFuaW1hdGlvbktleXMuam9pbignLCcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb24sXG4gICAgLi4uIHN0eWxlXG4gIH07XG59XG4iXX0=