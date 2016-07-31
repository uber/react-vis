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

var YAxis = function (_PureRenderComponent) {
  _inherits(YAxis, _PureRenderComponent);

  function YAxis() {
    _classCallCheck(this, YAxis);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(YAxis).apply(this, arguments));
  }

  _createClass(YAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var innerHeight = _props.innerHeight;
      var marginTop = _props.marginTop;
      var marginLeft = _props.marginLeft;

      var ticksTotal = void 0;
      if (innerHeight < 700) {
        if (innerHeight > 300) {
          ticksTotal = 10;
        } else {
          ticksTotal = 5;
        }
      } else {
        ticksTotal = 20;
      }
      return _react2.default.createElement(_axis2.default, _extends({}, this.props, {
        className: 'rv-xy-plot__axis--y',
        titleStyle: {
          transform: 'translate(16px, 0) rotate(-90deg)',
          textAnchor: 'end'
        },
        orientation: 'left',
        ticksTotal: ticksTotal,
        attr: 'y',
        left: marginLeft,
        top: marginTop }));
    }
  }], [{
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return YAxis;
}(_pureRenderComponent2.default);

YAxis.displayName = 'YAxis';

exports.default = YAxis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC95LWF4aXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQW9CQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNLEs7Ozs7Ozs7Ozs7OzZCQU1LO0FBQUEsbUJBSVMsS0FBSyxLQUpkO0FBQUEsVUFFTCxXQUZLLFVBRUwsV0FGSztBQUFBLFVBR0wsU0FISyxVQUdMLFNBSEs7QUFBQSxVQUlMLFVBSkssVUFJTCxVQUpLOztBQUtQLFVBQUksbUJBQUo7QUFDQSxVQUFJLGNBQWMsR0FBbEIsRUFBdUI7QUFDckIsWUFBSSxjQUFjLEdBQWxCLEVBQXVCO0FBQ3JCLHVCQUFhLEVBQWI7QUFDRCxTQUZELE1BRU87QUFDTCx1QkFBYSxDQUFiO0FBQ0Q7QUFDRixPQU5ELE1BTU87QUFDTCxxQkFBYSxFQUFiO0FBQ0Q7QUFDRCxhQUNFLDJEQUNNLEtBQUssS0FEWDtBQUVFLG1CQUFVLHFCQUZaO0FBR0Usb0JBQVk7QUFDVixxQkFBVyxtQ0FERDtBQUVWLHNCQUFZO0FBRkYsU0FIZDtBQU9FLHFCQUFZLE1BUGQ7QUFRRSxvQkFBWSxVQVJkO0FBU0UsY0FBSyxHQVRQO0FBVUUsY0FBTSxVQVZSO0FBV0UsYUFBSyxTQVhQLElBREY7QUFjRDs7O3dCQWpDd0I7QUFDdkIsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztBQWtDSCxNQUFNLFdBQU4sR0FBb0IsT0FBcEI7O2tCQUVlLEsiLCJmaWxlIjoieS1heGlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFB1cmVSZW5kZXJDb21wb25lbnQgZnJvbSAnLi4vcHVyZS1yZW5kZXItY29tcG9uZW50JztcbmltcG9ydCBBeGlzIGZyb20gJy4vYXhpcyc7XG5cbmNsYXNzIFlBeGlzIGV4dGVuZHMgUHVyZVJlbmRlckNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCByZXF1aXJlc1NWRygpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpbm5lckhlaWdodCxcbiAgICAgIG1hcmdpblRvcCxcbiAgICAgIG1hcmdpbkxlZnR9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgdGlja3NUb3RhbDtcbiAgICBpZiAoaW5uZXJIZWlnaHQgPCA3MDApIHtcbiAgICAgIGlmIChpbm5lckhlaWdodCA+IDMwMCkge1xuICAgICAgICB0aWNrc1RvdGFsID0gMTA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aWNrc1RvdGFsID0gNTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGlja3NUb3RhbCA9IDIwO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEF4aXNcbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXh5LXBsb3RfX2F4aXMtLXlcIlxuICAgICAgICB0aXRsZVN0eWxlPXt7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDE2cHgsIDApIHJvdGF0ZSgtOTBkZWcpJyxcbiAgICAgICAgICB0ZXh0QW5jaG9yOiAnZW5kJ1xuICAgICAgICB9fVxuICAgICAgICBvcmllbnRhdGlvbj1cImxlZnRcIlxuICAgICAgICB0aWNrc1RvdGFsPXt0aWNrc1RvdGFsfVxuICAgICAgICBhdHRyPVwieVwiXG4gICAgICAgIGxlZnQ9e21hcmdpbkxlZnR9XG4gICAgICAgIHRvcD17bWFyZ2luVG9wfS8+XG4gICAgKTtcbiAgfVxufVxuXG5ZQXhpcy5kaXNwbGF5TmFtZSA9ICdZQXhpcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFlBeGlzO1xuIl19