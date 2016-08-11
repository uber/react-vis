'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Selection2 = _interopRequireDefault(_d3Selection);

var _d3Shape = require('d3-shape');

var _d3Shape2 = _interopRequireDefault(_d3Shape);

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _reactUtils = require('../../utils/react-utils');

var _theme = require('../../theme');

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

var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

var LineSeries = function (_AbstractSeries) {
  _inherits(LineSeries, _AbstractSeries);

  function LineSeries() {
    _classCallCheck(this, LineSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LineSeries).apply(this, arguments));
  }

  _createClass(LineSeries, [{
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
    key: 'toNewName',
    value: function toNewName(interpolation) {
      var capitalize = function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
      };
      return 'curve' + capitalize(interpolation);
    }
  }, {
    key: '_updateSeries',
    value: function _updateSeries() {
      var lineElement = (0, _reactUtils.getDOMNode)(this.refs.line);
      var data = this.props.data;

      if (!data) {
        return;
      }
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');
      var opacity = this._getAttributeValue('opacity') || _theme.DEFAULT_OPACITY;
      var interpolation = this._getAttributeValue('interpolation') || _theme.DEFAULT_INTERPOLATION;

      var line = _d3Shape2.default.line().curve(_d3Shape2.default[this.toNewName(interpolation)]).x(x).y(y);

      var d = line(data);
      var path = _d3Selection2.default.select(lineElement).on('mouseover', this._mouseOver).on('mouseout', this._mouseOut).on('click', this._click);
      this._applyTransition(path).attr('d', d).style('stroke', stroke).style('opacity', opacity);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var strokeStyle = _props.strokeStyle;
      var strokeWidth = _props.strokeWidth;
      var marginLeft = _props.marginLeft;
      var marginTop = _props.marginTop;

      if (!data) {
        return null;
      }
      return _react2.default.createElement('path', {
        ref: 'line',
        className: 'rv-xy-plot__series rv-xy-plot__series--line',
        transform: 'translate(' + marginLeft + ',' + marginTop + ')',
        style: {
          opacity: 0,
          strokeDasharray: STROKE_STYLES[strokeStyle],
          strokeWidth: strokeWidth
        } });
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        strokeStyle: 'solid',
        opacity: 1
      };
    }
  }]);

  return LineSeries;
}(_abstractSeries2.default);

LineSeries.displayName = 'LineSeries';

