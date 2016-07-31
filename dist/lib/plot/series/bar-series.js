'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Selection2 = _interopRequireDefault(_d3Selection);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _reactUtils = require('../../utils/react-utils');

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

var BarSeries = function (_AbstractSeries) {
  _inherits(BarSeries, _AbstractSeries);

  function BarSeries() {
    _classCallCheck(this, BarSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BarSeries).apply(this, arguments));
  }

  _createClass(BarSeries, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateSeries();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateSeries();
    }
  }, {
    key: '_updateSeries',
    value: function _updateSeries() {
      var container = (0, _reactUtils.getDOMNode)(this.refs.container);
      var _props = this.props;
      var _stackBy = _props._stackBy;
      var data = _props.data;
      var lineSizeAttr = _props.lineSizeAttr;
      var valuePosAttr = _props.valuePosAttr;
      var linePosAttr = _props.linePosAttr;
      var valueSizeAttr = _props.valueSizeAttr;
      var _props2 = this.props;
      var _props2$sameTypeTotal = _props2.sameTypeTotal;
      var sameTypeTotal = _props2$sameTypeTotal === undefined ? 1 : _props2$sameTypeTotal;
      var _props2$sameTypeIndex = _props2.sameTypeIndex;
      var sameTypeIndex = _props2$sameTypeIndex === undefined ? 0 : _props2$sameTypeIndex;


      if (!data || !data.length) {
        return;
      }

      var distance = this._getScaleDistance(linePosAttr);
      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      var valueFunctor = this._getAttributeFunctor(valuePosAttr);
      var value0Functor = this._getAttr0Functor(valuePosAttr);

      if (_stackBy === valuePosAttr) {
        sameTypeTotal = 1;
        sameTypeIndex = 0;
      }

      var rects = _d3Selection2.default.select(container).selectAll('rect').data(data).on('mouseover', this._mouseOverWithValue).on('mouseout', this._mouseOutWithValue).on('click', this._clickWithValue);

      var itemSize = distance / 2 * 0.85;

      this._applyTransition(rects).style('opacity', this._getAttributeFunctor('opacity')).style('fill', this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')).style('stroke', this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')).attr(linePosAttr, function (d) {
        return lineFunctor(d) - itemSize + itemSize * 2 / sameTypeTotal * sameTypeIndex;
      }).attr(lineSizeAttr, itemSize * 2 / sameTypeTotal).attr(valuePosAttr, function (d) {
        return Math.min(value0Functor(d), valueFunctor(d));
      }).attr(valueSizeAttr, function (d) {
        return Math.abs(-value0Functor(d) + valueFunctor(d));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var data = _props3.data;
      var marginLeft = _props3.marginLeft;
      var marginTop = _props3.marginTop;

      if (!data) {
        return null;
      }
      return _react2.default.createElement(
        'g',
        {
          className: 'rv-xy-plot__series rv-xy-plot__series--bar',
          ref: 'container',
          transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return _react2.default.createElement('rect', { style: { opacity: 0 }, key: i });
        })
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return _extends({}, _abstractSeries2.default.propTypes, {
        linePosAttr: _react2.default.PropTypes.string,
        valuePosAttr: _react2.default.PropTypes.string,
        lineSizeAttr: _react2.default.PropTypes.string,
        valueSizeAttr: _react2.default.PropTypes.string
      });
    }
  }]);

  return BarSeries;
}(_abstractSeries2.default);

BarSeries.displayName = 'BarSeries';

