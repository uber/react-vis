/** Created on 8/22/16. */

export default function splitHeadsFromRest(nodes = [], links = []) {
  const heads = nodes.filter(
    ({props: {name}}) => {
      return !links.find(({props: {to}}) => (to === name));
    }
  );

  const linksFrom = links.filter(
    ({props: {from}}) => {
      return heads.find(({props: {name}}) => (from === name));
    }
  );

  const restNodes = nodes.filter(node => !(heads.includes(node)));
  const restLinks = links.filter(link => !(linksFrom.includes(link)));

  return {
    heads,
    linksFrom,
    restNodes,
    restLinks
  };
}
