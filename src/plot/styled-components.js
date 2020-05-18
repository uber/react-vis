/* eslint-disable camelcase */
import {styledWithClass} from 'utils/styling-utils';

const $rv_xy_plot_axis_font_color = '#6b6b76';
const $rv_xy_plot_axis_line_color = '#e6e6e9';
const $rv_xy_plot_axis_font_size = '11px';
const $rv_xy_plot_tooltip_background = '#3a3a48';
const $rv_xy_plot_tooltip_color = '#fff';
const $rv_xy_plot_tooltip_font_size = '12px';
const $rv_xy_plot_tooltip_border_radius = '4px';
const $rv_xy_plot_tooltip_shadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
const $rv_xy_plot_tooltip_padding = '7px 10px';

export const XYPlotInnerSvg = styledWithClass('svg', 'rv-xy-plot__inner')`
  display: block;
`;

export const XYPlotAxisLine = styledWithClass('line', 'rv-xy-plot__axis__line')`
  fill: none;
  stroke-width: 2px;
  stroke: ${$rv_xy_plot_axis_line_color};
`;
