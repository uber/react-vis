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

var _treemapLeaf = require('./treemap-leaf');

var _treemapLeaf2 = _interopRequireDefault(_treemapLeaf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TreemapDOM(props) {
  var animation = props.animation,
      className = props.className,
      height = props.height,
      hideRootNode = props.hideRootNode,
      getLabel = props.getLabel,
      mode = props.mode,
      nodes = props.nodes,
      width = props.width,
      scales = props.scales,
      style = props.style;

  var useCirclePacking = mode === 'circlePack';
  return _react2.default.createElement(
    'div',
    {
      className: 'rv-treemap ' + (useCirclePacking ? 'rv-treemap-circle-packed' : '') + ' ' + className,
      style: { height: height, width: width }
    },
    nodes.map(function (node, index) {
      // throw out the rootest node
      if (hideRootNode && !index) {
        return null;
      }

      var nodeProps = _extends({
        animation: animation,
        node: node,
        getLabel: getLabel
      }, props, {
        x0: useCirclePacking ? node.x : node.x0,
        x1: useCirclePacking ? node.x : node.x1,
        y0: useCirclePacking ? node.y : node.y0,
        y1: useCirclePacking ? node.y : node.y1,
        r: useCirclePacking ? node.r : 1,
        scales: scales,
        style: style
      });
      return _react2.default.createElement(_treemapLeaf2.default, _extends({}, nodeProps, { key: 'leaf-' + index }));
    })
  );
}

TreemapDOM.displayName = 'TreemapDOM';
exports.default = TreemapDOM;