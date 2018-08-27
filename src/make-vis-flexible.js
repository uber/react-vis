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
import ResizeObserver from 'resize-observer-polyfill';
import XYPlot from 'plot/xy-plot';
import RadarChart from 'radar-chart';
import RadialChart from 'radial-chart';
import Sunburst from 'sunburst';
import Treemap from 'treemap';
import Sankey from 'sankey';

export const makeVisFlexible = Component => {
  return class extends React.Component {
    static propTypes = {
      ...Component.propTypes,
      height: PropTypes.number,
      width: PropTypes.number
    };

    static displayName = `Flexible${Component.displayName || Component.name || 'Component'}`;

    constructor(props) {
      super(props);

      this.state = {
        height: 0,
        width: 0
      };
    }

    /**
     * Get the width of the container and assign the width.
     * @private
     */
    _onResize() {
      const containerElement = getDOMNode(this[CONTAINER_REF]);
      const {offsetHeight, offsetWidth} = containerElement;

      const newHeight = this.state.height === offsetHeight ? {} :
        {height: offsetHeight};

      this.observer = new ResizeObserver(() => this.setSize());

      this.observer.observe(this.node);
    }

    componentWillUnmount() {
      this.observer.disconnect();
    }

    setSize = () => {
      const {height, width} = this.node.getBoundingClientRect();

      this.setState({height, width});
    };

    render() {
      const {height, width} = this.state;

      return (
          ref={node => {
            if (node) {
              this.node = node;
            }
          }}
          style={{width: '100%', height: '100%'}}
        >
          <Component height={height} width={width} {...this.props} />
        </div>
      );
    }
  };
};

export const FlexibleXYPlot = makeVisFlexible(XYPlot);
export const FlexibleRadarChart = makeVisFlexible(RadarChart);
export const FlexibleRadialChart = makeVisFlexible(RadialChart);
export const FlexibleSunburst = makeVisFlexible(Sunburst);
export const FlexibleTreemap = makeVisFlexible(Treemap);
export const FlexibleSankey = makeVisFlexible(Sankey);

// This code has been deprecated
export const makeHeightFlexible = component => {
  // eslint-disable-next-line no-console
  console.warn('[WARNING]: makeHeightFlexible has been deprecated and will be removed in a future version');

  return makeVisFlexible(component);
};

export const makeWidthFlexible = component => {
  // eslint-disable-next-line no-console
  console.warn('[WARNING]: makeWidthFlexible has been deprecated and will be removed in a future version');

  return makeVisFlexible(component);
};

export const FlexibleWidthXYPlot = makeVisFlexible(XYPlot);
export const FlexibleHeightXYPlot = makeVisFlexible(XYPlot);
