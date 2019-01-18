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

import Treemap from 'treemap';

import D3FlareData from '../datasets/d3-flare-example.json';
import ShowcaseButton from '../showcase-components/showcase-button';

const MODE = [
  'binary',
  'circlePack',
  'partition',
  'partition-pivot',
  'squarify',
  'resquarify',
  'slice',
  'dice',
  'slicedice'
];

const STYLES = {
  SVG: {
    stroke: '#ddd',
    strokeWidth: '0.25',
    strokeOpacity: 0.5
  },
  DOM: {
    border: 'thin solid #ddd'
  }
};

export default class SimpleTreemapExample extends React.Component {
  state = {
    modeIndex: 0,
    useSVG: false,
    data: D3FlareData,
    isZoomed: false,
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  };

  subTree(current) {
    console.log(current, current.depth)
    // if (current.depth === 0) return

    function deleteSubChild(d) {
      if (!d.children) return;
      const items = d.children.map(ch => {
        const summOfChild = (childs, deep = 0) => childs.reduce((a, c) => {
          return a + (c.children ? summOfChild(c.children, deep + 1) : c.value);
        }, 0);
        if (ch.children) ch.value = summOfChild(ch.children);
        // ch.children = undefined;
        return ch
      })
      return items
    }

    const titleHeight = 24;
    const newData = {children: current.data.children};
    const gap = 4;

    return <div style={{margin: `${gap}px`, boxShadow: '0px 1px 12px 1px rgba(0, 0, 0, 0.4)'}}>
      <Treemap
      {...{
        animation: false,
        className: 'nested-tree-example',
        colorType: 'literal',
        colorRange: ['#86572C'],
        data: newData,
        mode: 'binary',
        renderMode: 'DOM',
        height: current.y1 - current.y0 - titleHeight - (gap * 2),
        width: current.x1 - current.x0 - (gap * 2),
        padding: 0,
        getSize: d => d.value,
        getColor: d => d.hex,
        style: {border: 'thin solid #ddd'} ,
        getLabel: x => x.name,
        getChildren: deleteSubChild,
        margin: 0
      }}
    />
      </div>
  }

  getChildren(d) {
    // console.log(d)
    if (!d.name) return d.children;

    const summOfChild = (childs, deep = 0) => childs.reduce((a, c) => {
      return a + (c.children ? summOfChild(c.children, deep + 1) : c.value);
    }, 0);

    if (d.children) d.value = summOfChild(d.children);
    return;
  }

  goDeeper(leafNode, domEvent) {
    this.setState(state => ({data: state.isZoomed ? D3FlareData : leafNode.data, isZoomed: !state.isZoomed}))
    domEvent.target.dataset.zoom = !domEvent.target.dataset.zoom;
    // console.log('We need to go deeper', leafNode.data, leafNode.data.value);

  }

  getLabel(d) {
    return <div><span data-zoom style={{cursor: 'pointer'}}>[+] </span>{d.name}</div>;
  }

  render() {
    const {modeIndex, useSVG} = this.state;

    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={() => this.setState({useSVG: !useSVG})}
            buttonContent={useSVG ? 'USE DOM' : 'USE SVG'}
          />
        </div>
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={this.updateModeIndex(false)}
            buttonContent={'PREV MODE'}
          />
          <div> {MODE[modeIndex]} </div>
          <ShowcaseButton
            onClick={this.updateModeIndex(true)}
            buttonContent={'NEXT MODE'}
          />
        </div>
        <Treemap
          {...{
            animation: false,
            className: 'nested-tree-example',
            colorType: 'literal',
            colorRange: ['#88572C'],
            data: this.state.data,
            mode: MODE[modeIndex],
            renderMode: useSVG ? 'SVG' : 'DOM',
            height: 600,
            width: 1000,
            padding: 8,
            getSize: d => d.value,
            getColor: d => d.hex,
            style: STYLES[useSVG ? 'SVG' : 'DOM'],
            getLabel: this.getLabel,
            getContent: this.subTree,
            getChildren: this.getChildren,
            margin: 0,
            onLeafClick: (l, e) => this.goDeeper(l, e),
            hideRootNode: !this.state.isZoomed
          }}
        />
      </div>
    );
  }
}
