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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC9ncmlkLWxpbmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sUzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBZ0NNO0FBQUEsbUJBQ2tELEtBQUssS0FEdkQ7QUFBQSxVQUNELElBREMsVUFDRCxJQURDO0FBQUEsVUFDSyxRQURMLFVBQ0ssUUFETDtBQUFBLFVBQ2UsV0FEZixVQUNlLFdBRGY7QUFBQSxVQUM0QixVQUQ1QixVQUM0QixVQUQ1QjtBQUFBLFVBQ3dDLE1BRHhDLFVBQ3dDLE1BRHhDOztBQUVSLFVBQU0sUUFBUSxvQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixJQUE5QixDQUFkO0FBQ0EsVUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWO0FBQ0Q7QUFDRCxVQUFNLFlBQVksc0JBQVksTUFBWixDQUFtQiw0QkFBVyxLQUFLLElBQUwsQ0FBVSxTQUFyQixDQUFuQixDQUFsQjtBQUNBLFVBQU0sU0FBUyx1Q0FBdUIsV0FBdkIsQ0FBZjtBQUNBLFVBQU0sT0FBTyxPQUFPLEtBQVAsRUFDVixVQURVLENBQ0MsRUFERCxFQUVWLFFBRlUsQ0FFRCxRQUZDLEVBRVMsQ0FGVCxFQUVZLENBRlosQ0FBYjtBQUdBLFVBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWCxhQUFLLEtBQUwsQ0FBVyxVQUFYO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxVQUFMLENBQWdCLE1BQWhCO0FBQ0Q7QUFDRCwyQ0FBZ0IsS0FBSyxLQUFyQixFQUE0QixTQUE1QixFQUF1QyxJQUF2QyxDQUE0QyxJQUE1QztBQUNEOzs7d0NBRW1CO0FBQ2xCLFdBQUssT0FBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUssT0FBTDtBQUNEOzs7NkJBRVE7QUFBQSxvQkFDb0MsS0FBSyxLQUR6QztBQUFBLFVBQ0EsR0FEQSxXQUNBLEdBREE7QUFBQSxVQUNLLElBREwsV0FDSyxJQURMO0FBQUEsVUFDVyxTQURYLFdBQ1csU0FEWDtBQUFBLFVBQ3NCLFVBRHRCLFdBQ3NCLFVBRHRCOztBQUVQLGFBQ0U7QUFBQTtBQUFBO0FBQ0Usb0NBQXdCLFVBQXhCLFVBQXVDLFNBQXZDLE1BREY7QUFFRSxxQkFBVSx3QkFGWjtBQUdJO0FBQ0UsZUFBSSxXQUROO0FBRUUsb0NBQXdCLElBQXhCLFVBQWlDLEdBQWpDLE1BRkY7QUFISixPQURGO0FBU0Q7Ozt3QkFwRXNCO0FBQ3JCLGFBQU87QUFDTCxrQkFBVSxnQkFBTSxTQUFOLENBQWdCLE1BRHJCO0FBRUwsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUZ2QjtBQUdMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsS0FIbkI7QUFJTCxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFKeEI7QUFLTCxxQkFBYSxnQkFBTSxTQUFOLENBQWdCLEtBQWhCLDhCQUxSO0FBTUwsYUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BTmhCO0FBT0wsY0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BUGpCO0FBUUwsbUJBQVcsZ0JBQU0sU0FBTixDQUFnQixNQVJ0QjtBQVNMLG9CQUFZLGdCQUFNLFNBQU4sQ0FBZ0IsTUFUdkI7QUFVTDtBQVZLLE9BQVA7QUFZRDs7O3dCQUV5QjtBQUN4QixhQUFPO0FBQ0wsYUFBSyxDQURBO0FBRUwsY0FBTTtBQUZELE9BQVA7QUFJRDs7O3dCQUV3QjtBQUN2QixhQUFPLElBQVA7QUFDRDs7Ozs7O0FBK0NILFVBQVUsV0FBVixHQUF3QixXQUF4Qjs7a0JBRWUsUyIsImZpbGUiOiJncmlkLWxpbmVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkM1NlbGVjdGlvbiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuXG5pbXBvcnQgUHVyZVJlbmRlckNvbXBvbmVudCBmcm9tICcuLi9wdXJlLXJlbmRlci1jb21wb25lbnQnO1xuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuLi91dGlscy9yZWFjdC11dGlscyc7XG5pbXBvcnQge2dldEF0dHJpYnV0ZVNjYWxlfSBmcm9tICcuLi91dGlscy9zY2FsZXMtdXRpbHMnO1xuaW1wb3J0IHtBWElTX09SSUVOVEFUSU9OUywgZ2V0QXhpc0ZuQnlPcmllbnRhdGlvbn0gZnJvbSAnLi4vdXRpbHMvYXhpcy11dGlscyc7XG5cbmltcG9ydCB7QW5pbWF0aW9uUHJvcFR5cGUsIGFwcGx5VHJhbnNpdGlvbn0gZnJvbSAnLi4vdXRpbHMvYW5pbWF0aW9uLXV0aWxzJztcblxuY2xhc3MgR3JpZExpbmVzIGV4dGVuZHMgUHVyZVJlbmRlckNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpY2tTaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgdGlja3NUb3RhbDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHZhbHVlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgYXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgb3JpZW50YXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihBWElTX09SSUVOVEFUSU9OUyksXG4gICAgICB0b3A6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBsZWZ0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFyZ2luVG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFyZ2luTGVmdDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uUHJvcFR5cGVcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCByZXF1aXJlc1NWRygpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBncmlkIGxpbmVzIGluIGEgZ2l2ZW4gY29udGFpbmVyLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlcigpIHtcbiAgICBjb25zdCB7YXR0ciwgdGlja1NpemUsIG9yaWVudGF0aW9uLCB0aWNrc1RvdGFsLCB2YWx1ZXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzY2FsZSA9IGdldEF0dHJpYnV0ZVNjYWxlKHRoaXMucHJvcHMsIGF0dHIpO1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udGFpbmVyID0gZDNTZWxlY3Rpb24uc2VsZWN0KGdldERPTU5vZGUodGhpcy5yZWZzLmNvbnRhaW5lcikpO1xuICAgIGNvbnN0IGF4aXNGbiA9IGdldEF4aXNGbkJ5T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xuICAgIGNvbnN0IGF4aXMgPSBheGlzRm4oc2NhbGUpXG4gICAgICAudGlja0Zvcm1hdCgnJylcbiAgICAgIC50aWNrU2l6ZSh0aWNrU2l6ZSwgMCwgMCk7XG4gICAgaWYgKCF2YWx1ZXMpIHtcbiAgICAgIGF4aXMudGlja3ModGlja3NUb3RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMudGlja1ZhbHVlcyh2YWx1ZXMpO1xuICAgIH1cbiAgICBhcHBseVRyYW5zaXRpb24odGhpcy5wcm9wcywgY29udGFpbmVyKS5jYWxsKGF4aXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3RvcCwgbGVmdCwgbWFyZ2luVG9wLCBtYXJnaW5MZWZ0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxnXG4gICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbkxlZnR9LCAke21hcmdpblRvcH0pYH1cbiAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdF9fZ3JpZC1saW5lc1wiPlxuICAgICAgICAgIDxnXG4gICAgICAgICAgICByZWY9XCJjb250YWluZXJcIlxuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bGVmdH0sICR7dG9wfSlgfS8+XG4gICAgICA8L2c+XG4gICAgKTtcbiAgfVxufVxuXG5HcmlkTGluZXMuZGlzcGxheU5hbWUgPSAnR3JpZExpbmVzJztcblxuZXhwb3J0IGRlZmF1bHQgR3JpZExpbmVzO1xuIl19