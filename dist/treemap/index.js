'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _d3Hierarchy = require('d3-hierarchy');

var _theme = require('../theme');

var _animation = require('../animation');

var _scalesUtils = require('../utils/scales-utils');

var _chartUtils = require('../utils/chart-utils');

var _treemapDom = require('./treemap-dom');

var _treemapDom2 = _interopRequireDefault(_treemapDom);

var _treemapSvg = require('./treemap-svg');

var _treemapSvg2 = _interopRequireDefault(_treemapSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TREEMAP_TILE_MODES = {
  squarify: _d3Hierarchy.treemapSquarify,
  resquarify: _d3Hierarchy.treemapResquarify,
  slice: _d3Hierarchy.treemapSlice,
  dice: _d3Hierarchy.treemapDice,
  slicedice: _d3Hierarchy.treemapSliceDice,
  binary: _d3Hierarchy.treemapBinary
};

var TREEMAP_LAYOUT_MODES = ['circlePack', 'partition', 'partition-pivot'];

var NOOP = function NOOP(d) {
  return d;
};

var ATTRIBUTES = ['opacity', 'color'];

var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

/**
 * Get the map of scale functions from the given props.
 * @param {Object} props Props for the component.
 * @returns {Object} Map of scale functions.
 * @private
 */
function _getScaleFns(props) {
  var data = props.data;

  var allData = data.children || [];

  // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.
  var compatibleProps = _extends({}, props, (0, _scalesUtils.getMissingScaleProps)(props, allData, ATTRIBUTES), {
    _allData: allData
  });
  return {
    opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
    color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
  };
}

var Treemap = function (_React$Component) {
  _inherits(Treemap, _React$Component);

  function Treemap(props) {
    _classCallCheck(this, Treemap);

    var _this = _possibleConstructorReturn(this, (Treemap.__proto__ || Object.getPrototypeOf(Treemap)).call(this, props));

    _this.state = _extends({
      scales: _getScaleFns(props)
    }, (0, _chartUtils.getInnerDimensions)(props, props.margin));
    return _this;
  }

  _createClass(Treemap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(_extends({
        scales: _getScaleFns(props)
      }, (0, _chartUtils.getInnerDimensions)(props, props.margin)));
    }

    /**
     * Create the list of nodes to render.
     * @returns {Array} Array of nodes.
     * @private
     */

  }, {
    key: '_getNodesToRender',
    value: function _getNodesToRender() {
      var _state = this.state,
          innerWidth = _state.innerWidth,
          innerHeight = _state.innerHeight;
      var _props = this.props,
          data = _props.data,
          mode = _props.mode,
          padding = _props.padding,
          sortFunction = _props.sortFunction,
          getSize = _props.getSize;

      if (!data) {
        return [];
      }

      if (mode === 'partition' || mode === 'partition-pivot') {
        var partitionFunction = (0, _d3Hierarchy.partition)().size(mode === 'partition-pivot' ? [innerHeight, innerWidth] : [innerWidth, innerHeight]).padding(padding);
        var _structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
          return sortFunction(a, b, getSize);
        });
        var mappedNodes = partitionFunction(_structuredInput).descendants();
        if (mode === 'partition-pivot') {
          return mappedNodes.map(function (node) {
            return _extends({}, node, {
              x0: node.y0,
              x1: node.y1,
              y0: node.x0,
              y1: node.x1
            });
          });
        }
        return mappedNodes;
      }
      if (mode === 'circlePack') {
        var packingFunction = (0, _d3Hierarchy.pack)().size([innerWidth, innerHeight]).padding(padding);
        var _structuredInput2 = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
          return sortFunction(a, b, getSize);
        });
        return packingFunction(_structuredInput2).descendants();
      }

      var tileFn = TREEMAP_TILE_MODES[mode];
      var treemapingFunction = (0, _d3Hierarchy.treemap)(tileFn).tile(tileFn).size([innerWidth, innerHeight]).padding(padding);
      var structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
        return sortFunction(a, b, getSize);
      });
      return treemapingFunction(structuredInput).descendants();
    }
  }, {
    key: 'render',
    value: function render() {
      var renderMode = this.props.renderMode;
      var scales = this.state.scales;

      var nodes = this._getNodesToRender();
      var TreemapElement = renderMode === 'SVG' ? _treemapSvg2.default : _treemapDom2.default;
      return _react2.default.createElement(TreemapElement, _extends({}, this.props, { nodes: nodes, scales: scales }));
    }
  }]);

  return Treemap;
}(_react2.default.Component);

Treemap.displayName = 'Treemap';
Treemap.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes2.default.string,
  data: _propTypes2.default.object.isRequired,
  height: _propTypes2.default.number.isRequired,
  hideRootNode: _propTypes2.default.bool,
  margin: _chartUtils.MarginPropType,
  mode: _propTypes2.default.oneOf(Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)),
  onLeafClick: _propTypes2.default.func,
  onLeafMouseOver: _propTypes2.default.func,
  onLeafMouseOut: _propTypes2.default.func,
  useCirclePacking: _propTypes2.default.bool,
  padding: _propTypes2.default.number.isRequired,
  sortFunction: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired,
  getSize: _propTypes2.default.func,
  getColor: _propTypes2.default.func
};

Treemap.defaultProps = {
  className: '',
  colorRange: _theme.CONTINUOUS_COLOR_RANGE,
  _colorValue: _theme.DEFAULT_COLOR,
  data: {
    children: []
  },
  hideRootNode: false,
  margin: DEFAULT_MARGINS,
  mode: 'squarify',
  onLeafClick: NOOP,
  onLeafMouseOver: NOOP,
  onLeafMouseOut: NOOP,
  opacityType: _theme.OPACITY_TYPE,
  _opacityValue: _theme.DEFAULT_OPACITY,
  padding: 1,
  sortFunction: function sortFunction(a, b, accessor) {
    if (!accessor) {
      return 0;
    }
    return accessor(a) - accessor(b);
  },
  getSize: function getSize(d) {
    return d.size;
  },
  getColor: function getColor(d) {
    return d.color;
  },
  getLabel: function getLabel(d) {
    return d.title;
  }
};
exports.default = Treemap;