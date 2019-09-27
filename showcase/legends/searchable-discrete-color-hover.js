/* eslint-disable no-console */
// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

import React, {Component} from 'react';

import SearchableDiscreteColorLegend from 'legends/searchable-discrete-color-legend';

export default class SearchableDiscreteColorLegendHoverExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredItem: false,
      items: [
        {title: 'Apples', color: '#3a3'},
        {title: 'Bananas', color: '#fc0'},
        {title: 'Blueberries', color: '#337'},
        {title: 'Carrots', color: '#f93'},
        {title: 'Eggplants', color: '#337'},
        {title: 'Limes', color: '#cf3'},
        {title: 'Potatoes', color: '#766'}
      ],
      searchText: ''
    };
  }

  _clickHandler = (item, i, e) => {
    const {items} = this.state;
    items[i].disabled = !items[i].disabled;
    this.setState({items});
  };

  _searchChangeHandler = searchText => {
    this.setState({searchText});
  };

  render() {
    const {items, hoveredItem, searchText} = this.state;
    return (
      <SearchableDiscreteColorLegend
        height={200}
        width={300}
        onItemMouseEnter={i => this.setState({
          hoveredItem: {
            ...i,
            title: `${i.title}:SELECTED`}
          })
        }
        onItemMouseLeave={() => this.setState({hoveredItem: false})}
        onSearchChange={this._searchChangeHandler}
        searchText={searchText}
        onItemClick={this._clickHandler}
        items={items.map(
          (item, key) =>
            hoveredItem && hoveredItem.title.includes(item.title) ? (
              hoveredItem
            ) : (
              item
            )
        )}
      />
    );
  }
}
