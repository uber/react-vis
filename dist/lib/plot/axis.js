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

var _axisUtils = require('../utils/axis-utils');

var _scalesUtils = require('../utils/scales-utils');

var _animationUtils = require('../utils/animation-utils');

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

/**
 * Get axis component for the chart/plot.
 * @param {string} displayName Display name for the component.
 * @param {string} classSet Class name postfix for the axis container.
 * @param {string} orientation d3's orientation.
 * @param {function(Number, Number, Object):Number} tickNumberCallback Callback
 *   to calculate the number of ticks passed.
 * @returns {React.Component} Axis component.
 */

var Axis = function (_PureRenderComponent) {
  _inherits(Axis, _PureRenderComponent);

  function Axis() {
    _classCallCheck(this, Axis);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Axis).apply(this, arguments));
  }

  _createClass(Axis, [{
    key: '_setAxisLabels',


    /**
     * Set axis labels.
     * @param {Object} axis Axis object.
     * @returns {Object} Axis object.
     * @private
     */
    value: function _setAxisLabels(axis) {
      var _props = this.props;
      var labelFormat = _props.labelFormat;
      var labelValues = _props.labelValues;
      var ticksTotal = _props.ticksTotal;

      if (!labelValues) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(labelValues);
      }
      if (labelFormat) {
        axis.tickFormat(labelFormat);
      }
      axis.tickSize(0, 0);
      axis.tickSizeOuter(0);
      axis.tickPadding(14);
      return axis;
    }

    /**
     * Set axis ticks.
     * @param {Object} axis Axis object.
     * @returns {Object} Axis object.
     * @private
     */

  }, {
    key: '_setAxisTicks',
    value: function _setAxisTicks(axis) {
      var _props2 = this.props;
      var tickValues = _props2.tickValues;
      var ticksTotal = _props2.ticksTotal;
      var tickSize = _props2.tickSize;

      if (!tickValues) {
        axis.ticks(ticksTotal);
      } else {
        axis.tickValues(tickValues);
      }
      axis.tickFormat('');
      axis.tickSize(tickSize);
      axis.tickSizeOuter(0);
      return axis;
    }

    /**
     * Renders the axis inside the existing container.
     * @private
     */

  }, {
    key: '_render',
    value: function _render() {
      var _props3 = this.props;
      var orientation = _props3.orientation;
      var attr = _props3.attr;

      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);
      if (!scale) {
        return;
      }

      var _refs = this.refs;
      var labels = _refs.labels;
      var ticks = _refs.ticks;

      var selectedLabels = _d3Selection2.default.select((0, _reactUtils.getDOMNode)(labels));
      var selectedTicks = _d3Selection2.default.select((0, _reactUtils.getDOMNode)(ticks));
      var axisFn = (0, _axisUtils.getAxisFnByOrientation)(orientation);
      var axis = this._setAxisLabels(axisFn(scale));

      (0, _animationUtils.applyTransition)(this.props, selectedLabels).call(this._setAxisLabels(axis));
      (0, _animationUtils.applyTransition)(this.props, selectedTicks).call(this._setAxisTicks(axis));
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
      var _props4 = this.props;
      var title = _props4.title;
      var left = _props4.left;
      var top = _props4.top;
      var className = _props4.className;

      var hasTitle = title && title !== '';
      return _react2.default.createElement(
        'g',
        { className: 'rv-xy-plot__axis ' + className,
          transform: 'translate(' + left + ',' + top + ')',
          ref: 'container' },
        _react2.default.createElement('g', {
          ref: 'labels',
          className: 'rv-xy-plot__axis__labels' }),
        _react2.default.createElement('g', {
          ref: 'ticks',
          className: 'rv-xy-plot__axis__ticks' }),
        hasTitle ? _react2.default.createElement(
          'g',
          {
            className: 'rv-xy-plot__axis__title',
            style: this.props.titleStyle },
          _react2.default.createElement(
            'text',
            null,
            title
          )
        ) : null
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        title: _react2.default.PropTypes.string,
        classSet: _react2.default.PropTypes.object,
        attr: _react2.default.PropTypes.string.isRequired,
        orientation: _react2.default.PropTypes.oneOf(_axisUtils.AXIS_ORIENTATIONS),
        labelFormat: _react2.default.PropTypes.func,
        labelValues: _react2.default.PropTypes.array,
        tickValues: _react2.default.PropTypes.array,
        ticksTotal: _react2.default.PropTypes.number,
        tickSize: _react2.default.PropTypes.number,
        animation: _animationUtils.AnimationPropType
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        tickSize: _theme.DEFAULT_TICK_SIZE
      };
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return Axis;
}(_pureRenderComponent2.default);

Axis.displayName = 'Axis';

exports.default = Axis;