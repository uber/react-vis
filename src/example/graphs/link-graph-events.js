import {window} from 'global';
import React, {Component} from 'react';
import {LinkGraph, Arrow, CircleNode, StraightConnector} from '../../';

const {parseInt} = window;

const NODES = [
  {x: 100, y: 50, key: 'batman'},
  {x: 140, y: 80, key: 'superman'},
  {x: 175, y: 130, key: 'antman'},
  {x: 110, y: 120, key: 'manman'}
];

const LINKS = [
  {from: 'batman', to: 'superman'},
  {from: 'superman', to: 'antman'},
  {from: 'antman', to: 'manman'}
];

export default class HappySandwichMakerExample extends Component {
  componentWillMount() {
    this.setState({links: LINKS, nodes: NODES});
  }

  _onMouseEnter(name) {
    return () => {
      const [from, to] = name.split('-');
      for (var ind in LINKS) {
        if (LINKS[ind].from === from && LINKS[ind].to === to) {
          return this.setState({
            links: [
              ...LINKS.slice(0, parseInt(ind)),
              {...LINKS[ind], strokeWidth: 4, paddingEnd: 17},
              ...LINKS.slice(parseInt(ind) + 1)
            ]
          });
        }
      }
    };
  }

  _onMouseLeave(name) {
    return () => {
      const [from, to] = name.split('-');
      for (var ind in LINKS) {
        if (LINKS[ind].from === from && LINKS[ind].to === to) {
          return this.setState({
            links: [
              ...LINKS.slice(0, parseInt(ind)),
              {...LINKS[ind], strokeWidth: 2, paddingEnd: 9},
              ...LINKS.slice(parseInt(ind) + 1)
            ]
          });
        }
      }
    };
  }

  render() {
    const {links, nodes} = this.state;
    return (
      <LinkGraph width={200} height={200}>
        <defs>
          <Arrow id='arrow' width='10' height='10'/>
        </defs>
        {nodes.map(
          ({x, y, key}) =>
            <CircleNode name={key} key={key} cx={x} cy={y} r={10}
                        stroke='black' strokeWidth='0' fill='red'/>
        )}
        {links.map(
          ({from, to, strokeWidth = 2, paddingEnd = 9}) =>
            <StraightConnector from={from}
                               to={to}
                               key={`${from}-${to}`}
                               strokeWidth={strokeWidth}
                               color='rgba(24, 55, 55, 0.6)'
                               onMouseEnter={this._onMouseEnter(`${from}-${to}`)}
                               onMouseLeave={this._onMouseLeave(`${from}-${to}`)}
                               paddingStart={2}
                               paddingEnd={paddingEnd}
                               markerEndId='arrow'/>
        )}
      </LinkGraph>
    );
  }
}


