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

var MarkSeries = function (_AbstractSeries) {
  _inherits(MarkSeries, _AbstractSeries);

  function MarkSeries() {
    _classCallCheck(this, MarkSeries);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MarkSeries).apply(this, arguments));
  }

  _createClass(MarkSeries, [{
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

      if (!data) {
        return;
      }
      var circles = _d3Selection2.default.select(container).selectAll('circle').data(data).on('mouseover', this._mouseOverWithValue).on('mouseout', this._mouseOutWithValue).on('click', this._clickWithValue);

      // TODO(anton): radius should be the half of the size.
      this._applyTransition(circles).attr('r', this._getAttributeFunctor('size') || _theme.DEFAULT_SIZE).style('opacity', this._getAttributeFunctor('opacity') || _theme.DEFAULT_OPACITY).style('fill', this._getAttributeFunctor('fill') || this._getAttributeFunctor('color')).style('stroke', this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color')).attr('cx', this._getAttributeFunctor('x')).attr('cy', this._getAttributeFunctor('y'));
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
        { className: 'rv-xy-plot__series rv-xy-plot__series--mark',
          ref: 'container',
          transform: 'translate(' + marginLeft + ',' + marginTop + ')' },
        data.map(function (d, i) {
          return _react2.default.createElement('circle', { style: { opacity: 0 }, key: i });
        })
      );
    }
  }]);

  return MarkSeries;
}(_abstractSeries2.default);

MarkSeries.displayName = 'MarkSeries';

