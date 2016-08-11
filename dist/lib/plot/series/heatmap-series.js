'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var HeatmapSeries = function (_AbstractSeries) {
  _inherits(HeatmapSeries, _AbstractSeries);

  function HeatmapSeries() {
    _classCallCheck(this, HeatmapSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HeatmapSeries).apply(this, arguments));
  }

  _createClass(HeatmapSeries, [{
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
      var data = this.props.data;

      var xDistance = this._getScaleDistance('x');
      var yDistance = this._getScaleDistance('y');
      if (!data) {
        return;
      }
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');

      var rects = _d3Selection2.default.select(container).selectAll('rect').data(data).on('mouseover', this._mouseOverWithValue).on('mouseout', this._mouseOutWithValue).on('click', this._clickWithValue);

      this._applyTransition(rects).style('opacity', this._getAttributeFunctor('opacity')).style('fill', this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')).style('stroke', this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')).attr('x', function getX(d) {
        return x(d) - xDistance / 2;
      }).attr('y', function getY(d) {
        return y(d) - yDistance / 2;
      }).attr('width', xDistance).attr('height', yDistance);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var marginLeft = _props.marginLeft;
      var marginTop = _props.marginTop;

      if (!data) {
        return null;
      }
      return _react2.default.createElement(
        'g',
        {
          className: 'rv-xy-plot__series rv-xy-plot__series--heatmap',
          ref: 'container',
          transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return _react2.default.createElement('rect', { style: { opacity: 0 }, key: i });
        })
      );
    }
  }], [{
    key: 'getParentConfig',
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === 'x' || attr === 'y';
      return { isDomainAdjustmentNeeded: isDomainAdjustmentNeeded };
    }
  }]);

  return HeatmapSeries;
}(_abstractSeries2.default);

HeatmapSeries.displayName = 'HeatmapSeries';

