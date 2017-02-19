import React from 'react';

import Sankey from 'sankey';

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10, opacity: 0.2},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

export default function BasicSankeyExample() {
  return (
    <Sankey
      nodes={nodes}
      links={links}
      width={200}
      height={200}
    />
  );
}
