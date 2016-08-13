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