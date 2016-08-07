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

      var itemSize = distance / 2 * 0.95;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvYmFyLXNlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBbUJBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxTOzs7Ozs7Ozs7Ozt3Q0FZZ0I7QUFDbEIsV0FBSyxhQUFMO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQU0sWUFBWSw0QkFBVyxLQUFLLElBQUwsQ0FBVSxTQUFyQixDQUFsQjtBQURjLG1CQVFLLEtBQUssS0FSVjtBQUFBLFVBR1osUUFIWSxVQUdaLFFBSFk7QUFBQSxVQUlaLElBSlksVUFJWixJQUpZO0FBQUEsVUFLWixZQUxZLFVBS1osWUFMWTtBQUFBLFVBTVosWUFOWSxVQU1aLFlBTlk7QUFBQSxVQU9aLFdBUFksVUFPWixXQVBZO0FBQUEsVUFRWixhQVJZLFVBUVosYUFSWTtBQUFBLG9CQVlTLEtBQUssS0FaZDtBQUFBLDBDQVdaLGFBWFk7QUFBQSxVQVdaLGFBWFkseUNBV0ksQ0FYSjtBQUFBLDBDQVlaLGFBWlk7QUFBQSxVQVlaLGFBWlkseUNBWUksQ0FaSjs7O0FBY2QsVUFBSSxDQUFDLElBQUQsSUFBUyxDQUFDLEtBQUssTUFBbkIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxVQUFNLFdBQVcsS0FBSyxpQkFBTCxDQUF1QixXQUF2QixDQUFqQjtBQUNBLFVBQU0sY0FBYyxLQUFLLG9CQUFMLENBQTBCLFdBQTFCLENBQXBCO0FBQ0EsVUFBTSxlQUFlLEtBQUssb0JBQUwsQ0FBMEIsWUFBMUIsQ0FBckI7QUFDQSxVQUFNLGdCQUFnQixLQUFLLGdCQUFMLENBQXNCLFlBQXRCLENBQXRCOztBQUVBLFVBQUksYUFBYSxZQUFqQixFQUErQjtBQUM3Qix3QkFBZ0IsQ0FBaEI7QUFDQSx3QkFBZ0IsQ0FBaEI7QUFDRDs7QUFFRCxVQUFNLFFBQVEsc0JBQVksTUFBWixDQUFtQixTQUFuQixFQUE4QixTQUE5QixDQUF3QyxNQUF4QyxFQUNYLElBRFcsQ0FDTixJQURNLEVBRVgsRUFGVyxDQUVSLFdBRlEsRUFFSyxLQUFLLG1CQUZWLEVBR1gsRUFIVyxDQUdSLFVBSFEsRUFHSSxLQUFLLGtCQUhULEVBSVgsRUFKVyxDQUlSLE9BSlEsRUFJQyxLQUFLLGVBSk4sQ0FBZDs7QUFNQSxVQUFNLFdBQVksV0FBVyxDQUFaLEdBQWlCLElBQWxDOztBQUVBLFdBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFDRyxLQURILENBQ1MsU0FEVCxFQUNvQixLQUFLLG9CQUFMLENBQTBCLFNBQTFCLENBRHBCLEVBRUcsS0FGSCxDQUVTLE1BRlQsRUFFaUIsS0FBSyxvQkFBTCxDQUEwQixNQUExQixLQUNiLEtBQUssb0JBQUwsQ0FBMEIsT0FBMUIsQ0FISixFQUlHLEtBSkgsQ0FJUyxRQUpULEVBSW1CLEtBQUssb0JBQUwsQ0FBMEIsUUFBMUIsS0FDZixLQUFLLG9CQUFMLENBQTBCLE9BQTFCLENBTEosRUFNRyxJQU5ILENBTVEsV0FOUixFQU1xQjtBQUFBLGVBQUssWUFBWSxDQUFaLElBQWlCLFFBQWpCLEdBQ3JCLFdBQVcsQ0FBWCxHQUFlLGFBQWYsR0FBK0IsYUFEZjtBQUFBLE9BTnJCLEVBU0csSUFUSCxDQVNRLFlBVFIsRUFTc0IsV0FBVyxDQUFYLEdBQWUsYUFUckMsRUFVRyxJQVZILENBVVEsWUFWUixFQVdJO0FBQUEsZUFBSyxLQUFLLEdBQUwsQ0FBUyxjQUFjLENBQWQsQ0FBVCxFQUEyQixhQUFhLENBQWIsQ0FBM0IsQ0FBTDtBQUFBLE9BWEosRUFZRyxJQVpILENBWVEsYUFaUixFQWFJO0FBQUEsZUFBSyxLQUFLLEdBQUwsQ0FBUyxDQUFDLGNBQWMsQ0FBZCxDQUFELEdBQW9CLGFBQWEsQ0FBYixDQUE3QixDQUFMO0FBQUEsT0FiSjtBQWNEOzs7NkJBRVE7QUFBQSxvQkFDK0IsS0FBSyxLQURwQztBQUFBLFVBQ0EsSUFEQSxXQUNBLElBREE7QUFBQSxVQUNNLFVBRE4sV0FDTSxVQUROO0FBQUEsVUFDa0IsU0FEbEIsV0FDa0IsU0FEbEI7O0FBRVAsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSw0Q0FEWjtBQUVFLGVBQUksV0FGTjtBQUdFLG9DQUF3QixVQUF4QixTQUFzQyxTQUF0QyxNQUhGO0FBSUcsYUFBSyxHQUFMLENBQVMsVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGlCQUFVLHdDQUFNLE9BQU8sRUFBQyxTQUFTLENBQVYsRUFBYixFQUEyQixLQUFLLENBQWhDLEdBQVY7QUFBQSxTQUFUO0FBSkgsT0FERjtBQVFEOzs7d0JBbkZzQjtBQUNyQiwwQkFDTSx5QkFBZSxTQURyQjtBQUVFLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGL0I7QUFHRSxzQkFBYyxnQkFBTSxTQUFOLENBQWdCLE1BSGhDO0FBSUUsc0JBQWMsZ0JBQU0sU0FBTixDQUFnQixNQUpoQztBQUtFLHVCQUFlLGdCQUFNLFNBQU4sQ0FBZ0I7QUFMakM7QUFPRDs7Ozs7O0FBOEVILFVBQVUsV0FBVixHQUF3QixXQUF4Qjs7a0JBRWUsUyIsImZpbGUiOiJiYXItc2VyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGQzU2VsZWN0aW9uIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuL2Fic3RyYWN0LXNlcmllcyc7XG5pbXBvcnQge2dldERPTU5vZGV9IGZyb20gJy4uLy4uL3V0aWxzL3JlYWN0LXV0aWxzJztcblxuY2xhc3MgQmFyU2VyaWVzIGV4dGVuZHMgQWJzdHJhY3RTZXJpZXMge1xuXG4gIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi4gQWJzdHJhY3RTZXJpZXMucHJvcFR5cGVzLFxuICAgICAgbGluZVBvc0F0dHI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB2YWx1ZVBvc0F0dHI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBsaW5lU2l6ZUF0dHI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB2YWx1ZVNpemVBdHRyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3VwZGF0ZVNlcmllcygpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3VwZGF0ZVNlcmllcygpO1xuICB9XG5cbiAgX3VwZGF0ZVNlcmllcygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBnZXRET01Ob2RlKHRoaXMucmVmcy5jb250YWluZXIpO1xuICAgIGNvbnN0IHtcbiAgICAgIF9zdGFja0J5LFxuICAgICAgZGF0YSxcbiAgICAgIGxpbmVTaXplQXR0cixcbiAgICAgIHZhbHVlUG9zQXR0cixcbiAgICAgIGxpbmVQb3NBdHRyLFxuICAgICAgdmFsdWVTaXplQXR0cn0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHtcbiAgICAgIHNhbWVUeXBlVG90YWwgPSAxLFxuICAgICAgc2FtZVR5cGVJbmRleCA9IDB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZGF0YSB8fCAhZGF0YS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuX2dldFNjYWxlRGlzdGFuY2UobGluZVBvc0F0dHIpO1xuICAgIGNvbnN0IGxpbmVGdW5jdG9yID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcihsaW5lUG9zQXR0cik7XG4gICAgY29uc3QgdmFsdWVGdW5jdG9yID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcih2YWx1ZVBvc0F0dHIpO1xuICAgIGNvbnN0IHZhbHVlMEZ1bmN0b3IgPSB0aGlzLl9nZXRBdHRyMEZ1bmN0b3IodmFsdWVQb3NBdHRyKTtcblxuICAgIGlmIChfc3RhY2tCeSA9PT0gdmFsdWVQb3NBdHRyKSB7XG4gICAgICBzYW1lVHlwZVRvdGFsID0gMTtcbiAgICAgIHNhbWVUeXBlSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3RzID0gZDNTZWxlY3Rpb24uc2VsZWN0KGNvbnRhaW5lcikuc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX21vdXNlT3ZlcldpdGhWYWx1ZSlcbiAgICAgIC5vbignbW91c2VvdXQnLCB0aGlzLl9tb3VzZU91dFdpdGhWYWx1ZSlcbiAgICAgIC5vbignY2xpY2snLCB0aGlzLl9jbGlja1dpdGhWYWx1ZSk7XG5cbiAgICBjb25zdCBpdGVtU2l6ZSA9IChkaXN0YW5jZSAvIDIpICogMC45NTtcblxuICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihyZWN0cylcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ29wYWNpdHknKSlcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2ZpbGwnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdzdHJva2UnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLmF0dHIobGluZVBvc0F0dHIsIGQgPT4gbGluZUZ1bmN0b3IoZCkgLSBpdGVtU2l6ZSArXG4gICAgICAgIChpdGVtU2l6ZSAqIDIgLyBzYW1lVHlwZVRvdGFsICogc2FtZVR5cGVJbmRleClcbiAgICAgIClcbiAgICAgIC5hdHRyKGxpbmVTaXplQXR0ciwgaXRlbVNpemUgKiAyIC8gc2FtZVR5cGVUb3RhbClcbiAgICAgIC5hdHRyKHZhbHVlUG9zQXR0cixcbiAgICAgICAgZCA9PiBNYXRoLm1pbih2YWx1ZTBGdW5jdG9yKGQpLCB2YWx1ZUZ1bmN0b3IoZCkpKVxuICAgICAgLmF0dHIodmFsdWVTaXplQXR0cixcbiAgICAgICAgZCA9PiBNYXRoLmFicygtdmFsdWUwRnVuY3RvcihkKSArIHZhbHVlRnVuY3RvcihkKSkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtkYXRhLCBtYXJnaW5MZWZ0LCBtYXJnaW5Ub3B9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGdcbiAgICAgICAgY2xhc3NOYW1lPVwicnYteHktcGxvdF9fc2VyaWVzIHJ2LXh5LXBsb3RfX3Nlcmllcy0tYmFyXCJcbiAgICAgICAgcmVmPVwiY29udGFpbmVyXCJcbiAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bWFyZ2luTGVmdH0sJHttYXJnaW5Ub3B9KWB9PlxuICAgICAgICB7ZGF0YS5tYXAoKGQsIGkpID0+IDxyZWN0IHN0eWxlPXt7b3BhY2l0eTogMH19IGtleT17aX0vPil9XG4gICAgICA8L2c+XG4gICAgKTtcbiAgfVxufVxuXG5CYXJTZXJpZXMuZGlzcGxheU5hbWUgPSAnQmFyU2VyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgQmFyU2VyaWVzO1xuIl19