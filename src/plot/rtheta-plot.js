// Copyright (c) 2016 Uber Technologies, Inc.
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

import Plot from './plot';

const PLOT_CLASSNAME = 'rv-rtheta-plot';
import {getSeriesPropsFromChildren} from 'utils/series-utils';
import {getInnerDimensions} from 'utils/chart-utils';
import {warning} from 'utils/react-utils';

const DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

function polarToCartesian(data) {
  return data.map(row => ({
    x: row.radius * Math.cos(row.theta),
    y: row.radius * Math.sin(row.theta),
    ...row
  }));
}

const INCOMPATIBLE_SERIES = {
  VerticalBarSeries: true,
  HorizontalBarSeries: true
};

function transformChildren(children, containProps) {
  const containerRDomain = containProps.rDomain;
  const updatedComponets = children.reduce((res, child) => {
    const {data, rDomain = containerRDomain} = child.props;
    // ADD WARNINGS ABOUT PLOT TYPES THAT R-THETA DOES NOT SUPPORT
    if (INCOMPATIBLE_SERIES[child.type.displayName]) {
      warning(`${child.type.displayName} is not comptable with R-Theta Plot`);
      return res;
    }
    const props = {
      ...child.props
    };
    if (rDomain) {
      props.xDomain = [-rDomain[1], rDomain[1]];
      props.yDomain = [-rDomain[1], rDomain[1]];
    }
    if (!data) {
      return res.concat([{
        ...child,
        props
      }]);
    }

    props.data = polarToCartesian(data);

    // also mark this a polar series
    return res.concat([{
      ...child,
      props
    }]);
  }, []);

  return updatedComponets;
}

class RThetaPlot extends Plot {

  // maybe also reject xy-components?
  /**
   * Prepare the child components (including series) for rendering.
   * @returns {Array} Array of child components.
   * @private
   */
  _getClonedChildComponents() {
    const {animation} = this.props;
    const {scaleMixins, data} = this.state;
    const dimensions = getInnerDimensions(this.props, DEFAULT_MARGINS);
    const children = React.Children.toArray(this.props.children);
    const transformedChildren = transformChildren(children, this.props);
    const seriesProps = getSeriesPropsFromChildren(transformedChildren);
    return transformedChildren.map((child, index) => {
      let dataProps = null;
      if (seriesProps[index]) {
        // Get the index of the series in the list of props and retrieve
        // the data property from it.
        const {seriesIndex} = seriesProps[index];
        dataProps = {data: polarToCartesian(data[seriesIndex])};
      }
      return React.cloneElement(child, {
        ...dimensions,
        animation,
        ...seriesProps[index],
        ...scaleMixins,
        ...child.props,
        ...dataProps
      });
    });
  }

  render() {
    const {
      className,
      width,
      height
    } = this.props;

    if (this._isPlotEmpty()) {
      return (
        <div
          className={`${PLOT_CLASSNAME} ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}/>
      );
    }
    const components = this._getClonedChildComponents();

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className={`${PLOT_CLASSNAME} ${className}`}>
        <svg
          className={`${PLOT_CLASSNAME}__inner`}
          width={width}
          height={height}
          onMouseDown={this._mouseDownHandler}
          onMouseMove={this._mouseMoveHandler}
          onMouseLeave={this._mouseLeaveHandler}
          onMouseEnter={this._mouseEnterHandler}>
          {components.filter(c => c && c.type.requiresSVG)}
        </svg>
        {components.filter(c => c && !c.type.requiresSVG)}
      </div>
    );
  }
}

RThetaPlot.displayName = 'RThetaPlot';

export default RThetaPlot;
