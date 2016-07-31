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

var FlexibleXYPlot = (0, _.makeWidthFlexible)(_.XYPlot);

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Example).call(this, props));

    _this.state = {
      crosshairValues: [],
      data: _this._getStateData()
    };
    _this._crosshairValues = [];

    _this._onMouseLeave = _this._onMouseLeave.bind(_this);
    _this._onNearestXs = [_this._onNearestX.bind(_this, 0), _this._onNearestX.bind(_this, 1)];
    _this._updateSeries = _this._updateSeries.bind(_this);
    return _this;
  }

  /**
   * Get the array of x and y pairs.
   * The function tries to avoid too large changes of the chart.
   * @param {number} total Total number of points
   * @returns {Array} Array of data.
   * @private
   */


  _createClass(Example, [{
    key: '_getRandomSeriesData',
    value: function _getRandomSeriesData(total) {
      var result = [];
      var lastY = Math.random() * 40 - 20;
      var y = void 0;
      var firstY = lastY;
      for (var i = 0; i < total; i++) {
        y = Math.random() * firstY - firstY / 2 + lastY;
        result.push({
          x: i,
          y: y
        });
        lastY = y;
      }
      return result;
    }
  }, {
    key: '_getStateData',
    value: function _getStateData() {
      var maxValues = Math.floor(Math.random() * 50);
      return [this._getRandomSeriesData(maxValues), this._getRandomSeriesData(maxValues)];
    }
  }, {
    key: '_updateSeries',
    value: function _updateSeries() {
      this.setState({
        data: this._getStateData()
      });
    }

    /**
     * Event handler for onNearestX.
     * @param {number} seriesIndex Index of the series.
     * @param {Object} value Selected value.
     * @private
     */

  }, {
    key: '_onNearestX',
    value: function _onNearestX(seriesIndex, value) {
      this._crosshairValues = this._crosshairValues.concat();
      this._crosshairValues[seriesIndex] = value;
      this.setState({ crosshairValues: this._crosshairValues });
    }

    /**
     * Event handler for onMouseLeave.
     * @private
     */

  }, {
    key: '_onMouseLeave',
    value: function _onMouseLeave() {
      this._crosshairValues = [];
      this.setState({ crosshairValues: this._crosshairValues });
    }
  }, {
    key: '_formatCrosshairTitle',
    value: function _formatCrosshairTitle(values) {
      return {
        title: 'X',
        value: values[0].x
      };
    }
  }, {
    key: '_formatCrosshairItems',
    value: function _formatCrosshairItems(values) {
      return values.map(function (v, i) {
        return {
          title: 'Series ' + i,
          value: v.y
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'example-with-click-me' },
        _react2.default.createElement(
          FlexibleXYPlot,
          {
            animation: { duration: 200 },
            onMouseLeave: this._onMouseLeave,
            height: 300 },
          _react2.default.createElement(_.HorizontalGridLines, null),
          _react2.default.createElement(_.YAxis, null),
          _react2.default.createElement(_.XAxis, null),
          _react2.default.createElement(_.VerticalBarSeries, {
            onNearestX: this._onNearestXs[0],
            data: this.state.data[0] }),
          _react2.default.createElement(_.LineSeries, {
            onNearestX: this._onNearestXs[1],
            data: this.state.data[1] }),
          _react2.default.createElement(_.Crosshair, {
            itemsFormat: this._formatCrosshairItems,
            titleFormat: this._formatCrosshairTitle,
            values: this.state.crosshairValues })
        ),
        _react2.default.createElement(
          'button',
          { className: 'click-me', onClick: this._updateSeries },
          'Click to update'
        )
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3QvY29tcGxleC1jaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsSUFBTSxpQkFBaUIsa0NBQXZCOztJQUVxQixPOzs7QUFFbkIsbUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDJGQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhO0FBQ1gsdUJBQWlCLEVBRE47QUFFWCxZQUFNLE1BQUssYUFBTDtBQUZLLEtBQWI7QUFJQSxVQUFLLGdCQUFMLEdBQXdCLEVBQXhCOztBQUVBLFVBQUssYUFBTCxHQUFxQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBckI7QUFDQSxVQUFLLFlBQUwsR0FBb0IsQ0FDbEIsTUFBSyxXQUFMLENBQWlCLElBQWpCLFFBQTRCLENBQTVCLENBRGtCLEVBRWxCLE1BQUssV0FBTCxDQUFpQixJQUFqQixRQUE0QixDQUE1QixDQUZrQixDQUFwQjtBQUlBLFVBQUssYUFBTCxHQUFxQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBckI7QUFiaUI7QUFjbEI7Ozs7Ozs7Ozs7Ozs7eUNBU29CLEssRUFBTztBQUMxQixVQUFNLFNBQVMsRUFBZjtBQUNBLFVBQUksUUFBUSxLQUFLLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsRUFBakM7QUFDQSxVQUFJLFVBQUo7QUFDQSxVQUFNLFNBQVMsS0FBZjtBQUNBLFdBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFwQixFQUEyQixHQUEzQixFQUFnQztBQUM5QixZQUFJLEtBQUssTUFBTCxLQUFnQixNQUFoQixHQUF5QixTQUFTLENBQWxDLEdBQXNDLEtBQTFDO0FBQ0EsZUFBTyxJQUFQLENBQVk7QUFDVixhQUFHLENBRE87QUFFVjtBQUZVLFNBQVo7QUFJQSxnQkFBUSxDQUFSO0FBQ0Q7QUFDRCxhQUFPLE1BQVA7QUFDRDs7O29DQUVlO0FBQ2QsVUFBTSxZQUFZLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixFQUEzQixDQUFsQjtBQUNBLGFBQU8sQ0FDTCxLQUFLLG9CQUFMLENBQTBCLFNBQTFCLENBREssRUFFTCxLQUFLLG9CQUFMLENBQTBCLFNBQTFCLENBRkssQ0FBUDtBQUlEOzs7b0NBRWU7QUFDZCxXQUFLLFFBQUwsQ0FBYztBQUNaLGNBQU0sS0FBSyxhQUFMO0FBRE0sT0FBZDtBQUdEOzs7Ozs7Ozs7OztnQ0FRVyxXLEVBQWEsSyxFQUFPO0FBQzlCLFdBQUssZ0JBQUwsR0FBd0IsS0FBSyxnQkFBTCxDQUFzQixNQUF0QixFQUF4QjtBQUNBLFdBQUssZ0JBQUwsQ0FBc0IsV0FBdEIsSUFBcUMsS0FBckM7QUFDQSxXQUFLLFFBQUwsQ0FBYyxFQUFDLGlCQUFpQixLQUFLLGdCQUF2QixFQUFkO0FBQ0Q7Ozs7Ozs7OztvQ0FNZTtBQUNkLFdBQUssZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxFQUFDLGlCQUFpQixLQUFLLGdCQUF2QixFQUFkO0FBQ0Q7OzswQ0FFcUIsTSxFQUFRO0FBQzVCLGFBQU87QUFDTCxlQUFPLEdBREY7QUFFTCxlQUFPLE9BQU8sQ0FBUCxFQUFVO0FBRlosT0FBUDtBQUlEOzs7MENBRXFCLE0sRUFBUTtBQUM1QixhQUFPLE9BQU8sR0FBUCxDQUFXLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUMxQixlQUFPO0FBQ0wsNkJBQWlCLENBRFo7QUFFTCxpQkFBTyxFQUFFO0FBRkosU0FBUDtBQUlELE9BTE0sQ0FBUDtBQU1EOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsdUJBQWY7QUFDRTtBQUFDLHdCQUFEO0FBQUE7QUFDRSx1QkFBVyxFQUFDLFVBQVUsR0FBWCxFQURiO0FBRUUsMEJBQWMsS0FBSyxhQUZyQjtBQUdFLG9CQUFRLEdBSFY7QUFJRSxvRUFKRjtBQUtFLHNEQUxGO0FBTUUsc0RBTkY7QUFPRTtBQUNFLHdCQUFZLEtBQUssWUFBTCxDQUFrQixDQUFsQixDQURkO0FBRUUsa0JBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixDQUFoQixDQUZSLEdBUEY7QUFVRTtBQUNFLHdCQUFZLEtBQUssWUFBTCxDQUFrQixDQUFsQixDQURkO0FBRUUsa0JBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixDQUFoQixDQUZSLEdBVkY7QUFhRTtBQUNFLHlCQUFhLEtBQUsscUJBRHBCO0FBRUUseUJBQWEsS0FBSyxxQkFGcEI7QUFHRSxvQkFBUSxLQUFLLEtBQUwsQ0FBVyxlQUhyQjtBQWJGLFNBREY7QUFtQkU7QUFBQTtBQUFBLFlBQVEsV0FBVSxVQUFsQixFQUE2QixTQUFTLEtBQUssYUFBM0M7QUFBQTtBQUFBO0FBbkJGLE9BREY7QUF5QkQ7Ozs7RUF0SGtDLGdCQUFNLFM7O2tCQUF0QixPIiwiZmlsZSI6ImNvbXBsZXgtY2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge1xuICBYWVBsb3QsXG4gIFhBeGlzLFxuICBZQXhpcyxcbiAgSG9yaXpvbnRhbEdyaWRMaW5lcyxcbiAgbWFrZVdpZHRoRmxleGlibGUsXG4gIExpbmVTZXJpZXMsXG4gIFZlcnRpY2FsQmFyU2VyaWVzLFxuICBDcm9zc2hhaXJ9IGZyb20gJy4uLy4uLyc7XG5cbmNvbnN0IEZsZXhpYmxlWFlQbG90ID0gbWFrZVdpZHRoRmxleGlibGUoWFlQbG90KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNyb3NzaGFpclZhbHVlczogW10sXG4gICAgICBkYXRhOiB0aGlzLl9nZXRTdGF0ZURhdGEoKVxuICAgIH07XG4gICAgdGhpcy5fY3Jvc3NoYWlyVmFsdWVzID0gW107XG5cbiAgICB0aGlzLl9vbk1vdXNlTGVhdmUgPSB0aGlzLl9vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk5lYXJlc3RYcyA9IFtcbiAgICAgIHRoaXMuX29uTmVhcmVzdFguYmluZCh0aGlzLCAwKSxcbiAgICAgIHRoaXMuX29uTmVhcmVzdFguYmluZCh0aGlzLCAxKVxuICAgIF07XG4gICAgdGhpcy5fdXBkYXRlU2VyaWVzID0gdGhpcy5fdXBkYXRlU2VyaWVzLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhcnJheSBvZiB4IGFuZCB5IHBhaXJzLlxuICAgKiBUaGUgZnVuY3Rpb24gdHJpZXMgdG8gYXZvaWQgdG9vIGxhcmdlIGNoYW5nZXMgb2YgdGhlIGNoYXJ0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWwgVG90YWwgbnVtYmVyIG9mIHBvaW50c1xuICAgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIGRhdGEuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0UmFuZG9tU2VyaWVzRGF0YSh0b3RhbCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBsYXN0WSA9IE1hdGgucmFuZG9tKCkgKiA0MCAtIDIwO1xuICAgIGxldCB5O1xuICAgIGNvbnN0IGZpcnN0WSA9IGxhc3RZO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xuICAgICAgeSA9IE1hdGgucmFuZG9tKCkgKiBmaXJzdFkgLSBmaXJzdFkgLyAyICsgbGFzdFk7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHg6IGksXG4gICAgICAgIHlcbiAgICAgIH0pO1xuICAgICAgbGFzdFkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgX2dldFN0YXRlRGF0YSgpIHtcbiAgICBjb25zdCBtYXhWYWx1ZXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCk7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX2dldFJhbmRvbVNlcmllc0RhdGEobWF4VmFsdWVzKSxcbiAgICAgIHRoaXMuX2dldFJhbmRvbVNlcmllc0RhdGEobWF4VmFsdWVzKVxuICAgIF07XG4gIH1cblxuICBfdXBkYXRlU2VyaWVzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGF0YTogdGhpcy5fZ2V0U3RhdGVEYXRhKClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBvbk5lYXJlc3RYLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2VyaWVzSW5kZXggSW5kZXggb2YgdGhlIHNlcmllcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFNlbGVjdGVkIHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX29uTmVhcmVzdFgoc2VyaWVzSW5kZXgsIHZhbHVlKSB7XG4gICAgdGhpcy5fY3Jvc3NoYWlyVmFsdWVzID0gdGhpcy5fY3Jvc3NoYWlyVmFsdWVzLmNvbmNhdCgpO1xuICAgIHRoaXMuX2Nyb3NzaGFpclZhbHVlc1tzZXJpZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtjcm9zc2hhaXJWYWx1ZXM6IHRoaXMuX2Nyb3NzaGFpclZhbHVlc30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG9uTW91c2VMZWF2ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5fY3Jvc3NoYWlyVmFsdWVzID0gW107XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3Jvc3NoYWlyVmFsdWVzOiB0aGlzLl9jcm9zc2hhaXJWYWx1ZXN9KTtcbiAgfVxuXG4gIF9mb3JtYXRDcm9zc2hhaXJUaXRsZSh2YWx1ZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdYJyxcbiAgICAgIHZhbHVlOiB2YWx1ZXNbMF0ueFxuICAgIH07XG4gIH1cblxuICBfZm9ybWF0Q3Jvc3NoYWlySXRlbXModmFsdWVzKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5tYXAoKHYsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiBgU2VyaWVzICR7aX1gLFxuICAgICAgICB2YWx1ZTogdi55XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGUtd2l0aC1jbGljay1tZVwiPlxuICAgICAgICA8RmxleGlibGVYWVBsb3RcbiAgICAgICAgICBhbmltYXRpb249e3tkdXJhdGlvbjogMjAwfX1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX29uTW91c2VMZWF2ZX1cbiAgICAgICAgICBoZWlnaHQ9ezMwMH0+XG4gICAgICAgICAgPEhvcml6b250YWxHcmlkTGluZXMgLz5cbiAgICAgICAgICA8WUF4aXMgLz5cbiAgICAgICAgICA8WEF4aXMgLz5cbiAgICAgICAgICA8VmVydGljYWxCYXJTZXJpZXNcbiAgICAgICAgICAgIG9uTmVhcmVzdFg9e3RoaXMuX29uTmVhcmVzdFhzWzBdfVxuICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5kYXRhWzBdfS8+XG4gICAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICAgIG9uTmVhcmVzdFg9e3RoaXMuX29uTmVhcmVzdFhzWzFdfVxuICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5kYXRhWzFdfS8+XG4gICAgICAgICAgPENyb3NzaGFpclxuICAgICAgICAgICAgaXRlbXNGb3JtYXQ9e3RoaXMuX2Zvcm1hdENyb3NzaGFpckl0ZW1zfVxuICAgICAgICAgICAgdGl0bGVGb3JtYXQ9e3RoaXMuX2Zvcm1hdENyb3NzaGFpclRpdGxlfVxuICAgICAgICAgICAgdmFsdWVzPXt0aGlzLnN0YXRlLmNyb3NzaGFpclZhbHVlc30vPlxuICAgICAgICA8L0ZsZXhpYmxlWFlQbG90PlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImNsaWNrLW1lXCIgb25DbGljaz17dGhpcy5fdXBkYXRlU2VyaWVzfT5cbiAgICAgICAgICBDbGljayB0byB1cGRhdGVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=