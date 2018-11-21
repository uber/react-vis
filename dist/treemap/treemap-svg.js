'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _polygonSeries = require('../plot/series/polygon-series');

var _polygonSeries2 = _interopRequireDefault(_polygonSeries);

var _markSeries = require('../plot/series/mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var MARGIN_ADJUST = 1.2;

var TreemapSVG = function (_React$Component) {
  _inherits(TreemapSVG, _React$Component);

  function TreemapSVG() {
    _classCallCheck(this, TreemapSVG);

    return _possibleConstructorReturn(this, (TreemapSVG.__proto__ || Object.getPrototypeOf(TreemapSVG)).apply(this, arguments));
  }

  _createClass(TreemapSVG, [{
    key: 'getCircularNodes',
    value: function getCircularNodes() {
      var _props = this.props,
          animation = _props.animation,
          hideRootNode = _props.hideRootNode,
          nodes = _props.nodes,
          onLeafMouseOver = _props.onLeafMouseOver,
          onLeafMouseOut = _props.onLeafMouseOut,
          onLeafClick = _props.onLeafClick,
          scales = _props.scales,
          style = _props.style;

      var _nodes$reduce = nodes.reduce(function (acc, node, index) {
        if (!index && hideRootNode) {
          return acc;
        }
        var x = node.x,
            y = node.y,
            r = node.r;

        return {
          maxY: Math.max(y + r, acc.maxY),
          minY: Math.min(y - r, acc.minY),
          maxX: Math.max(x + MARGIN_ADJUST * r, acc.maxX),
          minX: Math.min(x - MARGIN_ADJUST * r, acc.minX),
          rows: acc.rows.concat([{
            x: x,
            y: y,
            size: r,
            color: scales.color(node)
          }])
        };
      }, {
        rows: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      }),
          rows = _nodes$reduce.rows,
          minY = _nodes$reduce.minY,
          maxY = _nodes$reduce.maxY,
          minX = _nodes$reduce.minX,
          maxX = _nodes$reduce.maxX;

      return {
        updatedNodes: _react2.default.createElement(_markSeries2.default, {
          animation: animation,
          className: 'rv-treemap__leaf rv-treemap__leaf--circle',
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data: rows,
          colorType: 'literal',
          getColor: function getColor(d) {
            return d.color;
          },
          sizeType: 'literal',
          getSize: function getSize(d) {
            return d.size;
          },
          style: style
        }),
        minY: minY,
        maxY: maxY,
        minX: minX,
        maxX: maxX
      };
    }
  }, {
    key: 'getNonCircularNodes',
    value: function getNonCircularNodes() {
      var _props2 = this.props,
          animation = _props2.animation,
          hideRootNode = _props2.hideRootNode,
          nodes = _props2.nodes,
          onLeafMouseOver = _props2.onLeafMouseOver,
          onLeafMouseOut = _props2.onLeafMouseOut,
          onLeafClick = _props2.onLeafClick,
          scales = _props2.scales,
          style = _props2.style;
      var color = scales.color;

      return nodes.reduce(function (acc, node, index) {
        if (!index && hideRootNode) {
          return acc;
        }
        var x0 = node.x0,
            x1 = node.x1,
            y1 = node.y1,
            y0 = node.y0;

        var x = x0;
        var y = y0;
        var nodeHeight = y1 - y0;
        var nodeWidth = x1 - x0;

        acc.maxY = Math.max(y + nodeHeight, acc.maxY);
        acc.minY = Math.min(y, acc.minY);
        acc.maxX = Math.max(x + nodeWidth, acc.maxX);
        acc.minX = Math.min(x, acc.minX);

        var data = [{ x: x, y: y }, { x: x, y: y + nodeHeight }, { x: x + nodeWidth, y: y + nodeHeight }, { x: x + nodeWidth, y: y }];

        acc.updatedNodes = acc.updatedNodes.concat([_react2.default.createElement(_polygonSeries2.default, {
          animation: animation,
          className: 'rv-treemap__leaf',
          key: index,
          color: color(node),
          type: 'literal',
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data: data,
          style: _extends({}, style, node.style)
        })]);
        return acc;
      }, {
        updatedNodes: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          height = _props3.height,
          mode = _props3.mode,
          nodes = _props3.nodes,
          width = _props3.width;

      var useCirclePacking = mode === 'circlePack';

      var _ref = useCirclePacking ? this.getCircularNodes() : this.getNonCircularNodes(),
          minY = _ref.minY,
          maxY = _ref.maxY,
          minX = _ref.minX,
          maxX = _ref.maxX,
          updatedNodes = _ref.updatedNodes;

      var labels = nodes.reduce(function (acc, node) {
        if (!node.data.title) {
          return acc;
        }
        return acc.concat(_extends({}, node.data, {
          x: node.x0 || node.x,
          y: node.y0 || node.y,
          label: '' + node.data.title
        }));
      }, []);

      return _react2.default.createElement(
        _xyPlot2.default,
        _extends({
          className: 'rv-treemap ' + (useCirclePacking ? 'rv-treemap-circle-packed' : '') + ' ' + className,
          width: width,
          height: height,
          yDomain: [maxY, minY],
          xDomain: [minX, maxX],
          colorType: 'literal',
          hasTreeStructure: true
        }, this.props),
        updatedNodes,
        _react2.default.createElement(_labelSeries2.default, { data: labels })
      );
    }
  }]);

  return TreemapSVG;
}(_react2.default.Component);

TreemapSVG.displayName = 'TreemapSVG';

exports.default = TreemapSVG;