'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUtils = require('../utils/react-utils');

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

var HEADER_REF = 'headerRef';
var DATA_REF = 'dataRef';

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  _createClass(Table, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        header: _react2.default.PropTypes.array.isRequired,
        data: _react2.default.PropTypes.array.isRequired,
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        cellHeight: _react2.default.PropTypes.number,
        cellWidth: _react2.default.PropTypes.number
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        cellHeight: 32,
        cellWidth: 100
      };
    }
  }]);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));

    _this._updateHeaderPosition = _this._updateHeaderPosition.bind(_this);
    _this._renderHeaderCell = _this._renderHeaderCell.bind(_this);
    _this._renderDataRow = _this._renderDataRow.bind(_this);
    return _this;
  }

  /**
   * Get the width of the data block.
   * @returns {number} Width in pixels.
   * @private
   */


  _createClass(Table, [{
    key: '_getDataBlockWidth',
    value: function _getDataBlockWidth() {
      var _props = this.props;
      var header = _props.header;
      var cellWidth = _props.cellWidth;

      return header.length * cellWidth;
    }

    /**
     * Get the height of the data block.
     * @returns {number} Height of the data block in pixels.
     * @private
     */

  }, {
    key: '_getDataBlockHeight',
    value: function _getDataBlockHeight() {
      var _props2 = this.props;
      var data = _props2.data;
      var cellHeight = _props2.cellHeight;

      return data.length * cellHeight;
    }

    /**
     * Render a single cell of the header.
     * @param {Object} cell Cell.
     * @param {Number} index Index of the header cell.
     * @returns {React.Component} Rendered cell.
     * @private
     */

  }, {
    key: '_renderHeaderCell',
    value: function _renderHeaderCell(cell, index) {
      var _props3 = this.props;
      var cellWidth = _props3.cellWidth;
      var cellHeight = _props3.cellHeight;

      var cellContent = void 0;
      if (cell instanceof Object) {
        cellContent = cell;
      } else {
        cellContent = _react2.default.createElement(
          'div',
          {
            className: 'rv-table__header__cell__content' },
          cell
        );
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__header__cell',
          key: index,
          style: {
            top: 0,
            left: index * cellWidth + 'px',
            width: cellWidth + 'px',
            height: cellHeight + 'px',
            lineHeight: cellHeight + 'px'
          } },
        cellContent
      );
    }

    /**
     * Render the table header.
     * @returns {*} Table header.
     * @private
     */

  }, {
    key: '_renderHeader',
    value: function _renderHeader() {
      var header = this.props.header;

      if (!header) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__header',
          ref: HEADER_REF,
          style: { width: this._getDataBlockWidth() + 'px' } },
        header.map(this._renderHeaderCell)
      );
    }

    /**
     * Set the position of the header according to the scroll position of data.
     * @private
     */

  }, {
    key: '_updateHeaderPosition',
    value: function _updateHeaderPosition() {
      var headerElement = (0, _reactUtils.getDOMNode)(this.refs[HEADER_REF]);
      var dataElement = (0, _reactUtils.getDOMNode)(this.refs[DATA_REF]);
      headerElement.style.left = -dataElement.scrollLeft + 'px';
    }

    /**
     * Render the data row.
     * @param {Array} row Row of data.
     * @param {number} rowIndex Index of the row.
     * @returns {React.Component} Rendered row.
     * @private
     */

  }, {
    key: '_renderDataRow',
    value: function _renderDataRow(row, rowIndex) {
      var _props4 = this.props;
      var cellHeight = _props4.cellHeight;
      var cellWidth = _props4.cellWidth;

      var cellIndex = 0;
      return row.map(function (cell, columnIndex) {
        var isHtml = cell instanceof Object;
        return _react2.default.createElement(
          'div',
          {
            className: 'rv-table__data__cell',
            key: cellIndex++,
            style: {
              top: rowIndex * cellHeight + 'px',
              left: columnIndex * cellWidth + 'px',
              width: cellWidth + 'px',
              height: cellHeight + 'px',
              lineHeight: cellHeight + 'px'
            } },
          isHtml ? cell : _react2.default.createElement(
            'div',
            {
              className: 'rv-table__data__cell__content' },
            cell
          )
        );
      });
    }

    /**
     * Render all the data for an array.
     * @returns {React.Component} Rendered data.
     * @private
     */

  }, {
    key: '_renderData',
    value: function _renderData() {
      var _props5 = this.props;
      var data = _props5.data;
      var cellHeight = _props5.cellHeight;


      var outerHeight = this.props.height - cellHeight;
      var outerWidth = this.props.width;
      var innerWidth = this._getDataBlockWidth();
      var innerHeight = this._getDataBlockHeight();

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table__data',
          style: {
            height: outerHeight + 'px',
            width: outerWidth + 'px',
            marginTop: cellHeight + 'px'
          },
          ref: DATA_REF,
          onScroll: this._updateHeaderPosition },
        _react2.default.createElement(
          'div',
          {
            className: 'rv-table__data-inner',
            style: {
              height: innerHeight + 'px',
              width: innerWidth + 'px'
            } },
          data.map(this._renderDataRow)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var height = _props6.height;
      var width = _props6.width;

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-table',
          style: {
            height: height + 'px',
            width: width + 'px'
          } },
        this._renderHeader(),
        this._renderData()
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.displayName = 'Table';

exports.default = Table;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdGFibGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sYUFBYSxXQUFuQjtBQUNBLElBQU0sV0FBVyxTQUFqQjs7SUFFTSxLOzs7Ozt3QkFFbUI7QUFDckIsYUFBTztBQUNMLGdCQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsVUFEekI7QUFFTCxjQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsVUFGdkI7QUFHTCxlQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFIekI7QUFJTCxnQkFBUSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBSjFCO0FBS0wsb0JBQVksZ0JBQU0sU0FBTixDQUFnQixNQUx2QjtBQU1MLG1CQUFXLGdCQUFNLFNBQU4sQ0FBZ0I7QUFOdEIsT0FBUDtBQVFEOzs7d0JBRXlCO0FBQ3hCLGFBQU87QUFDTCxvQkFBWSxFQURQO0FBRUwsbUJBQVc7QUFGTixPQUFQO0FBSUQ7OztBQUVELGlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXOztBQUVqQixVQUFLLHFCQUFMLEdBQTZCLE1BQUsscUJBQUwsQ0FBMkIsSUFBM0IsT0FBN0I7QUFDQSxVQUFLLGlCQUFMLEdBQXlCLE1BQUssaUJBQUwsQ0FBdUIsSUFBdkIsT0FBekI7QUFDQSxVQUFLLGNBQUwsR0FBc0IsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXRCO0FBSmlCO0FBS2xCOzs7Ozs7Ozs7Ozt5Q0FPb0I7QUFBQSxtQkFDUyxLQUFLLEtBRGQ7QUFBQSxVQUNaLE1BRFksVUFDWixNQURZO0FBQUEsVUFDSixTQURJLFVBQ0osU0FESTs7QUFFbkIsYUFBTyxPQUFPLE1BQVAsR0FBZ0IsU0FBdkI7QUFDRDs7Ozs7Ozs7OzswQ0FPcUI7QUFBQSxvQkFDTyxLQUFLLEtBRFo7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QVBQO0FBUUUsb0JBQVUsS0FBSyxxQkFSakI7QUFTRTtBQUFBO0FBQUE7QUFDRSx1QkFBVSxzQkFEWjtBQUVFLG1CQUFPO0FBQ0wsc0JBQVcsV0FBWCxPQURLO0FBRUwscUJBQVUsVUFBVjtBQUZLLGFBRlQ7QUFNRyxlQUFLLEdBQUwsQ0FBUyxLQUFLLGNBQWQ7QUFOSDtBQVRGLE9BREY7QUFvQkQ7Ozs2QkFFUTtBQUFBLG9CQUNpQixLQUFLLEtBRHRCO0FBQUEsVUFDQSxNQURBLFdBQ0EsTUFEQTtBQUFBLFVBQ1EsS0FEUixXQUNRLEtBRFI7O0FBRVAsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSxVQURaO0FBRUUsaUJBQU87QUFDTCxvQkFBVyxNQUFYLE9BREs7QUFFTCxtQkFBVSxLQUFWO0FBRkssV0FGVDtBQU1HLGFBQUssYUFBTCxFQU5IO0FBT0csYUFBSyxXQUFMO0FBUEgsT0FERjtBQVdEOzs7O0VBcE1pQixnQkFBTSxTOztBQXVNMUIsTUFBTSxXQUFOLEdBQW9CLE9BQXBCOztrQkFFZSxLIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE2IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtnZXRET01Ob2RlfSBmcm9tICcuLi91dGlscy9yZWFjdC11dGlscyc7XG5cbmNvbnN0IEhFQURFUl9SRUYgPSAnaGVhZGVyUmVmJztcbmNvbnN0IERBVEFfUkVGID0gJ2RhdGFSZWYnO1xuXG5jbGFzcyBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGNlbGxIZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBjZWxsV2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxIZWlnaHQ6IDMyLFxuICAgICAgY2VsbFdpZHRoOiAxMDBcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5fdXBkYXRlSGVhZGVyUG9zaXRpb24gPSB0aGlzLl91cGRhdGVIZWFkZXJQb3NpdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX3JlbmRlckhlYWRlckNlbGwgPSB0aGlzLl9yZW5kZXJIZWFkZXJDZWxsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fcmVuZGVyRGF0YVJvdyA9IHRoaXMuX3JlbmRlckRhdGFSb3cuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpZHRoIG9mIHRoZSBkYXRhIGJsb2NrLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBXaWR0aCBpbiBwaXhlbHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0RGF0YUJsb2NrV2lkdGgoKSB7XG4gICAgY29uc3Qge2hlYWRlciwgY2VsbFdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGhlYWRlci5sZW5ndGggKiBjZWxsV2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWlnaHQgb2YgdGhlIGRhdGEgYmxvY2suXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IEhlaWdodCBvZiB0aGUgZGF0YSBibG9jayBpbiBwaXhlbHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0RGF0YUJsb2NrSGVpZ2h0KCkge1xuICAgIGNvbnN0IHtkYXRhLCBjZWxsSGVpZ2h0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGRhdGEubGVuZ3RoICogY2VsbEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBzaW5nbGUgY2VsbCBvZiB0aGUgaGVhZGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2VsbCBDZWxsLlxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggSW5kZXggb2YgdGhlIGhlYWRlciBjZWxsLlxuICAgKiBAcmV0dXJucyB7UmVhY3QuQ29tcG9uZW50fSBSZW5kZXJlZCBjZWxsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlckhlYWRlckNlbGwoY2VsbCwgaW5kZXgpIHtcbiAgICBjb25zdCB7Y2VsbFdpZHRoLCBjZWxsSGVpZ2h0fSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGNlbGxDb250ZW50O1xuICAgIGlmIChjZWxsIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjZWxsQ29udGVudCA9IGNlbGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGxDb250ZW50ID0gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYtdGFibGVfX2hlYWRlcl9fY2VsbF9fY29udGVudFwiPlxuICAgICAgICAgIHtjZWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXRhYmxlX19oZWFkZXJfX2NlbGxcIlxuICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBsZWZ0OiBgJHtpbmRleCAqIGNlbGxXaWR0aH1weGAsXG4gICAgICAgICAgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtjZWxsSGVpZ2h0fXB4YCxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiBgJHtjZWxsSGVpZ2h0fXB4YFxuICAgICAgICB9fT5cbiAgICAgICAge2NlbGxDb250ZW50fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIHRhYmxlIGhlYWRlci5cbiAgICogQHJldHVybnMgeyp9IFRhYmxlIGhlYWRlci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJIZWFkZXIoKSB7XG4gICAgY29uc3Qge2hlYWRlcn0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaGVhZGVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicnYtdGFibGVfX2hlYWRlclwiXG4gICAgICAgIHJlZj17SEVBREVSX1JFRn1cbiAgICAgICAgc3R5bGU9e3t3aWR0aDogYCR7dGhpcy5fZ2V0RGF0YUJsb2NrV2lkdGgoKX1weGB9fT5cbiAgICAgICAge2hlYWRlci5tYXAodGhpcy5fcmVuZGVySGVhZGVyQ2VsbCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGhlYWRlciBhY2NvcmRpbmcgdG8gdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiBkYXRhLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3VwZGF0ZUhlYWRlclBvc2l0aW9uKCkge1xuICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBnZXRET01Ob2RlKHRoaXMucmVmc1tIRUFERVJfUkVGXSk7XG4gICAgY29uc3QgZGF0YUVsZW1lbnQgPSBnZXRET01Ob2RlKHRoaXMucmVmc1tEQVRBX1JFRl0pO1xuICAgIGhlYWRlckVsZW1lbnQuc3R5bGUubGVmdCA9IGAkey1kYXRhRWxlbWVudC5zY3JvbGxMZWZ0fXB4YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGRhdGEgcm93LlxuICAgKiBAcGFyYW0ge0FycmF5fSByb3cgUm93IG9mIGRhdGEuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByb3dJbmRleCBJbmRleCBvZiB0aGUgcm93LlxuICAgKiBAcmV0dXJucyB7UmVhY3QuQ29tcG9uZW50fSBSZW5kZXJlZCByb3cuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVuZGVyRGF0YVJvdyhyb3csIHJvd0luZGV4KSB7XG4gICAgY29uc3Qge2NlbGxIZWlnaHQsIGNlbGxXaWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBjZWxsSW5kZXggPSAwO1xuICAgIHJldHVybiByb3cubWFwKChjZWxsLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNIdG1sID0gY2VsbCBpbnN0YW5jZW9mIE9iamVjdDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJydi10YWJsZV9fZGF0YV9fY2VsbFwiXG4gICAgICAgICAga2V5PXtjZWxsSW5kZXgrK31cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgdG9wOiBgJHtyb3dJbmRleCAqIGNlbGxIZWlnaHR9cHhgLFxuICAgICAgICAgICAgbGVmdDogYCR7Y29sdW1uSW5kZXggKiBjZWxsV2lkdGh9cHhgLFxuICAgICAgICAgICAgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2NlbGxIZWlnaHR9cHhgLFxuICAgICAgICAgICAgbGluZUhlaWdodDogYCR7Y2VsbEhlaWdodH1weGBcbiAgICAgICAgICB9fT5cbiAgICAgICAgICB7aXNIdG1sID9cbiAgICAgICAgICAgIGNlbGwgOlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJydi10YWJsZV9fZGF0YV9fY2VsbF9fY29udGVudFwiPlxuICAgICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBhbGwgdGhlIGRhdGEgZm9yIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7UmVhY3QuQ29tcG9uZW50fSBSZW5kZXJlZCBkYXRhLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlckRhdGEoKSB7XG4gICAgY29uc3Qge2RhdGEsIGNlbGxIZWlnaHR9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG91dGVySGVpZ2h0ID0gdGhpcy5wcm9wcy5oZWlnaHQgLSBjZWxsSGVpZ2h0O1xuICAgIGNvbnN0IG91dGVyV2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xuICAgIGNvbnN0IGlubmVyV2lkdGggPSB0aGlzLl9nZXREYXRhQmxvY2tXaWR0aCgpO1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gdGhpcy5fZ2V0RGF0YUJsb2NrSGVpZ2h0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJydi10YWJsZV9fZGF0YVwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgaGVpZ2h0OiBgJHtvdXRlckhlaWdodH1weGAsXG4gICAgICAgICAgd2lkdGg6IGAke291dGVyV2lkdGh9cHhgLFxuICAgICAgICAgIG1hcmdpblRvcDogYCR7Y2VsbEhlaWdodH1weGBcbiAgICAgICAgfX1cbiAgICAgICAgcmVmPXtEQVRBX1JFRn1cbiAgICAgICAgb25TY3JvbGw9e3RoaXMuX3VwZGF0ZUhlYWRlclBvc2l0aW9ufT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJ2LXRhYmxlX19kYXRhLWlubmVyXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgaGVpZ2h0OiBgJHtpbm5lckhlaWdodH1weGAsXG4gICAgICAgICAgICB3aWR0aDogYCR7aW5uZXJXaWR0aH1weGBcbiAgICAgICAgICB9fT5cbiAgICAgICAgICB7ZGF0YS5tYXAodGhpcy5fcmVuZGVyRGF0YVJvdyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aGVpZ2h0LCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJ2LXRhYmxlXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGAsXG4gICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YFxuICAgICAgICB9fT5cbiAgICAgICAge3RoaXMuX3JlbmRlckhlYWRlcigpfVxuICAgICAgICB7dGhpcy5fcmVuZGVyRGF0YSgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5UYWJsZS5kaXNwbGF5TmFtZSA9ICdUYWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlO1xuIl19