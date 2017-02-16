import React from 'react';

import Sankey from 'sankey';

const BLURRED_NODE_OPACITY = 0.8;
const FOCUSED_NODE_OPACITY = 1;

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

export default class VoronoiSankeyExample extends React.Component {

  state = {
    activeNode: null
  }

  render() {
    const {activeNode} = this.state;

    // Note: d3.sankey currently mutates the `nodes` and `links` arrays, which doesn't play nice
    // with React's single-direction data flow. We create a copy of each before we pass to the sankey
    // component, just to be sure.
    return (
      <Sankey
        nodes={nodes.map(d => ({
          ...d,
          opacity: activeNode && d.name === activeNode.name ? FOCUSED_NODE_OPACITY : BLURRED_NODE_OPACITY
        }))}
        links={links.map(d => ({...d}))}
        width={200}
        height={200}
        hasVoronoi
        onHover={node => this.setState({activeNode: node})}
        onBlur={() => this.setState({activeNode: null})}
      />
    );
  }
}
