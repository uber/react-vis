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
import {scaleLinear} from 'd3-scale';
import {format} from 'd3-format';

import {AnimationPropType} from 'animation';
import XYPlot from 'plot/xy-plot';
import {DISCRETE_COLOR_RANGE} from 'theme';
import {MarginPropType} from 'utils/chart-utils';
import PolygonSeries from 'plot/series/polygon-series';
import LabelSeries from 'plot/series/label-series';
import DecorativeAxis from 'plot/axis/decorative-axis';

const predefinedClassName = 'rv-radar-chart';
const DEFAULT_FORMAT = format('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 - props.startingAngle {number} the initial angle offset
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  const {animation, domains, startingAngle, style, tickFormat} = props;
  return domains.map((domain, index) => {
    const angle = index / domains.length * Math.PI * 2 + startingAngle;
    const sortedDomain = domain.domain.sort();

    const domainTickFormat = t =>
      domain.tickFormat ? domain.tickFormat(t) :
      tickFormat ? tickFormat(t) :
      t === sortedDomain[0] ? '' : DEFAULT_FORMAT(t);
    return (
      <DecorativeAxis
        animation={animation}
        key={`${index}-axis`}
        axisStart={{x: 0, y: 0}}
        axisEnd={{x: Math.cos(angle), y: Math.sin(angle)}}
        axisDomain={sortedDomain}
        numberOfTicks={5}
        tickValue={domainTickFormat}
        style={style.axes}
        />
    );
  });
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
  - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  const {domains, startingAngle, style} = props;
  return domains.map((domain, index) => {
    const angle = index / domains.length * Math.PI * 2 + startingAngle;
    const radius = 1.2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      label: domain.name,
      style
    };
  });
}

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 * @return {Array} the plotted axis components
 */
function getPolygons(props) {
  const {
    animation,
    domains,
    data,
    style,
    startingAngle
  } = props;
  const scales = domains.reduce((acc, domain) => {
    acc[domain.name] = scaleLinear().domain(domain.domain).range([0, 1]);
    return acc;
  }, {});

  return data.map((row, rowIndex) => {
    const mappedData = domains.map((domain, index) => {
      const dataPoint = row[domain.name];
      // error handling if point doesn't exisit
      const angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      const radius = Math.max(scales[domain.name](dataPoint), 0);
      return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)};
    });

    return (<PolygonSeries
      animation={animation}
      className={`${predefinedClassName}-polygon`}
      key={`${rowIndex}-polygon`}
      data={mappedData}
      style={{
        stroke: row.color || row.stroke || DISCRETE_COLOR_RANGE[rowIndex],
        fill: row.color || row.fill || DISCRETE_COLOR_RANGE[rowIndex],
        ...style.polygons
      }}
      />);
  });
}

class RadarChart extends Component {
  render() {
    const {
      animation,
      className,
      children,
      data,
      domains,
      height,
      width,
      margin,
      onMouseLeave,
      onMouseEnter,
      tickFormat,
      startingAngle,
      style
    } = this.props;

    return (
      <XYPlot
        height={height}
        width={width}
        margin={margin}
        dontCheckIfEmpty
        className={`${className} ${predefinedClassName}`}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        xDomain={[-1, 1]}
        yDomain={[-1, 1]}>
        {children}
        {getAxes({domains, animation, startingAngle, style, tickFormat})
          .concat(getPolygons({
            animation,
            domains,
            data,
            startingAngle,
            style
          }))
          .concat(
            <LabelSeries
              animation
              key={className}
              className={`${predefinedClassName}-label`}
              data={getLabels({domains, style: style.labels, startingAngle})} />
          )
        }
      </XYPlot>
    );
  }
}

RadarChart.displayName = 'RadarChart';
RadarChart.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  domains: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      domain: PropTypes.arrayOf(PropTypes.number).isRequired,
      tickFormat: PropTypes.func
    })
  ).isRequired,
  height: PropTypes.number.isRequired,
  margin: MarginPropType,
  startingAngle: PropTypes.number,
  style: PropTypes.shape({
    axes: PropTypes.object,
    labels: PropTypes.object,
    polygons: PropTypes.object
  }),
  tickFormat: PropTypes.func,
  width: PropTypes.number.isRequired
};
RadarChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
  startingAngle: Math.PI / 2,
  style: {
    axes: {
      line: {},
      ticks: {},
      text: {}
    },
    labels: {
      fontSize: 10
    },
    polygons: {
      strokeWidth: 0.5,
      strokeOpacity: 1,
      fillOpacity: 0.1
    }
  }
};

export default RadarChart;
