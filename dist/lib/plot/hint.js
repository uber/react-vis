'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _scalesUtils = require('../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ORIENTATION_AUTO = 'auto';
var ORIENTATION_TOPLEFT = 'topleft';
var ORIENTATION_BOTTOMLEFT = 'bottomleft';
var ORIENTATION_TOPRIGHT = 'topright';
var ORIENTATION_BOTTOMRIGHT = 'bottomright';

/**
 * Default format function for the value.
 * @param {Object} value Value.
 * @returns {Array} title-value pairs.
 */
function defaultFormat(value) {
  return Object.keys(value).map(function getProp(key) {
    return { title: key, value: value[key] };
  });
}

var Hint = function (_PureRenderComponent) {
  _inherits(Hint, _PureRenderComponent);

  function Hint() {
    _classCallCheck(this, Hint);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Hint).apply(this, arguments));
  }

  _createClass(Hint, [{
    key: '_getCSSRight',


    /**
     * Get the right coordinate of the hint.
     * @param {number} x X.
     * @returns {{right: *}} Mixin.
     * @private
     */
    value: function _getCSSRight(x) {
      var _props = this.props;
      var innerWidth = _props.innerWidth;
      var marginRight = _props.marginRight;

      return {
        right: marginRight + innerWidth - x + 'px'
      };
    }

    /**
     * Get the left coordinate of the hint.
     * @param {number} x X.
     * @returns {{left: *}} Mixin.
     * @private
     */

  }, {
    key: '_getCSSLeft',
    value: function _getCSSLeft(x) {
      var marginLeft = this.props.marginLeft;

      return {
        left: marginLeft + x + 'px'
      };
    }

    /**
     * Get the bottom coordinate of the hint.
     * @param {number} y Y.
     * @returns {{bottom: *}} Mixin.
     * @private
     */

  }, {
    key: '_getCSSBottom',
    value: function _getCSSBottom(y) {
      var _props2 = this.props;
      var innerHeight = _props2.innerHeight;
      var marginBottom = _props2.marginBottom;

      return {
        bottom: marginBottom + innerHeight - y + 'px'
      };
    }

    /**
     * Get the top coordinate of the hint.
     * @param {number} y Y.
     * @returns {{top: *}} Mixin.
     * @private
     */

  }, {
    key: '_getCSSTop',
    value: function _getCSSTop(y) {
      var marginTop = this.props.marginTop;

      return {
        top: marginTop + y + 'px'
      };
    }

    /**
     * Convert the "automatic" orientation to the real one depending on the values
     * of x and y.
     * @param {number} x X value.
     * @param {number} y Y value.
     * @returns {string} Orientation.
     * @private
     */

  }, {
    key: '_getOrientationFromAuto',
    value: function _getOrientationFromAuto(x, y) {
      var _props3 = this.props;
      var innerWidth = _props3.innerWidth;
      var innerHeight = _props3.innerHeight;

      if (x > innerWidth / 2) {
        if (y > innerHeight / 2) {
          return ORIENTATION_TOPLEFT;
        }
        return ORIENTATION_BOTTOMLEFT;
      }
      if (y > innerHeight / 2) {
        return ORIENTATION_TOPRIGHT;
      }
      return ORIENTATION_BOTTOMRIGHT;
    }

    /**
     * Get a CSS mixin for a proper positioning of the element.
     * @param {string} orientation Orientation.
     * @param {number} x X position.
     * @param {number} y Y position.
     * @returns {Object} Object, that may contain `left` or `right, `top` or
     * `bottom` properties.
     * @private
     */

  }, {
    key: '_getOrientationStyle',
    value: function _getOrientationStyle(orientation, x, y) {
      var xCSS = void 0;
      var yCSS = void 0;

      if (orientation === ORIENTATION_BOTTOMLEFT || orientation === ORIENTATION_BOTTOMRIGHT) {
        yCSS = this._getCSSTop(y);
      } else {
        yCSS = this._getCSSBottom(y);
      }
      if (orientation === ORIENTATION_TOPLEFT || orientation === ORIENTATION_BOTTOMLEFT) {
        xCSS = this._getCSSRight(x);
      } else {
        xCSS = this._getCSSLeft(x);
      }

      return _extends({}, xCSS, yCSS);
    }

    /**
     * Get the class name from orientation value.
     * @param {string} orientation Orientation.
     * @returns {string} Class name.
     * @private
     */

  }, {
    key: '_getOrientationClassName',
    value: function _getOrientationClassName(orientation) {
      return 'rv-hint--orientation-' + orientation;
    }

    /**
     * Get the position for the hint and the appropriate class name.
     * @returns {{style: Object, className: string}} Style and className for the
     * hint.
     * @private
     */

  }, {
    key: '_getPositionInfo',
    value: function _getPositionInfo() {
      var _props4 = this.props;
      var value = _props4.value;
      var initialOrientation = _props4.orientation;


      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x')(value);
      var y = (0, _scalesUtils.getAttributeFunctor)(this.props, 'y')(value);

      var orientation = initialOrientation === ORIENTATION_AUTO ? this._getOrientationFromAuto(x, y) : initialOrientation;

      return {
        style: this._getOrientationStyle(orientation, x, y),
        className: this._getOrientationClassName(orientation)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var value = _props5.value;
      var format = _props5.format;
      var children = _props5.children;

      var _getPositionInfo2 = this._getPositionInfo();

      var style = _getPositionInfo2.style;
      var className = _getPositionInfo2.className;

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-hint ' + className,
          style: _extends({}, style, {
            position: 'absolute'
          }) },
        children ? children : _react2.default.createElement(
          'div',
          { className: 'rv-hint__content' },
          format(value).map(function (formattedProp, i) {
            return _react2.default.createElement(
              'div',
              { key: 'rv-hint' + i },
              _react2.default.createElement(
                'span',
                { className: 'rv-hint__title' },
                formattedProp.title
              ),
              ': ',
              _react2.default.createElement(
                'span',
                { className: 'rv-hint__value' },
                formattedProp.value
              )
            );
          })
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        marginTop: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        innerWidth: _react2.default.PropTypes.number,
        innerHeight: _react2.default.PropTypes.number,
        scales: _react2.default.PropTypes.object,
        value: _react2.default.PropTypes.object,
        format: _react2.default.PropTypes.func,
        orientation: _react2.default.PropTypes.oneOf([ORIENTATION_AUTO, ORIENTATION_BOTTOMLEFT, ORIENTATION_BOTTOMRIGHT, ORIENTATION_TOPLEFT, ORIENTATION_TOPRIGHT])
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        format: defaultFormat,
        orientation: ORIENTATION_AUTO
      };
    }
  }]);

  return Hint;
}(_pureRenderComponent2.default);

