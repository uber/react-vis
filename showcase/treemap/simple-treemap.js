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

import D3FlareData from '../datasets/simply.json';
// import D3FlareData from '../datasets/d3-flare-example.json';
import ShowcaseButton from '../showcase-components/showcase-button';
import {foldChilndrens, findBranchByOmen} from './tree-tools'


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
    data: foldChilndrens(D3FlareData, {
      children: 'children',
      maxLevel: 2,
      clearValues: true,
    }),
    isZoomed: false,
    breadcrumbs: [D3FlareData.name ]
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  };

  subTree(current) {
    const titleHeight = 24;
    // console.log(current.data.name)

    if (!current || !current.data) return <div>End</div>

    const newData = {children: current.data.children};
    const gap = 4;

    return current.data.children ? <div style={{margin: `${gap}px`, boxShadow: '0px 1px 12px 1px rgba(0, 0, 0, 0.4)'}}>
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
        getContent: d => this.subTree(d.children),
        style: {border: 'thin solid #ddd'} ,
        getLabel: x => x.name,
        getChildren: d => d.children,
        margin: 0
      }}
    />
      </div> : <div>{current.data.name}</div>
  }

  getChildren(d) {
    if (!d.name) return d.children;

    const summOfChild = (childs, deep = 0) => childs.reduce((a, c) => {
      return a + (c.children ? summOfChild(c.children, deep + 1) : c.value);
    }, 0);

    if (d.children) d.value = summOfChild(d.children);
    return;
  }

  getDataFrom(id) {
    console.log(id)
    const omen = {name: id};
    const options = {
      children: 'children',
      maxLevel: 2,
      clearValues: true,
    };

    const updateBreadcrumbs = (curCrumbs, newCrumb) => {
      const curIndex = curCrumbs.indexOf(newCrumb);
      if (curIndex === -1) return [...curCrumbs, newCrumb];
      return curCrumbs.slice(0, curIndex + 1);
    }

    this.setState(state => {
      const newData = foldChilndrens(id == null ? D3FlareData : findBranchByOmen(omen)(D3FlareData), options)
      return {
        data: newData,
        breadcrumbs: updateBreadcrumbs(state.breadcrumbs, id)
      };
    });
  }

  goDeeper(leafNode, domEvent, isUpper) {
    console.log(leafNode, domEvent)

    const omen = {name: leafNode};

    this.setState(state => {
      const newData = foldChilndrens(findBranchByOmen(omen)(D3FlareData), {...options, maxLevel: 2})
      return {data: newData, isZoomed: !state.isZoomed, breadcrumbs: [leafNode, ...state.breadcrumbs]};

    })
    domEvent.target.dataset.zoom = !domEvent.target.dataset.zoom;
  }

  getLabel(d) {
    return <div><span data-zoom style={{cursor: 'pointer'}}>[+] </span>{d.name}</div>;
  }

  render() {
    const {modeIndex, useSVG} = this.state;
    // console.log(JSON.stringify(this.state.data, null, 2))
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

        {/* <Treemap
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
            getContent: (d) => this.subTree(d),
            getChildren: this.getChildren,
            margin: 0,
            onLeafClick: (l, e) => this.goDeeper(l, e),
            hideRootNode: !this.state.isZoomed
          }}
        /> */}
        <ul>
          { this.state.breadcrumbs.map(crumb => <li key={crumb} onClick={() => this.getDataFrom(crumb)}>{crumb}</li>)}
        </ul>
        <div style={{display: 'flex'}}>
          { getContentFunc(this.state.data.children, name => this.getDataFrom(name)) }
        </div>
      </div>
    );
  }
}

function getContentFunc(data, handler) {
  return data && data.map(d => <Nested data={d} key={d.name} getContent={getContentFunc} onClickHandler={handler}/>)
}

function Nested({data, getContent, onClickHandler}) {
  return <div style={{border: '1px solid gray', padding: '8px'}}>
    <h3 onClick={() => onClickHandler(data.name)}> {data.name} </h3>
    { getContent(data.children, () => onClickHandler(data.name)) }
  </div>
}
