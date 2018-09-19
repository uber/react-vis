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
import {
  MarginPropType,
  getInnerDimensions,
  DEFAULT_MARGINS
} from 'utils/chart-utils';
import LineSeries from 'plot/series/line-series';
import LineMarkSeries from 'plot/series/line-mark-series';
import LabelSeries from 'plot/series/label-series';
import DecorativeAxis from 'plot/axis/decorative-axis';

import Highlight from 'plot/highlight';

const predefinedClassName = 'rv-parallel-coordinates-chart';
const DEFAULT_FORMAT = format('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  const {animation, domains, style, tickFormat} = props;
  return domains.map((domain, index) => {
    const sortedDomain = domain.domain;

    const domainTickFormat = t => {
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };

    return (
      <DecorativeAxis
        animation={animation}
        key={`${index}-axis`}
        axisStart={{x: domain.name, y: 0}}
        axisEnd={{x: domain.name, y: 1}}
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
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  const {domains, style} = props;
  return domains.map((domain, index) => {
    return {
      x: domain.name,
      y: 1.1,
      label: domain.name,
      style
    };
  });
}

/**
 * Generate the actual lines to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.showMarks {Bool} whether or not to use the line mark series
 * @return {Array} the plotted axis components
 */
function getLines(props) {
  const {
    animation,
    brushFilters,
    colorRange,
    domains,
    data,
    style,
    showMarks
  } = props;
  const scales = domains.reduce((acc, {domain, name}) => {
    acc[name] = scaleLinear()
      .domain(domain)
      .range([0, 1]);
    return acc;
  }, {});
  // const

  return data.map((row, rowIndex) => {
    let withinFilteredRange = true;
    const mappedData = domains.map((domain, index) => {
      const {getValue, name} = domain;

      // watch out! Gotcha afoot
      // yVal after being scale is in [0, 1] range
      const yVal = scales[name](getValue ? getValue(row) : row[name]);
      const filter = brushFilters[name];
      // filter value after being scale back from pixel space is also in [0, 1]
      if (filter && (yVal < filter.min || yVal > filter.max)) {
        withinFilteredRange = false;
      }
      return {x: name, y: yVal};
    });
    const selectedName = `${predefinedClassName}-line`;
    const unselectedName = `${selectedName} ${predefinedClassName}-line-unselected`;
    const lineProps = {
      animation,
      className: withinFilteredRange ? selectedName : unselectedName,
      key: `${rowIndex}-polygon`,
      data: mappedData,
      color: row.color || colorRange[rowIndex % colorRange.length],
      style: {...style.lines, ...(row.style || {})}
    };
    if (!withinFilteredRange) {
      lineProps.style = {
        ...lineProps.style,
        ...style.deselectedLineStyle
      };
    }
    return showMarks ? (
      <LineMarkSeries {...lineProps} />
    ) : (
      <LineSeries {...lineProps} />
    );
  });
}

class ParallelCoordinates extends Component {
  state = {
    brushFilters: {}
  };

  render() {
    const {brushFilters} = this.state;
    const {
      animation,
      brushing,
      className,
      children,
      colorRange,
      data,
      domains,
      height,
      hideInnerMostValues,
      margin,
      onMouseLeave,
      onMouseEnter,
      showMarks,
      style,
      tickFormat,
      width
    } = this.props;

    const axes = getAxes({
      domains,
      animation,
      hideInnerMostValues,
      style,
      tickFormat
    });

    const lines = getLines({
      animation,
      brushFilters,
      colorRange,
      domains,
      data,
      showMarks,
      style
    });
    const labelSeries = (
      <LabelSeries
        animation
        key={className}
        className={`${predefinedClassName}-label`}
        data={getLabels({domains, style: style.labels})}
      />
    );

    const {marginLeft, marginRight} = getInnerDimensions(
      this.props,
      DEFAULT_MARGINS
    );
    return (
      <XYPlot
        height={height}
        width={width}
        margin={margin}
        dontCheckIfEmpty
        className={`${className} ${predefinedClassName}`}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        xType="ordinal"
        yDomain={[0, 1]}
      >
        {children}
        {axes.concat(lines).concat(labelSeries)}
        {brushing &&
          domains.map(d => {
            const trigger = row => {
              this.setState({
                brushFilters: {
                  ...brushFilters,
                  [d.name]: row ? {min: row.bottom, max: row.top} : null
                }
              });
            };
            return (
              <Highlight
                key={d.name}
                drag
                highlightX={d.name}
                onBrushEnd={trigger}
                onDragEnd={trigger}
                highlightWidth={
                  (width - marginLeft - marginRight) / domains.length
                }
                enableX={false}
              />
            );
          })}
      </XYPlot>
    );
  }
}

ParallelCoordinates.displayName = 'ParallelCoordinates';
ParallelCoordinates.propTypes = {
  animation: AnimationPropType,
  brushing: PropTypes.bool,
  className: PropTypes.string,
  colorType: PropTypes.string,
  colorRange: PropTypes.arrayOf(PropTypes.string),
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
  style: PropTypes.shape({
    axes: PropTypes.object,
    labels: PropTypes.object,
    lines: PropTypes.object
  }),
  showMarks: PropTypes.bool,
  tickFormat: PropTypes.func,
  width: PropTypes.number.isRequired
};
ParallelCoordinates.defaultProps = {
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
      fontSize: 10,
      textAnchor: 'middle'
    },
    lines: {
      strokeWidth: 1,
      strokeOpacity: 1
    },
    deselectedLineStyle: {
      strokeOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT
};

export default ParallelCoordinates;
