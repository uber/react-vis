'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pureRenderComponent = require('../pure-render-component');

var _pureRenderComponent2 = _interopRequireDefault(_pureRenderComponent);

var _scalesUtils = require('../utils/scales-utils');

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

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  var value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: 'x',
      value: value.x
    };
  }
}

/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function defaultItemsFormat(values) {
  return values.map(function (v, i) {
    if (v) {
      return { value: v.y, title: i };
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(function (v) {
    return Boolean(v);
  });
}

var Crosshair = function (_PureRenderComponent) {
  _inherits(Crosshair, _PureRenderComponent);

  function Crosshair() {
    _classCallCheck(this, Crosshair);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Crosshair).apply(this, arguments));
  }

  _createClass(Crosshair, [{
    key: '_renderCrosshairTitle',


    /**
     * Render crosshair title.
     * @returns {*} Container with the crosshair title.
     * @private
     */
    value: function _renderCrosshairTitle() {
      var _props = this.props;
      var values = _props.values;
      var titleFormat = _props.titleFormat;

      var titleItem = titleFormat(values);
      if (!titleItem) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'rv-crosshair__title', key: 'title' },
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__title' },
          titleItem.title
        ),
        ': ',
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__value' },
          titleItem.value
        )
      );
    }

    /**
     * Render crosshair items (title + value for each series).
     * @returns {*} Array of React classes with the crosshair values.
     * @private
     */

  }, {
    key: '_renderCrosshairItems',
    value: function _renderCrosshairItems() {
      var _props2 = this.props;
      var values = _props2.values;
      var itemsFormat = _props2.itemsFormat;

      var items = itemsFormat(values);
      if (!items) {
        return null;
      }
      return items.filter(function (i) {
        return i;
      }).map(function renderValue(item, i) {
        return _react2.default.createElement(
          'div',
          { className: 'rv-crosshair__item', key: 'item' + i },
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__title' },
            item.title
          ),
          ': ',
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__value' },
            item.value
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var children = _props3.children;
      var values = _props3.values;
      var marginTop = _props3.marginTop;
      var marginLeft = _props3.marginLeft;
      var innerWidth = _props3.innerWidth;
      var innerHeight = _props3.innerHeight;

      var value = getFirstNonEmptyValue(values);
      if (!value) {
        return null;
      }
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x');
      var innerLeft = x(value);

      var orientation = innerLeft > innerWidth / 2 ? 'left' : 'right';
      var left = marginLeft + innerLeft;
      var top = marginTop;
      var innerClassName = 'rv-crosshair__inner rv-crosshair__inner--' + orientation;

      return _react2.default.createElement(
        'div',
        {
          className: 'rv-crosshair',
          style: { left: left + 'px', top: top + 'px' } },
        _react2.default.createElement('div', {
          className: 'rv-crosshair__line',
          style: { height: innerHeight + 'px' } }),
        _react2.default.createElement(
          'div',
          { className: innerClassName },
          children ? children : _react2.default.createElement(
            'div',
            { className: 'rv-crosshair__inner__content' },
            _react2.default.createElement(
              'div',
              null,
              this._renderCrosshairTitle(),
              this._renderCrosshairItems()
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        values: _react2.default.PropTypes.array,
        series: _react2.default.PropTypes.object,
        innerWidth: _react2.default.PropTypes.number,
        innerHeight: _react2.default.PropTypes.number,
        marginLeft: _react2.default.PropTypes.number,
        marginTop: _react2.default.PropTypes.number,
        itemsFormat: _react2.default.PropTypes.func,
        titleFormat: _react2.default.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat
      };
    }
  }]);

  return Crosshair;
}(_pureRenderComponent2.default);

Crosshair.displayName = 'Crosshair';

exports.default = Crosshair;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGxvdC9jcm9zc2hhaXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxTQUFTLGtCQUFULENBQTRCLE1BQTVCLEVBQW9DO0FBQ2xDLE1BQU0sUUFBUSxzQkFBc0IsTUFBdEIsQ0FBZDtBQUNBLE1BQUksS0FBSixFQUFXO0FBQ1QsV0FBTztBQUNMLGFBQU8sR0FERjtBQUVMLGFBQU8sTUFBTTtBQUZSLEtBQVA7QUFJRDtBQUNGOzs7Ozs7O0FBT0QsU0FBUyxrQkFBVCxDQUE0QixNQUE1QixFQUFvQztBQUNsQyxTQUFPLE9BQU8sR0FBUCxDQUFXLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUMxQixRQUFJLENBQUosRUFBTztBQUNMLGFBQU8sRUFBQyxPQUFPLEVBQUUsQ0FBVixFQUFhLE9BQU8sQ0FBcEIsRUFBUDtBQUNEO0FBQ0YsR0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7QUFPRCxTQUFTLHFCQUFULENBQStCLE1BQS9CLEVBQXVDO0FBQ3JDLFNBQU8sQ0FBQyxVQUFVLEVBQVgsRUFBZSxJQUFmLENBQW9CO0FBQUEsV0FBSyxRQUFRLENBQVIsQ0FBTDtBQUFBLEdBQXBCLENBQVA7QUFDRDs7SUFFSyxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NENBMkJvQjtBQUFBLG1CQUNRLEtBQUssS0FEYjtBQUFBLFVBQ2YsTUFEZSxVQUNmLE1BRGU7QUFBQSxVQUNQLFdBRE8sVUFDUCxXQURPOztBQUV0QixVQUFNLFlBQVksWUFBWSxNQUFaLENBQWxCO0FBQ0EsVUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDZCxlQUFPLElBQVA7QUFDRDtBQUNELGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxxQkFBZixFQUFxQyxLQUFJLE9BQXpDO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBVSw0QkFBaEI7QUFBOEMsb0JBQVU7QUFBeEQsU0FE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MjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBQdXJlUmVuZGVyQ29tcG9uZW50IGZyb20gJy4uL3B1cmUtcmVuZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQge2dldEF0dHJpYnV0ZUZ1bmN0b3J9IGZyb20gJy4uL3V0aWxzL3NjYWxlcy11dGlscyc7XG5cbi8qKlxuICogRm9ybWF0IHRpdGxlIGJ5IGRldGF1bHQuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgTGlzdCBvZiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gRm9ybWF0dGVkIHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFRpdGxlRm9ybWF0KHZhbHVlcykge1xuICBjb25zdCB2YWx1ZSA9IGdldEZpcnN0Tm9uRW1wdHlWYWx1ZSh2YWx1ZXMpO1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICd4JyxcbiAgICAgIHZhbHVlOiB2YWx1ZS54XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEZvcm1hdCBpdGVtcyBieSBkZWZhdWx0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIEFycmF5IG9mIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBGb3JtYXR0ZWQgbGlzdCBvZiBpdGVtcy5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEl0ZW1zRm9ybWF0KHZhbHVlcykge1xuICByZXR1cm4gdmFsdWVzLm1hcCgodiwgaSkgPT4ge1xuICAgIGlmICh2KSB7XG4gICAgICByZXR1cm4ge3ZhbHVlOiB2LnksIHRpdGxlOiBpfTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZmlyc3Qgbm9uLWVtcHR5IGl0ZW0gZnJvbSBhbiBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBBcnJheSBvZiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gRmlyc3Qgbm9uLWVtcHR5IHZhbHVlIG9yIHVuZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gZ2V0Rmlyc3ROb25FbXB0eVZhbHVlKHZhbHVlcykge1xuICByZXR1cm4gKHZhbHVlcyB8fCBbXSkuZmluZCh2ID0+IEJvb2xlYW4odikpO1xufVxuXG5jbGFzcyBDcm9zc2hhaXIgZXh0ZW5kcyBQdXJlUmVuZGVyQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgICBzZXJpZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICBpbm5lcldpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgaW5uZXJIZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtYXJnaW5MZWZ0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFyZ2luVG9wOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgaXRlbXNGb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgdGl0bGVGb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZUZvcm1hdDogZGVmYXVsdFRpdGxlRm9ybWF0LFxuICAgICAgaXRlbXNGb3JtYXQ6IGRlZmF1bHRJdGVtc0Zvcm1hdFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGNyb3NzaGFpciB0aXRsZS5cbiAgICogQHJldHVybnMgeyp9IENvbnRhaW5lciB3aXRoIHRoZSBjcm9zc2hhaXIgdGl0bGUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVuZGVyQ3Jvc3NoYWlyVGl0bGUoKSB7XG4gICAgY29uc3Qge3ZhbHVlcywgdGl0bGVGb3JtYXR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0aXRsZUl0ZW0gPSB0aXRsZUZvcm1hdCh2YWx1ZXMpO1xuICAgIGlmICghdGl0bGVJdGVtKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnYtY3Jvc3NoYWlyX190aXRsZVwiIGtleT1cInRpdGxlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ2LWNyb3NzaGFpcl9fdGl0bGVfX3RpdGxlXCI+e3RpdGxlSXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgIHsnOiAnfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJydi1jcm9zc2hhaXJfX3RpdGxlX192YWx1ZVwiPnt0aXRsZUl0ZW0udmFsdWV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgY3Jvc3NoYWlyIGl0ZW1zICh0aXRsZSArIHZhbHVlIGZvciBlYWNoIHNlcmllcykuXG4gICAqIEByZXR1cm5zIHsqfSBBcnJheSBvZiBSZWFjdCBjbGFzc2VzIHdpdGggdGhlIGNyb3NzaGFpciB2YWx1ZXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVuZGVyQ3Jvc3NoYWlySXRlbXMoKSB7XG4gICAgY29uc3Qge3ZhbHVlcywgaXRlbXNGb3JtYXR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtcyA9IGl0ZW1zRm9ybWF0KHZhbHVlcyk7XG4gICAgaWYgKCFpdGVtcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaSA9PiBpKS5tYXAoZnVuY3Rpb24gcmVuZGVyVmFsdWUoaXRlbSwgaSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydi1jcm9zc2hhaXJfX2l0ZW1cIiBrZXk9e2BpdGVtJHtpfWB9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ2LWNyb3NzaGFpcl9faXRlbV9fdGl0bGVcIj57aXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgeyc6ICd9XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnYtY3Jvc3NoYWlyX19pdGVtX192YWx1ZVwiPntpdGVtLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmFsdWVzLFxuICAgICAgbWFyZ2luVG9wLFxuICAgICAgbWFyZ2luTGVmdCxcbiAgICAgIGlubmVyV2lkdGgsXG4gICAgICBpbm5lckhlaWdodH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0Rmlyc3ROb25FbXB0eVZhbHVlKHZhbHVlcyk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHggPSBnZXRBdHRyaWJ1dGVGdW5jdG9yKHRoaXMucHJvcHMsICd4Jyk7XG4gICAgY29uc3QgaW5uZXJMZWZ0ID0geCh2YWx1ZSk7XG5cbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IChpbm5lckxlZnQgPiBpbm5lcldpZHRoIC8gMikgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIGNvbnN0IGxlZnQgPSBtYXJnaW5MZWZ0ICsgaW5uZXJMZWZ0O1xuICAgIGNvbnN0IHRvcCA9IG1hcmdpblRvcDtcbiAgICBjb25zdCBpbm5lckNsYXNzTmFtZSA9XG4gICAgICBgcnYtY3Jvc3NoYWlyX19pbm5lciBydi1jcm9zc2hhaXJfX2lubmVyLS0ke29yaWVudGF0aW9ufWA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJydi1jcm9zc2hhaXJcIlxuICAgICAgICBzdHlsZT17e2xlZnQ6IGAke2xlZnR9cHhgLCB0b3A6IGAke3RvcH1weGB9fT5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicnYtY3Jvc3NoYWlyX19saW5lXCJcbiAgICAgICAgICBzdHlsZT17e2hlaWdodDogYCR7aW5uZXJIZWlnaHR9cHhgfX0vPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtpbm5lckNsYXNzTmFtZX0+XG4gICAgICAgICAge2NoaWxkcmVuID9cbiAgICAgICAgICAgIGNoaWxkcmVuIDpcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnYtY3Jvc3NoYWlyX19pbm5lcl9fY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJDcm9zc2hhaXJUaXRsZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJDcm9zc2hhaXJJdGVtcygpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNyb3NzaGFpci5kaXNwbGF5TmFtZSA9ICdDcm9zc2hhaXInO1xuXG5leHBvcnQgZGVmYXVsdCBDcm9zc2hhaXI7XG4iXX0=