exports.default = LineSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvbGluZS1zZXJpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sZ0JBQWdCO0FBQ3BCLFVBQVEsTUFEWTtBQUVwQixTQUFPO0FBRmEsQ0FBdEI7O0lBS00sVTs7Ozs7Ozs7Ozs7d0NBU2dCO0FBQ2xCLFdBQUssYUFBTDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUssYUFBTDtBQUNEOzs7OEJBRVMsYSxFQUFlO0FBQ3ZCLFVBQU0sYUFBYSxTQUFiLFVBQWEsQ0FBQyxDQUFEO0FBQUEsZUFBTyxLQUFLLEVBQUUsQ0FBRixFQUFLLFdBQUwsS0FBcUIsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFqQztBQUFBLE9BQW5CO0FBQ0EsdUJBQWUsV0FBVyxhQUFYLENBQWY7QUFDRDs7O29DQUVlO0FBQ2QsVUFBTSxjQUFjLDRCQUFXLEtBQUssSUFBTCxDQUFVLElBQXJCLENBQXBCO0FBRGMsVUFFUCxJQUZPLEdBRUMsS0FBSyxLQUZOLENBRVAsSUFGTzs7QUFHZCxVQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1Q7QUFDRDtBQUNELFVBQU0sSUFBSSxLQUFLLG9CQUFMLENBQTBCLEdBQTFCLENBQVY7QUFDQSxVQUFNLElBQUksS0FBSyxvQkFBTCxDQUEwQixHQUExQixDQUFWO0FBQ0EsVUFBTSxTQUFTLEtBQUssa0JBQUwsQ0FBd0IsUUFBeEIsS0FDYixLQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBREY7QUFFQSxVQUFNLFVBQVUsS0FBSyxrQkFBTCxDQUF3QixTQUF4QiwyQkFBaEI7QUFDQSxVQUFNLGdCQUFnQixLQUFLLGtCQUFMLENBQXdCLGVBQXhCLGlDQUF0Qjs7QUFFQSxVQUFNLE9BQU8sa0JBQVEsSUFBUixHQUFlLEtBQWYsQ0FBcUIsa0JBQVEsS0FBSyxTQUFMLENBQWUsYUFBZixDQUFSLENBQXJCLEVBQTZELENBQTdELENBQStELENBQS9ELEVBQWtFLENBQWxFLENBQW9FLENBQXBFLENBQWI7O0FBRUEsVUFBTSxJQUFJLEtBQUssSUFBTCxDQUFWO0FBQ0EsVUFBTSxPQUFPLHNCQUFZLE1BQVosQ0FBbUIsV0FBbkIsRUFDVixFQURVLENBQ1AsV0FETyxFQUNNLEtBQUssVUFEWCxFQUVWLEVBRlUsQ0FFUCxVQUZPLEVBRUssS0FBSyxTQUZWLEVBR1YsRUFIVSxDQUdQLE9BSE8sRUFHRSxLQUFLLE1BSFAsQ0FBYjtBQUlBLFdBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsRUFDRyxJQURILENBQ1EsR0FEUixFQUNhLENBRGIsRUFFRyxLQUZILENBRVMsUUFGVCxFQUVtQixNQUZuQixFQUdHLEtBSEgsQ0FHUyxTQUhULEVBR29CLE9BSHBCO0FBSUQ7Ozs2QkFFUTtBQUFBLG1CQUN5RCxLQUFLLEtBRDlEO0FBQUEsVUFDQSxJQURBLFVBQ0EsSUFEQTtBQUFBLFVBQ00sV0FETixVQUNNLFdBRE47QUFBQSxVQUNtQixXQURuQixVQUNtQixXQURuQjtBQUFBLFVBQ2dDLFVBRGhDLFVBQ2dDLFVBRGhDO0FBQUEsVUFDNEMsU0FENUMsVUFDNEMsU0FENUM7O0FBRVAsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFDRTtBQUNFLGFBQUksTUFETjtBQUVFLG1CQUFVLDZDQUZaO0FBR0Usa0NBQXdCLFVBQXhCLFNBQXNDLFNBQXRDLE1BSEY7QUFJRSxlQUFPO0FBQ0wsbUJBQVMsQ0FESjtBQUVMLDJCQUFpQixjQUFjLFdBQWQsQ0FGWjtBQUdMO0FBSEssU0FKVCxHQURGO0FBV0Q7Ozt3QkE5RHlCO0FBQ3hCLGFBQU87QUFDTCxxQkFBYSxPQURSO0FBRUwsaUJBQVM7QUFGSixPQUFQO0FBSUQ7Ozs7OztBQTRESCxXQUFXLFdBQVgsR0FBeUIsWUFBekI7O2tCQUVlLFUiLCJmaWxlIjoibGluZS1zZXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGQzU2VsZWN0aW9uIGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgZDNTaGFwZSBmcm9tICdkMy1zaGFwZSc7XG5cbmltcG9ydCBBYnN0cmFjdFNlcmllcyBmcm9tICcuL2Fic3RyYWN0LXNlcmllcyc7XG5pbXBvcnQge2dldERPTU5vZGV9IGZyb20gJy4uLy4uL3V0aWxzL3JlYWN0LXV0aWxzJztcblxuaW1wb3J0IHtERUZBVUxUX09QQUNJVFksIERFRkFVTFRfSU5URVJQT0xBVElPTn0gZnJvbSAnLi4vLi4vdGhlbWUnO1xuXG5jb25zdCBTVFJPS0VfU1RZTEVTID0ge1xuICBkYXNoZWQ6ICc2LCAyJyxcbiAgc29saWQ6IG51bGxcbn07XG5cbmNsYXNzIExpbmVTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cm9rZVN0eWxlOiAnc29saWQnLFxuICAgICAgb3BhY2l0eTogMVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIHRvTmV3TmFtZShpbnRlcnBvbGF0aW9uKSB7XG4gICAgY29uc3QgY2FwaXRhbGl6ZSA9IChzKSA9PiBzICYmIHNbMF0udG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGBjdXJ2ZSR7Y2FwaXRhbGl6ZShpbnRlcnBvbGF0aW9uKX1gO1xuICB9XG5cbiAgX3VwZGF0ZVNlcmllcygpIHtcbiAgICBjb25zdCBsaW5lRWxlbWVudCA9IGdldERPTU5vZGUodGhpcy5yZWZzLmxpbmUpO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHggPSB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCd4Jyk7XG4gICAgY29uc3QgeSA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3knKTtcbiAgICBjb25zdCBzdHJva2UgPSB0aGlzLl9nZXRBdHRyaWJ1dGVWYWx1ZSgnc3Ryb2tlJykgfHxcbiAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZVZhbHVlKCdjb2xvcicpO1xuICAgIGNvbnN0IG9wYWNpdHkgPSB0aGlzLl9nZXRBdHRyaWJ1dGVWYWx1ZSgnb3BhY2l0eScpIHx8IERFRkFVTFRfT1BBQ0lUWTtcbiAgICBjb25zdCBpbnRlcnBvbGF0aW9uID0gdGhpcy5fZ2V0QXR0cmlidXRlVmFsdWUoJ2ludGVycG9sYXRpb24nKSB8fCBERUZBVUxUX0lOVEVSUE9MQVRJT047XG4gICAgXG4gICAgY29uc3QgbGluZSA9IGQzU2hhcGUubGluZSgpLmN1cnZlKGQzU2hhcGVbdGhpcy50b05ld05hbWUoaW50ZXJwb2xhdGlvbildKS54KHgpLnkoeSk7XG5cbiAgICBjb25zdCBkID0gbGluZShkYXRhKTtcbiAgICBjb25zdCBwYXRoID0gZDNTZWxlY3Rpb24uc2VsZWN0KGxpbmVFbGVtZW50KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZU92ZXIpXG4gICAgICAub24oJ21vdXNlb3V0JywgdGhpcy5fbW91c2VPdXQpXG4gICAgICAub24oJ2NsaWNrJywgdGhpcy5fY2xpY2spO1xuICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihwYXRoKVxuICAgICAgLmF0dHIoJ2QnLCBkKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCBzdHJva2UpXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCBvcGFjaXR5KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YSwgc3Ryb2tlU3R5bGUsIHN0cm9rZVdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5Ub3B9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHBhdGhcbiAgICAgICAgcmVmPVwibGluZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX3NlcmllcyBydi14eS1wbG90X19zZXJpZXMtLWxpbmVcIlxuICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW5MZWZ0fSwke21hcmdpblRvcH0pYH1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheTogU1RST0tFX1NUWUxFU1tzdHJva2VTdHlsZV0sXG4gICAgICAgICAgc3Ryb2tlV2lkdGhcbiAgICAgICAgfX0vPlxuICAgICk7XG4gIH1cbn1cblxuTGluZVNlcmllcy5kaXNwbGF5TmFtZSA9ICdMaW5lU2VyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgTGluZVNlcmllcztcbiJdfQ==