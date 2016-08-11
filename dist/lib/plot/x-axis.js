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

var _axis = require('./axis');

var _axis2 = _interopRequireDefault(_axis);

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

var XAxis = function (_PureRenderComponent) {
  _inherits(XAxis, _PureRenderComponent);

  function XAxis() {
    _classCallCheck(this, XAxis);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(XAxis).apply(this, arguments));
  }

  _createClass(XAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var innerWidth = _props.innerWidth;
      var innerHeight = _props.innerHeight;
      var marginTop = _props.marginTop;
      var marginLeft = _props.marginLeft;

      return _react2.default.createElement(_axis2.default, _extends({}, this.props, {
        className: 'rv-xy-plot__axis--x',
        orientation: 'bottom',
        titleStyle: {
          transform: 'translate(' + innerWidth + 'px, -5px)',
          textAnchor: 'end'
        },
        ticksTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
        top: innerHeight + marginTop,
        left: marginLeft,
        attr: 'x' }));
    }
  }], [{
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return XAxis;
}(_pureRenderComponent2.default);

XAxis.displayName = 'XAxis';

exports.default = XAxis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC94LWF4aXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQW9CQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNLEs7Ozs7Ozs7Ozs7OzZCQU1LO0FBQUEsbUJBS1MsS0FBSyxLQUxkO0FBQUEsVUFFTCxVQUZLLFVBRUwsVUFGSztBQUFBLFVBR0wsV0FISyxVQUdMLFdBSEs7QUFBQSxVQUlMLFNBSkssVUFJTCxTQUpLO0FBQUEsVUFLTCxVQUxLLFVBS0wsVUFMSzs7QUFNUCxhQUNFLDJEQUNPLEtBQUssS0FEWjtBQUVFLG1CQUFVLHFCQUZaO0FBR0UscUJBQVksUUFIZDtBQUlFLG9CQUFZO0FBQ1Ysb0NBQXdCLFVBQXhCLGNBRFU7QUFFVixzQkFBWTtBQUZGLFNBSmQ7QUFRRSxvQkFBWSxzQ0FBc0IsVUFBdEIsQ0FSZDtBQVNFLGFBQUssY0FBYyxTQVRyQjtBQVVFLGNBQU0sVUFWUjtBQVdFLGNBQUssR0FYUCxJQURGO0FBY0Q7Ozt3QkF4QndCO0FBQ3ZCLGFBQU8sSUFBUDtBQUNEOzs7Ozs7QUF5QkgsTUFBTSxXQUFOLEdBQW9CLE9BQXBCOztrQkFFZSxLIiwiZmlsZSI6IngtYXhpcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQdXJlUmVuZGVyQ29tcG9uZW50IGZyb20gJy4uL3B1cmUtcmVuZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgQXhpcyBmcm9tICcuL2F4aXMnO1xuaW1wb3J0IHtnZXRUaWNrc1RvdGFsRnJvbVNpemV9IGZyb20gJy4uL3V0aWxzL2F4aXMtdXRpbHMnO1xuXG5jbGFzcyBYQXhpcyBleHRlbmRzIFB1cmVSZW5kZXJDb21wb25lbnQge1xuXG4gIHN0YXRpYyBnZXQgcmVxdWlyZXNTVkcoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJXaWR0aCxcbiAgICAgIGlubmVySGVpZ2h0LFxuICAgICAgbWFyZ2luVG9wLFxuICAgICAgbWFyZ2luTGVmdH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8QXhpc1xuICAgICAgICB7Li4uIHRoaXMucHJvcHN9XG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX2F4aXMtLXhcIlxuICAgICAgICBvcmllbnRhdGlvbj1cImJvdHRvbVwiXG4gICAgICAgIHRpdGxlU3R5bGU9e3tcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtpbm5lcldpZHRofXB4LCAtNXB4KWAsXG4gICAgICAgICAgdGV4dEFuY2hvcjogJ2VuZCdcbiAgICAgICAgfX1cbiAgICAgICAgdGlja3NUb3RhbD17Z2V0VGlja3NUb3RhbEZyb21TaXplKGlubmVyV2lkdGgpfVxuICAgICAgICB0b3A9e2lubmVySGVpZ2h0ICsgbWFyZ2luVG9wfVxuICAgICAgICBsZWZ0PXttYXJnaW5MZWZ0fVxuICAgICAgICBhdHRyPVwieFwiLz5cbiAgICApO1xuICB9XG59XG5cblhBeGlzLmRpc3BsYXlOYW1lID0gJ1hBeGlzJztcblxuZXhwb3J0IGRlZmF1bHQgWEF4aXM7XG4iXX0=