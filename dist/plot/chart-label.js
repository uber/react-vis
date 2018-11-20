'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2018 Uber Technologies, Inc.
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

var ChartLabel = function (_React$PureComponent) {
  _inherits(ChartLabel, _React$PureComponent);

  function ChartLabel() {
    _classCallCheck(this, ChartLabel);

    return _possibleConstructorReturn(this, (ChartLabel.__proto__ || Object.getPrototypeOf(ChartLabel)).apply(this, arguments));
  }

  _createClass(ChartLabel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          innerHeight = _props.innerHeight,
          innerWidth = _props.innerWidth,
          marginBottom = _props.marginBottom,
          marginLeft = _props.marginLeft,
          marginRight = _props.marginRight,
          marginTop = _props.marginTop,
          className = _props.className,
          includeMargin = _props.includeMargin,
          style = _props.style,
          text = _props.text,
          xPercent = _props.xPercent,
          yPercent = _props.yPercent;

      var width = innerWidth + (includeMargin ? marginLeft + marginRight : 0);
      var height = innerHeight + (includeMargin ? marginTop + marginBottom : 0);
      var xPos = width * xPercent + (includeMargin ? 0 : marginLeft);
      var yPos = height * yPercent + (includeMargin ? marginLeft : 0);
      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(' + xPos + ', ' + yPos + ')',
          className: 'rv-xy-plot__axis__title ' + className },
        _react2.default.createElement(
          'text',
          style,
          text
        )
      );
    }
  }], [{
    key: 'requiresSVG',
    get: function get() {
      return true;
    }
  }]);

  return ChartLabel;
}(_react2.default.PureComponent);

ChartLabel.displayName = 'ChartLabel';
ChartLabel.propTypes = {
  className: _propTypes2.default.string,
  includeMargin: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  text: _propTypes2.default.string.isRequired,
  xPercent: _propTypes2.default.number.isRequired,
  yPercent: _propTypes2.default.number.isRequired
};
ChartLabel.defaultProps = {
  className: '',
  includeMargin: true,
  text: '',
  xPercent: 0,
  yPercent: 0,
  style: {}
};
exports.default = ChartLabel;