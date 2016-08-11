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

var AreaSeries = function (_AbstractSeries) {
  _inherits(AreaSeries, _AbstractSeries);

  function AreaSeries() {
    _classCallCheck(this, AreaSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AreaSeries).apply(this, arguments));
  }

  _createClass(AreaSeries, [{
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
      var y0 = this._getAttr0Functor('y');
      var fill = this._getAttributeValue('fill') || this._getAttributeValue('color');

      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');

      var interpolation = this._getAttributeValue('interpolation') || _theme.DEFAULT_INTERPOLATION;

      var line = _d3Shape2.default.area().curve(_d3Shape2.default[this.toNewName(interpolation)]).x(x).y0(y0).y1(y);

      var opacity = this._getAttributeValue('opacity') || _theme.DEFAULT_OPACITY;
      var d = line(data);

      var path = _d3Selection2.default.select(lineElement).on('mouseover', this._mouseOver).on('mouseout', this._mouseOut).on('click', this._click);

      this._applyTransition(path).attr('d', d).style('stroke', stroke).style('fill', fill).style('opacity', opacity);
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
      return _react2.default.createElement('path', {
        ref: 'line',
        style: { opacity: 0 },
        className: 'rv-xy-plot__series rv-xy-plot__series--area',
        transform: 'translate(' + marginLeft + ',' + marginTop + ')' });
    }
  }]);

  return AreaSeries;
}(_abstractSeries2.default);

AreaSeries.displayName = 'AreaSeries';

