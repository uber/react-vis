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

var DynamicCrosshair = function (_React$Component) {
  _inherits(DynamicCrosshair, _React$Component);

  function DynamicCrosshair(props) {
    _classCallCheck(this, DynamicCrosshair);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DynamicCrosshair).call(this, props));

    _this.state = {
      crosshairValues: []
    };
    _this._crosshairValues = [];

    _this._onMouseLeave = _this._onMouseLeave.bind(_this);
    _this._onNearestXs = [_this._onNearestX.bind(_this, 0), _this._onNearestX.bind(_this, 1)];
    return _this;
  }

  /**
   * Event handler for onNearestX.
   * @param {number} seriesIndex Index of the series.
   * @param {Object} value Selected value.
   * @private
   */


  _createClass(DynamicCrosshair, [{
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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _.XYPlot,
        {
          onMouseLeave: this._onMouseLeave,
          width: 300,
          height: 300 },
        _react2.default.createElement(_.VerticalGridLines, null),
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.XAxis, null),
        _react2.default.createElement(_.YAxis, null),
        _react2.default.createElement(_.LineSeries, {
          onNearestX: this._onNearestXs[0],
          data: [{ x: 1, y: 10 }, { x: 2, y: 7 }, { x: 3, y: 15 }] }),
        _react2.default.createElement(_.LineSeries, {
          onNearestX: this._onNearestXs[1],
          data: [{ x: 1, y: 20 }, { x: 2, y: 5 }, { x: 3, y: 15 }] }),
        _react2.default.createElement(_.Crosshair, { values: this.state.crosshairValues })
      );
    }
  }]);

  return DynamicCrosshair;
}(_react2.default.Component);

