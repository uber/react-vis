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

import React from 'react';
import PropTypes from 'prop-types';

class ShowcaseDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleState = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    const {items} = this.props;
    const {open} = this.state;
    return (
      <div className="dropdown-wrapper">
        <div className="dropdown-button" onClick={this.toggleState}>
          {'SELECT SECTION'}
        </div>
        {open && (
          <div className="background-overlay" onClick={this.toggleState} />
        )}
        {open && <ul className="dropdown-inner-wrapper">{items}</ul>}
      </div>
    );
  }
}

ShowcaseDropdown.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.component)
};

export default ShowcaseDropdown;
