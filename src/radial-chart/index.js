// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';
import {pie as pieBuilder} from 'd3-shape';

import {AnimationPropType} from 'animation';
import ArcSeries from 'plot/series/arc-series';
import LabelSeries from 'plot/series/label-series';
import XYPlot from 'plot/xy-plot';
import {DISCRETE_COLOR_RANGE} from 'theme';
import {MarginPropType, getRadialLayoutMargin} from 'utils/chart-utils';
import {getRadialDomain} from 'utils/series-utils';

const predefinedClassName = 'rv-radial-chart';

const DEFAULT_RADIUS_MARGIN = 15;

/**
 * Create the list of wedges to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
 * @returns {Array} Array of nodes.
 */
function getWedgesToRender({data, getAngle}) {
  const pie = pieBuilder()
    .sort(null)
    .value(getAngle);
  const pieData = pie(data).reverse();
  return pieData.map((row, index) => {
    return {
      ...row.data,
      angle0: row.startAngle,
      angle: row.endAngle,
      radius0: row.data.innerRadius || 0,
      radius: row.data.radius || 1,
      color: row.data.color || index
    };
  });
}

function generateLabels(mappedData, accessors, labelsRadiusMultiplier = 1.1) {
  const {getLabel, getSubLabel} = accessors;
  return mappedData.reduce((res, row) => {
    const {angle, angle0, radius} = row;
    const centeredAngle = (angle + angle0) / 2;

    // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!
    const updatedAngle = -1 * centeredAngle + Math.PI / 2;
    const newLabels = [];
    if (getLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getLabel(row)
      });
    }

    if (getSubLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getSubLabel(row),
        style: {fontSize: 10},
        yOffset: 12
      });
    }
    return res.concat(newLabels);
  }, []);
  // could add force direction here to make sure the labels dont overlap
}

/**
 * Get the max radius so the chart can extend to the margin.
 * @param  {Number} width - container width
 * @param  {Number} height - container height
 * @return {Number} radius
 */
function getMaxRadius(width, height) {
  return Math.min(width, height) / 2 - DEFAULT_RADIUS_MARGIN;
}

function RadialChart(props) {
  const {
    animation,
    className,
    children,
    colorType,
    data,
    getAngle,
    getLabel,
    getSubLabel,
    height,
    hideRootNode,
    innerRadius,
    labelsAboveChildren,
    labelsRadiusMultiplier,
    labelsStyle,
    margin,
    onMouseLeave,
    onMouseEnter,
    radius,
    showLabels,
    style,
    width
  } = props;
  const mappedData = getWedgesToRender({
    data,
    height,
    hideRootNode,
    width,
    getAngle
  });
  const radialDomain = getRadialDomain(mappedData);
  const arcProps = {
    colorType,
    ...props,
    animation,
    radiusDomain: [0, radialDomain],
    data: mappedData,
    radiusNoFallBack: true,
    style,
    arcClassName: 'rv-radial-chart__series--pie__slice'
  };
  if (radius) {
    arcProps.radiusDomain = [0, 1];
    arcProps.radiusRange = [innerRadius || 0, radius];
    arcProps.radiusType = 'linear';
  }
  const maxRadius = radius ? radius : getMaxRadius(width, height);
  const defaultMargin = getRadialLayoutMargin(width, height, maxRadius);

  const labels = generateLabels(
    mappedData,
    {
      getLabel,
      getSubLabel
    },
    labelsRadiusMultiplier
  );
  return (
    <XYPlot
      height={height}
      width={width}
      margin={{
        ...margin,
        ...defaultMargin
      }}
      className={`${className} ${predefinedClassName}`}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      xDomain={[-radialDomain, radialDomain]}
      yDomain={[-radialDomain, radialDomain]}
    >
      <ArcSeries {...arcProps} getAngle={d => d.angle} />
      {showLabels &&
        !labelsAboveChildren && (
          <LabelSeries data={labels} style={labelsStyle} />
        )}
      {children}
      {showLabels &&
        labelsAboveChildren && (
          <LabelSeries data={labels} style={labelsStyle} />
        )}
    </XYPlot>
  );
}

RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number,
      className: PropTypes.string,
      label: PropTypes.string,
      radius: PropTypes.number,
      style: PropTypes.object
    })
  ).isRequired,
  getAngle: PropTypes.func,
  getAngle0: PropTypes.func,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getRadius: PropTypes.func,
  getRadius0: PropTypes.func,
  getLabel: PropTypes.func,
  height: PropTypes.number.isRequired,
  labelsAboveChildren: PropTypes.bool,
  labelsStyle: PropTypes.object,
  margin: MarginPropType,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  showLabels: PropTypes.bool,
  style: PropTypes.object,
  subLabel: PropTypes.func,
  width: PropTypes.number.isRequired
};
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
  padAngle: 0,
  getAngle: d => d.angle,
  getAngle0: d => d.angle0,
  getRadius: d => d.radius,
  getRadius0: d => d.radius0,
  getLabel: d => d.label,
  getSubLabel: d => d.subLabel
};

export default RadialChart;
