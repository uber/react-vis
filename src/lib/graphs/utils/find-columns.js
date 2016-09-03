/**
 * Created on 8/25/16.
 */
import splitHeadsFromRest from './split-heads-from-rest';
export default function findColumns(nodes, links) {
  const stack = [];
  let restNodes = nodes || [];
  let restLinks = links || [];
  while (restNodes.length) {
    let heads = [];
    ({heads, restNodes, restLinks} =
      splitHeadsFromRest(restNodes, restLinks));
    if (!heads.length) {
      break;
    }
    stack.push(heads);
  }

  return stack;
}
