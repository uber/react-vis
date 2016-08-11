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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC9heGlzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdNLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBaUNXLEksRUFBTTtBQUFBLG1CQUM0QixLQUFLLEtBRGpDO0FBQUEsVUFDWixXQURZLFVBQ1osV0FEWTtBQUFBLFVBQ0MsV0FERCxVQUNDLFdBREQ7QUFBQSxVQUNjLFVBRGQsVUFDYyxVQURkOztBQUVuQixVQUFJLENBQUMsV0FBTCxFQUFrQjtBQUNoQixhQUFLLEtBQUwsQ0FBVyxVQUFYO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxVQUFMLENBQWdCLFdBQWhCO0FBQ0Q7QUFDRCxVQUFJLFdBQUosRUFBaUI7QUFDZixhQUFLLFVBQUwsQ0FBZ0IsV0FBaEI7QUFDRDtBQUNELFdBQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsQ0FBakI7QUFDQSxXQUFLLGFBQUwsQ0FBbUIsQ0FBbkI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsRUFBakI7QUFDQSxhQUFPLElBQVA7QUFDRDs7Ozs7Ozs7Ozs7a0NBUWEsSSxFQUFNO0FBQUEsb0JBQ3lCLEtBQUssS0FEOUI7QUFBQSxVQUNYLFVBRFcsV0FDWCxVQURXO0FBQUEsVUFDQyxVQURELFdBQ0MsVUFERDtBQUFBLFVBQ2EsUUFEYixXQUNhLFFBRGI7O0FBRWxCLFVBQUksQ0FBQyxVQUFMLEVBQWlCO0FBQ2YsYUFBSyxLQUFMLENBQVcsVUFBWDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssVUFBTCxDQUFnQixVQUFoQjtBQUNEO0FBQ0QsV0FBSyxVQUFMLENBQWdCLEVBQWhCO0FBQ0EsV0FBSyxRQUFMLENBQWMsUUFBZDtBQUNBLFdBQUssYUFBTCxDQUFtQixDQUFuQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7Ozs7Ozs7OEJBTVM7QUFBQSxvQkFDb0IsS0FBSyxLQUR6QjtBQUFBLFVBQ0QsV0FEQyxXQUNELFdBREM7QUFBQSxVQUNZLElBRFosV0FDWSxJQURaOztBQUVSLFVBQU0sUUFBUSxvQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixJQUE5QixDQUFkO0FBQ0EsVUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWO0FBQ0Q7O0FBTE8sa0JBT2dCLEtBQUssSUFQckI7QUFBQSxVQU9ELE1BUEMsU0FPRCxNQVBDO0FBQUEsVUFPTyxLQVBQLFNBT08sS0FQUDs7QUFRUixVQUFNLGlCQUFpQixzQkFBWSxNQUFaLENBQW1CLDRCQUFXLE1BQVgsQ0FBbkIsQ0FBdkI7QUFDQSxVQUFNLGdCQUFnQixzQkFBWSxNQUFaLENBQW1CLDRCQUFXLEtBQVgsQ0FBbkIsQ0FBdEI7QUFDQSxVQUFNLFNBQVMsdUNBQXVCLFdBQXZCLENBQWY7QUFDQSxVQUFNLE9BQU8sS0FBSyxjQUFMLENBQW9CLE9BQU8sS0FBUCxDQUFwQixDQUFiOztBQUVBLDJDQUFnQixLQUFLLEtBQXJCLEVBQTRCLGNBQTVCLEVBQ0csSUFESCxDQUNRLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQURSO0FBRUEsMkNBQWdCLEtBQUssS0FBckIsRUFBNEIsYUFBNUIsRUFDRyxJQURILENBQ1EsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBRFI7QUFFRDs7O3dDQUVtQjtBQUNsQixXQUFLLE9BQUw7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLLE9BQUw7QUFDRDs7OzZCQUVRO0FBQUEsb0JBQytCLEtBQUssS0FEcEM7QUFBQSxVQUNBLEtBREEsV0FDQSxLQURBO0FBQUEsVUFDTyxJQURQLFdBQ08sSUFEUDtBQUFBLFVBQ2EsR0FEYixXQUNhLEdBRGI7QUFBQSxVQUNrQixTQURsQixXQUNrQixTQURsQjs7QUFFUCxVQUFNLFdBQVcsU0FBUyxVQUFVLEVBQXBDO0FBQ0EsYUFDRTtBQUFBO0FBQUEsVUFBRyxpQ0FBK0IsU0FBbEM7QUFDRyxvQ0FBd0IsSUFBeEIsU0FBZ0MsR0FBaEMsTUFESDtBQUVHLGVBQUksV0FGUDtBQUdFO0FBQ0UsZUFBSSxRQUROO0FBRUUscUJBQVUsMEJBRlosR0FIRjtBQU1FO0FBQ0UsZUFBSSxPQUROO0FBRUUscUJBQVUseUJBRlosR0FORjtBQVNHLG1CQUNDO0FBQUE7QUFBQTtBQUNFLHVCQUFVLHlCQURaO0FBRUUsbUJBQU8sS0FBSyxLQUFMLENBQVcsVUFGcEI7QUFHRTtBQUFBO0FBQUE7QUFBTztBQUFQO0FBSEYsU0FERCxHQU1DO0FBZkosT0FERjtBQW9CRDs7O3dCQXhIc0I7QUFDckIsYUFBTztBQUNMLGVBQU8sZ0JBQU0sU0FBTixDQUFnQixNQURsQjtBQUVMLGtCQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGckI7QUFHTCxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFIeEI7QUFJTCxxQkFBYSxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLDhCQUpSO0FBS0wscUJBQWEsZ0JBQU0sU0FBTixDQUFnQixJQUx4QjtBQU1MLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsS0FOeEI7QUFPTCxvQkFBWSxnQkFBTSxTQUFOLENBQWdCLEtBUHZCO0FBUUwsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQVJ2QjtBQVNMLGtCQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsTUFUckI7QUFVTDtBQVZLLE9BQVA7QUFZRDs7O3dCQUV5QjtBQUN4QixhQUFPO0FBQ0w7QUFESyxPQUFQO0FBR0Q7Ozt3QkFFd0I7QUFDdkIsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztBQW9HSCxLQUFLLFdBQUwsR0FBbUIsTUFBbkI7O2tCQUVlLEkiLCJmaWxlIjoiYXhpcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZDNTZWxlY3Rpb24gZnJvbSAnZDMtc2VsZWN0aW9uJztcblxuaW1wb3J0IFB1cmVSZW5kZXJDb21wb25lbnQgZnJvbSAnLi4vcHVyZS1yZW5kZXItY29tcG9uZW50JztcbmltcG9ydCB7Z2V0RE9NTm9kZX0gZnJvbSAnLi4vdXRpbHMvcmVhY3QtdXRpbHMnO1xuaW1wb3J0IHtBWElTX09SSUVOVEFUSU9OUywgZ2V0QXhpc0ZuQnlPcmllbnRhdGlvbn0gZnJvbSAnLi4vdXRpbHMvYXhpcy11dGlscyc7XG5pbXBvcnQge2dldEF0dHJpYnV0ZVNjYWxlfSBmcm9tICcuLi91dGlscy9zY2FsZXMtdXRpbHMnO1xuXG5pbXBvcnQge0FuaW1hdGlvblByb3BUeXBlLCBhcHBseVRyYW5zaXRpb259IGZyb20gJy4uL3V0aWxzL2FuaW1hdGlvbi11dGlscyc7XG5cbmltcG9ydCB7REVGQVVMVF9USUNLX1NJWkV9IGZyb20gJy4uL3RoZW1lJztcblxuLyoqXG4gKiBHZXQgYXhpcyBjb21wb25lbnQgZm9yIHRoZSBjaGFydC9wbG90LlxuICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlOYW1lIERpc3BsYXkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc1NldCBDbGFzcyBuYW1lIHBvc3RmaXggZm9yIHRoZSBheGlzIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvbiBkMydzIG9yaWVudGF0aW9uLlxuICogQHBhcmFtIHtmdW5jdGlvbihOdW1iZXIsIE51bWJlciwgT2JqZWN0KTpOdW1iZXJ9IHRpY2tOdW1iZXJDYWxsYmFjayBDYWxsYmFja1xuICogICB0byBjYWxjdWxhdGUgdGhlIG51bWJlciBvZiB0aWNrcyBwYXNzZWQuXG4gKiBAcmV0dXJucyB7UmVhY3QuQ29tcG9uZW50fSBBeGlzIGNvbXBvbmVudC5cbiAqL1xuY2xhc3MgQXhpcyBleHRlbmRzIFB1cmVSZW5kZXJDb21wb25lbnQge1xuXG4gIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGNsYXNzU2V0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgYXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgb3JpZW50YXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihBWElTX09SSUVOVEFUSU9OUyksXG4gICAgICBsYWJlbEZvcm1hdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBsYWJlbFZhbHVlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgdGlja1ZhbHVlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgdGlja3NUb3RhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHRpY2tTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgYW5pbWF0aW9uOiBBbmltYXRpb25Qcm9wVHlwZVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGlja1NpemU6IERFRkFVTFRfVElDS19TSVpFXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgcmVxdWlyZXNTVkcoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGF4aXMgbGFiZWxzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gYXhpcyBBeGlzIG9iamVjdC5cbiAgICogQHJldHVybnMge09iamVjdH0gQXhpcyBvYmplY3QuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0QXhpc0xhYmVscyhheGlzKSB7XG4gICAgY29uc3Qge2xhYmVsRm9ybWF0LCBsYWJlbFZhbHVlcywgdGlja3NUb3RhbH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghbGFiZWxWYWx1ZXMpIHtcbiAgICAgIGF4aXMudGlja3ModGlja3NUb3RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMudGlja1ZhbHVlcyhsYWJlbFZhbHVlcyk7XG4gICAgfVxuICAgIGlmIChsYWJlbEZvcm1hdCkge1xuICAgICAgYXhpcy50aWNrRm9ybWF0KGxhYmVsRm9ybWF0KTtcbiAgICB9XG4gICAgYXhpcy50aWNrU2l6ZSgwLCAwKTtcbiAgICBheGlzLnRpY2tTaXplT3V0ZXIoMCk7XG4gICAgYXhpcy50aWNrUGFkZGluZygxNCk7XG4gICAgcmV0dXJuIGF4aXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGF4aXMgdGlja3MuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBheGlzIEF4aXMgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBeGlzIG9iamVjdC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRBeGlzVGlja3MoYXhpcykge1xuICAgIGNvbnN0IHt0aWNrVmFsdWVzLCB0aWNrc1RvdGFsLCB0aWNrU2l6ZX0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGlja1ZhbHVlcykge1xuICAgICAgYXhpcy50aWNrcyh0aWNrc1RvdGFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcy50aWNrVmFsdWVzKHRpY2tWYWx1ZXMpO1xuICAgIH1cbiAgICBheGlzLnRpY2tGb3JtYXQoJycpO1xuICAgIGF4aXMudGlja1NpemUodGlja1NpemUpO1xuICAgIGF4aXMudGlja1NpemVPdXRlcigwKTtcbiAgICByZXR1cm4gYXhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBheGlzIGluc2lkZSB0aGUgZXhpc3RpbmcgY29udGFpbmVyLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlcigpIHtcbiAgICBjb25zdCB7b3JpZW50YXRpb24sIGF0dHJ9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzY2FsZSA9IGdldEF0dHJpYnV0ZVNjYWxlKHRoaXMucHJvcHMsIGF0dHIpO1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7bGFiZWxzLCB0aWNrc30gPSB0aGlzLnJlZnM7XG4gICAgY29uc3Qgc2VsZWN0ZWRMYWJlbHMgPSBkM1NlbGVjdGlvbi5zZWxlY3QoZ2V0RE9NTm9kZShsYWJlbHMpKTtcbiAgICBjb25zdCBzZWxlY3RlZFRpY2tzID0gZDNTZWxlY3Rpb24uc2VsZWN0KGdldERPTU5vZGUodGlja3MpKTtcbiAgICBjb25zdCBheGlzRm4gPSBnZXRBeGlzRm5CeU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcbiAgICBjb25zdCBheGlzID0gdGhpcy5fc2V0QXhpc0xhYmVscyhheGlzRm4oc2NhbGUpKTtcblxuICAgIGFwcGx5VHJhbnNpdGlvbih0aGlzLnByb3BzLCBzZWxlY3RlZExhYmVscylcbiAgICAgIC5jYWxsKHRoaXMuX3NldEF4aXNMYWJlbHMoYXhpcykpO1xuICAgIGFwcGx5VHJhbnNpdGlvbih0aGlzLnByb3BzLCBzZWxlY3RlZFRpY2tzKVxuICAgICAgLmNhbGwodGhpcy5fc2V0QXhpc1RpY2tzKGF4aXMpKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aXRsZSwgbGVmdCwgdG9wLCBjbGFzc05hbWV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBoYXNUaXRsZSA9IHRpdGxlICYmIHRpdGxlICE9PSAnJztcbiAgICByZXR1cm4gKFxuICAgICAgPGcgY2xhc3NOYW1lPXtgcnYteHktcGxvdF9fYXhpcyAke2NsYXNzTmFtZX1gfVxuICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bGVmdH0sJHt0b3B9KWB9XG4gICAgICAgICByZWY9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGdcbiAgICAgICAgICByZWY9XCJsYWJlbHNcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX2F4aXNfX2xhYmVsc1wiLz5cbiAgICAgICAgPGdcbiAgICAgICAgICByZWY9XCJ0aWNrc1wiXG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdF9fYXhpc19fdGlja3NcIi8+XG4gICAgICAgIHtoYXNUaXRsZSA/XG4gICAgICAgICAgPGdcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX2F4aXNfX3RpdGxlXCJcbiAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnRpdGxlU3R5bGV9PlxuICAgICAgICAgICAgPHRleHQ+e3RpdGxlfTwvdGV4dD5cbiAgICAgICAgICA8L2c+IDpcbiAgICAgICAgICBudWxsXG4gICAgICAgIH1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9XG59XG5cbkF4aXMuZGlzcGxheU5hbWUgPSAnQXhpcyc7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXM7XG4iXX0=