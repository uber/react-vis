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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3RyZWVtYXAvZHluYW1pYy10cmVlbWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQixxQjs7O0FBRW5CLGlDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5R0FDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTtBQUNYLG1CQUFhLE1BQUssY0FBTDtBQURGLEtBQWI7QUFGaUI7QUFLbEI7Ozs7d0NBRW1CO0FBQUE7O0FBQ2xCLHVCQUFPLFdBQVAsQ0FDRTtBQUFBLGVBQU0sT0FBSyxRQUFMLENBQWMsRUFBQyxhQUFhLE9BQUssY0FBTCxFQUFkLEVBQWQsQ0FBTjtBQUFBLE9BREYsRUFFRSxJQUZGO0FBSUQ7OztxQ0FFZ0I7QUFDZixVQUFNLGNBQWMsS0FBSyxNQUFMLEtBQWdCLEVBQXBDO0FBQ0EsVUFBTSxTQUFTLEVBQWY7QUFDQSxVQUFJLGNBQUo7QUFDQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksV0FBcEIsRUFBaUMsR0FBakMsRUFBc0M7QUFDcEMsZ0JBQVEsS0FBSyxNQUFMLEVBQVI7QUFDQSxZQUFJLEtBQUssTUFBTCxLQUFnQixHQUFwQixFQUF5QjtBQUN2QixrQkFDRTtBQUFBO0FBQUE7QUFBSTtBQUFKLFdBREY7QUFHRDtBQUNELGVBQU8sSUFBUCxDQUFZO0FBQ1Ysc0JBRFU7QUFFVixnQkFBTSxLQUFLLE1BQUwsS0FBZ0IsSUFGWjtBQUdWLGlCQUFPLEtBQUssTUFBTDtBQUhHLFNBQVo7QUFLRDtBQUNELGFBQU87QUFDTCxlQUFPLEVBREY7QUFFTCxlQUFPLENBRkY7QUFHTCxrQkFBVTtBQUhMLE9BQVA7QUFLRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUNFLG1CQUFXLElBRGI7QUFFRSxjQUFNLEtBQUssS0FBTCxDQUFXLFdBRm5CO0FBR0UsZ0JBQVEsR0FIVjtBQUlFLGVBQU8sR0FKVCxHQURGO0FBT0Q7Ozs7RUFoRGdELGdCQUFNLFM7O2tCQUFwQyxxQiIsImZpbGUiOiJkeW5hbWljLXRyZWVtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtUcmVlbWFwfSBmcm9tICcuLi8uLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljVHJlZW1hcEV4YW1wbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0cmVlbWFwRGF0YTogdGhpcy5fZ2V0UmFuZG9tRGF0YSgpXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5zZXRJbnRlcnZhbChcbiAgICAgICgpID0+IHRoaXMuc2V0U3RhdGUoe3RyZWVtYXBEYXRhOiB0aGlzLl9nZXRSYW5kb21EYXRhKCl9KSxcbiAgICAgIDUwMDBcbiAgICApO1xuICB9XG5cbiAgX2dldFJhbmRvbURhdGEoKSB7XG4gICAgY29uc3QgdG90YWxMZWF2ZXMgPSBNYXRoLnJhbmRvbSgpICogMjA7XG4gICAgY29uc3QgbGVhdmVzID0gW107XG4gICAgbGV0IHRpdGxlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxMZWF2ZXM7IGkrKykge1xuICAgICAgdGl0bGUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgICAgdGl0bGUgPSAoXG4gICAgICAgICAgPGI+e3RpdGxlfTwvYj5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxlYXZlcy5wdXNoKHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKiAxMDAwLFxuICAgICAgICBjb2xvcjogTWF0aC5yYW5kb20oKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBjb2xvcjogMSxcbiAgICAgIGNoaWxkcmVuOiBsZWF2ZXNcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VHJlZW1hcFxuICAgICAgICBhbmltYXRpb249e3RydWV9XG4gICAgICAgIGRhdGE9e3RoaXMuc3RhdGUudHJlZW1hcERhdGF9XG4gICAgICAgIGhlaWdodD17MzAwfVxuICAgICAgICB3aWR0aD17MzUwfS8+XG4gICAgKTtcbiAgfVxuXG59XG4iXX0=