exports.default = DynamicCrosshair;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3QvZHluYW1pYy1jcm9zc2hhaXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVNxQixnQjs7O0FBQ25CLDRCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvR0FDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTtBQUNYLHVCQUFpQjtBQUROLEtBQWI7QUFHQSxVQUFLLGdCQUFMLEdBQXdCLEVBQXhCOztBQUVBLFVBQUssYUFBTCxHQUFxQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBckI7QUFDQSxVQUFLLFlBQUwsR0FBb0IsQ0FDbEIsTUFBSyxXQUFMLENBQWlCLElBQWpCLFFBQTRCLENBQTVCLENBRGtCLEVBRWxCLE1BQUssV0FBTCxDQUFpQixJQUFqQixRQUE0QixDQUE1QixDQUZrQixDQUFwQjtBQVJpQjtBQVlsQjs7Ozs7Ozs7Ozs7O2dDQVFXLFcsRUFBYSxLLEVBQU87QUFDOUIsV0FBSyxnQkFBTCxHQUF3QixLQUFLLGdCQUFMLENBQXNCLE1BQXRCLEVBQXhCO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixXQUF0QixJQUFxQyxLQUFyQztBQUNBLFdBQUssUUFBTCxDQUFjLEVBQUMsaUJBQWlCLEtBQUssZ0JBQXZCLEVBQWQ7QUFDRDs7Ozs7Ozs7O29DQU1lO0FBQ2QsV0FBSyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFdBQUssUUFBTCxDQUFjLEVBQUMsaUJBQWlCLEtBQUssZ0JBQXZCLEVBQWQ7QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRSx3QkFBYyxLQUFLLGFBRHJCO0FBRUUsaUJBQU8sR0FGVDtBQUdFLGtCQUFRLEdBSFY7QUFJRSxnRUFKRjtBQUtFLGtFQUxGO0FBTUUsb0RBTkY7QUFPRSxvREFQRjtBQVFFO0FBQ0Usc0JBQVksS0FBSyxZQUFMLENBQWtCLENBQWxCLENBRGQ7QUFFRSxnQkFBTSxDQUNKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBREksRUFFSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUZJLEVBR0osRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLEVBQVYsRUFISSxDQUZSLEdBUkY7QUFlRTtBQUNFLHNCQUFZLEtBQUssWUFBTCxDQUFrQixDQUFsQixDQURkO0FBRUUsZ0JBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBSEksQ0FGUixHQWZGO0FBc0JFLHFEQUFXLFFBQVEsS0FBSyxLQUFMLENBQVcsZUFBOUI7QUF0QkYsT0FERjtBQTBCRDs7OztFQS9EMkMsZ0JBQU0sUzs7a0JBQS9CLGdCIiwiZmlsZSI6ImR5bmFtaWMtY3Jvc3NoYWlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgWFlQbG90LFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIFZlcnRpY2FsR3JpZExpbmVzLFxuICBIb3Jpem9udGFsR3JpZExpbmVzLFxuICBMaW5lU2VyaWVzLFxuICBDcm9zc2hhaXJ9IGZyb20gJy4uLy4uLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNDcm9zc2hhaXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3Jvc3NoYWlyVmFsdWVzOiBbXVxuICAgIH07XG4gICAgdGhpcy5fY3Jvc3NoYWlyVmFsdWVzID0gW107XG5cbiAgICB0aGlzLl9vbk1vdXNlTGVhdmUgPSB0aGlzLl9vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk5lYXJlc3RYcyA9IFtcbiAgICAgIHRoaXMuX29uTmVhcmVzdFguYmluZCh0aGlzLCAwKSxcbiAgICAgIHRoaXMuX29uTmVhcmVzdFguYmluZCh0aGlzLCAxKVxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Igb25OZWFyZXN0WC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHNlcmllc0luZGV4IEluZGV4IG9mIHRoZSBzZXJpZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBTZWxlY3RlZCB2YWx1ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vbk5lYXJlc3RYKHNlcmllc0luZGV4LCB2YWx1ZSkge1xuICAgIHRoaXMuX2Nyb3NzaGFpclZhbHVlcyA9IHRoaXMuX2Nyb3NzaGFpclZhbHVlcy5jb25jYXQoKTtcbiAgICB0aGlzLl9jcm9zc2hhaXJWYWx1ZXNbc2VyaWVzSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3Jvc3NoYWlyVmFsdWVzOiB0aGlzLl9jcm9zc2hhaXJWYWx1ZXN9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBvbk1vdXNlTGVhdmUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuX2Nyb3NzaGFpclZhbHVlcyA9IFtdO1xuICAgIHRoaXMuc2V0U3RhdGUoe2Nyb3NzaGFpclZhbHVlczogdGhpcy5fY3Jvc3NoYWlyVmFsdWVzfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxYWVBsb3RcbiAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLl9vbk1vdXNlTGVhdmV9XG4gICAgICAgIHdpZHRoPXszMDB9XG4gICAgICAgIGhlaWdodD17MzAwfT5cbiAgICAgICAgPFZlcnRpY2FsR3JpZExpbmVzIC8+XG4gICAgICAgIDxIb3Jpem9udGFsR3JpZExpbmVzIC8+XG4gICAgICAgIDxYQXhpcyAvPlxuICAgICAgICA8WUF4aXMgLz5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBvbk5lYXJlc3RYPXt0aGlzLl9vbk5lYXJlc3RYc1swXX1cbiAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICB7eDogMSwgeTogMTB9LFxuICAgICAgICAgICAge3g6IDIsIHk6IDd9LFxuICAgICAgICAgICAge3g6IDMsIHk6IDE1fVxuICAgICAgICAgIF19Lz5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBvbk5lYXJlc3RYPXt0aGlzLl9vbk5lYXJlc3RYc1sxXX1cbiAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICB7eDogMSwgeTogMjB9LFxuICAgICAgICAgICAge3g6IDIsIHk6IDV9LFxuICAgICAgICAgICAge3g6IDMsIHk6IDE1fVxuICAgICAgICAgIF19Lz5cbiAgICAgICAgPENyb3NzaGFpciB2YWx1ZXM9e3RoaXMuc3RhdGUuY3Jvc3NoYWlyVmFsdWVzfS8+XG4gICAgICA8L1hZUGxvdD5cbiAgICApO1xuICB9XG59XG4iXX0=