/** Created on 8/26/16. */
import {Children} from 'react';
import NODE_TYPES from '../node-types';

export default function separateChildrenByType(children) {
  const childArray = Children.toArray(children);

  const childrenByType = {
    defs: [],
    nodes: [],
    links: [],
    rest: []
  };

  childArray.forEach(
    child => {
      const {type} = child;
      if (!type) {
        childrenByType.rest.push(child);
      } else if (type === NODE_TYPES.DEFS) {
        childrenByType.defs.push(child);
      } else if (type.graphNodeType === NODE_TYPES.NODE) {
        childrenByType.nodes.push(child);
      } else if (type.graphNodeType === NODE_TYPES.LINK) {
        childrenByType.links.push(child);
      }
    }
  );
  return childrenByType;
}


