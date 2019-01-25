// Copyright (c) 2016 - 2019 Uber Technologies, Inc.
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
import {foldChilndrens, findBranchByOmen, colorFromValue} from './tree-tools'

const DEFAUL_ROOT_NAME = 'Root'
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

export default class ZoomableTreemapExample extends React.Component {
  state = {
    modeIndex: 0,
    useSVG: false,
    data: foldChilndrens(D3FlareData, {
      children: 'children',
      maxLevel: 3,
      clearValues: true,
    }),
    isZoomed: false,
    breadcrumbs: [D3FlareData.name || DEFAUL_ROOT_NAME]
  };

  DEFAULTS = {
    children: 'children',
    maxLevel: 3,
    clearValues: true,
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  };

  sliceTreeFrom(id) {
    const omen = {name: id || DEFAUL_ROOT_NAME};

    const updateBreadcrumbs = (curCrumbs, newCrumb) => {
      const curIndex = curCrumbs.indexOf(newCrumb);
      if (curIndex === -1) return [...curCrumbs, newCrumb];
      return curCrumbs.slice(0, curIndex + 1);
    }

    this.setState(state => {
      const treeSlice = id === DEFAUL_ROOT_NAME ? D3FlareData : findBranchByOmen(omen)(D3FlareData);
      const newData = foldChilndrens(treeSlice, this.DEFAULTS)
      return {
        data: newData,
        breadcrumbs: updateBreadcrumbs(state.breadcrumbs, id)
      };
    });
  }

  getContentFunc(data, handler, options, node) {
    /* Filtrate root nodes */
    if (node && node.depth === 0) return null;
    if (!data.name) data.name = DEFAUL_ROOT_NAME;

    /* Get label. If label not in leaf we don't wrap lines */
    const getLabel = d =>
      <div style={{
        cursor: 'pointer',
        paddingLeft: '2px',
        display: 'flex',
        whiteSpace: `${d.children ? 'no' : ''}wrap`,
        flexFlow: `row ${d.children ? 'no' : ''}wrap`
      }}>
        <div style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingRight: '4px',
        }}>{ d.name }</div>
        <div> { d.value && `[${d.value}]` }</div>
      </div>;

    const titleHeight = 24;
    const gap = 8;

    return data
      ? <div style={{
        background: 'rgb(100, 100, 100)'
      }}>
          <style dangerouslySetInnerHTML={{__html: `
            .rv-treemap__leaf:hover { background: rgba(255, 255, 255, 0.2) !important }
            .rv-treemap__leaf__content { padding: 4px; }
          `}} />
          <Treemap
            data={data}
            // getContent={leaf => getContentFunc(leaf.data, handler, options, leaf)}
            getLabel={getLabel}
            onLeafClick={handler}
            getSize={d => d.value}
            getColor={d => d.hex}
            getChildren={d => d.children}
            height={600 || node.y1 - node.y0 - titleHeight - (gap * 2)}
            width={1000 || node.x1 - node.x0 - (gap * 2)}
            titileHeight={titleHeight}
            paddingInner={0}
            animation={false}
            className='nested-tree-example'
            colorType='literal'
            colorRange={['#12939a8f']}
            padding={gap}
            margin={0}
            getColor={colorFromValue}
            renderMode='DOM'
            style={{
              border: 'thin solid #ddd'
            }}
            {...options}
          />
        </div>
      : <div>{(data && data.name) || 'Unnamed'}</div>
  }

  render() {
    const {modeIndex} = this.state;
    const options = {
      mode: MODE[this.state.modeIndex],
    }

    return (
      <div className="centered-and-flexed">
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

        <div>
          <div style={{
            display: 'flex',
            alignSelf: 'self-start'
          }}>
            { this.state.breadcrumbs.map((crumb, i) => (
              <div key={crumb} onClick={() => this.sliceTreeFrom(crumb)} >
                { i !== 0 && <span style={{margin: '6px', opacity: .5, color: 'red'}}>></span> }
                <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>{crumb}</span>
              </div>
              ))
            }
          </div>
          { this.getContentFunc(this.state.data, leaf => this.sliceTreeFrom(leaf.data.name), options) }
        </div>
      </div>
    );
  }
}