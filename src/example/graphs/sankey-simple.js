import React, {Component, PropTypes} from 'react';
import {Sankey, RectangleNode, BlockAnchor, Text, BezierConnector} from '../../';

const nodes = [
  {name: 'page 1', text: 'Visitors'},
  {name: 'page 2', text: 'Page 2'},
  {name: 'loss 1', text: 'left'},
  {name: 'page 3', text: 'Page 3'},
  {name: 'loss 2', text: 'left'},
  {name: 'retention', text: 'completed Purchase (50%)'},
  {name: 'total loss', text: 'Total Loss (50%)'}
];

const links = [
  {from: 'page 1', to: 'page 2', value: 60},
  {from: 'page 1', to: 'loss 1', value: 40},
  {from: 'page 2', to: 'page 3', value: 50},
  {from: 'page 2', to: 'loss 2', value: 10},
  {from: 'page 3', to: 'retention', value: 50},
  {from: 'loss 1', to: 'total loss', value: 40},
  {from: 'loss 2', to: 'total loss', value: 10}
];

export default function SankeyDiagramSimpleExample() {
  return (
    <Sankey width={900} height={190} columnSpacing={80} blockSpacing={20}>
      <Text x={10} y={100}>LeNet++ with Centroid Loss</Text>
      {nodes.map(({name, text}) =>
        <RectangleNode
          key={name}
          name={name}
          width={60}
          fill="white">
          <BlockAnchor
            component={Text}
            alignVertical="middle"
            dominantBaseline="middle"
            margin={10}>{text}</BlockAnchor>
        </RectangleNode>
      )}
      {links.map(({from, to, value}) =>
        <BezierConnector
          key={`${from}-${to}`}
          from={from}
          to={to}
          width={value * 1.5}
          fill="rgba(0, 0, 0, 0.15)"
          color="rgba(24, 55, 55, 0.6)"/>
      )}
    </Sankey>
  );
}
