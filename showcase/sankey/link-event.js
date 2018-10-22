import React from 'react';

import Sankey from 'sankey';

const BLURRED_LINK_OPACITY = 0.3;
const FOCUSED_LINK_OPACITY = 0.6;

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

export default class LinkEventSankeyExample extends React.Component {
  state = {
    activeLink: null
  };

  render() {
    const {activeLink} = this.state;

    // Note: d3.sankey currently mutates the `nodes` and `links` arrays, which doesn't play nice
    // with React's single-direction data flow. We create a copy of each before we pass to the sankey
    // component, just to be sure.
    return (
      <div>
        <div>
          {`${
            activeLink
              ? `${nodes[activeLink.source.index].name} -> ${
                  nodes[activeLink.target.index].name
                }`
              : 'None'
          } selected`}
        </div>
        <Sankey
          nodes={nodes.map(d => ({...d}))}
          links={links.map((d, i) => ({
            ...d,
            opacity:
              activeLink && i === activeLink.index
                ? FOCUSED_LINK_OPACITY
                : BLURRED_LINK_OPACITY
          }))}
          width={200}
          height={200}
          onLinkMouseOver={node => this.setState({activeLink: node})}
          onLinkMouseOut={() => this.setState({activeLink: null})}
        />
      </div>
    );
  }
}
