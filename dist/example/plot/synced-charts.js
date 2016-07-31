'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Example).call(this, props));

    _this.state = {
      selectedIndex: null
    };
    _this._onChartMouseLeave = _this._onChartMouseLeave.bind(_this);
    _this._onSeriesMouseOvers = [_this._onSeriesMouseOver.bind(_this, 0), _this._onSeriesMouseOver.bind(_this, 1)];
    return _this;
  }

  _createClass(Example, [{
    key: '_onSeriesMouseOver',
    value: function _onSeriesMouseOver(selectedIndex) {
      this.setState({ selectedIndex: selectedIndex });
    }
  }, {
    key: '_onChartMouseLeave',
    value: function _onChartMouseLeave() {
      this.setState({ selectedIndex: null });
    }
  }, {
    key: '_getSeriesColor',
    value: function _getSeriesColor(index) {
      var selectedIndex = this.state.selectedIndex;

      if (selectedIndex !== null && selectedIndex !== index) {
        return '#ddd';
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _.XYPlot,
          {
            onMouseLeave: this._onChartMouseLeave,
            width: 300,
            height: 150 },
          _react2.default.createElement(_.VerticalGridLines, null),
          _react2.default.createElement(_.HorizontalGridLines, null),
          _react2.default.createElement(_.XAxis, null),
          _react2.default.createElement(_.YAxis, null),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(0),
            onSeriesMouseOver: this._onSeriesMouseOvers[0],
            data: [{ x: 1, y: 15 }, { x: 2, y: 8 }, { x: 3, y: 1 }] }),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(1),
            onSeriesMouseOver: this._onSeriesMouseOvers[1],
            data: [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }] })
        ),
        _react2.default.createElement(
          _.XYPlot,
          {
            onMouseLeave: this._onChartMouseLeave,
            width: 300,
            height: 150 },
          _react2.default.createElement(_.VerticalGridLines, null),
          _react2.default.createElement(_.HorizontalGridLines, null),
          _react2.default.createElement(_.XAxis, null),
          _react2.default.createElement(_.YAxis, null),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(0),
            onSeriesMouseOver: this._onSeriesMouseOvers[0],
            data: [{ x: 1, y: 4 }, { x: 2, y: 11 }, { x: 3, y: 9 }] }),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(1),
            onSeriesMouseOver: this._onSeriesMouseOvers[1],
            data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 11 }] })
        )
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3Qvc3luY2VkLWNoYXJ0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCLE87OztBQUVuQixtQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxxQkFBZTtBQURKLEtBQWI7QUFHQSxVQUFLLGtCQUFMLEdBQTBCLE1BQUssa0JBQUwsQ0FBd0IsSUFBeEIsT0FBMUI7QUFDQSxVQUFLLG1CQUFMLEdBQTJCLENBQ3pCLE1BQUssa0JBQUwsQ0FBd0IsSUFBeEIsUUFBbUMsQ0FBbkMsQ0FEeUIsRUFFekIsTUFBSyxrQkFBTCxDQUF3QixJQUF4QixRQUFtQyxDQUFuQyxDQUZ5QixDQUEzQjtBQU5pQjtBQVVsQjs7Ozt1Q0FFa0IsYSxFQUFlO0FBQ2hDLFdBQUssUUFBTCxDQUFjLEVBQUMsNEJBQUQsRUFBZDtBQUNEOzs7eUNBRW9CO0FBQ25CLFdBQUssUUFBTCxDQUFjLEVBQUMsZUFBZSxJQUFoQixFQUFkO0FBQ0Q7OztvQ0FFZSxLLEVBQU87QUFBQSxVQUNkLGFBRGMsR0FDRyxLQUFLLEtBRFIsQ0FDZCxhQURjOztBQUVyQixVQUFJLGtCQUFrQixJQUFsQixJQUEwQixrQkFBa0IsS0FBaEQsRUFBdUQ7QUFDckQsZUFBTyxNQUFQO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRSwwQkFBYyxLQUFLLGtCQURyQjtBQUVFLG1CQUFPLEdBRlQ7QUFHRSxvQkFBUSxHQUhWO0FBSUUsa0VBSkY7QUFLRSxvRUFMRjtBQU1FLHNEQU5GO0FBT0Usc0RBUEY7QUFRRTtBQUNFLG1CQUFPLEtBQUssZUFBTCxDQUFxQixDQUFyQixDQURUO0FBRUUsK0JBQW1CLEtBQUssbUJBQUwsQ0FBeUIsQ0FBekIsQ0FGckI7QUFHRSxrQkFBTSxDQUNKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBREksRUFFSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUZJLEVBR0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFISSxDQUhSLEdBUkY7QUFnQkU7QUFDRSxtQkFBTyxLQUFLLGVBQUwsQ0FBcUIsQ0FBckIsQ0FEVDtBQUVFLCtCQUFtQixLQUFLLG1CQUFMLENBQXlCLENBQXpCLENBRnJCO0FBR0Usa0JBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBSEksQ0FIUjtBQWhCRixTQURGO0FBMEJFO0FBQUE7QUFBQTtBQUNFLDBCQUFjLEtBQUssa0JBRHJCO0FBRUUsbUJBQU8sR0FGVDtBQUdFLG9CQUFRLEdBSFY7QUFJRSxrRUFKRjtBQUtFLG9FQUxGO0FBTUUsc0RBTkY7QUFPRSxzREFQRjtBQVFFO0FBQ0UsbUJBQU8sS0FBSyxlQUFMLENBQXFCLENBQXJCLENBRFQ7QUFFRSwrQkFBbUIsS0FBSyxtQkFBTCxDQUF5QixDQUF6QixDQUZyQjtBQUdFLGtCQUFNLENBQ0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFESSxFQUVKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBRkksRUFHSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUhJLENBSFIsR0FSRjtBQWdCRTtBQUNFLG1CQUFPLEtBQUssZUFBTCxDQUFxQixDQUFyQixDQURUO0FBRUUsK0JBQW1CLEtBQUssbUJBQUwsQ0FBeUIsQ0FBekIsQ0FGckI7QUFHRSxrQkFBTSxDQUNKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBREksRUFFSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUZJLEVBR0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFISSxDQUhSO0FBaEJGO0FBMUJGLE9BREY7QUFzREQ7Ozs7RUFyRmtDLGdCQUFNLFM7O2tCQUF0QixPIiwiZmlsZSI6InN5bmNlZC1jaGFydHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBYWVBsb3QsXG4gIFhBeGlzLFxuICBZQXhpcyxcbiAgVmVydGljYWxHcmlkTGluZXMsXG4gIEhvcml6b250YWxHcmlkTGluZXMsXG4gIExpbmVTZXJpZXN9IGZyb20gJy4uLy4uLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEluZGV4OiBudWxsXG4gICAgfTtcbiAgICB0aGlzLl9vbkNoYXJ0TW91c2VMZWF2ZSA9IHRoaXMuX29uQ2hhcnRNb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25TZXJpZXNNb3VzZU92ZXJzID0gW1xuICAgICAgdGhpcy5fb25TZXJpZXNNb3VzZU92ZXIuYmluZCh0aGlzLCAwKSxcbiAgICAgIHRoaXMuX29uU2VyaWVzTW91c2VPdmVyLmJpbmQodGhpcywgMSlcbiAgICBdO1xuICB9XG5cbiAgX29uU2VyaWVzTW91c2VPdmVyKHNlbGVjdGVkSW5kZXgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEluZGV4fSk7XG4gIH1cblxuICBfb25DaGFydE1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRJbmRleDogbnVsbH0pO1xuICB9XG5cbiAgX2dldFNlcmllc0NvbG9yKGluZGV4KSB7XG4gICAgY29uc3Qge3NlbGVjdGVkSW5kZXh9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gbnVsbCAmJiBzZWxlY3RlZEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgcmV0dXJuICcjZGRkJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxYWVBsb3RcbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX29uQ2hhcnRNb3VzZUxlYXZlfVxuICAgICAgICAgIHdpZHRoPXszMDB9XG4gICAgICAgICAgaGVpZ2h0PXsxNTB9PlxuICAgICAgICAgIDxWZXJ0aWNhbEdyaWRMaW5lcyAvPlxuICAgICAgICAgIDxIb3Jpem9udGFsR3JpZExpbmVzIC8+XG4gICAgICAgICAgPFhBeGlzIC8+XG4gICAgICAgICAgPFlBeGlzIC8+XG4gICAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICAgIGNvbG9yPXt0aGlzLl9nZXRTZXJpZXNDb2xvcigwKX1cbiAgICAgICAgICAgIG9uU2VyaWVzTW91c2VPdmVyPXt0aGlzLl9vblNlcmllc01vdXNlT3ZlcnNbMF19XG4gICAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICAgIHt4OiAxLCB5OiAxNX0sXG4gICAgICAgICAgICAgIHt4OiAyLCB5OiA4fSxcbiAgICAgICAgICAgICAge3g6IDMsIHk6IDF9XG4gICAgICAgICAgICBdfS8+XG4gICAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICAgIGNvbG9yPXt0aGlzLl9nZXRTZXJpZXNDb2xvcigxKX1cbiAgICAgICAgICAgIG9uU2VyaWVzTW91c2VPdmVyPXt0aGlzLl9vblNlcmllc01vdXNlT3ZlcnNbMV19XG4gICAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICAgIHt4OiAxLCB5OiAxMH0sXG4gICAgICAgICAgICAgIHt4OiAyLCB5OiA1fSxcbiAgICAgICAgICAgICAge3g6IDMsIHk6IDE1fVxuICAgICAgICAgICAgXX0vPlxuICAgICAgICA8L1hZUGxvdD5cbiAgICAgICAgPFhZUGxvdFxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5fb25DaGFydE1vdXNlTGVhdmV9XG4gICAgICAgICAgd2lkdGg9ezMwMH1cbiAgICAgICAgICBoZWlnaHQ9ezE1MH0+XG4gICAgICAgICAgPFZlcnRpY2FsR3JpZExpbmVzIC8+XG4gICAgICAgICAgPEhvcml6b250YWxHcmlkTGluZXMgLz5cbiAgICAgICAgICA8WEF4aXMvPlxuICAgICAgICAgIDxZQXhpcyAvPlxuICAgICAgICAgIDxMaW5lU2VyaWVzXG4gICAgICAgICAgICBjb2xvcj17dGhpcy5fZ2V0U2VyaWVzQ29sb3IoMCl9XG4gICAgICAgICAgICBvblNlcmllc01vdXNlT3Zlcj17dGhpcy5fb25TZXJpZXNNb3VzZU92ZXJzWzBdfVxuICAgICAgICAgICAgZGF0YT17W1xuICAgICAgICAgICAgICB7eDogMSwgeTogNH0sXG4gICAgICAgICAgICAgIHt4OiAyLCB5OiAxMX0sXG4gICAgICAgICAgICAgIHt4OiAzLCB5OiA5fVxuICAgICAgICAgICAgXX0vPlxuICAgICAgICAgIDxMaW5lU2VyaWVzXG4gICAgICAgICAgICBjb2xvcj17dGhpcy5fZ2V0U2VyaWVzQ29sb3IoMSl9XG4gICAgICAgICAgICBvblNlcmllc01vdXNlT3Zlcj17dGhpcy5fb25TZXJpZXNNb3VzZU92ZXJzWzFdfVxuICAgICAgICAgICAgZGF0YT17W1xuICAgICAgICAgICAgICB7eDogMSwgeTogMn0sXG4gICAgICAgICAgICAgIHt4OiAyLCB5OiAzfSxcbiAgICAgICAgICAgICAge3g6IDMsIHk6IDExfVxuICAgICAgICAgICAgXX0vPlxuICAgICAgICA8L1hZUGxvdD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==