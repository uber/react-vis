/** Created on 8/24/16. */
export default function getWidthSums(nodeHash, linkWidths, from, to, getLinkKey) {
  return {
    fromSum: nodeHash[from].from.slice(
      0,
      nodeHash[from].from.indexOf(getLinkKey)
    ).reduce(
      (sum, key) => (sum + linkWidths[key]),
      0
    ),
    toSum: nodeHash[to].to.slice(
      0,
      nodeHash[to].to.indexOf(getLinkKey)
    ).reduce(
      (sum, key) => (sum + linkWidths[key]),
      0
    )
  };
}
