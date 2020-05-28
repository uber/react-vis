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
import {mount, shallow} from 'enzyme';

import AbstractSeries from 'plot/series/abstract-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import BarSeries from 'plot/series/bar-series';
import LineSeries from 'plot/series/line-series';
import XAxis from 'plot/axis/x-axis';
import XYPlot from 'plot/xy-plot';
import HorizontalGridLines from 'plot/horizontal-grid-lines';

import MixedStackedChart from '../../../showcase/plot/mixed-stacked-chart';
import {FlexibleCharts} from '../../../showcase/flexible/flexible-examples';
import EmptyChart from '../../../showcase/axes/empty-chart';
import {testRenderWithProps} from '../test-utils';

const XYPLOT_PROPS = {width: 10, height: 10};

testRenderWithProps(XYPlot, XYPLOT_PROPS);

describe('XYPlot', () => {
  test('Render a stacked bar chart', () => {
    const wrapper = shallow(
      <XYPlot width={300} height={300} stackBy="y">
        <VerticalBarSeries
          data={[
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 3, y: 2}
          ]}
        />
        <VerticalBarSeries
          data={[
            {x: 1, y: 2},
            {x: 2, y: 1},
            {x: 3, y: 0}
          ]}
        />
      </XYPlot>
    );

    const renderedVerticalBarsWrapper = wrapper.find(VerticalBarSeries);

    expect(renderedVerticalBarsWrapper.at(0).prop('data')).toEqual([
      {x: 1, y: 0},
      {x: 2, y: 1},
      {x: 3, y: 2}
    ]);

    expect(renderedVerticalBarsWrapper.at(1).prop('data')).toEqual([
      {x: 1, y: 2, y0: 0},
      {x: 2, y: 2, y0: 1},
      {x: 3, y: 2, y0: 2}
    ]);
  });

  test('Render a stacked bar chart with other children', () => {
    const wrapper = shallow(
      <XYPlot width={300} height={300} stackBy="y">
        <XAxis />
        <VerticalBarSeries data={[{x: 1, y: 0}]} />
        <VerticalBarSeries data={[{x: 1, y: 2}]} />
        {
          // Empty div here is intentional, to test series children handling
        }
        <div />
      </XYPlot>
    );

    const renderedVerticalBarsWrapper = wrapper.find(VerticalBarSeries);

    expect(renderedVerticalBarsWrapper.at(0).prop('data')).toEqual([
      {x: 1, y: 0}
    ]);

    expect(renderedVerticalBarsWrapper.at(1).prop('data')).toEqual([
      {x: 1, y: 2, y0: 0}
    ]);
  });

  test('Render a bar chart with some nonAnimatedProps', () => {
    const wrapper = shallow(
      <XYPlot
        width={300}
        height={300}
        animation={{nonAnimatedProps: ['xDomain']}}
      >
        <VerticalBarSeries data={[{x: 1, y: 0}]} />
        <XAxis />
      </XYPlot>
    );

    const renderedXAxisWrapper = wrapper.find(XAxis);
    const renderedVerticalBarsWrapper = wrapper.find(VerticalBarSeries);

    expect(renderedXAxisWrapper.at(0).prop('animation')).toEqual({
      nonAnimatedProps: ['xDomain']
    });

    expect(renderedVerticalBarsWrapper.at(0).prop('animation')).toEqual({
      nonAnimatedProps: ['xDomain']
    });
  });

  test('testing flexible charts', () => {
    const $ = mount(FlexibleCharts({height: 200, width: 400}));
    const w = $.find('.flexible-width .rv-xy-plot').prop('style');
    const h = $.find('.flexible-height .rv-xy-plot').prop('style');
    const v = $.find('.flexible-vis .rv-xy-plot').prop('style');

    expect(w.width).not.toBe('100px');
    expect(w.height).toEqual('100px');
    expect(h.width).toEqual('100px');
    expect(h.height).not.toBe('100px');
    expect(v.width).not.toBe('100px');
    expect(v.height).not.toBe('100px');
  });

  test('Render two stacked bar series with a non-stacked line series chart', () => {
    const $ = mount(<MixedStackedChart />);

    const renderedBarsWrapper = $.find(BarSeries);
    const renderedLineWrapper = $.find(LineSeries);
    expect(renderedBarsWrapper.at(0).prop('data')).toEqual([
      {x: 2, y: 10},
      {x: 4, y: 5},
      {x: 5, y: 15}
    ]);

    expect(renderedBarsWrapper.at(1).prop('data')).toEqual([
      {x: 2, y: 22, y0: 10},
      {x: 4, y: 7, y0: 5},
      {x: 5, y: 26, y0: 15}
    ]);

    expect(renderedLineWrapper.at(0).prop('data')).toEqual([
      {x: 2, y: 26},
      {x: 4, y: 8},
      {x: 5, y: 30}
    ]);
  });

  test('Render a line series with data accessors', () => {
    const $ = mount(
      <XYPlot width={300} height={300} getX={d => d[0]} getY={d => d[1]}>
        <LineSeries
          data={[
            [1, 0],
            [2, 1],
            [3, 2]
          ]}
        />
      </XYPlot>
    );

    const renderedLineWrapper = $.find(LineSeries);
    const dataProp = renderedLineWrapper.at(0).prop('data');
    const getXProp = renderedLineWrapper.at(0).prop('getX');
    const getYProp = renderedLineWrapper.at(0).prop('getY');
    expect(dataProp.map(getXProp)).toEqual([1, 2, 3]);
    expect(dataProp.map(getYProp)).toEqual([0, 1, 2]);
  });

  test('Trigger all onParentMouse handlers on Series components', () => {
    const onParentMouseHandler = jest.fn();

    class ExtendedSeries extends AbstractSeries {
      onParentMouseUp = onParentMouseHandler;
      onParentMouseDown = onParentMouseHandler;
      onParentMouseMove = onParentMouseHandler;
      onParentMouseLeave = onParentMouseHandler;
      onParentMouseEnter = onParentMouseHandler;
      onParentTouchStart = onParentMouseHandler;
      onParentTouchMove = onParentMouseHandler;
      render() {
        return null;
      }
    }
    const $ = mount(
      <XYPlot width={300} height={300} getX={d => d[0]} getY={d => d[1]}>
        <ExtendedSeries
          name="series-1"
          data={[
            [1, 0],
            [2, 1],
            [3, 2]
          ]}
        />
        <ExtendedSeries
          name="series-2"
          data={[
            [1, 0],
            [2, 1],
            [3, 2]
          ]}
        />
      </XYPlot>
    );
    $.find('svg')
      .at(0)
      .simulate('mouseenter');
    $.find('svg')
      .at(0)
      .simulate('mousedown');
    $.find('svg')
      .at(0)
      .simulate('mousemove');
    $.find('svg')
      .at(0)
      .simulate('mouseup');
    $.find('svg')
      .at(0)
      .simulate('mouseleave');
    $.find('svg')
      .at(0)
      .simulate('touchstart');
    $.find('svg')
      .at(0)
      .simulate('touchmove');

    expect(onParentMouseHandler).toHaveBeenCalledTimes(14);
  });

  test('dontCheckIfEmpty - Showcase example EmptyChart', () => {
    const $ = mount(<EmptyChart />);
    expect($.find('.rv-xy-plot__series').length).toBe(0);
    expect($.text()).toBe('1!1.5!2!3!Empty Chart Right Here');
  });

  test('attach ref only to series components', () => {
    const Stateless = () => {
      return <div>stateless</div>;
    };
    const $ = mount(
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <XAxis />
        <LineSeries
          data={[
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 15},
            {x: 4, y: 12}
          ]}
        />
        <Stateless />
      </XYPlot>
    );

    const clonedChilds = $.instance()._getClonedChildComponents();
    const horizontalGridLinesChild = clonedChilds.find(
      element => element.type === HorizontalGridLines
    );
    const axisChild = clonedChilds.find(element => element.type === XAxis);
    const lineSeriesChild = clonedChilds.find(
      element => element.type === LineSeries
    );
    const statelessChild = clonedChilds.find(
      element => element.type === Stateless
    );
    expect(horizontalGridLinesChild.ref === null).toBeTruthy();
    expect(axisChild.ref === null).toBeTruthy();
    expect(typeof lineSeriesChild.ref === 'function').toBeTruthy();
    expect(statelessChild.ref === null).toBeTruthy();
  });

  test('with wheel event callback', () => {
    const onWheel = jest.fn();

    const $ = mount(
      <XYPlot onWheel={onWheel} width={300} height={300}>
        <VerticalBarSeries
          data={[
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 3, y: 2}
          ]}
        />
      </XYPlot>
    );

    $.find('svg')
      .at(0)
      .simulate('wheel');

    expect(onWheel).toHaveBeenCalledTimes(1);
  });
});
