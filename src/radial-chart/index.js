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

import React, {Component} from 'react';
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
function getWedgesToRender({data, angleAccessor}) {
  const pie = pieBuilder().sort(null).value(angleAccessor);
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

function generateLabels(mappedData, accessors) {
  const {
    labelAccessor,
    subLabelAccessor
  } = accessors;
  return mappedData.reduce((res, row) => {
    const {angle, angle0, radius} = row;
    const centeredAngle = (angle + angle0) / 2;

    // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!
    const updatedAngle = -1 * centeredAngle + Math.PI / 2;
    const newLabels = [];
    if (labelAccessor(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * 1.1,
        label: labelAccessor(row),
        style: {fontSize: '12px'}
      });
    }

    if (subLabelAccessor(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * 1.1,
        label: subLabelAccessor(row),
        yOffset: 12,
        style: {fontSize: '10px'}
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

class RadialChart extends Component {
  render() {
    const {
      animation,
      className,
      children,
      data,
      height,
      hideRootNode,
      width,
      colorType,
      radius,
      innerRadius,
      showLabels,
      margin,
      onMouseLeave,
      onMouseEnter,
      labelsAboveChildren,
      angleAccessor,
      labelAccessor,
      subLabelAccessor
    } = this.props;
    const mappedData = getWedgesToRender({data, height, hideRootNode, width, angleAccessor});
    const radialDomain = getRadialDomain(mappedData);
    const arcProps = {
      colorType,
      ...this.props,
      animation,
      radiusDomain: [0, radialDomain],
      data: mappedData,
      radiusNoFallBack: true,
      arcClassName: 'rv-radial-chart__series--pie__slice'
    };
    if (radius) {
      arcProps.radiusDomain = [0, 1];
      arcProps.radiusRange = [innerRadius || 0, radius];
      arcProps.radiusType = 'linear';
    }
    const maxRadius = radius ? radius : getMaxRadius(width, height);
    const defaultMargin = getRadialLayoutMargin(width, height, maxRadius);

    const labels = generateLabels(mappedData, {
      labelAccessor,
      subLabelAccessor
    });
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
        yDomain={[-radialDomain, radialDomain]}>
        <ArcSeries {...arcProps} angleAccessor={d => d.angle}/>
        {showLabels && !labelsAboveChildren && <LabelSeries data={labels}/>}
        {children}
        {showLabels && labelsAboveChildren && <LabelSeries data={labels}/>}
      </XYPlot>
    );
  }
}

RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    angle: PropTypes.number,
    className: PropTypes.string,
    label: PropTypes.string,
    radius: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  height: PropTypes.number.isRequired,
  labelsAboveChildren: PropTypes.bool,
  margin: MarginPropType,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  width: PropTypes.number.isRequired,
  showLabels: PropTypes.bool,
  angleAccessor: PropTypes.func,
  angle0Accessor: PropTypes.func,
  radiusAccessor: PropTypes.func,
  radius0Accessor: PropTypes.func,
  labelAccessor: PropTypes.func,
  subLabel: PropTypes.func
};
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
  angleAccessor: d => d.angle,
  angle0Accessor: d => d.angle0,
  radiusAccessor: d => d.radius,
  radius0Accessor: d => d.radius0,
  labelAccessor: d => d.label,
  subLabelAccessor: d => d.subLabel
};

export default RadialChart;
