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

import TreemapLeaf from './treemap-leaf';

function TreemapDOM(props) {
  const {
    animation,
    className,
    height,
    hideRootNode,
    getLabel,
    mode,
    nodes,
    width,
    scales,
    style
  } = props;
  const useCirclePacking = mode === 'circlePack';
  return (
    <div
      className={`rv-treemap ${
        useCirclePacking ? 'rv-treemap-circle-packed' : ''
      } ${className}`}
      style={{height, width}}
    >
      {nodes.map((node, index) => {
        // throw out the rootest node
        if (hideRootNode && !index) {
          return null;
        }

        const nodeProps = {
          animation,
          node,
          getLabel,
          ...props,
          x0: useCirclePacking ? node.x : node.x0,
          x1: useCirclePacking ? node.x : node.x1,
          y0: useCirclePacking ? node.y : node.y0,
          y1: useCirclePacking ? node.y : node.y1,
          r: useCirclePacking ? node.r : 1,
          scales,
          style
        };
        return <TreemapLeaf {...nodeProps} key={`leaf-${index}`} />;
      })}
    </div>
  );
}

TreemapDOM.displayName = 'TreemapDOM';
export default TreemapDOM;
