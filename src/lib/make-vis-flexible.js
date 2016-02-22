// Copyright (c) 2016 Uber Technologies, Inc.
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

import {getDOMNode} from './utils/react-utils';
import window from 'global/window';

const CONTAINER_REF = 'container';

/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */
export default function makeVisFlexible(Component) {

  return class extends React.Component {

    static get displayName() {
      return `Flexible${Component.displayName}`;
    }

    static get propTypes() {
      const {width, ...otherPropTypes} = Component.propTypes;
      return otherPropTypes;
    }

    constructor(props) {
      super(props);
      this.state = {
        width: 0
      };
      this._resizeTimeout = null;
      this._onResize = this._onResize.bind(this);
      this._onResizeDebounced = this._onResizeDebounced.bind(this);
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */
    _onResize() {
      const containerElement = getDOMNode(this.refs[CONTAINER_REF]);
      const offsetWidth = containerElement.offsetWidth;
      if (this.state.width !== offsetWidth) {
        this.setState({
          width: offsetWidth
        });
      }
    }

    _onResizeDebounced() {
      window.clearTimeout(this._resizeTimeout);
      this._resizeTimeout = window.setTimeout(this._onResize, 100);
    }

    componentDidMount() {
      this._onResize();
      window.addEventListener('resize', this._onResizeDebounced);
    }

    componentWillReceiveProps() {
      this._onResize();
    }

    componentWillUnmount() {
      window.clearTimeout(this._resizeTimeout);
      window.removeEventListener('resize', this._onResizeDebounced);
    }

    render() {
      const {width} = this.state;
      return (
        <div
          ref={CONTAINER_REF}>
          <Component
            width={width}
            {...this.props}/>
        </div>
      );
    }

  };

}
