'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Interpolate = require('d3-interpolate');

var _animation = require('../../animation');

var _seriesUtils = require('../../utils/series-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_DRAWS = 30;

/**
 * Draw loop draws each of the layers until it should draw more
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 */
function engageDrawLoop(ctx, height, width, layers) {
  var drawIteration = 0;
  // using setInterval because request animation frame goes too fast
  var drawCycle = setInterval(function () {
    if (!ctx) {
      clearInterval(drawCycle);
      return;
    }
    drawLayers(ctx, height, width, layers, drawIteration);
    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }
    drawIteration += 1;
  }, 1);
}

/**
 * Loops across each of the layers to be drawn and draws them
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 * @param {Number} drawIteration - width of the canvas
 */
function drawLayers(ctx, height, width, layers, drawIteration) {
  ctx.clearRect(0, 0, width, height);
  layers.forEach(function (layer) {
    var interpolator = layer.interpolator,
        newProps = layer.newProps,
        animation = layer.animation;
    // return an empty object if dont need to be animating

    var interpolatedProps = animation ? interpolator ? interpolator(drawIteration / MAX_DRAWS) : interpolator : function () {
      return {};
    };
    layer.renderLayer(_extends({}, newProps, interpolatedProps), ctx);
  });
}

/**
 * Build an array of layer of objects the contain the method for drawing each series
 * as well as an interpolar (specifically a d3-interpolate interpolator)
 * @param {Object} newChildren the new children to be rendered.
 * @param {Object} oldChildren the old children to be rendered.
 * @returns {Array} Object for rendering
 */
function buildLayers(newChildren, oldChildren) {
  return newChildren.map(function (child, index) {
    var oldProps = oldChildren[index] ? oldChildren[index].props : {};
    var newProps = child.props;

    var oldAnimatedProps = (0, _animation.extractAnimatedPropValues)(_extends({}, oldProps, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    }));
    var newAnimatedProps = newProps ? (0, _animation.extractAnimatedPropValues)(_extends({}, newProps, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    })) : null;
    var interpolator = (0, _d3Interpolate.interpolate)(oldAnimatedProps, newAnimatedProps);

    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator: interpolator
    };
  });
}

var CanvasWrapper = function (_Component) {
  _inherits(CanvasWrapper, _Component);

  function CanvasWrapper() {
    _classCallCheck(this, CanvasWrapper);

    return _possibleConstructorReturn(this, (CanvasWrapper.__proto__ || Object.getPrototypeOf(CanvasWrapper)).apply(this, arguments));
  }

  _createClass(CanvasWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var ctx = this.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      var pixelRatio = this.props.pixelRatio;

      if (!ctx) {
        return;
      }
      ctx.scale(pixelRatio, pixelRatio);

      this.drawChildren(null, this.props, ctx);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      this.drawChildren(oldProps, this.props, this.canvas.getContext('2d'));
    }

    /**
     * Check that we can and should be animating, then kick off animations as apporpriate
     * @param {Object} newProps the new props to be interpolated to
     * @param {Object} oldProps the old props to be interpolated against
     * @param {DomRef} ctx the canvas context to be drawn on.
     * @returns {Array} Object for rendering
     */

  }, {
    key: 'drawChildren',
    value: function drawChildren(oldProps, newProps, ctx) {
      var children = newProps.children,
          innerHeight = newProps.innerHeight,
          innerWidth = newProps.innerWidth,
          marginBottom = newProps.marginBottom,
          marginLeft = newProps.marginLeft,
          marginRight = newProps.marginRight,
          marginTop = newProps.marginTop;

      if (!ctx) {
        return;
      }

      var childrenShouldAnimate = children.find(function (child) {
        return child.props.animation;
      });

      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      var layers = buildLayers(newProps.children, oldProps ? oldProps.children : []);
      // if we don't need to be animating, dont! cut short
      if (!childrenShouldAnimate) {
        drawLayers(ctx, height, width, layers);
        return;
      }

      engageDrawLoop(ctx, height, width, layers);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth,
          marginBottom = _props.marginBottom,
          marginLeft = _props.marginLeft,
          marginRight = _props.marginRight,
          marginTop = _props.marginTop,
          pixelRatio = _props.pixelRatio;


      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;

      return _react2.default.createElement(
        'div',
        { style: { left: 0, top: 0 }, className: 'rv-xy-canvas' },
        _react2.default.createElement('canvas', {
          className: 'rv-xy-canvas-element',
          height: height * pixelRatio,
          width: width * pixelRatio,
          style: {
            height: height + 'px',
            width: width + 'px'
          },
          ref: function ref(_ref) {
            return _this2.canvas = _ref;
          }
        }),
        this.props.children
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        pixelRatio: window && window.devicePixelRatio || 1
      };
    }
  }]);

  return CanvasWrapper;
}(_react.Component);

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginBottom: _propTypes2.default.number.isRequired,
  marginLeft: _propTypes2.default.number.isRequired,
  marginRight: _propTypes2.default.number.isRequired,
  marginTop: _propTypes2.default.number.isRequired,
  innerHeight: _propTypes2.default.number.isRequired,
  innerWidth: _propTypes2.default.number.isRequired,
  pixelRatio: _propTypes2.default.number.isRequired
};

exports.default = CanvasWrapper;