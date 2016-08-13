'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Hierarchy = require('d3-hierarchy');

var _d3Hierarchy2 = _interopRequireDefault(_d3Hierarchy);

var _d3Color = require('d3-color');

var _d3Color2 = _interopRequireDefault(_d3Color);

var _animationUtils = require('../utils/animation-utils');

var _scalesUtils = require('../utils/scales-utils');

var _theme = require('../theme');

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

var TREEMAP_TILE_MODES = {
  squarify: _d3Hierarchy2.default.treemapSquarify,
  slice: _d3Hierarchy2.default.treemapSlice,
  dice: _d3Hierarchy2.default.treemapDice,
  slicedice: _d3Hierarchy2.default.treemapSliceDice
};

function getFontColorFromBackground(background) {
  if (background) {
    return _d3Color2.default.hsl(background).l > 0.57 ? '#222' : '#fff';
  }
  return null;
}

var Treemap = function (_React$Component) {
  _inherits(Treemap, _React$Component);

  _createClass(Treemap, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        data: _react2.default.PropTypes.object.isRequired,
        mode: _react2.default.PropTypes.oneOf(Object.keys(TREEMAP_TILE_MODES)),
        padding: _react2.default.PropTypes.number.isRequired,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        mode: 'squarify',
        padding: 1,
        data: {
          children: []
        },
        colorRange: _theme.CONTINUOUS_COLOR_RANGE,
        _colorValue: _theme.DEFAULT_COLOR,
        opacityRange: _theme.OPACITY_RANGE,
        _opacityValue: 1
      };
    }
  }]);

  function Treemap(props) {
    _classCallCheck(this, Treemap);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Treemap).call(this, props));

    _this._renderLeaf = _this._renderLeaf.bind(_this);
    _this.state = { scales: _this._getScaleFns(props) };
    return _this;
  }

  _createClass(Treemap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ scales: this._getScaleFns(props) });
    }

    /**
     * Get the map of scale functions from the given props.
     * @param {Object} props Props for the component.
     * @returns {Object} Map of scale functions.
     * @private
     */

  }, {
    key: '_getScaleFns',
    value: function _getScaleFns(props) {
      var data = props.data;

      // Adding _allData property to the object to reuse the existing
      // getAttributeFunctor function.

      var compatibleProps = _extends({}, props, {
        _allData: data.children || []
      });
      return {
        opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
        color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
      };
    }

    /**
     * Create the list of nodes to render.
     * @returns {Array} Array of nodes.
     * @private
     */

  }, {
    key: '_getNodesToRender',
    value: function _getNodesToRender() {
      var _props = this.props;
      var data = _props.data;
      var height = _props.height;
      var width = _props.width;
      var mode = _props.mode;
      var padding = _props.padding;


      if (data) {
        var tileFn = TREEMAP_TILE_MODES[mode];
        return _d3Hierarchy2.default.treemap(tileFn).tile(_d3Hierarchy2.default.treemapSquarify).size([width, height]).padding(padding)(_d3Hierarchy2.default.hierarchy(data).sort(function (a, b) {
          return a.size - b.size;
        }).sum(function (d) {
          return d.size;
        })).descendants();
      }
      return [];
    }
  }, {
    key: '_renderLeaf',
    value: function _renderLeaf(node, i) {
      if (!i) {
        return null;
      }
      var scales = this.state.scales;


      var background = scales.color(node);
      var opacity = scales.opacity(node);
      var color = getFontColorFromBackground(background);
      var x0 = node.x0;
      var x1 = node.x1;
      var y0 = node.y0;
      var y1 = node.y1;
      var title = node.data.title;


      var style = (0, _animationUtils.getCSSAnimation)(this.props, {
        top: y0 + 'px',
        left: x0 + 'px',
        width: x1 - x0 + 'px',
        height: y1 - y0 + 'px',
        background: background,
        opacity: opacity,
        color: color
      });
      return _react2.default.createElement(
        'div',
        {
          key: i,
          className: 'rv-treemap__leaf',
          style: style },
        _react2.default.createElement(
          'div',
          { className: 'rv-treemap__leaf__content' },
          title
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;

      var nodes = this._getNodesToRender();
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-treemap',
          style: {
            width: width + 'px',
            height: height + 'px'
          } },
        nodes.map(this._renderLeaf)
      );
    }
  }]);

  return Treemap;
}(_react2.default.Component);

Treemap.displayName = 'Treemap';

exports.default = Treemap;