exports.default = AreaSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvYXJlYS1zZXJpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNLFU7Ozs7Ozs7Ozs7O3dDQUVnQjtBQUNsQixXQUFLLGFBQUw7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLLGFBQUw7QUFDRDs7OzhCQUVTLGEsRUFBZTtBQUN2QixVQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsQ0FBRDtBQUFBLGVBQU8sS0FBSyxFQUFFLENBQUYsRUFBSyxXQUFMLEtBQXFCLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBakM7QUFBQSxPQUFuQjtBQUNBLHVCQUFlLFdBQVcsYUFBWCxDQUFmO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQU0sY0FBYyw0QkFBVyxLQUFLLElBQUwsQ0FBVSxJQUFyQixDQUFwQjtBQURjLFVBRVAsSUFGTyxHQUVDLEtBQUssS0FGTixDQUVQLElBRk87O0FBR2QsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNUO0FBQ0Q7O0FBRUQsVUFBTSxJQUFJLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsQ0FBVjtBQUNBLFVBQU0sSUFBSSxLQUFLLG9CQUFMLENBQTBCLEdBQTFCLENBQVY7QUFDQSxVQUFNLEtBQUssS0FBSyxnQkFBTCxDQUFzQixHQUF0QixDQUFYO0FBQ0EsVUFBTSxPQUFPLEtBQUssa0JBQUwsQ0FBd0IsTUFBeEIsS0FDWCxLQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBREY7O0FBR0EsVUFBTSxTQUFTLEtBQUssa0JBQUwsQ0FBd0IsUUFBeEIsS0FDYixLQUFLLGtCQUFMLENBQXdCLE9BQXhCLENBREY7O0FBR0EsVUFBTSxnQkFBZ0IsS0FBSyxrQkFBTCxDQUF3QixlQUF4QixpQ0FBdEI7O0FBRUEsVUFBTSxPQUFPLGtCQUFRLElBQVIsR0FBZSxLQUFmLENBQXFCLGtCQUFRLEtBQUssU0FBTCxDQUFlLGFBQWYsQ0FBUixDQUFyQixFQUE2RCxDQUE3RCxDQUErRCxDQUEvRCxFQUFrRSxFQUFsRSxDQUFxRSxFQUFyRSxFQUF5RSxFQUF6RSxDQUE0RSxDQUE1RSxDQUFiOztBQUVBLFVBQU0sVUFBVSxLQUFLLGtCQUFMLENBQXdCLFNBQXhCLDJCQUFoQjtBQUNBLFVBQU0sSUFBSSxLQUFLLElBQUwsQ0FBVjs7QUFFQSxVQUFNLE9BQU8sc0JBQVksTUFBWixDQUFtQixXQUFuQixFQUNWLEVBRFUsQ0FDUCxXQURPLEVBQ00sS0FBSyxVQURYLEVBRVYsRUFGVSxDQUVQLFVBRk8sRUFFSyxLQUFLLFNBRlYsRUFHVixFQUhVLENBR1AsT0FITyxFQUdFLEtBQUssTUFIUCxDQUFiOztBQUtBLFdBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsRUFDRyxJQURILENBQ1EsR0FEUixFQUNhLENBRGIsRUFFRyxLQUZILENBRVMsUUFGVCxFQUVtQixNQUZuQixFQUdHLEtBSEgsQ0FHUyxNQUhULEVBR2lCLElBSGpCLEVBSUcsS0FKSCxDQUlTLFNBSlQsRUFJb0IsT0FKcEI7QUFLRDs7OzZCQUVRO0FBQUEsbUJBQytCLEtBQUssS0FEcEM7QUFBQSxVQUNBLElBREEsVUFDQSxJQURBO0FBQUEsVUFDTSxVQUROLFVBQ00sVUFETjtBQUFBLFVBQ2tCLFNBRGxCLFVBQ2tCLFNBRGxCOztBQUVQLFVBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxlQUFPLElBQVA7QUFDRDtBQUNELGFBQ0U7QUFDRSxhQUFJLE1BRE47QUFFRSxlQUFPLEVBQUMsU0FBUyxDQUFWLEVBRlQ7QUFHRSxtQkFBVSw2Q0FIWjtBQUlFLGtDQUF3QixVQUF4QixTQUFzQyxTQUF0QyxNQUpGLEdBREY7QUFPRDs7Ozs7O0FBSUgsV0FBVyxXQUFYLEdBQXlCLFlBQXpCOztrQkFFZSxVIiwiZmlsZSI6ImFyZWEtc2VyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkM1NlbGVjdGlvbiBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IGQzU2hhcGUgZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgQWJzdHJhY3RTZXJpZXMgZnJvbSAnLi9hYnN0cmFjdC1zZXJpZXMnO1xuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuLi8uLi91dGlscy9yZWFjdC11dGlscyc7XG5cbmltcG9ydCB7REVGQVVMVF9PUEFDSVRZLCBERUZBVUxUX0lOVEVSUE9MQVRJT059IGZyb20gJy4uLy4uL3RoZW1lJztcblxuY2xhc3MgQXJlYVNlcmllcyBleHRlbmRzIEFic3RyYWN0U2VyaWVzIHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl91cGRhdGVTZXJpZXMoKTtcbiAgfVxuXG4gIHRvTmV3TmFtZShpbnRlcnBvbGF0aW9uKSB7XG4gICAgY29uc3QgY2FwaXRhbGl6ZSA9IChzKSA9PiBzICYmIHNbMF0udG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGBjdXJ2ZSR7Y2FwaXRhbGl6ZShpbnRlcnBvbGF0aW9uKX1gO1xuICB9XG5cbiAgX3VwZGF0ZVNlcmllcygpIHtcbiAgICBjb25zdCBsaW5lRWxlbWVudCA9IGdldERPTU5vZGUodGhpcy5yZWZzLmxpbmUpO1xuICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3gnKTtcbiAgICBjb25zdCB5ID0gdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcigneScpO1xuICAgIGNvbnN0IHkwID0gdGhpcy5fZ2V0QXR0cjBGdW5jdG9yKCd5Jyk7XG4gICAgY29uc3QgZmlsbCA9IHRoaXMuX2dldEF0dHJpYnV0ZVZhbHVlKCdmaWxsJykgfHxcbiAgICAgIHRoaXMuX2dldEF0dHJpYnV0ZVZhbHVlKCdjb2xvcicpO1xuXG4gICAgY29uc3Qgc3Ryb2tlID0gdGhpcy5fZ2V0QXR0cmlidXRlVmFsdWUoJ3N0cm9rZScpIHx8XG4gICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVWYWx1ZSgnY29sb3InKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRpb24gPSB0aGlzLl9nZXRBdHRyaWJ1dGVWYWx1ZSgnaW50ZXJwb2xhdGlvbicpIHx8IERFRkFVTFRfSU5URVJQT0xBVElPTjtcblxuICAgIGNvbnN0IGxpbmUgPSBkM1NoYXBlLmFyZWEoKS5jdXJ2ZShkM1NoYXBlW3RoaXMudG9OZXdOYW1lKGludGVycG9sYXRpb24pXSkueCh4KS55MCh5MCkueTEoeSk7XG5cbiAgICBjb25zdCBvcGFjaXR5ID0gdGhpcy5fZ2V0QXR0cmlidXRlVmFsdWUoJ29wYWNpdHknKSB8fCBERUZBVUxUX09QQUNJVFk7XG4gICAgY29uc3QgZCA9IGxpbmUoZGF0YSk7XG5cbiAgICBjb25zdCBwYXRoID0gZDNTZWxlY3Rpb24uc2VsZWN0KGxpbmVFbGVtZW50KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZU92ZXIpXG4gICAgICAub24oJ21vdXNlb3V0JywgdGhpcy5fbW91c2VPdXQpXG4gICAgICAub24oJ2NsaWNrJywgdGhpcy5fY2xpY2spO1xuXG4gICAgdGhpcy5fYXBwbHlUcmFuc2l0aW9uKHBhdGgpXG4gICAgICAuYXR0cignZCcsIGQpXG4gICAgICAuc3R5bGUoJ3N0cm9rZScsIHN0cm9rZSlcbiAgICAgIC5zdHlsZSgnZmlsbCcsIGZpbGwpXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCBvcGFjaXR5KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YSwgbWFyZ2luTGVmdCwgbWFyZ2luVG9wfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxwYXRoXG4gICAgICAgIHJlZj1cImxpbmVcIlxuICAgICAgICBzdHlsZT17e29wYWNpdHk6IDB9fVxuICAgICAgICBjbGFzc05hbWU9XCJydi14eS1wbG90X19zZXJpZXMgcnYteHktcGxvdF9fc2VyaWVzLS1hcmVhXCJcbiAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bWFyZ2luTGVmdH0sJHttYXJnaW5Ub3B9KWB9Lz5cbiAgICApO1xuICB9XG5cbn1cblxuQXJlYVNlcmllcy5kaXNwbGF5TmFtZSA9ICdBcmVhU2VyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgQXJlYVNlcmllcztcbiJdfQ==