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