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
      value: null
    };
    _this._rememberValue = _this._rememberValue.bind(_this);
    _this._forgetValue = _this._forgetValue.bind(_this);
    return _this;
  }

  _createClass(Example, [{
    key: '_rememberValue',
    value: function _rememberValue(value) {
      this.setState({ value: value });
    }
  }, {
    key: '_forgetValue',
    value: function _forgetValue() {
      this.setState({
        value: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        _.XYPlot,
        {
          width: 300,
          height: 300 },
        _react2.default.createElement(_.VerticalGridLines, null),
        _react2.default.createElement(_.HorizontalGridLines, null),
        _react2.default.createElement(_.XAxis, null),
        _react2.default.createElement(_.YAxis, null),
        _react2.default.createElement(_.MarkSeries, {
          onValueMouseOver: this._rememberValue,
          onValueMouseOut: this._forgetValue,
          data: [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }] }),
        value ? _react2.default.createElement(_.Hint, { value: value }) : null
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3Bsb3QvZHluYW1pYy1oaW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW9CQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBU3FCLE87OztBQUNuQixtQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMkZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPO0FBREksS0FBYjtBQUdBLFVBQUssY0FBTCxHQUFzQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBdEI7QUFDQSxVQUFLLFlBQUwsR0FBb0IsTUFBSyxZQUFMLENBQWtCLElBQWxCLE9BQXBCO0FBTmlCO0FBT2xCOzs7O21DQUVjLEssRUFBTztBQUNwQixXQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLLFFBQUwsQ0FBYztBQUNaLGVBQU87QUFESyxPQUFkO0FBR0Q7Ozs2QkFFUTtBQUFBLFVBQ0EsS0FEQSxHQUNTLEtBQUssS0FEZCxDQUNBLEtBREE7O0FBRVAsYUFDRTtBQUFBO0FBQUE7QUFDRSxpQkFBTyxHQURUO0FBRUUsa0JBQVEsR0FGVjtBQUdFLGdFQUhGO0FBSUUsa0VBSkY7QUFLRSxvREFMRjtBQU1FLG9EQU5GO0FBT0U7QUFDRSw0QkFBa0IsS0FBSyxjQUR6QjtBQUVFLDJCQUFpQixLQUFLLFlBRnhCO0FBR0UsZ0JBQU0sQ0FDSixFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsRUFBVixFQURJLEVBRUosRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFGSSxFQUdKLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxFQUFWLEVBSEksQ0FIUixHQVBGO0FBZUcsZ0JBQ0Msd0NBQU0sT0FBTyxLQUFiLEdBREQsR0FFQztBQWpCSixPQURGO0FBc0JEOzs7O0VBNUNrQyxnQkFBTSxTOztrQkFBdEIsTyIsImZpbGUiOiJkeW5hbWljLWhpbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgWFlQbG90LFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIFZlcnRpY2FsR3JpZExpbmVzLFxuICBIb3Jpem9udGFsR3JpZExpbmVzLFxuICBNYXJrU2VyaWVzLFxuICBIaW50fSBmcm9tICcuLi8uLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGFtcGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLl9yZW1lbWJlclZhbHVlID0gdGhpcy5fcmVtZW1iZXJWYWx1ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2ZvcmdldFZhbHVlID0gdGhpcy5fZm9yZ2V0VmFsdWUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIF9yZW1lbWJlclZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWV9KTtcbiAgfVxuXG4gIF9mb3JnZXRWYWx1ZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiBudWxsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxYWVBsb3RcbiAgICAgICAgd2lkdGg9ezMwMH1cbiAgICAgICAgaGVpZ2h0PXszMDB9PlxuICAgICAgICA8VmVydGljYWxHcmlkTGluZXMgLz5cbiAgICAgICAgPEhvcml6b250YWxHcmlkTGluZXMgLz5cbiAgICAgICAgPFhBeGlzIC8+XG4gICAgICAgIDxZQXhpcyAvPlxuICAgICAgICA8TWFya1Nlcmllc1xuICAgICAgICAgIG9uVmFsdWVNb3VzZU92ZXI9e3RoaXMuX3JlbWVtYmVyVmFsdWV9XG4gICAgICAgICAgb25WYWx1ZU1vdXNlT3V0PXt0aGlzLl9mb3JnZXRWYWx1ZX1cbiAgICAgICAgICBkYXRhPXtbXG4gICAgICAgICAgICB7eDogMSwgeTogMTB9LFxuICAgICAgICAgICAge3g6IDIsIHk6IDV9LFxuICAgICAgICAgICAge3g6IDMsIHk6IDE1fVxuICAgICAgICAgIF19Lz5cbiAgICAgICAge3ZhbHVlID9cbiAgICAgICAgICA8SGludCB2YWx1ZT17dmFsdWV9Lz4gOlxuICAgICAgICAgIG51bGxcbiAgICAgICAgfVxuICAgICAgPC9YWVBsb3Q+XG4gICAgKTtcbiAgfVxufVxuIl19