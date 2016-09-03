/** Created on 8/22/16. */
export const ANCHOR_CONSTANTS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  TOPLEFT: 'topleft',
  BOTTOMLEFT: 'bottomleft',
  TOPRIGHT: 'topright',
  BOTTOMRIGHT: 'bottomright'
};

const {LEFT, RIGHT, TOP, BOTTOM, TOPLEFT, BOTTOMLEFT, TOPRIGHT, BOTTOMRIGHT} = ANCHOR_CONSTANTS;

export default function getAnchorFromRectangleNodes(name, nodes, id) {
  const {props: {x, y, width, height}} =
    nodes.find(({props: {name: nodeName}}) => (nodeName === name));

  switch (id) {
    case LEFT:
      return {
        x,
        y: y + height / 2
      };
    case RIGHT:
      return {
        x: x + width,
        y: y + height / 2
      };
    case TOP:
      return {
        x: x + width / 2,
        y
      };
    case BOTTOM:
      return {
        x: x + width / 2,
        y: y + height
      };
    case TOPLEFT:
      return {
        x,
        y
      };
    case BOTTOMLEFT:
      return {
        x,
        y: y + height
      };
    case TOPRIGHT:
      return {
        x: x + width,
        y
      };
    case BOTTOMRIGHT:
      return {
        x: x + width,
        y: y + height
      };
  }

  return null;
}
