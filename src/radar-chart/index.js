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
// TODO add jsdoc
function getAxes({domains, animation, style}) {
  return domains.map((domain, index) => {
    const angle = index / domains.length * Math.PI * 2;
    const sortedDomain = domain.domain.sort();

    return (<DecorativeAxis
      animation
      key={`${index}-axis`}
      axisStart={{x: 0, y: 0}}
      axisEnd={{x: Math.cos(angle), y: Math.sin(angle)}}
      axisDomain={sortedDomain}
      numberOfTicks={5}
      tickValue={t => t === sortedDomain[0] ? '' : DEFAULT_FORMAT(t)}
      style={style.axes}
      />);
  });
}

// TODO add jsdoc
function getLabels(domains, style) {
  return domains.map((domain, index) => {
    // TODO special handling when there is just one domain
    const angle = index / domains.length * Math.PI * 2;
    const radius = 1.2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      label: domain.name,
      style
    };
  });
}

// TODO add jsdoc
function getPolygons({domains, data, animation, style}) {
  const scales = domains.reduce((acc, domain) => {
    acc[domain.name] = scaleLinear().domain(domain.domain).range([0, 1]);
    return acc;
  }, {});

  return data.map((row, rowIndex) => {
    const mappedData = domains.map((domain, index) => {
      const dataPoint = row[domain.name];
      // error handling if point doesn't exisit
      const angle = index / domains.length * Math.PI * 2;
      // dont let the radius become negative
      const radius = Math.max(scales[domain.name](dataPoint), 0);
      return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)};
    });
    // add className
    return (<PolygonSeries
      animation
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
      data,
      domains,
      height,
      width,
      margin,
      onMouseLeave,
      onMouseEnter,
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
        {getAxes({domains, animation, style})
          .concat(getPolygons({
            animation,
            domains,
            data,
            style
          }))
          .concat(
            <LabelSeries
              animation
              className={`${predefinedClassName}-label`}
              data={getLabels(domains, style.labels)} />
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
  data: PropTypes.arrayOf([
    PropTypes.object
  ]).isRequired,
  domains: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      domain: PropTypes.arrayOf([PropTypes.number]).isRequired,
      tickFormat: PropTypes.func
    })
  ]).isRequired,
  height: PropTypes.number.isRequired,
  margin: MarginPropType,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  style: PropTypes.shape({
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
};
RadarChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
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
