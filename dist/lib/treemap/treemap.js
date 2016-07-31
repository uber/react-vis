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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdHJlZW1hcC90cmVlbWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLHFCQUFxQjtBQUN6QixZQUFVLHNCQUFZLGVBREc7QUFFekIsU0FBTyxzQkFBWSxZQUZNO0FBR3pCLFFBQU0sc0JBQVksV0FITztBQUl6QixhQUFXLHNCQUFZO0FBSkUsQ0FBM0I7O0FBT0EsU0FBUywwQkFBVCxDQUFvQyxVQUFwQyxFQUFnRDtBQUM5QyxNQUFJLFVBQUosRUFBZ0I7QUFDZCxXQUFPLGtCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLENBQXhCLEdBQTRCLElBQTVCLEdBQW1DLE1BQW5DLEdBQTRDLE1BQW5EO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRDs7SUFFSyxPOzs7Ozt3QkFFbUI7QUFDckIsYUFBTztBQUNMLGVBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUR6QjtBQUVMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFGMUI7QUFHTCxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFIeEI7QUFJTCxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FDSixPQUFPLElBQVAsQ0FBWSxrQkFBWixDQURJLENBSkQ7QUFPTCxpQkFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBUDNCO0FBUUw7QUFSSyxPQUFQO0FBVUQ7Ozt3QkFFeUI7QUFDeEIsYUFBTztBQUNMLGNBQU0sVUFERDtBQUVMLGlCQUFTLENBRko7QUFHTCxjQUFNO0FBQ0osb0JBQVU7QUFETixTQUhEO0FBTUwsaURBTks7QUFPTCx5Q0FQSztBQVFMLDBDQVJLO0FBU0wsdUJBQWU7QUFUVixPQUFQO0FBV0Q7OztBQUVELG1CQUFZLEtBQVosRUFB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QUEsVUFDTyxNQURQLFdBQ08sTUFEUDs7QUFFUCxVQUFNLFFBQVEsS0FBSyxpQkFBTCxFQUFkO0FBQ0EsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSxZQURaO0FBRUUsaUJBQU87QUFDTCxtQkFBVSxLQUFWLE9BREs7QUFFTCxvQkFBVyxNQUFYO0FBRkssV0FGVDtBQU1HLGNBQU0sR0FBTixDQUFVLEtBQUssV0FBZjtBQU5ILE9BREY7QUFVRDs7OztFQTdIbUIsZ0JBQU0sUzs7QUFpSTVCLFFBQVEsV0FBUixHQUFzQixTQUF0Qjs7a0JBRWUsTyIsImZpbGUiOiJ0cmVlbWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkM0hpZXJhcmNoeSBmcm9tICdkMy1oaWVyYXJjaHknO1xuaW1wb3J0IGQzQ29sb3IgZnJvbSAnZDMtY29sb3InO1xuaW1wb3J0IHtnZXRDU1NBbmltYXRpb24sIEFuaW1hdGlvblByb3BUeXBlfSBmcm9tICcuLi91dGlscy9hbmltYXRpb24tdXRpbHMnO1xuaW1wb3J0IHtnZXRBdHRyaWJ1dGVGdW5jdG9yfSBmcm9tICcuLi91dGlscy9zY2FsZXMtdXRpbHMnO1xuaW1wb3J0IHtDT05USU5VT1VTX0NPTE9SX1JBTkdFLCBERUZBVUxUX0NPTE9SLCBPUEFDSVRZX1JBTkdFfSBmcm9tICcuLi90aGVtZSc7XG5cbmNvbnN0IFRSRUVNQVBfVElMRV9NT0RFUyA9IHtcbiAgc3F1YXJpZnk6IGQzSGllcmFyY2h5LnRyZWVtYXBTcXVhcmlmeSxcbiAgc2xpY2U6IGQzSGllcmFyY2h5LnRyZWVtYXBTbGljZSxcbiAgZGljZTogZDNIaWVyYXJjaHkudHJlZW1hcERpY2UsXG4gIHNsaWNlZGljZTogZDNIaWVyYXJjaHkudHJlZW1hcFNsaWNlRGljZVxufTtcblxuZnVuY3Rpb24gZ2V0Rm9udENvbG9yRnJvbUJhY2tncm91bmQoYmFja2dyb3VuZCkge1xuICBpZiAoYmFja2dyb3VuZCkge1xuICAgIHJldHVybiBkM0NvbG9yLmhzbChiYWNrZ3JvdW5kKS5sID4gMC41NyA/ICcjMjIyJyA6ICcjZmZmJztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY2xhc3MgVHJlZW1hcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1vZGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihcbiAgICAgICAgT2JqZWN0LmtleXMoVFJFRU1BUF9USUxFX01PREVTKVxuICAgICAgKSxcbiAgICAgIHBhZGRpbmc6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uUHJvcFR5cGVcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGU6ICdzcXVhcmlmeScsXG4gICAgICBwYWRkaW5nOiAxLFxuICAgICAgZGF0YToge1xuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sXG4gICAgICBjb2xvclJhbmdlOiBDT05USU5VT1VTX0NPTE9SX1JBTkdFLFxuICAgICAgX2NvbG9yVmFsdWU6IERFRkFVTFRfQ09MT1IsXG4gICAgICBvcGFjaXR5UmFuZ2U6IE9QQUNJVFlfUkFOR0UsXG4gICAgICBfb3BhY2l0eVZhbHVlOiAxXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX3JlbmRlckxlYWYgPSB0aGlzLl9yZW5kZXJMZWFmLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtzY2FsZXM6IHRoaXMuX2dldFNjYWxlRm5zKHByb3BzKX07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2NhbGVzOiB0aGlzLl9nZXRTY2FsZUZucyhwcm9wcyl9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcCBvZiBzY2FsZSBmdW5jdGlvbnMgZnJvbSB0aGUgZ2l2ZW4gcHJvcHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wcyBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIHNjYWxlIGZ1bmN0aW9ucy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRTY2FsZUZucyhwcm9wcykge1xuICAgIGNvbnN0IHtkYXRhfSA9IHByb3BzO1xuXG4gICAgLy8gQWRkaW5nIF9hbGxEYXRhIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgdG8gcmV1c2UgdGhlIGV4aXN0aW5nXG4gICAgLy8gZ2V0QXR0cmlidXRlRnVuY3RvciBmdW5jdGlvbi5cbiAgICBjb25zdCBjb21wYXRpYmxlUHJvcHMgPSB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIF9hbGxEYXRhOiBkYXRhLmNoaWxkcmVuIHx8IFtdXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgb3BhY2l0eTogZ2V0QXR0cmlidXRlRnVuY3Rvcihjb21wYXRpYmxlUHJvcHMsICdvcGFjaXR5JyksXG4gICAgICBjb2xvcjogZ2V0QXR0cmlidXRlRnVuY3Rvcihjb21wYXRpYmxlUHJvcHMsICdjb2xvcicpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGxpc3Qgb2Ygbm9kZXMgdG8gcmVuZGVyLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIG5vZGVzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldE5vZGVzVG9SZW5kZXIoKSB7XG4gICAgY29uc3Qge2RhdGEsIGhlaWdodCwgd2lkdGgsIG1vZGUsIHBhZGRpbmd9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCB0aWxlRm4gPSBUUkVFTUFQX1RJTEVfTU9ERVNbbW9kZV07XG4gICAgICByZXR1cm4gZDNIaWVyYXJjaHkudHJlZW1hcCh0aWxlRm4pXG4gICAgICAgIC50aWxlKGQzSGllcmFyY2h5LnRyZWVtYXBTcXVhcmlmeSlcbiAgICAgICAgLnNpemUoW3dpZHRoLCBoZWlnaHRdKVxuICAgICAgICAucGFkZGluZyhwYWRkaW5nKShcbiAgICAgICAgICBkM0hpZXJhcmNoeS5oaWVyYXJjaHkoZGF0YSlcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpXG4gICAgICAgICAgICAuc3VtKGQgPT4gZC5zaXplKVxuICAgICAgICApLmRlc2NlbmRhbnRzKCk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIF9yZW5kZXJMZWFmKG5vZGUsIGkpIHtcbiAgICBpZiAoIWkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB7c2NhbGVzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gc2NhbGVzLmNvbG9yKG5vZGUpO1xuICAgIGNvbnN0IG9wYWNpdHkgPSBzY2FsZXMub3BhY2l0eShub2RlKTtcbiAgICBjb25zdCBjb2xvciA9IGdldEZvbnRDb2xvckZyb21CYWNrZ3JvdW5kKGJhY2tncm91bmQpO1xuICAgIGNvbnN0IHt4MCwgeDEsIHkwLCB5MSwgZGF0YToge3RpdGxlfX0gPSBub2RlO1xuXG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDU1NBbmltYXRpb24odGhpcy5wcm9wcywge1xuICAgICAgdG9wOiBgJHt5MH1weGAsXG4gICAgICBsZWZ0OiBgJHt4MH1weGAsXG4gICAgICB3aWR0aDogYCR7eDEgLSB4MH1weGAsXG4gICAgICBoZWlnaHQ6IGAke3kxIC0geTB9cHhgLFxuICAgICAgYmFja2dyb3VuZCxcbiAgICAgIG9wYWNpdHksXG4gICAgICBjb2xvclxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17aX1cbiAgICAgICAgY2xhc3NOYW1lPVwicnYtdHJlZW1hcF9fbGVhZlwiXG4gICAgICAgIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnYtdHJlZW1hcF9fbGVhZl9fY29udGVudFwiPnt0aXRsZX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuX2dldE5vZGVzVG9SZW5kZXIoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJydi10cmVlbWFwXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxuICAgICAgICB9fT5cbiAgICAgICAge25vZGVzLm1hcCh0aGlzLl9yZW5kZXJMZWFmKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG5UcmVlbWFwLmRpc3BsYXlOYW1lID0gJ1RyZWVtYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBUcmVlbWFwO1xuIl19