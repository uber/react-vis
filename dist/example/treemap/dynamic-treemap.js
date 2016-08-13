'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _ = require('../../');

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

var DynamicTreemapExample = function (_React$Component) {
  _inherits(DynamicTreemapExample, _React$Component);

  function DynamicTreemapExample(props) {
    _classCallCheck(this, DynamicTreemapExample);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DynamicTreemapExample).call(this, props));

    _this.state = {
      treemapData: _this._getRandomData()
    };
    return _this;
  }

  _createClass(DynamicTreemapExample, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _window2.default.setInterval(function () {
        return _this2.setState({ treemapData: _this2._getRandomData() });
      }, 5000);
    }
  }, {
    key: '_getRandomData',
    value: function _getRandomData() {
      var totalLeaves = Math.random() * 20;
      var leaves = [];
      var title = void 0;
      for (var i = 0; i < totalLeaves; i++) {
        title = Math.random();
        if (Math.random() > 0.5) {
          title = _react2.default.createElement(
            'b',
            null,
            title
          );
        }
        leaves.push({
          title: title,
          size: Math.random() * 1000,
          color: Math.random()
        });
      }
      return {
        title: '',
        color: 1,
        children: leaves
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_.Treemap, {
        animation: true,
        data: this.state.treemapData,
        height: 300,
        width: 350 });
    }
  }]);

  return DynamicTreemapExample;
}(_react2.default.Component);

exports.default = DynamicTreemapExample;