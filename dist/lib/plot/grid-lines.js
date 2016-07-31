'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Selection2 = _interopRequireDefault(_d3Selection);

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _reactUtils = require('../utils/react-utils');

var _scalesUtils = require('../utils/scales-utils');

var _axisUtils = require('../utils/axis-utils');

var _animationUtils = require('../utils/animation-utils');

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

var GridLines = function (_PureRenderComponent) {
  _inherits(GridLines, _PureRenderComponent);

  function GridLines() {
    _classCallCheck(this, GridLines);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridLines).apply(this, arguments));
  }

  _createClass(GridLines, [{
    key: '_render',


    /**
     * Renders the grid lines in a given container.
     * @private
     */
    value: function _render() {
      var _props = this.props;
      var attr = _props.attr;
      var tickSize = _props.tickSize;
      var orientation = _props.orientation;
      var ticksTotal = _props.ticksTotal;
      var values = _props.values;

      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);
      if (!scale) {
        return;
      }
      var container = _d3Selection2.default.select((0, _reactUtils.getDOMNode)(this.refs.container));
      var axisFn = (0, _axisUtils.getAxisFnByOrientation)(orientation);
      var axis = axisFn(scale).tickFormat('').tickSize(tickSize, 0, 0);
      if (!values) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(values);
      }
      (0, _animationUtils.applyTransition)(this.props, container).call(axis);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._render();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var top = _props2.top;
      var left = _props2.left;
      var marginTop = _props2.marginTop;
      var marginLeft = _props2.marginLeft;

      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + marginLeft + ', ' + marginTop + ')',
          className: 'rv-xy-plot__grid-lines' },
        _react2.default.createElement('g', {
          ref: 'container',
          transform: 'translate(' + left + ', ' + top + ')' })
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        tickSize: _react2.default.PropTypes.number,
        ticksTotal: _react2.default.PropTypes.number,
        values: _react2.default.PropTypes.array,
        attr: _react2.default.PropTypes.string.isRequired,
        orientation: _react2.default.PropTypes.oneOf(_axisUtils.AXIS_ORIENTATIONS),
        top: _react2.default.PropTypes.number,
        left: _react2.default.PropTypes.number,
        marginTop: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        top: 0,
        left: 0
      };
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return GridLines;
}(_pureRenderComponent2.default);

GridLines.displayName = 'GridLines';

exports.default = GridLines;