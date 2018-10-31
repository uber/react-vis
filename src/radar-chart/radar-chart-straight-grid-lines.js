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
import {scaleLinear} from 'd3-scale';
import {format} from 'd3-format';

import {MarginPropType} from 'utils/chart-utils';
import XYPlot from 'plot/xy-plot';
import PolygonSeries from 'plot/series/polygon-series';

const predefinedClassName = 'rv-radar-chart-grid-lines';

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 * @return {Array} the plotted axis components
 */
function getSpiderGridLines(props) {
  const {
    numberOfDomains,
    data,
    style,
    startingAngle,
    numberOfGridlines,
    startAtZero
  } = props;
  const scales = [...Array(numberOfDomains)].reduce((acc, grid, index) => {
    acc[index] = scaleLinear()
      .domain([0, numberOfGridlines])
      .range([0, 1]);
    return acc;
  }, {});

  let totalCount = numberOfGridlines;
  if (startAtZero) {
    totalCount++;
  }
  return [...Array(totalCount)].map((row, rowIndex) => {
    const mappedData = [...Array(numberOfDomains)].map((domain, index) => {
      const angle = (index / numberOfDomains) * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      let radiusNumber = numberOfGridlines - rowIndex;
      if (radiusNumber === 0) {
        // rendering a polygon with a 0 radius won't show anything, add just a tiny bit to show a tiny polygon at 0
        radiusNumber = 0.1;
      }
      const radius = Math.max(scales[index](radiusNumber), 0);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    });

    return (
      <PolygonSeries
        className={`${predefinedClassName}-spider-grid-line`}
        key={`${rowIndex}-spider-grid-line`}
        data={mappedData}
        style={{
          stroke: style.spiderGridStroke || '#cccccc',
          strokeWidth: 1,
          fill: style.spiderGridFill || '#f3f3f3',
          ...style.polygons
        }}
      />
    );
  });
}

function RadarChartStraightGridLines(props) {
  const {
    height,
    width,
    margin,
    className,
    numberOfDomains,
    data,
    startingAngle,
    style,
    numberOfGridlines,
    startAtZero
  } = props;

  const spiderGridLines = getSpiderGridLines({
    numberOfDomains,
    data,
    startingAngle,
    style,
    numberOfGridlines,
    startAtZero
  });

  return (
    <XYPlot
      height={height}
      width={width}
      margin={margin}
      style={{
        ...style,
        XYPlot: {
          zIndex: -1
        }
      }}
      dontCheckIfEmpty
      className={`${className} ${predefinedClassName}`}
      xDomain={[-1, 1]}
      yDomain={[-1, 1]}
    >
      {spiderGridLines}
    </XYPlot>
  );
}

RadarChartStraightGridLines.displayName = 'RadarChartStraightGridLines';
RadarChartStraightGridLines.propTypes = {
  className: PropTypes.string,
  numberOfDomains: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: MarginPropType,
  startingAngle: PropTypes.number,
  style: PropTypes.shape({
    polygons: PropTypes.object
  }),
  width: PropTypes.number.isRequired,
  numberOfGridlines: PropTypes.number,
  startAtZero: PropTypes.bool
};

RadarChartStraightGridLines.defaultProps = {
  className: '',
  startingAngle: Math.PI / 2,
  style: {
    polygons: {
      strokeWidth: 0.5,
      strokeOpacity: 1,
      fillOpacity: 0.1
    }
  },
  numberOfGridlines: 5,
  startAtZero: true
};

export default RadarChartStraightGridLines;
