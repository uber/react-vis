'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _gridLines = require('./grid-lines');

var _gridLines2 = _interopRequireDefault(_gridLines);

var _scalesUtils = require('../utils/scales-utils');

var _axisUtils = require('../utils/axis-utils');

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

var VerticalGridLines = function (_PureRenderComponent) {
  _inherits(VerticalGridLines, _PureRenderComponent);

  function VerticalGridLines() {
    _classCallCheck(this, VerticalGridLines);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VerticalGridLines).apply(this, arguments));
  }

  _createClass(VerticalGridLines, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var innerHeight = _props.innerHeight;
      var innerWidth = _props.innerWidth;

      return _react2.default.createElement(_gridLines2.default, _extends({}, this.props, {
        attr: 'x',
        orientation: 'bottom',
        top: innerHeight,
        ticksTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
        tickSize: -innerHeight }));
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return _extends({
        values: _react2.default.PropTypes.array,
        marginTop: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        innerWidth: _react2.default.PropTypes.number,
        innerHeight: _react2.default.PropTypes.number
      }, (0, _scalesUtils.getScalePropTypesByAttribute)('x'));
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return VerticalGridLines;
}(_pureRenderComponent2.default);

VerticalGridLines.displayName = 'VerticalGridLines';

exports.default = VerticalGridLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC92ZXJ0aWNhbC1ncmlkLWxpbmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSxpQjs7Ozs7Ozs7Ozs7NkJBaUJLO0FBQUEsbUJBQzJCLEtBQUssS0FEaEM7QUFBQSxVQUNBLFdBREEsVUFDQSxXQURBO0FBQUEsVUFDYSxVQURiLFVBQ2EsVUFEYjs7QUFFUCxhQUNFLGdFQUNNLEtBQUssS0FEWDtBQUVFLGNBQUssR0FGUDtBQUdFLHFCQUFZLFFBSGQ7QUFJRSxhQUFLLFdBSlA7QUFLRSxvQkFBWSxzQ0FBc0IsVUFBdEIsQ0FMZDtBQU1FLGtCQUFVLENBQUMsV0FOYixJQURGO0FBU0Q7Ozt3QkExQnNCO0FBQ3JCO0FBQ0UsZ0JBQVEsZ0JBQU0sU0FBTixDQUFnQixLQUQxQjtBQUVFLG1CQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsTUFGN0I7QUFHRSxvQkFBWSxnQkFBTSxTQUFOLENBQWdCLE1BSDlCO0FBSUUsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUo5QjtBQUtFLHFCQUFhLGdCQUFNLFNBQU4sQ0FBZ0I7QUFML0IsU0FNSywrQ0FBNkIsR0FBN0IsQ0FOTDtBQVFEOzs7d0JBRXdCO0FBQ3ZCLGFBQU8sSUFBUDtBQUNEOzs7Ozs7QUFnQkgsa0JBQWtCLFdBQWxCLEdBQWdDLG1CQUFoQzs7a0JBRWUsaUIiLCJmaWxlIjoidmVydGljYWwtZ3JpZC1saW5lcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQdXJlUmVuZGVyQ29tcG9uZW50IGZyb20gJy4uL3B1cmUtcmVuZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgR3JpZExpbmVzIGZyb20gJy4vZ3JpZC1saW5lcyc7XG5pbXBvcnQge2dldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL3NjYWxlcy11dGlscyc7XG5pbXBvcnQge2dldFRpY2tzVG90YWxGcm9tU2l6ZX0gZnJvbSAnLi4vdXRpbHMvYXhpcy11dGlscyc7XG5cbmNsYXNzIFZlcnRpY2FsR3JpZExpbmVzIGV4dGVuZHMgUHVyZVJlbmRlckNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgbWFyZ2luVG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFyZ2luTGVmdDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGlubmVyV2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBpbm5lckhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIC4uLmdldFNjYWxlUHJvcFR5cGVzQnlBdHRyaWJ1dGUoJ3gnKVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IHJlcXVpcmVzU1ZHKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbm5lckhlaWdodCwgaW5uZXJXaWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8R3JpZExpbmVzXG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICBhdHRyPVwieFwiXG4gICAgICAgIG9yaWVudGF0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgdG9wPXtpbm5lckhlaWdodH1cbiAgICAgICAgdGlja3NUb3RhbD17Z2V0VGlja3NUb3RhbEZyb21TaXplKGlubmVyV2lkdGgpfVxuICAgICAgICB0aWNrU2l6ZT17LWlubmVySGVpZ2h0fS8+XG4gICAgKTtcbiAgfVxufVxuXG5WZXJ0aWNhbEdyaWRMaW5lcy5kaXNwbGF5TmFtZSA9ICdWZXJ0aWNhbEdyaWRMaW5lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFZlcnRpY2FsR3JpZExpbmVzO1xuIl19