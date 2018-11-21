'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _animation = require('../animation');

var _animation2 = _interopRequireDefault(_animation);

var _scalesUtils = require('../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANIMATED_PROPS = ['colorRange', 'colorDomain', 'color', 'opacityRange', 'opacityDomain', 'opacity', 'x0', 'x1', 'y0', 'y1', 'r'];

function TreemapLeaf(props) {
  var animation = props.animation,
      getLabel = props.getLabel,
      mode = props.mode,
      node = props.node,
      onLeafClick = props.onLeafClick,
      onLeafMouseOver = props.onLeafMouseOver,
      onLeafMouseOut = props.onLeafMouseOut,
      r = props.r,
      scales = props.scales,
      x0 = props.x0,
      x1 = props.x1,
      y0 = props.y0,
      y1 = props.y1,
      style = props.style;


  if (animation) {
    return _react2.default.createElement(
      _animation2.default,
      _extends({}, props, { animatedProps: ANIMATED_PROPS }),
      _react2.default.createElement(TreemapLeaf, _extends({}, props, { animation: null }))
    );
  }
  var useCirclePacking = mode === 'circlePack';
  var background = scales.color(node);
  var opacity = scales.opacity(node);
  var color = (0, _scalesUtils.getFontColorFromBackground)(background);
  var data = node.data;

  var title = getLabel(data);
  var leafStyle = _extends({
    top: useCirclePacking ? y0 - r : y0,
    left: useCirclePacking ? x0 - r : x0,
    width: useCirclePacking ? r * 2 : x1 - x0,
    height: useCirclePacking ? r * 2 : y1 - y0,
    background: background,
    opacity: opacity,
    color: color
  }, style, node.data.style);

  return _react2.default.createElement(
    'div',
    {
      className: 'rv-treemap__leaf ' + (useCirclePacking ? 'rv-treemap__leaf--circle' : ''),
      onMouseEnter: function onMouseEnter(event) {
        return onLeafMouseOver(node, event);
      },
      onMouseLeave: function onMouseLeave(event) {
        return onLeafMouseOut(node, event);
      },
      onClick: function onClick(event) {
        return onLeafClick(node, event);
      },
      style: leafStyle
    },
    _react2.default.createElement(
      'div',
      { className: 'rv-treemap__leaf__content' },
      title
    )
  );
}

TreemapLeaf.propTypes = {
  animation: _animation.AnimationPropType,
  height: _propTypes2.default.number.isRequired,
  mode: _propTypes2.default.string,
  node: _propTypes2.default.object.isRequired,
  onLeafClick: _propTypes2.default.func,
  onLeafMouseOver: _propTypes2.default.func,
  onLeafMouseOut: _propTypes2.default.func,
  scales: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  r: _propTypes2.default.number.isRequired,
  x0: _propTypes2.default.number.isRequired,
  x1: _propTypes2.default.number.isRequired,
  y0: _propTypes2.default.number.isRequired,
  y1: _propTypes2.default.number.isRequired
};
exports.default = TreemapLeaf;