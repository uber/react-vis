/**
 * Find branch in tree by omen pair - key-value
 * @param {Object} omen - how to find branch. Example - { id: 123456 }
 * @param {Object} options [{children: 'children', returnChild: true}];
 * @param {Boolean} options.returnChild -
 * if true return branch started from found child,
 * else return whole branch where child founded
 */
export function findBranchByOmen(omen, options) {
  const [[omenProp, omenValue]] = Object.entries(omen);
  const opt = {
    children: 'children',
    returnChild: true,
    ...options
  };

  function _findBranch(tree) {
    if (omenValue === tree[omenProp]) return tree;
    if (!tree[opt.children]) return false;
    return opt.returnChild
      ? tree[opt.children].reduce((result, branch) => _findBranch(branch) || result, false)
      : tree[opt.children].find(branch => _findBranch(branch));
  }

  return data => _findBranch(data);
}

/**
 * Fold childrens, and recalculate weights on leafs
 * @param {Object} tree
 * @param {Object} options [{
 *    children: 'children',
 *    value: 'value',
 *    maxLevel: 2,
 *    clearValues: false - if true clear values from branchs (if they not leaf)
 *  }]
 */
export function foldChilndrens(tree, options, level = 0) {
  const opt = {
    children: 'children',
    value: 'value',
    maxLevel: 2,
    clearValues: false,
    ...options
  };

  const calcLeafWeight = childrn => childrn.reduce(
    (summ, chld) => (
      chld[opt.children]
      ? calcLeafWeight(chld[opt.children])
      : chld[opt.value]
    ) + summ, 0);

  if (
    !tree[opt.children]
    || tree[opt.children].length === 0
  ) return tree;

  if (level < opt.maxLevel) {
    // Delete value from tree;
    const getWithout = (data, exception) => {
      const {[exception]: omit, ...rest} = data; // eslint-disable-line no-unused-vars
      return rest;
    };

    return {
      ...(opt.clearValues ? getWithout(tree, opt.value) : tree),
      [opt.children]: tree[opt.children].map(child => foldChilndrens(child, options, level + 1))
    }
  }

  const {[opt.children]: omit, ...leaf} = tree;
  leaf.value = calcLeafWeight(omit);
  return leaf;
}

export function colorFromValue(item, s = 80, l = 50) {
  const str = item.name;
  const val = item.value || 1;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsla(${hash % 360}, ${s}%, ${l}%, ${val === 1 ? 0 : 0.6})`;
}