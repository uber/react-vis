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

import Sunburst from 'sunburst';
import {EXTENDED_DISCRETE_COLOR_RANGE} from 'theme';
import {LabelSeries} from 'index';

import D3FlareData from '../datasets/d3-flare-example.json';

const LABEL_STYLE = {
  fontSize: '8px',
  textAnchor: 'middle'
};

/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  );
}

/**
 * Removes the first item of the given array (Mutable)
 * @param {Array} arr - the array
 */
const removeFirst = arr => Array.isArray(arr) && arr.slice(1, arr.length)

/**
 * Recursively modify data depending on whether or not each cell has been selected by the hover/highlight
 * @param {Object} node - the current node being considered
 * @param {Array|Boolean} keyPath - an array of keys that are in the highlight path
 * if this is false then all nodes are marked as selected, and if it is [] - nothing will be marked
 * @returns {Object} Updated tree structure
 */
function updateData(node, path) {
  const hasToActivate = !path || path[0] === 'root' || node.name === path[0]
  
  // Add a fill to all the uncolored cells
  if (!node.hex) {
    node.style = {
      fill: EXTENDED_DISCRETE_COLOR_RANGE[5]
    };
  }

  // Manipulate the opacity of the hovered path
  node.style = {
    ...node.style,
    fillOpacity: hasToActivate ? 1 : 0.2
  };
  
  node.children && node.children.forEach(curr => updateData(curr, hasToActivate ? removeFirst(path) : []))

  return node;
}

const decoratedData = updateData(D3FlareData, false);

export default class BasicSunburst extends React.Component {
  state = {
    pathValue: false,
    data: decoratedData,
    finalValue: 'SUNBURST',
    clicked: false
  };

  render() {
    const {clicked, data, finalValue, pathValue} = this.state;
    return (
      <div className="basic-sunburst-example-wrapper">
        <div>
          {clicked ? 'click to unlock selection' : 'click to lock selection'}
        </div>
        <Sunburst
          animation
          className="basic-sunburst-example"
          hideRootNode
          onValueMouseOver={node => {
            if (clicked) {
              return;
            }
            const path = getKeyPath(node).reverse();
            this.setState({
              finalValue: path[path.length - 1],
              pathValue: path.join(' > '),
              data: updateData(decoratedData, path)
            });
          }}
          onValueMouseOut={() =>
            clicked
              ? () => {}
              : this.setState({
                  pathValue: false,
                  finalValue: false,
                  data: updateData(decoratedData, false)
                })
          }
          onValueClick={() => this.setState({clicked: !clicked})}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5'
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={300}
          width={350}
        >
          {finalValue && (
            <LabelSeries
              data={[{x: 0, y: 0, label: finalValue, style: LABEL_STYLE}]}
            />
          )}
        </Sunburst>
        <div className="basic-sunburst-example-path-name">{pathValue}</div>
      </div>
    );
  }
}
