/** Created on 8/22/16. */
import isDefined from './is-defined';
export default function getPaddingFromCircleNodes(name, nodes) {
  const {props: {cx, cy, r}} =
    nodes.find(({props: {name: nodeName}}) => (nodeName === name));
  if (isDefined(cx) && isDefined(cy)) {
    return {cx, cy, r};
  }
  return {cx: 0, cy: 0, r: 0};
}
