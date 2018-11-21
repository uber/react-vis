'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Sankey = require('d3-sankey');

var _xyPlot = require('../plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _chartUtils = require('../utils/chart-utils');

var _verticalRectSeries = require('../plot/series/vertical-rect-series');

var _verticalRectSeries2 = _interopRequireDefault(_verticalRectSeries);

var _labelSeries = require('../plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _voronoi = require('../plot/voronoi');

var _voronoi2 = _interopRequireDefault(_voronoi);

var _theme = require('../theme');

var _sankeyLink = require('./sankey-link');

var _sankeyLink2 = _interopRequireDefault(_sankeyLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var NOOP = function NOOP(f) {
  return f;
};

var ALIGNMENTS = {
  justify: _d3Sankey.sankeyJustify,
  center: _d3Sankey.sankeyCenter,
  left: _d3Sankey.sankeyLeft,
  right: _d3Sankey.sankeyRight
};

var DEFAULT_MARGINS = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
};

function Sankey(props) {
  var align = props.align,
      animation = props.animation,
      children = props.children,
      className = props.className,
      hasVoronoi = props.hasVoronoi,
      height = props.height,
      hideLabels = props.hideLabels,
      labelRotation = props.labelRotation,
      layout = props.layout,
      links = props.links,
      linkOpacity = props.linkOpacity,
      margin = props.margin,
      nodePadding = props.nodePadding,
      nodes = props.nodes,
      nodeWidth = props.nodeWidth,
      onValueClick = props.onValueClick,
      onValueMouseOver = props.onValueMouseOver,
      onValueMouseOut = props.onValueMouseOut,
      onLinkClick = props.onLinkClick,
      onLinkMouseOver = props.onLinkMouseOver,
      onLinkMouseOut = props.onLinkMouseOut,
      style = props.style,
      width = props.width;

  var nodesCopy = [].concat(_toConsumableArray(new Array(nodes.length))).map(function (e, i) {
    return _extends({}, nodes[i]);
  });
  var linksCopy = [].concat(_toConsumableArray(new Array(links.length))).map(function (e, i) {
    return _extends({}, links[i]);
  });

  var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)({
    margin: margin,
    height: height,
    width: width
  }, DEFAULT_MARGINS),
      marginLeft = _getInnerDimensions.marginLeft,
      marginTop = _getInnerDimensions.marginTop,
      marginRight = _getInnerDimensions.marginRight,
      marginBottom = _getInnerDimensions.marginBottom;

  var sankeyInstance = (0, _d3Sankey.sankey)().extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom - marginTop]]).nodeWidth(nodeWidth).nodePadding(nodePadding).nodes(nodesCopy).links(linksCopy).nodeAlign(ALIGNMENTS[align]).iterations(layout);
  sankeyInstance(nodesCopy);

  var nWidth = sankeyInstance.nodeWidth();
  var path = (0, _d3Sankey.sankeyLinkHorizontal)();

  return _react2.default.createElement(
    _xyPlot2.default,
    _extends({}, props, { yType: 'literal', className: 'rv-sankey ' + className }),
    linksCopy.map(function (link, i) {
      return _react2.default.createElement(_sankeyLink2.default, {
        style: style.links,
        data: path(link),
        opacity: link.opacity || linkOpacity,
        color: link.color,
        onLinkClick: onLinkClick,
        onLinkMouseOver: onLinkMouseOver,
        onLinkMouseOut: onLinkMouseOut,
        strokeWidth: Math.max(link.width, 1),
        node: link,
        nWidth: nWidth,
        key: 'link-' + i
      });
    }),
    _react2.default.createElement(_verticalRectSeries2.default, {
      animation: animation,
      className: className + ' rv-sankey__node',
      data: nodesCopy.map(function (node) {
        return _extends({}, node, {
          y: node.y1 - marginTop,
          y0: node.y0 - marginTop,
          x: node.x1,
          x0: node.x0,
          color: node.color || _theme.DISCRETE_COLOR_RANGE[0],
          sourceLinks: null,
          targetLinks: null
        });
      }),
      style: style.rects,
      onValueClick: onValueClick,
      onValueMouseOver: onValueMouseOver,
      onValueMouseOut: onValueMouseOut,
      colorType: 'literal'
    }),
    !hideLabels && _react2.default.createElement(_labelSeries2.default, {
      animation: animation,
      className: className,
      rotation: labelRotation,
      labelAnchorY: 'text-before-edge',
      data: nodesCopy.map(function (node, i) {
        return _extends({
          x: node.x0 + (node.x0 < width / 2 ? nWidth + 10 : -10),
          y: (node.y0 + node.y1) / 2 - marginTop,
          label: node.name,
          style: _extends({
            textAnchor: node.x0 < width / 2 ? 'start' : 'end',
            dy: '-.5em'
          }, style.labels)
        }, nodes[i]);
      })
    }),
    hasVoronoi && _react2.default.createElement(_voronoi2.default, {
      className: 'rv-sankey__voronoi',
      extent: [[-marginLeft, -marginTop], [width + marginRight, height + marginBottom]],
      nodes: nodesCopy,
      onClick: onValueClick,
      onHover: onValueMouseOver,
      onBlur: onValueMouseOut,
      x: function x(d) {
        return d.x0 + (d.x1 - d.x0) / 2;
      },
      y: function y(d) {
        return d.y0 + (d.y1 - d.y0) / 2;
      }
    }),
    children
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
  align: _propTypes2.default.oneOf(['justify', 'left', 'right', 'center']),
  className: _propTypes2.default.string,
  hasVoronoi: _propTypes2.default.bool,
  height: _propTypes2.default.number.isRequired,
  hideLabels: _propTypes2.default.bool,
  labelRotation: _propTypes2.default.number,
  layout: _propTypes2.default.number,
  links: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    source: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]).isRequired,
    target: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]).isRequired
  })).isRequired,
  margin: _chartUtils.MarginPropType,
  nodePadding: _propTypes2.default.number,
  nodes: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  nodeWidth: _propTypes2.default.number,
  onValueMouseOver: _propTypes2.default.func,
  onValueClick: _propTypes2.default.func,
  onValueMouseOut: _propTypes2.default.func,
  onLinkClick: _propTypes2.default.func,
  onLinkMouseOver: _propTypes2.default.func,
  onLinkMouseOut: _propTypes2.default.func,
  style: _propTypes2.default.shape({
    links: _propTypes2.default.object,
    rects: _propTypes2.default.object,
    labels: _propTypes2.default.object
  }),
  width: _propTypes2.default.number.isRequired
};
exports.default = Sankey;