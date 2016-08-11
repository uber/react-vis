'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeVisFlexible;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUtils = require('./utils/react-utils');

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var CONTAINER_REF = 'container';

// As a performance enhancement, we want to only listen once
var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;

/**
 * Calls each subscriber, debounced to the
 */
function debounceEmitResize() {
  _window2.default.clearTimeout(timeoutId);
  timeoutId = _window2.default.setTimeout(emitResize, DEBOUNCE_DURATION);
}

/**
 * Calls each subscriber once syncronously.
 */
function emitResize() {
  resizeSubscribers.forEach(function (cb) {
    return cb();
  });
}

/**
 * Add the given callback to the list of subscribers to be caled when the
 * window resizes. Returns a function that, when called, removes the given
 * callback from the list of subscribers. This function is also resposible for
 * adding and removing the resize listener on `window`.
 *
 * @param {Function} cb - Subscriber callback function
 * @returns {Function} Unsubscribe function
 */
function subscribeToDebouncedResize(cb) {
  resizeSubscribers.push(cb);

  // if we go from zero to one Flexible components instances, add the listener
  if (resizeSubscribers.length === 1) {
    _window2.default.addEventListener('resize', debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(resizeSubscribers, cb);

    // if we have no Flexible components, remove the listener
    if (resizeSubscribers.length === 0) {
      _window2.default.clearTimeout(timeoutId);
      _window2.default.removeEventListener('resize', debounceEmitResize);
    }
  };
}

/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} item - Subscriber callback function
 */
function removeSubscriber(item) {
  var index = resizeSubscribers.indexOf(item);
  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}

