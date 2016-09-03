import {Children, cloneElement} from 'react';
import isDefined from './is-defined';

export default function configureNodeCoordinates(columns,
                                                 nodes,
                                                 links,
                                                 columnWidths,
                                                 columnSpacing,
                                                 margin) {
  const nodesWithCoordinates = columns.map(
    (column, columnIndex) => {
      if (column.length === 0) {
        return null;
      }
      const nodeHeights = column.map(
        ({props: {name, height}}) => {
          if (isDefined(height)) {
            return height;
          }

          const sums = links
            .reduce(({fromSum, toSum}, {props: {from, to, width}}) => {
              if (from === name) {
                return {
                  fromSum: fromSum + width,
                  toSum
                };
              } else if (to === name) {
                return {
                  fromSum,
                  toSum: toSum + width
                };
              }
              return {fromSum, toSum};
            }, {fromSum: 0, toSum: 0});
          return Math.max(sums.fromSum, sums.toSum);
        }
      );

      return column.map(
        (node, nodeIndex) => {
          let {
            x,
            y
          } = node.props;
          const {
            width = columnWidths[columnIndex],
            height = nodeHeights[nodeIndex],
            children: nodeChild
          } = node.props;

          if (!isDefined(x)) {
            x = columnIndex * columnSpacing +
              columnWidths
                .slice(0, columnIndex)
                .reduce((a, b) => a + b, 0);
          }
          if (!isDefined(y)) {
            y = margin * nodeIndex +
              nodeHeights
                .slice(0, nodeIndex)
                .reduce((a, b) => a + b, 0);
          }

          return cloneElement(
            node,
            {x, y, width, height},
            nodeChild
          );
        }
      );
    }
  );
  return Children.toArray(nodesWithCoordinates);
}
