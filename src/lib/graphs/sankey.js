import React, {PropTypes, Component, cloneElement} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import getLinkKey from './utils/get-link-key';
import getWidthSums from './utils/get-width-sums';
import separateChildrenByType from './utils/separate-children-by-type';
import findColumns from './utils/find-columns';
import configureNodeCoordinates from './utils/configure-node-coordinates';
import getAnchorFromRectangleNodes, {ANCHOR_CONSTANTS}
from './utils/get-anchor-from-rectangle-nodes';

const {number} = PropTypes;
export default class Sankey extends Component {

  static propTypes = {
    /** width of svg figure */
    width: number.isRequired,
    /** height of svg figure */
    height: number.isRequired,
    /** columnSpacing (horizontal) */
    columnSpacing: number,
    /** blockSpacing (vertical) */
    blockSpacing: number
  };

  static defaultProps = {
    columnSpacing: 0,
    blockSpacing: 10
  };

  shouldComponentUpdate(nextProp, nextState) {
    return shallowCompare(this, nextProp, nextState);
  }

  render() {
    const {
      children,
      width: containerWidth,
      height: containerHeight,
      columnSpacing,
      blockSpacing,
      ...restProps
    } = this.props;

    const {defs, nodes, links} = separateChildrenByType(children);

    const columns = findColumns(nodes, links);

    const defaultColumnWidth = (containerWidth -
      columns.length * columnSpacing) / (columns.length + 1);

    /* if the max width of the column is less than the default column with,
     * take the bigger value. When no width is given, a default column width
     * is used. */
    const columnWidths = columns.map(
      column =>
        (Math.max.apply(null, column.map(
          ({props: {width}}) => width)
        ) || defaultColumnWidth)
    );

    const nodesWithCoords =
      configureNodeCoordinates(
        columns,
        nodes,
        links,
        columnWidths,
        columnSpacing,
        blockSpacing
      );

    const nodeYs = nodesWithCoords
      .reduce((hash, {props: {name, y, height}}) => {
        return {
          ...hash,
          [name]: (y + height / 2)
        };
      }, {});

    // order links by the from and to block vertical position (Y).
    // this is the layout logic that prevents connectors from crossing
    // each other.
    const orderedLinks = links.sort(
      ({props: {to: to1, from: from1}},
        {props: {to: to2, from: from2}}) => (
        nodeYs[to1] - nodeYs[to2] +
        nodeYs[from1] - nodeYs[from2]
      )
    );

    const linkWidths = links
      .reduce((hash, {props: {from, to, width}}) => {
        return {
          ...hash,
          [getLinkKey(from, to)]: width
        };
      }, {});

    const nodeHash = orderedLinks
      .reduce((hash, {props: {from, to}}) => {
        return {
          ...hash,
          [from]: {
            ...hash[from],
            from: [
              ...((hash[from] && hash[from].from) ? hash[from].from : []),
              getLinkKey(from, to)
            ]
          },
          [to]: {
            ...hash[to],
            to: [
              ...((hash[to] && hash[to].to) ? hash[to].to : []),
              getLinkKey(from, to)
            ]
          }
        };
      }, {});

    const linksWithCoords = orderedLinks.map(
      (link, ind) => {
        const {
          from, to, width, children: linkChildren, ...linkProps
        } = link.props;

        const {x: x1, y: y1} =
          getAnchorFromRectangleNodes(from, nodesWithCoords,
            ANCHOR_CONSTANTS.TOPRIGHT);
        const {x: x2, y: y2} =
          getAnchorFromRectangleNodes(to, nodesWithCoords,
            ANCHOR_CONSTANTS.TOPLEFT);

        const {fromSum, toSum} =
          getWidthSums(nodeHash, linkWidths, from, to, getLinkKey(from, to));

        return cloneElement(
          link,
          {
            x1,
            x2,
            y1: y1 + fromSum + width / 2,
            y2: y2 + toSum + width / 2,
            ...linkProps
          },
          linkChildren
        );
      });

    return (
      <svg
        width={containerWidth}
        height={containerHeight}
        {...restProps}>
        {defs}
        {linksWithCoords}
        {nodesWithCoords}
      </svg>
    );
  }
}
