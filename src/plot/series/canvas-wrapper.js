// Copyright (c) 2017 Uber Technologies, Inc.
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
import PropTypes from 'prop-types';

class CanvasWrapper extends Component {
  componentDidMount() {
    this.drawChildren(this.props, this.refs.canvas.getContext('2d'));
  }

  componentWillUpdate(nextProps) {
    this.drawChildren(nextProps, this.refs.canvas.getContext('2d'));
  }

  drawChildren(props, ctx) {
    const {
      children,
      innerHeight,
      innerWidth
    } = props;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    children.forEach(layer => layer.type.renderLayer(layer.props, ctx));
  }

  render() {
    const {
      marginLeft,
      marginTop,
      innerHeight,
      innerWidth
    } = this.props;

    return (
      <div
        style={{
          left: marginLeft,
          top: marginTop
        }}
        className="rv-xy-canvas">
        <canvas
          className="rv-xy-canvas-element"
          height={innerHeight}
          width={innerWidth}
          ref="canvas" />
      </div>
    );
  }
}

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginLeft: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired
};

export default CanvasWrapper;