Hint.displayName = 'Hint';

exports.default = Hint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC9oaW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxtQkFBbUIsTUFBekI7QUFDQSxJQUFNLHNCQUFzQixTQUE1QjtBQUNBLElBQU0seUJBQXlCLFlBQS9CO0FBQ0EsSUFBTSx1QkFBdUIsVUFBN0I7QUFDQSxJQUFNLDBCQUEwQixhQUFoQzs7Ozs7OztBQU9BLFNBQVMsYUFBVCxDQUF1QixLQUF2QixFQUE4QjtBQUM1QixTQUFPLE9BQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsR0FBbkIsQ0FBdUIsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2xELFdBQU8sRUFBQyxPQUFPLEdBQVIsRUFBYSxPQUFPLE1BQU0sR0FBTixDQUFwQixFQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0lBRUssSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FrQ1MsQyxFQUFHO0FBQUEsbUJBR0csS0FBSyxLQUhSO0FBQUEsVUFFWixVQUZZLFVBRVosVUFGWTtBQUFBLFVBR1osV0FIWSxVQUdaLFdBSFk7O0FBSWQsYUFBTztBQUNMLGVBQVUsY0FBYyxVQUFkLEdBQTJCLENBQXJDO0FBREssT0FBUDtBQUdEOzs7Ozs7Ozs7OztnQ0FRVyxDLEVBQUc7QUFBQSxVQUNOLFVBRE0sR0FDUSxLQUFLLEtBRGIsQ0FDTixVQURNOztBQUViLGFBQU87QUFDTCxjQUFTLGFBQWEsQ0FBdEI7QUFESyxPQUFQO0FBR0Q7Ozs7Ozs7Ozs7O2tDQVFhLEMsRUFBRztBQUFBLG9CQUdHLEtBQUssS0FIUjtBQUFBLFVBRWIsV0FGYSxXQUViLFdBRmE7QUFBQSxVQUdiLFlBSGEsV0FHYixZQUhhOztBQUlmLGFBQU87QUFDTCxnQkFBVyxlQUFlLFdBQWYsR0FBNkIsQ0FBeEM7QUFESyxPQUFQO0FBR0Q7Ozs7Ozs7Ozs7OytCQVFVLEMsRUFBRztBQUFBLFVBQ0wsU0FESyxHQUNRLEtBQUssS0FEYixDQUNMLFNBREs7O0FBRVosYUFBTztBQUNMLGFBQVEsWUFBWSxDQUFwQjtBQURLLE9BQVA7QUFHRDs7Ozs7Ozs7Ozs7Ozs0Q0FVdUIsQyxFQUFHLEMsRUFBRztBQUFBLG9CQUdYLEtBQUssS0FITTtBQUFBLFVBRTFCLFVBRjBCLFdBRTFCLFVBRjBCO0FBQUEsVUFHMUIsV0FIMEIsV0FHMUIsV0FIMEI7O0FBSTVCLFVBQUksSUFBSSxhQUFhLENBQXJCLEVBQXdCO0FBQ3RCLFlBQUksSUFBSSxjQUFjLENBQXRCLEVBQXlCO0FBQ3ZCLGlCQUFPLG1CQUFQO0FBQ0Q7QUFDRCxlQUFPLHNCQUFQO0FBQ0Q7QUFDRCxVQUFJLElBQUksY0FBYyxDQUF0QixFQUF5QjtBQUN2QixlQUFPLG9CQUFQO0FBQ0Q7QUFDRCxhQUFPLHVCQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O3lDQVdvQixXLEVBQWEsQyxFQUFHLEMsRUFBRztBQUN0QyxVQUFJLGFBQUo7QUFDQSxVQUFJLGFBQUo7O0FBRUEsVUFBSSxnQkFBZ0Isc0JBQWhCLElBQ0YsZ0JBQWdCLHVCQURsQixFQUMyQztBQUN6QyxlQUFPLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsZUFBTyxLQUFLLGFBQUwsQ0FBbUIsQ0FBbkIsQ0FBUDtBQUNEO0FBQ0QsVUFBSSxnQkFBZ0IsbUJBQWhCLElBQ0YsZ0JBQWdCLHNCQURsQixFQUMwQztBQUN4QyxlQUFPLEtBQUssWUFBTCxDQUFrQixDQUFsQixDQUFQO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsZUFBTyxLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUNEOztBQUVELDBCQUNLLElBREwsRUFFSyxJQUZMO0FBSUQ7Ozs7Ozs7Ozs7OzZDQVF3QixXLEVBQWE7QUFDcEMsdUNBQStCLFdBQS9CO0FBQ0Q7Ozs7Ozs7Ozs7O3VDQVFrQjtBQUFBLG9CQUdvQixLQUFLLEtBSHpCO0FBQUEsVUFFZixLQUZlLFdBRWYsS0FGZTtBQUFBLFVBR0Ysa0JBSEUsV0FHZixXQUhlOzs7QUFLakIsVUFBTSxJQUFJLHNDQUFvQixLQUFLLEtBQXpCLEVBQWdDLEdBQWhDLEVBQXFDLEtBQXJDLENBQVY7QUFDQSxVQUFNLElBQUksc0NBQW9CLEtBQUssS0FBekIsRUFBZ0MsR0FBaEMsRUFBcUMsS0FBckMsQ0FBVjs7QUFFQSxVQUFNLGNBQWMsdUJBQXVCLGdCQUF2QixHQUNsQixLQUFLLHVCQUFMLENBQTZCLENBQTdCLEVBQWdDLENBQWhDLENBRGtCLEdBQ21CLGtCQUR2Qzs7QUFHQSxhQUFPO0FBQ0wsZUFBTyxLQUFLLG9CQUFMLENBQTBCLFdBQTFCLEVBQXVDLENBQXZDLEVBQTBDLENBQTFDLENBREY7QUFFTCxtQkFBVyxLQUFLLHdCQUFMLENBQThCLFdBQTlCO0FBRk4sT0FBUDtBQUlEOzs7NkJBRVE7QUFBQSxvQkFJTyxLQUFLLEtBSlo7QUFBQSxVQUVMLEtBRkssV0FFTCxLQUZLO0FBQUEsVUFHTCxNQUhLLFdBR0wsTUFISztBQUFBLFVBSUwsUUFKSyxXQUlMLFFBSks7O0FBQUEsOEJBTW9CLEtBQUssZ0JBQUwsRUFOcEI7O0FBQUEsVUFNQSxLQU5BLHFCQU1BLEtBTkE7QUFBQSxVQU1PLFNBTlAscUJBTU8sU0FOUDs7QUFPUCxhQUNFO0FBQUE7QUFBQTtBQUNFLGtDQUFzQixTQUR4QjtBQUVFLDhCQUNNLEtBRE47QUFFRSxzQkFBVTtBQUZaLFlBRkY7QUFNRyxtQkFDQyxRQURELEdBRUM7QUFBQTtBQUFBLFlBQUssV0FBVSxrQkFBZjtBQUNHLGlCQUFPLEtBQVAsRUFBYyxHQUFkLENBQWtCLFVBQUMsYUFBRCxFQUFnQixDQUFoQjtBQUFBLG1CQUNqQjtBQUFBO0FBQUEsZ0JBQUssaUJBQWUsQ0FBcEI7QUFDRTtBQUFBO0FBQUEsa0JBQU0sV0FBVSxnQkFBaEI7QUFBa0MsOEJBQWM7QUFBaEQsZUFERjtBQUVHLGtCQUZIO0FBR0U7QUFBQTtBQUFBLGtCQUFNLFdBQVUsZ0JBQWhCO0FBQWtDLDhCQUFjO0FBQWhEO0FBSEYsYUFEaUI7QUFBQSxXQUFsQjtBQURIO0FBUkosT0FERjtBQXFCRDs7O3dCQXZNc0I7QUFDckIsYUFBTztBQUNMLG1CQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsTUFEdEI7QUFFTCxvQkFBWSxnQkFBTSxTQUFOLENBQWdCLE1BRnZCO0FBR0wsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUh2QjtBQUlMLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKeEI7QUFLTCxnQkFBUSxnQkFBTSxTQUFOLENBQWdCLE1BTG5CO0FBTUwsZUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BTmxCO0FBT0wsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixJQVBuQjtBQVFMLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsQ0FDakMsZ0JBRGlDLEVBRWpDLHNCQUZpQyxFQUdqQyx1QkFIaUMsRUFJakMsbUJBSmlDLEVBS2pDLG9CQUxpQyxDQUF0QjtBQVJSLE9BQVA7QUFnQkQ7Ozt3QkFFeUI7QUFDeEIsYUFBTztBQUNMLGdCQUFRLGFBREg7QUFFTCxxQkFBYTtBQUZSLE9BQVA7QUFJRDs7Ozs7O0FBa0xILEtBQUssV0FBTCxHQUFtQixNQUFuQjs7a0JBRWUsSSIsImZpbGUiOiJoaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFB1cmVSZW5kZXJDb21wb25lbnQgZnJvbSAnLi4vcHVyZS1yZW5kZXItY29tcG9uZW50JztcbmltcG9ydCB7Z2V0QXR0cmlidXRlRnVuY3Rvcn0gZnJvbSAnLi4vdXRpbHMvc2NhbGVzLXV0aWxzJztcblxuY29uc3QgT1JJRU5UQVRJT05fQVVUTyA9ICdhdXRvJztcbmNvbnN0IE9SSUVOVEFUSU9OX1RPUExFRlQgPSAndG9wbGVmdCc7XG5jb25zdCBPUklFTlRBVElPTl9CT1RUT01MRUZUID0gJ2JvdHRvbWxlZnQnO1xuY29uc3QgT1JJRU5UQVRJT05fVE9QUklHSFQgPSAndG9wcmlnaHQnO1xuY29uc3QgT1JJRU5UQVRJT05fQk9UVE9NUklHSFQgPSAnYm90dG9tcmlnaHQnO1xuXG4vKipcbiAqIERlZmF1bHQgZm9ybWF0IGZ1bmN0aW9uIGZvciB0aGUgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IHRpdGxlLXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Rm9ybWF0KHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkubWFwKGZ1bmN0aW9uIGdldFByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIHt0aXRsZToga2V5LCB2YWx1ZTogdmFsdWVba2V5XX07XG4gIH0pO1xufVxuXG5jbGFzcyBIaW50IGV4dGVuZHMgUHVyZVJlbmRlckNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hcmdpblRvcDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG1hcmdpbkxlZnQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBpbm5lcldpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgaW5uZXJIZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBzY2FsZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGZvcm1hdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvcmllbnRhdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgICAgT1JJRU5UQVRJT05fQVVUTyxcbiAgICAgICAgT1JJRU5UQVRJT05fQk9UVE9NTEVGVCxcbiAgICAgICAgT1JJRU5UQVRJT05fQk9UVE9NUklHSFQsXG4gICAgICAgIE9SSUVOVEFUSU9OX1RPUExFRlQsXG4gICAgICAgIE9SSUVOVEFUSU9OX1RPUFJJR0hUXG4gICAgICBdKVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgICAgb3JpZW50YXRpb246IE9SSUVOVEFUSU9OX0FVVE9cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmlnaHQgY29vcmRpbmF0ZSBvZiB0aGUgaGludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggWC5cbiAgICogQHJldHVybnMge3tyaWdodDogKn19IE1peGluLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENTU1JpZ2h0KHgpIHtcbiAgICBjb25zdCB7XG4gICAgICBpbm5lcldpZHRoLFxuICAgICAgbWFyZ2luUmlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgcmlnaHQ6IGAke21hcmdpblJpZ2h0ICsgaW5uZXJXaWR0aCAtIHh9cHhgXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxlZnQgY29vcmRpbmF0ZSBvZiB0aGUgaGludC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHggWC5cbiAgICogQHJldHVybnMge3tsZWZ0OiAqfX0gTWl4aW4uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0Q1NTTGVmdCh4KSB7XG4gICAgY29uc3Qge21hcmdpbkxlZnR9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogYCR7bWFyZ2luTGVmdCArIHh9cHhgXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJvdHRvbSBjb29yZGluYXRlIG9mIHRoZSBoaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBZLlxuICAgKiBAcmV0dXJucyB7e2JvdHRvbTogKn19IE1peGluLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENTU0JvdHRvbSh5KSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICBtYXJnaW5Cb3R0b219ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgYm90dG9tOiBgJHttYXJnaW5Cb3R0b20gKyBpbm5lckhlaWdodCAtIHl9cHhgXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRvcCBjb29yZGluYXRlIG9mIHRoZSBoaW50LlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBZLlxuICAgKiBAcmV0dXJucyB7e3RvcDogKn19IE1peGluLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENTU1RvcCh5KSB7XG4gICAgY29uc3Qge21hcmdpblRvcH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IGAke21hcmdpblRvcCArIHl9cHhgXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBcImF1dG9tYXRpY1wiIG9yaWVudGF0aW9uIHRvIHRoZSByZWFsIG9uZSBkZXBlbmRpbmcgb24gdGhlIHZhbHVlc1xuICAgKiBvZiB4IGFuZCB5LlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBYIHZhbHVlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBZIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBPcmllbnRhdGlvbi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRPcmllbnRhdGlvbkZyb21BdXRvKHgsIHkpIHtcbiAgICBjb25zdCB7XG4gICAgICBpbm5lcldpZHRoLFxuICAgICAgaW5uZXJIZWlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoeCA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBpZiAoeSA+IGlubmVySGVpZ2h0IC8gMikge1xuICAgICAgICByZXR1cm4gT1JJRU5UQVRJT05fVE9QTEVGVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPUklFTlRBVElPTl9CT1RUT01MRUZUO1xuICAgIH1cbiAgICBpZiAoeSA+IGlubmVySGVpZ2h0IC8gMikge1xuICAgICAgcmV0dXJuIE9SSUVOVEFUSU9OX1RPUFJJR0hUO1xuICAgIH1cbiAgICByZXR1cm4gT1JJRU5UQVRJT05fQk9UVE9NUklHSFQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgQ1NTIG1peGluIGZvciBhIHByb3BlciBwb3NpdGlvbmluZyBvZiB0aGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uIE9yaWVudGF0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBYIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBZIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3QsIHRoYXQgbWF5IGNvbnRhaW4gYGxlZnRgIG9yIGByaWdodCwgYHRvcGAgb3JcbiAgICogYGJvdHRvbWAgcHJvcGVydGllcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRPcmllbnRhdGlvblN0eWxlKG9yaWVudGF0aW9uLCB4LCB5KSB7XG4gICAgbGV0IHhDU1M7XG4gICAgbGV0IHlDU1M7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09IE9SSUVOVEFUSU9OX0JPVFRPTUxFRlQgfHxcbiAgICAgIG9yaWVudGF0aW9uID09PSBPUklFTlRBVElPTl9CT1RUT01SSUdIVCkge1xuICAgICAgeUNTUyA9IHRoaXMuX2dldENTU1RvcCh5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgeUNTUyA9IHRoaXMuX2dldENTU0JvdHRvbSh5KTtcbiAgICB9XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBPUklFTlRBVElPTl9UT1BMRUZUIHx8XG4gICAgICBvcmllbnRhdGlvbiA9PT0gT1JJRU5UQVRJT05fQk9UVE9NTEVGVCkge1xuICAgICAgeENTUyA9IHRoaXMuX2dldENTU1JpZ2h0KHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4Q1NTID0gdGhpcy5fZ2V0Q1NTTGVmdCh4KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ueENTUyxcbiAgICAgIC4uLnlDU1NcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2xhc3MgbmFtZSBmcm9tIG9yaWVudGF0aW9uIHZhbHVlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb24gT3JpZW50YXRpb24uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IENsYXNzIG5hbWUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0T3JpZW50YXRpb25DbGFzc05hbWUob3JpZW50YXRpb24pIHtcbiAgICByZXR1cm4gYHJ2LWhpbnQtLW9yaWVudGF0aW9uLSR7b3JpZW50YXRpb259YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBvc2l0aW9uIGZvciB0aGUgaGludCBhbmQgdGhlIGFwcHJvcHJpYXRlIGNsYXNzIG5hbWUuXG4gICAqIEByZXR1cm5zIHt7c3R5bGU6IE9iamVjdCwgY2xhc3NOYW1lOiBzdHJpbmd9fSBTdHlsZSBhbmQgY2xhc3NOYW1lIGZvciB0aGVcbiAgICogaGludC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRQb3NpdGlvbkluZm8oKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWUsXG4gICAgICBvcmllbnRhdGlvbjogaW5pdGlhbE9yaWVudGF0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB4ID0gZ2V0QXR0cmlidXRlRnVuY3Rvcih0aGlzLnByb3BzLCAneCcpKHZhbHVlKTtcbiAgICBjb25zdCB5ID0gZ2V0QXR0cmlidXRlRnVuY3Rvcih0aGlzLnByb3BzLCAneScpKHZhbHVlKTtcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gaW5pdGlhbE9yaWVudGF0aW9uID09PSBPUklFTlRBVElPTl9BVVRPID9cbiAgICAgIHRoaXMuX2dldE9yaWVudGF0aW9uRnJvbUF1dG8oeCwgeSkgOiBpbml0aWFsT3JpZW50YXRpb247XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3R5bGU6IHRoaXMuX2dldE9yaWVudGF0aW9uU3R5bGUob3JpZW50YXRpb24sIHgsIHkpLFxuICAgICAgY2xhc3NOYW1lOiB0aGlzLl9nZXRPcmllbnRhdGlvbkNsYXNzTmFtZShvcmllbnRhdGlvbilcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgICAgZm9ybWF0LFxuICAgICAgY2hpbGRyZW59ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtzdHlsZSwgY2xhc3NOYW1lfSA9IHRoaXMuX2dldFBvc2l0aW9uSW5mbygpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHJ2LWhpbnQgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi4gc3R5bGUsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgfX0+XG4gICAgICAgIHtjaGlsZHJlbiA/XG4gICAgICAgICAgY2hpbGRyZW4gOlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnYtaGludF9fY29udGVudFwiPlxuICAgICAgICAgICAge2Zvcm1hdCh2YWx1ZSkubWFwKChmb3JtYXR0ZWRQcm9wLCBpKSA9PlxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHJ2LWhpbnQke2l9YH0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnYtaGludF9fdGl0bGVcIj57Zm9ybWF0dGVkUHJvcC50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgeyc6ICd9XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnYtaGludF9fdmFsdWVcIj57Zm9ybWF0dGVkUHJvcC52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5IaW50LmRpc3BsYXlOYW1lID0gJ0hpbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBIaW50O1xuIl19