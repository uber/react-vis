import React from 'react';
import PropTypes from 'prop-types';
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
} from 'd3-sankey';
import XYPlot from 'plot/xy-plot';

import {MarginPropType, getInnerDimensions} from 'utils/chart-utils';
import VerticalRectSeries from 'plot/series/vertical-rect-series';
import LabelSeries from 'plot/series/label-series';
import Voronoi from 'plot/voronoi';
import {DISCRETE_COLOR_RANGE} from 'theme';

import SankeyLink from './sankey-link';
const NOOP = f => f;

const ALIGNMENTS = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

const DEFAULT_MARGINS = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
};

function Sankey(props) {
  const {
    align,
    animation,
    children,
    className,
    hasVoronoi,
    height,
    hideLabels,
    labelRotation,
    layout,
    links,
    linkOpacity,
    margin,
    nodePadding,
    nodes,
    nodeWidth,
    onValueClick,
    onValueMouseOver,
    onValueMouseOut,
    onLinkClick,
    onLinkMouseOver,
    onLinkMouseOut,
    style,
    width
  } = props;
  const nodesCopy = [...new Array(nodes.length)].map((e, i) => ({
    ...nodes[i]
  }));
  const linksCopy = [...new Array(links.length)].map((e, i) => ({
    ...links[i]
  }));

  const {marginLeft, marginTop, marginRight, marginBottom} = getInnerDimensions(
    {
      margin,
      height,
      width
    },
    DEFAULT_MARGINS
  );
  const sankeyInstance = sankey()
    .extent([
      [marginLeft, marginTop],
      [width - marginRight, height - marginBottom - marginTop]
    ])
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodes(nodesCopy)
    .links(linksCopy)
    .nodeAlign(ALIGNMENTS[align])
    .iterations(layout);
  sankeyInstance(nodesCopy);

  const nWidth = sankeyInstance.nodeWidth();
  const path = sankeyLinkHorizontal();

  return (
    <XYPlot {...props} yType="literal" className={`rv-sankey ${className}`}>
      {linksCopy.map((link, i) => (
        <SankeyLink
          style={style.links}
          data={path(link)}
          opacity={link.opacity || linkOpacity}
          color={link.color}
          onLinkClick={onLinkClick}
          onLinkMouseOver={onLinkMouseOver}
          onLinkMouseOut={onLinkMouseOut}
          strokeWidth={Math.max(link.width, 1)}
          node={link}
          nWidth={nWidth}
          key={`link-${i}`}
        />
      ))}
      <VerticalRectSeries
        animation={animation}
        className={`${className} rv-sankey__node`}
        data={nodesCopy.map(node => ({
          ...node,
          y: node.y1 - marginTop,
          y0: node.y0 - marginTop,
          x: node.x1,
          x0: node.x0,
          color: node.color || DISCRETE_COLOR_RANGE[0],
          sourceLinks: null,
          targetLinks: null
        }))}
        style={style.rects}
        onValueClick={onValueClick}
        onValueMouseOver={onValueMouseOver}
        onValueMouseOut={onValueMouseOut}
        colorType="literal"
      />
      {!hideLabels && (
        <LabelSeries
          animation={animation}
          className={className}
          rotation={labelRotation}
          labelAnchorY="text-before-edge"
          data={nodesCopy.map((node, i) => {
            return {
              x: node.x0 + (node.x0 < width / 2 ? nWidth + 10 : -10),
              y: (node.y0 + node.y1) / 2 - marginTop,
              label: node.name,
              style: {
                textAnchor: node.x0 < width / 2 ? 'start' : 'end',
                dy: '-.5em',
                ...style.labels
              },
              // unfortunately this can not be ...node as the version
              // found in nodesCopy is modified by the sankey process
              ...nodes[i]
            };
          })}
        />
      )}
      {hasVoronoi && (
        <Voronoi
          className="rv-sankey__voronoi"
          extent={[
            [-marginLeft, -marginTop],
            [width + marginRight, height + marginBottom]
          ]}
          nodes={nodesCopy}
          onClick={onValueClick}
          onHover={onValueMouseOver}
          onBlur={onValueMouseOut}
          x={d => d.x0 + (d.x1 - d.x0) / 2}
          y={d => d.y0 + (d.y1 - d.y0) / 2}
        />
      )}
      {children}
    </XYPlot>
  );
}

Sankey.defaultProps = {
  align: 'justify',
  className: '',
  hasVoronoi: false,
  hideLabels: false,
  labelRotation: 0,
  layout: 50,
  margin: DEFAULT_MARGINS,
  nodePadding: 10,
  nodeWidth: 10,
  onValueMouseOver: NOOP,
  onValueClick: NOOP,
  onValueMouseOut: NOOP,
  onLinkClick: NOOP,
  onLinkMouseOver: NOOP,
  onLinkMouseOut: NOOP,
  style: {
    links: {},
    rects: {},
    labels: {}
  }
};

Sankey.propTypes = {
  align: PropTypes.oneOf(['justify', 'left', 'right', 'center']),
  className: PropTypes.string,
  hasVoronoi: PropTypes.bool,
  height: PropTypes.number.isRequired,
  hideLabels: PropTypes.bool,
  labelRotation: PropTypes.number,
  layout: PropTypes.number,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
        .isRequired,
      target: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
        .isRequired
    })
  ).isRequired,
  margin: MarginPropType,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeWidth: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
  style: PropTypes.shape({
    links: PropTypes.object,
    rects: PropTypes.object,
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
};
export default Sankey;