/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */
function makeVisFlexible(Component) {

  var ResultClass = function (_React$Component) {
    _inherits(ResultClass, _React$Component);

    _createClass(ResultClass, null, [{
      key: 'propTypes',
      get: function get() {
        var _Component$propTypes = Component.propTypes;
        var width = _Component$propTypes.width;

        var otherPropTypes = _objectWithoutProperties(_Component$propTypes, ['width']);

        return otherPropTypes;
      }
    }]);

    function ResultClass(props) {
      _classCallCheck(this, ResultClass);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResultClass).call(this, props));

      _this.state = {
        width: 0
      };
      _this._onResize = _this._onResize.bind(_this);
      return _this;
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */


    _createClass(ResultClass, [{
      key: '_onResize',
      value: function _onResize() {
        var containerElement = (0, _reactUtils.getDOMNode)(this.refs[CONTAINER_REF]);
        var offsetWidth = containerElement.offsetWidth;
        if (this.state.width !== offsetWidth) {
          this.setState({
            width: offsetWidth
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._onResize();
        this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        this._onResize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cancelSubscription();
      }
    }, {
      key: 'render',
      value: function render() {
        var width = this.state.width;

        return _react2.default.createElement(
          'div',
          {
            ref: CONTAINER_REF },
          _react2.default.createElement(Component, _extends({
            width: width
          }, this.props))
        );
      }
    }]);

    return ResultClass;
  }(_react2.default.Component);

  ResultClass.displayName = 'Flexible' + Component.displayName;

  return ResultClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbWFrZS12aXMtZmxleGlibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkEyRndCLGU7O0FBdkV4Qjs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sZ0JBQWdCLFdBQXRCOzs7QUFHQSxJQUFNLG9CQUFvQixFQUExQjtBQUNBLElBQU0sb0JBQW9CLEdBQTFCO0FBQ0EsSUFBSSxZQUFZLElBQWhCOzs7OztBQUtBLFNBQVMsa0JBQVQsR0FBOEI7QUFDNUIsbUJBQU8sWUFBUCxDQUFvQixTQUFwQjtBQUNBLGNBQVksaUJBQU8sVUFBUCxDQUFrQixVQUFsQixFQUE4QixpQkFBOUIsQ0FBWjtBQUNEOzs7OztBQUtELFNBQVMsVUFBVCxHQUFzQjtBQUNwQixvQkFBa0IsT0FBbEIsQ0FBMEI7QUFBQSxXQUFNLElBQU47QUFBQSxHQUExQjtBQUNEOzs7Ozs7Ozs7OztBQVdELFNBQVMsMEJBQVQsQ0FBb0MsRUFBcEMsRUFBd0M7QUFDdEMsb0JBQWtCLElBQWxCLENBQXVCLEVBQXZCOzs7QUFHQSxNQUFJLGtCQUFrQixNQUFsQixLQUE2QixDQUFqQyxFQUFvQztBQUNsQyxxQkFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxrQkFBbEM7QUFDRDtBQUNELFNBQU8sU0FBUyxXQUFULEdBQXVCO0FBQzVCLHFCQUFpQixpQkFBakIsRUFBb0MsRUFBcEM7OztBQUdBLFFBQUksa0JBQWtCLE1BQWxCLEtBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLHVCQUFPLFlBQVAsQ0FBb0IsU0FBcEI7QUFDQSx1QkFBTyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxrQkFBckM7QUFDRDtBQUNGLEdBUkQ7QUFTRDs7Ozs7OztBQU9ELFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFDOUIsTUFBTSxRQUFRLGtCQUFrQixPQUFsQixDQUEwQixJQUExQixDQUFkO0FBQ0EsTUFBSSxRQUFRLENBQUMsQ0FBYixFQUFnQjtBQUNkLHNCQUFrQixNQUFsQixDQUF5QixLQUF6QixFQUFnQyxDQUFoQztBQUNEO0FBQ0Y7Ozs7Ozs7QUFPYyxTQUFTLGVBQVQsQ0FBeUIsU0FBekIsRUFBb0M7O0FBRWpELE1BQU07QUFBQTs7QUFBQTtBQUFBO0FBQUEsMEJBRW1CO0FBQUEsbUNBQ2MsVUFBVSxTQUR4QjtBQUFBLFlBQ2QsS0FEYyx3QkFDZCxLQURjOztBQUFBLFlBQ0osY0FESTs7QUFFckIsZUFBTyxjQUFQO0FBQ0Q7QUFMRzs7QUFPSix5QkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaUdBQ1gsS0FEVzs7QUFFakIsWUFBSyxLQUFMLEdBQWE7QUFDWCxlQUFPO0FBREksT0FBYjtBQUdBLFlBQUssU0FBTCxHQUFpQixNQUFLLFNBQUwsQ0FBZSxJQUFmLE9BQWpCO0FBTGlCO0FBTWxCOzs7Ozs7OztBQWJHO0FBQUE7QUFBQSxrQ0FtQlE7QUFDVixZQUFNLG1CQUFtQiw0QkFBVyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQVgsQ0FBekI7QUFDQSxZQUFNLGNBQWMsaUJBQWlCLFdBQXJDO0FBQ0EsWUFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFdBQXpCLEVBQXNDO0FBQ3BDLGVBQUssUUFBTCxDQUFjO0FBQ1osbUJBQU87QUFESyxXQUFkO0FBR0Q7QUFDRjtBQTNCRztBQUFBO0FBQUEsMENBNkJnQjtBQUNsQixhQUFLLFNBQUw7QUFDQSxhQUFLLGtCQUFMLEdBQTBCLDJCQUEyQixLQUFLLFNBQWhDLENBQTFCO0FBQ0Q7QUFoQ0c7QUFBQTtBQUFBLGtEQWtDd0I7QUFDMUIsYUFBSyxTQUFMO0FBQ0Q7QUFwQ0c7QUFBQTtBQUFBLDZDQXNDbUI7QUFDckIsYUFBSyxrQkFBTDtBQUNEO0FBeENHO0FBQUE7QUFBQSwrQkEwQ0s7QUFBQSxZQUNBLEtBREEsR0FDUyxLQUFLLEtBRGQsQ0FDQSxLQURBOztBQUVQLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsaUJBQUssYUFEUDtBQUVFLHdDQUFDLFNBQUQ7QUFDRSxtQkFBTztBQURULGFBRU0sS0FBSyxLQUZYO0FBRkYsU0FERjtBQVFEO0FBcERHOztBQUFBO0FBQUEsSUFBNEIsZ0JBQU0sU0FBbEMsQ0FBTjs7QUF3REEsY0FBWSxXQUFaLGdCQUFxQyxVQUFVLFdBQS9DOztBQUVBLFNBQU8sV0FBUDtBQUNEIiwiZmlsZSI6Im1ha2UtdmlzLWZsZXhpYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuL3V0aWxzL3JlYWN0LXV0aWxzJztcbmltcG9ydCB3aW5kb3cgZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmNvbnN0IENPTlRBSU5FUl9SRUYgPSAnY29udGFpbmVyJztcblxuLy8gQXMgYSBwZXJmb3JtYW5jZSBlbmhhbmNlbWVudCwgd2Ugd2FudCB0byBvbmx5IGxpc3RlbiBvbmNlXG5jb25zdCByZXNpemVTdWJzY3JpYmVycyA9IFtdO1xuY29uc3QgREVCT1VOQ0VfRFVSQVRJT04gPSAxMDA7XG5sZXQgdGltZW91dElkID0gbnVsbDtcblxuLyoqXG4gKiBDYWxscyBlYWNoIHN1YnNjcmliZXIsIGRlYm91bmNlZCB0byB0aGVcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2VFbWl0UmVzaXplKCkge1xuICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGVtaXRSZXNpemUsIERFQk9VTkNFX0RVUkFUSU9OKTtcbn1cblxuLyoqXG4gKiBDYWxscyBlYWNoIHN1YnNjcmliZXIgb25jZSBzeW5jcm9ub3VzbHkuXG4gKi9cbmZ1bmN0aW9uIGVtaXRSZXNpemUoKSB7XG4gIHJlc2l6ZVN1YnNjcmliZXJzLmZvckVhY2goY2IgPT4gY2IoKSk7XG59XG5cbi8qKlxuICogQWRkIHRoZSBnaXZlbiBjYWxsYmFjayB0byB0aGUgbGlzdCBvZiBzdWJzY3JpYmVycyB0byBiZSBjYWxlZCB3aGVuIHRoZVxuICogd2luZG93IHJlc2l6ZXMuIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgcmVtb3ZlcyB0aGUgZ2l2ZW5cbiAqIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Qgb2Ygc3Vic2NyaWJlcnMuIFRoaXMgZnVuY3Rpb24gaXMgYWxzbyByZXNwb3NpYmxlIGZvclxuICogYWRkaW5nIGFuZCByZW1vdmluZyB0aGUgcmVzaXplIGxpc3RlbmVyIG9uIGB3aW5kb3dgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gU3Vic2NyaWJlciBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVbnN1YnNjcmliZSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBzdWJzY3JpYmVUb0RlYm91bmNlZFJlc2l6ZShjYikge1xuICByZXNpemVTdWJzY3JpYmVycy5wdXNoKGNiKTtcblxuICAvLyBpZiB3ZSBnbyBmcm9tIHplcm8gdG8gb25lIEZsZXhpYmxlIGNvbXBvbmVudHMgaW5zdGFuY2VzLCBhZGQgdGhlIGxpc3RlbmVyXG4gIGlmIChyZXNpemVTdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VFbWl0UmVzaXplKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgcmVtb3ZlU3Vic2NyaWJlcihyZXNpemVTdWJzY3JpYmVycywgY2IpO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBubyBGbGV4aWJsZSBjb21wb25lbnRzLCByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgaWYgKHJlc2l6ZVN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlRW1pdFJlc2l6ZSk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgcmVtb3ZpbmcgdGhlIGdpdmVuIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Qgb2Ygc3Vic2NyaWJlcnMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlbSAtIFN1YnNjcmliZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlU3Vic2NyaWJlcihpdGVtKSB7XG4gIGNvbnN0IGluZGV4ID0gcmVzaXplU3Vic2NyaWJlcnMuaW5kZXhPZihpdGVtKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICByZXNpemVTdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIHRoZSBhYmlsaXR5IHRvIHN0cmV0Y2ggdGhlIHZpc3VhbGl6YXRpb24gb24gd2luZG93IHJlc2l6ZS5cbiAqIEBwYXJhbSB7Kn0gQ29tcG9uZW50IFJlYWN0IGNsYXNzIGZvciB0aGUgY2hpbGQgY29tcG9uZW50LlxuICogQHJldHVybnMgeyp9IEZsZXhpYmxlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVZpc0ZsZXhpYmxlKENvbXBvbmVudCkge1xuXG4gIGNvbnN0IFJlc3VsdENsYXNzID0gY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICBjb25zdCB7d2lkdGgsIC4uLm90aGVyUHJvcFR5cGVzfSA9IENvbXBvbmVudC5wcm9wVHlwZXM7XG4gICAgICByZXR1cm4gb3RoZXJQcm9wVHlwZXM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHdpZHRoOiAwXG4gICAgICB9O1xuICAgICAgdGhpcy5fb25SZXNpemUgPSB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgd2lkdGggb2YgdGhlIGNvbnRhaW5lciBhbmQgYXNzaWduIHRoZSB3aWR0aC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vblJlc2l6ZSgpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBnZXRET01Ob2RlKHRoaXMucmVmc1tDT05UQUlORVJfUkVGXSk7XG4gICAgICBjb25zdCBvZmZzZXRXaWR0aCA9IGNvbnRhaW5lckVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICBpZiAodGhpcy5zdGF0ZS53aWR0aCAhPT0gb2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgd2lkdGg6IG9mZnNldFdpZHRoXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fb25SZXNpemUoKTtcbiAgICAgIHRoaXMuY2FuY2VsU3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlVG9EZWJvdW5jZWRSZXNpemUodGhpcy5fb25SZXNpemUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5jYW5jZWxTdWJzY3JpcHRpb24oKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7d2lkdGh9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e0NPTlRBSU5FUl9SRUZ9PlxuICAgICAgICAgIDxDb21wb25lbnRcbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgfTtcblxuICBSZXN1bHRDbGFzcy5kaXNwbGF5TmFtZSA9IGBGbGV4aWJsZSR7Q29tcG9uZW50LmRpc3BsYXlOYW1lfWA7XG5cbiAgcmV0dXJuIFJlc3VsdENsYXNzO1xufVxuIl19