exports.default = HeatmapSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvaGVhdG1hcC1zZXJpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxhOzs7Ozs7Ozs7Ozt3Q0FPZ0I7QUFDbEIsV0FBSyxhQUFMO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQU0sWUFBWSw0QkFBVyxLQUFLLElBQUwsQ0FBVSxTQUFyQixDQUFsQjtBQURjLFVBRVAsSUFGTyxHQUVDLEtBQUssS0FGTixDQUVQLElBRk87O0FBR2QsVUFBTSxZQUFZLEtBQUssaUJBQUwsQ0FBdUIsR0FBdkIsQ0FBbEI7QUFDQSxVQUFNLFlBQVksS0FBSyxpQkFBTCxDQUF1QixHQUF2QixDQUFsQjtBQUNBLFVBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVDtBQUNEO0FBQ0QsVUFBTSxJQUFJLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsQ0FBVjtBQUNBLFVBQU0sSUFBSSxLQUFLLG9CQUFMLENBQTBCLEdBQTFCLENBQVY7O0FBRUEsVUFBTSxRQUFRLHNCQUFZLE1BQVosQ0FBbUIsU0FBbkIsRUFBOEIsU0FBOUIsQ0FBd0MsTUFBeEMsRUFDWCxJQURXLENBQ04sSUFETSxFQUVYLEVBRlcsQ0FFUixXQUZRLEVBRUssS0FBSyxtQkFGVixFQUdYLEVBSFcsQ0FHUixVQUhRLEVBR0ksS0FBSyxrQkFIVCxFQUlYLEVBSlcsQ0FJUixPQUpRLEVBSUMsS0FBSyxlQUpOLENBQWQ7O0FBTUEsV0FBSyxnQkFBTCxDQUFzQixLQUF0QixFQUNHLEtBREgsQ0FDUyxTQURULEVBQ29CLEtBQUssb0JBQUwsQ0FBMEIsU0FBMUIsQ0FEcEIsRUFFRyxLQUZILENBRVMsTUFGVCxFQUVpQixLQUFLLG9CQUFMLENBQTBCLE1BQTFCLEtBQ2IsS0FBSyxvQkFBTCxDQUEwQixPQUExQixDQUhKLEVBSUcsS0FKSCxDQUlTLFFBSlQsRUFJbUIsS0FBSyxvQkFBTCxDQUEwQixRQUExQixLQUNmLEtBQUssb0JBQUwsQ0FBMEIsT0FBMUIsQ0FMSixFQU1HLElBTkgsQ0FNUSxHQU5SLEVBTWEsU0FBUyxJQUFULENBQWMsQ0FBZCxFQUFpQjtBQUMxQixlQUFPLEVBQUUsQ0FBRixJQUFPLFlBQVksQ0FBMUI7QUFDRCxPQVJILEVBU0csSUFUSCxDQVNRLEdBVFIsRUFTYSxTQUFTLElBQVQsQ0FBYyxDQUFkLEVBQWlCO0FBQzFCLGVBQU8sRUFBRSxDQUFGLElBQU8sWUFBWSxDQUExQjtBQUNELE9BWEgsRUFZRyxJQVpILENBWVEsT0FaUixFQVlpQixTQVpqQixFQWFHLElBYkgsQ0FhUSxRQWJSLEVBYWtCLFNBYmxCO0FBY0Q7Ozs2QkFFUTtBQUFBLG1CQUMrQixLQUFLLEtBRHBDO0FBQUEsVUFDQSxJQURBLFVBQ0EsSUFEQTtBQUFBLFVBQ00sVUFETixVQUNNLFVBRE47QUFBQSxVQUNrQixTQURsQixVQUNrQixTQURsQjs7QUFFUCxVQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFVLGdEQURaO0FBRUUsZUFBSSxXQUZOO0FBR0Usb0NBQXdCLFVBQXhCLFNBQXNDLFNBQXRDLE1BSEY7QUFJRyxhQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsaUJBQVUsd0NBQU0sT0FBTyxFQUFDLFNBQVMsQ0FBVixFQUFiLEVBQTJCLEtBQUssQ0FBaEMsR0FBVjtBQUFBLFNBQVQ7QUFKSCxPQURGO0FBUUQ7OztvQ0EzRHNCLEksRUFBTTtBQUMzQixVQUFNLDJCQUEyQixTQUFTLEdBQVQsSUFBZ0IsU0FBUyxHQUExRDtBQUNBLGFBQU8sRUFBQyxrREFBRCxFQUFQO0FBQ0Q7Ozs7OztBQTJESCxjQUFjLFdBQWQsR0FBNEIsZUFBNUI7O2tCQUVlLGEiLCJmaWxlIjoiaGVhdG1hcC1zZXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGQzU2VsZWN0aW9uIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuL2Fic3RyYWN0LXNlcmllcyc7XG5pbXBvcnQge2dldERPTU5vZGV9IGZyb20gJy4uLy4uL3V0aWxzL3JlYWN0LXV0aWxzJztcblxuY2xhc3MgSGVhdG1hcFNlcmllcyBleHRlbmRzIEFic3RyYWN0U2VyaWVzIHtcblxuICBzdGF0aWMgZ2V0UGFyZW50Q29uZmlnKGF0dHIpIHtcbiAgICBjb25zdCBpc0RvbWFpbkFkanVzdG1lbnROZWVkZWQgPSBhdHRyID09PSAneCcgfHwgYXR0ciA9PT0gJ3knO1xuICAgIHJldHVybiB7aXNEb21haW5BZGp1c3RtZW50TmVlZGVkfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3VwZGF0ZVNlcmllcygpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3VwZGF0ZVNlcmllcygpO1xuICB9XG5cbiAgX3VwZGF0ZVNlcmllcygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBnZXRET01Ob2RlKHRoaXMucmVmcy5jb250YWluZXIpO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeERpc3RhbmNlID0gdGhpcy5fZ2V0U2NhbGVEaXN0YW5jZSgneCcpO1xuICAgIGNvbnN0IHlEaXN0YW5jZSA9IHRoaXMuX2dldFNjYWxlRGlzdGFuY2UoJ3knKTtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeCA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3gnKTtcbiAgICBjb25zdCB5ID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcigneScpO1xuXG4gICAgY29uc3QgcmVjdHMgPSBkM1NlbGVjdGlvbi5zZWxlY3QoY29udGFpbmVyKS5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgdGhpcy5fbW91c2VPdmVyV2l0aFZhbHVlKVxuICAgICAgLm9uKCdtb3VzZW91dCcsIHRoaXMuX21vdXNlT3V0V2l0aFZhbHVlKVxuICAgICAgLm9uKCdjbGljaycsIHRoaXMuX2NsaWNrV2l0aFZhbHVlKTtcblxuICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihyZWN0cylcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ29wYWNpdHknKSlcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ2ZpbGwnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdzdHJva2UnKSB8fFxuICAgICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdjb2xvcicpKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbiBnZXRYKGQpIHtcbiAgICAgICAgcmV0dXJuIHgoZCkgLSB4RGlzdGFuY2UgLyAyO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24gZ2V0WShkKSB7XG4gICAgICAgIHJldHVybiB5KGQpIC0geURpc3RhbmNlIC8gMjtcbiAgICAgIH0pXG4gICAgICAuYXR0cignd2lkdGgnLCB4RGlzdGFuY2UpXG4gICAgICAuYXR0cignaGVpZ2h0JywgeURpc3RhbmNlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YSwgbWFyZ2luTGVmdCwgbWFyZ2luVG9wfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxnXG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX3NlcmllcyBydi14eS1wbG90X19zZXJpZXMtLWhlYXRtYXBcIlxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxuICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW5MZWZ0fSwke21hcmdpblRvcH0pYH0+XG4gICAgICAgIHtkYXRhLm1hcCgoZCwgaSkgPT4gPHJlY3Qgc3R5bGU9e3tvcGFjaXR5OiAwfX0ga2V5PXtpfS8+KX1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9XG59XG5cbkhlYXRtYXBTZXJpZXMuZGlzcGxheU5hbWUgPSAnSGVhdG1hcFNlcmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYXRtYXBTZXJpZXM7XG4iXX0=