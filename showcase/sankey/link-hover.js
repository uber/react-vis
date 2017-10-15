import React from 'react';

import Sankey from 'sankey';
import { Hint } from 'index';


const BLURRED_LINK_OPACITY = 0.8;
const FOCUSED_LINK_OPACITY = 1;

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10, key: 'link1'},
  {source: 0, target: 2, value: 20, key: 'link2'},
  {source: 1, target: 2, value: 20, key: 'link3'}
];

export default class LinkHoverSankeyExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeLink: null,
      hintPositionX: 0,
      hintPositionY: 0
    }
  }

  render() {
    const {activeLink} = this.state;

    return (
      <div>
        <div>{`${activeLink ? activeLink.key : 'None'} selected`}</div>
        <Sankey
          nodes={nodes}
          links={links.map(d => ({
            ...d,
            opacity: activeLink && d.key === activeLink.key ? FOCUSED_LINK_OPACITY : BLURRED_LINK_OPACITY
          }))}
          width={200}
          height={200}
          onLinkMouseOver={(path,link) => {
            var { x, y, width, height } = path.getBBox();
            var hintPositionX = link.source.x1+((link.target.x0-link.source.x1)/2);
            var hintPositionY = link.target.y1/2;

            this.setState({
              activeLink: link,
              hintPositionX: hintPositionX,
              hintPositionY: hintPositionY
            });
          }}
          onLinkMouseOut={() => this.setState({activeLink: null})}
        >
          { activeLink && <Hint value={{ x: this.state.hintPositionX, y: this.state.hintPositionY, value: activeLink.value }}></Hint>}
        </Sankey>        
      </div>
    );
  }
}