exports.default = MarkSeries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcGxvdC9zZXJpZXMvbWFyay1zZXJpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxVOzs7Ozs7Ozs7Ozt3Q0FFZ0I7QUFDbEIsV0FBSyxhQUFMO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFVBQU0sWUFBWSw0QkFBVyxLQUFLLElBQUwsQ0FBVSxTQUFyQixDQUFsQjtBQURjLFVBRVAsSUFGTyxHQUVDLEtBQUssS0FGTixDQUVQLElBRk87O0FBR2QsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNUO0FBQ0Q7QUFDRCxVQUFNLFVBQVUsc0JBQVksTUFBWixDQUFtQixTQUFuQixFQUE4QixTQUE5QixDQUF3QyxRQUF4QyxFQUNiLElBRGEsQ0FDUixJQURRLEVBRWIsRUFGYSxDQUVWLFdBRlUsRUFFRyxLQUFLLG1CQUZSLEVBR2IsRUFIYSxDQUdWLFVBSFUsRUFHRSxLQUFLLGtCQUhQLEVBSWIsRUFKYSxDQUlWLE9BSlUsRUFJRCxLQUFLLGVBSkosQ0FBaEI7OztBQU9BLFdBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFDRyxJQURILENBQ1EsR0FEUixFQUNhLEtBQUssb0JBQUwsQ0FBMEIsTUFBMUIsd0JBRGIsRUFFRyxLQUZILENBRVMsU0FGVCxFQUVvQixLQUFLLG9CQUFMLENBQTBCLFNBQTFCLDJCQUZwQixFQUdHLEtBSEgsQ0FHUyxNQUhULEVBR2lCLEtBQUssb0JBQUwsQ0FBMEIsTUFBMUIsS0FDYixLQUFLLG9CQUFMLENBQTBCLE9BQTFCLENBSkosRUFLRyxLQUxILENBS1MsUUFMVCxFQUttQixLQUFLLG9CQUFMLENBQTBCLFFBQTFCLEtBQ2YsS0FBSyxvQkFBTCxDQUEwQixPQUExQixDQU5KLEVBT0csSUFQSCxDQU9RLElBUFIsRUFPYyxLQUFLLG9CQUFMLENBQTBCLEdBQTFCLENBUGQsRUFRRyxJQVJILENBUVEsSUFSUixFQVFjLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsQ0FSZDtBQVNEOzs7NkJBRVE7QUFBQSxtQkFDK0IsS0FBSyxLQURwQztBQUFBLFVBQ0EsSUFEQSxVQUNBLElBREE7QUFBQSxVQUNNLFVBRE4sVUFDTSxVQUROO0FBQUEsVUFDa0IsU0FEbEIsVUFDa0IsU0FEbEI7O0FBRVAsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUEsVUFBRyxXQUFVLDZDQUFiO0FBQ0csZUFBSSxXQURQO0FBRUcsb0NBQXdCLFVBQXhCLFNBQXNDLFNBQXRDLE1BRkg7QUFHRyxhQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsaUJBQVUsMENBQVEsT0FBTyxFQUFDLFNBQVMsQ0FBVixFQUFmLEVBQTZCLEtBQUssQ0FBbEMsR0FBVjtBQUFBLFNBQVQ7QUFISCxPQURGO0FBT0Q7Ozs7OztBQUdILFdBQVcsV0FBWCxHQUF5QixZQUF6Qjs7a0JBRWUsVSIsImZpbGUiOiJtYXJrLXNlcmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZDNTZWxlY3Rpb24gZnJvbSAnZDMtc2VsZWN0aW9uJztcblxuaW1wb3J0IEFic3RyYWN0U2VyaWVzIGZyb20gJy4vYWJzdHJhY3Qtc2VyaWVzJztcbmltcG9ydCB7Z2V0RE9NTm9kZX0gZnJvbSAnLi4vLi4vdXRpbHMvcmVhY3QtdXRpbHMnO1xuXG5pbXBvcnQge0RFRkFVTFRfU0laRSwgREVGQVVMVF9PUEFDSVRZfSBmcm9tICcuLi8uLi90aGVtZSc7XG5cbmNsYXNzIE1hcmtTZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdFNlcmllcyB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzKCk7XG4gIH1cblxuICBfdXBkYXRlU2VyaWVzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldERPTU5vZGUodGhpcy5yZWZzLmNvbnRhaW5lcik7XG4gICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2lyY2xlcyA9IGQzU2VsZWN0aW9uLnNlbGVjdChjb250YWluZXIpLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX21vdXNlT3ZlcldpdGhWYWx1ZSlcbiAgICAgIC5vbignbW91c2VvdXQnLCB0aGlzLl9tb3VzZU91dFdpdGhWYWx1ZSlcbiAgICAgIC5vbignY2xpY2snLCB0aGlzLl9jbGlja1dpdGhWYWx1ZSk7XG5cbiAgICAvLyBUT0RPKGFudG9uKTogcmFkaXVzIHNob3VsZCBiZSB0aGUgaGFsZiBvZiB0aGUgc2l6ZS5cbiAgICB0aGlzLl9hcHBseVRyYW5zaXRpb24oY2lyY2xlcylcbiAgICAgIC5hdHRyKCdyJywgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcignc2l6ZScpIHx8IERFRkFVTFRfU0laRSlcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ29wYWNpdHknKSB8fCBERUZBVUxUX09QQUNJVFkpXG4gICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLl9nZXRBdHRyaWJ1dGVGdW5jdG9yKCdmaWxsJykgfHxcbiAgICAgICAgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcignY29sb3InKSlcbiAgICAgIC5zdHlsZSgnc3Ryb2tlJywgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3Rvcignc3Ryb2tlJykgfHxcbiAgICAgICAgdGhpcy5fZ2V0QXR0cmlidXRlRnVuY3RvcignY29sb3InKSlcbiAgICAgIC5hdHRyKCdjeCcsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3gnKSlcbiAgICAgIC5hdHRyKCdjeScsIHRoaXMuX2dldEF0dHJpYnV0ZUZ1bmN0b3IoJ3knKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2RhdGEsIG1hcmdpbkxlZnQsIG1hcmdpblRvcH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZyBjbGFzc05hbWU9XCJydi14eS1wbG90X19zZXJpZXMgcnYteHktcGxvdF9fc2VyaWVzLS1tYXJrXCJcbiAgICAgICAgIHJlZj1cImNvbnRhaW5lclwiXG4gICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW5MZWZ0fSwke21hcmdpblRvcH0pYH0+XG4gICAgICAgIHtkYXRhLm1hcCgoZCwgaSkgPT4gPGNpcmNsZSBzdHlsZT17e29wYWNpdHk6IDB9fSBrZXk9e2l9Lz4pfVxuICAgICAgPC9nPlxuICAgICk7XG4gIH1cbn1cblxuTWFya1Nlcmllcy5kaXNwbGF5TmFtZSA9ICdNYXJrU2VyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgTWFya1NlcmllcztcblxuIl19