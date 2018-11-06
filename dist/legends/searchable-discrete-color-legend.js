'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _discreteColorLegend = require('./discrete-color-legend');

var _discreteColorLegend2 = _interopRequireDefault(_discreteColorLegend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = _extends({}, _discreteColorLegend2.default.propTypes, {
  searchText: _propTypes2.default.string,
  onSearchChange: _propTypes2.default.func,
  searchPlaceholder: _propTypes2.default.string,
  searchFn: _propTypes2.default.func
});

var defaultProps = {
  className: '',
  searchText: '',
  searchFn: function searchFn(items, s) {
    return items.filter(function (item) {
      return String(item.title || item).toLowerCase().indexOf(s) !== -1;
    });
  }
};

function SearchableDiscreteColorLegend(props) {
  var className = props.className,
      colors = props.colors,
      height = props.height,
      items = props.items,
      onItemClick = props.onItemClick,
      onSearchChange = props.onSearchChange,
      orientation = props.orientation,
      searchFn = props.searchFn,
      searchPlaceholder = props.searchPlaceholder,
      searchText = props.searchText,
      width = props.width;

  var onChange = onSearchChange ? function (_ref) {
    var value = _ref.target.value;
    return onSearchChange(value);
  } : null;
  var filteredItems = searchFn(items, searchText);
  return _react2.default.createElement(
    'div',
    { className: 'rv-search-wrapper ' + className, style: { width: width, height: height } },
    _react2.default.createElement(
      'form',
      { className: 'rv-search-wrapper__form' },
      _react2.default.createElement('input', {
        type: 'search',
        placeholder: searchPlaceholder,
        className: 'rv-search-wrapper__form__input',
        value: searchText,
        onChange: onChange
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'rv-search-wrapper__contents' },
      _react2.default.createElement(_discreteColorLegend2.default, {
        colors: colors,
        items: filteredItems,
        onItemClick: onItemClick,
        orientation: orientation
      })
    )
  );
}

SearchableDiscreteColorLegend.propTypes = propTypes;
SearchableDiscreteColorLegend.defaultProps = defaultProps;
SearchableDiscreteColorLegend.displayName = 'SearchableDiscreteColorLegend';

exports.default = SearchableDiscreteColorLegend;