exports.default = BarSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvYmFyLXNlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sUzs7Ozs7Ozs7Ozs7d0NBWWdCO0FBQ2xCLFdBQUssYUFBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUssYUFBTDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNLFlBQVksNEJBQVcsS0FBSyxJQUFMLENBQVUsU0FBckIsQ0FBbEI7QUFEYyxtQkFRSyxLQUFLLEtBUlY7QUFBQSxVQUdaLFFBSFksVUFHWixRQUhZO0FBQUEsVUFJWixJQUpZLFVBSVosSUFKWTtBQUFBLFVBS1osWUFMWSxVQUtaLFlBTFk7QUFBQSxVQU1aLFlBTlksVUFNWixZQU5ZO0FBQUEsVUFPWixXQVBZLFVBT1osV0FQWTtBQUFBLFVBUVosYUFSWSxVQVFaLGFBUlk7QUFBQSxvQkFZUyxLQUFLLEtBWmQ7QUFBQSwwQ0FXWixhQVhZO0FBQUEsVUFXWixhQVhZLHlDQVdJLENBWEo7QUFBQSwwQ0FZWixhQVpZO0FBQUEsVUFZWixhQVpZLHlDQVlJLENBWko7OztBQWNkLFVBQUksQ0FBQyxJQUFELElBQVMsQ0FBQyxLQUFLLE1BQW5CLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsVUFBTSxXQUFXLEtBQUssaUJBQUwsQ0FBdUIsV0FBdkIsQ0FBakI7QUFDQSxVQUFNLGNBQWMsS0FBSyxvQkFBTCxDQUEwQixXQUExQixDQUFwQjtBQUNBLFVBQU0sZUFBZSxLQUFLLG9CQUFMLENBQTBCLFlBQTFCLENBQXJCO0FBQ0EsVUFBTSxnQkFBZ0IsS0FBSyxnQkFBTCxDQUFzQixZQUF0QixDQUF0Qjs7QUFFQSxVQUFJLGFBQWEsWUFBakIsRUFBK0I7QUFDN0Isd0JBQWdCLENBQWhCO0FBQ0Esd0JBQWdCLENBQWhCO0FBQ0Q7O0FBRUQsVUFBTSxRQUFRLHNCQUFZLE1BQVosQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsQ0FBd0MsTUFBeEMsRUFDWCxJQURXLENBQ04sSUFETSxFQUVYLEVBRlcsQ0FFUixXQUZRLEVBRUssS0FBSyxtQkFGVixFQUdYLEVBSFcsQ0FHUixVQUhRLEVBR0ksS0FBSyxrQkFIVCxFQUlYLEVBSlcsQ0FJUixPQUpRLEVBSUMsS0FBSyxlQUpOLENBQWQ7O0FBTUEsVUFBTSxXQUFZLFdBQVcsQ0FBWixHQUFpQixJQUFsQzs7QUFFQSxXQUFLLGdCQUFMLENBQXNCLEtBQXRCLEVBQ0csS0FESCxDQUNTLFNBRFQsRUFDb0IsS0FBSyxvQkFBTCxDQUEwQixTQUExQixDQURwQixFQUVHLEtBRkgsQ0FFUyxNQUZULEVBRWlCLEtBQUssb0JBQUwsQ0FBMEIsTUFBMUIsS0FDYixLQUFLLG9CQUFMLENBQTBCLE9BQTFCLENBSEosRUFJRyxLQUpILENBSVMsUUFKVCxFQUltQixLQUFLLG9CQUFMLENBQTBCLFFBQTFCLEtBQ2YsS0FBSyxvQkFBTCxDQUEwQixPQUExQixDQUxKLEVBTUcsSUFOSCxDQU1RLFdBTlIsRUFNcUI7QUFBQSxlQUFLLFlBQVksQ0FBWixJQUFpQixRQUFqQixHQUNyQixXQUFXLENBQVgsR0FBZSxhQUFmLEdBQStCLGFBRGY7QUFBQSxPQU5yQixFQVNHLElBVEgsQ0FTUSxZQVRSLEVBU3NCLFdBQVcsQ0FBWCxHQUFlLGFBVHJDLEVBVUcsSUFWSCxDQVVRLFlBVlIsRUFXSTtBQUFBLGVBQUssS0FBSyxHQUFMLENBQVMsY0FBYyxDQUFkLENBQVQsRUFBMkIsYUFBYSxDQUFiLENBQTNCLENBQUw7QUFBQSxPQVhKLEVBWUcsSUFaSCxDQVlRLGFBWlIsRUFhSTtBQUFBLGVBQUssS0FBSyxHQUFMLENBQVMsQ0FBQyxjQUFjLENBQWQsQ0FBRCxHQUFvQixhQUFhLENBQWIsQ0FBN0IsQ0FBTDtBQUFBLE9BYko7QUFjRDs7OzZCQUVRO0FBQUEsb0JBQytCLEtBQUssS0FEcEM7QUFBQSxVQUNBLElBREEsV0FDQSxJQURBO0FBQUEsVUFDTSxVQUROLFdBQ00sVUFETjtBQUFBLFVBQ2tCLFNBRGxCLFdBQ2tCLFNBRGxCOztBQUVQLFVBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxlQUFPLElBQVA7QUFDRDtBQUNELGFBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsNENBRFo7QUFFRSxlQUFJLFdBRk47QUFHRSxvQ0FBd0IsVUFBeEIsU0FBc0MsU0FBdEMsTUFIRjtBQUlHLGFBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxpQkFBVSx3Q0FBTSxPQUFPLEVBQUMsU0FBUyxDQUFWLEVBQWIsRUFBMkIsS0FBSyxDQUFoQyxHQUFWO0FBQUEsU0FBVDtBQUpILE9BREY7QUFRRDs7O3dCQW5Gc0I7QUFDckIsMEJBQ00seUJBQWUsU0FEckI7QUFFRSxxQkFBYSxnQkFBTSxTQUFOLENBQWdCLE1BRi9CO0FBR0Usc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixNQUhoQztBQUlFLHNCQUFjLGdCQUFNLFNBQU4sQ0FBZ0IsTUFKaEM7QUFLRSx1QkFBZSxnQkFBTSxTQUFOLENBQWdCO0FBTGpDO0FBT0Q7Ozs7OztBQThFSCxVQUFVLFdBQVYsR0FBd0IsV0FBeEI7O2tCQUVlLFMiLCJmaWxlIjoiYmFyLXNlcmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZDNTZWxlY3Rpb24gZnJvbSAnZDMtc2VsZWN0aW9uJztcblxuaW1wb3J0IEFic3RyYWN0U2VyaWVzIGZyb20gJy4vYWJzdHJhY3Qtc2VyaWVzJztcbmltcG9ydCB7Z2V0RE9NTm9kZX0gZnJvbSAnLi4vLi4vdXRpbHMvcmVhY3QtdXRpbHMnO1xuXG5jbGFzcyBCYXJTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLiBBYnN0cmFjdFNlcmllcy5wcm9wVHlwZXMsXG4gICAgICBsaW5lUG9zQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHZhbHVlUG9zQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxpbmVTaXplQXR0cjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHZhbHVlU2l6ZUF0dHI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBfdXBkYXRlU2VyaWVzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldERPTU5vZGUodGhpcy5yZWZzLmNvbnRhaW5lcik7XG4gICAgY29uc3Qge1xuICAgICAgX3N0YWNrQnksXG4gICAgICBkYXRhLFxuICAgICAgbGluZVNpemVBdHRyLFxuICAgICAgdmFsdWVQb3NBdHRyLFxuICAgICAgbGluZVBvc0F0dHIsXG4gICAgICB2YWx1ZVNpemVBdHRyfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQge1xuICAgICAgc2FtZVR5cGVUb3RhbCA9IDEsXG4gICAgICBzYW1lVHlwZUluZGV4ID0gMH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5fZ2V0U2NhbGVEaXN0YW5jZShsaW5lUG9zQXR0cik7XG4gICAgY29uc3QgbGluZUZ1bmN0b3IgPSB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKGxpbmVQb3NBdHRyKTtcbiAgICBjb25zdCB2YWx1ZUZ1bmN0b3IgPSB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKHZhbHVlUG9zQXR0cik7XG4gICAgY29uc3QgdmFsdWUwRnVuY3RvciA9IHRoaXMuX2dldEF0dHIwRnVuY3Rvcih2YWx1ZVBvc0F0dHIpO1xuXG4gICAgaWYgKF9zdGFja0J5ID09PSB2YWx1ZVBvc0F0dHIpIHtcbiAgICAgIHNhbWVUeXBlVG90YWwgPSAxO1xuICAgICAgc2FtZVR5cGVJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVjdHMgPSBkM1NlbGVjdGlvbi5zZWxlY3QoY29udGFpbmVyKS5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgdGhpcy5fbW91c2VPdmVyV2l0aFZhbHVlKVxuICAgICAgLm9uKCdtb3VzZW91dCcsIHRoaXMuX21vdXNlT3V0V2l0aFZhbHVlKVxuICAgICAgLm9uKCdjbGljaycsIHRoaXMuX2NsaWNrV2l0aFZhbHVlKTtcblxuICAgIGNvbnN0IGl0ZW1TaXplID0gKGRpc3RhbmNlIC8gMikgKiAwLjg1O1xuXG4gICAgdGhpcy5fYXBwbHlUcmFuc2l0aW9uKHJlY3RzKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcignb3BhY2l0eScpKVxuICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcignZmlsbCcpIHx8XG4gICAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2NvbG9yJykpXG4gICAgICAuc3R5bGUoJ3N0cm9rZScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3N0cm9rZScpIHx8XG4gICAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2NvbG9yJykpXG4gICAgICAuYXR0cihsaW5lUG9zQXR0ciwgZCA9PiBsaW5lRnVuY3RvcihkKSAtIGl0ZW1TaXplICtcbiAgICAgICAgKGl0ZW1TaXplICogMiAvIHNhbWVUeXBlVG90YWwgKiBzYW1lVHlwZUluZGV4KVxuICAgICAgKVxuICAgICAgLmF0dHIobGluZVNpemVBdHRyLCBpdGVtU2l6ZSAqIDIgLyBzYW1lVHlwZVRvdGFsKVxuICAgICAgLmF0dHIodmFsdWVQb3NBdHRyLFxuICAgICAgICBkID0+IE1hdGgubWluKHZhbHVlMEZ1bmN0b3IoZCksIHZhbHVlRnVuY3RvcihkKSkpXG4gICAgICAuYXR0cih2YWx1ZVNpemVBdHRyLFxuICAgICAgICBkID0+IE1hdGguYWJzKC12YWx1ZTBGdW5jdG9yKGQpICsgdmFsdWVGdW5jdG9yKGQpKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2RhdGEsIG1hcmdpbkxlZnQsIG1hcmdpblRvcH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Z1xuICAgICAgICBjbGFzc05hbWU9XCJydi14eS1wbG90X19zZXJpZXMgcnYteHktcGxvdF9fc2VyaWVzLS1iYXJcIlxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxuICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW5MZWZ0fSwke21hcmdpblRvcH0pYH0+XG4gICAgICAgIHtkYXRhLm1hcCgoZCwgaSkgPT4gPHJlY3Qgc3R5bGU9e3tvcGFjaXR5OiAwfX0ga2V5PXtpfS8+KX1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9XG59XG5cbkJhclNlcmllcy5kaXNwbGF5TmFtZSA9ICdCYXJTZXJpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBCYXJTZXJpZXM7XG4iXX0=