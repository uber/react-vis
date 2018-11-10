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

import test from 'tape';
import React from 'react';
import {mount, shallow} from 'enzyme';

import AbstractSeries from 'plot/series/abstract-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import BarSeries from 'plot/series/bar-series';
import LineSeries from 'plot/series/line-series';
import XAxis from 'plot/axis/x-axis';
import XYPlot from 'plot/xy-plot';
import HorizontalGridLines from 'plot/horizontal-grid-lines';

import MixedStackedChart from '../../showcase/plot/mixed-stacked-chart';
import {FlexibleCharts} from '../../showcase/flexible/flexible-examples';
import EmptyChart from '../../showcase/axes/empty-chart';
import {testRenderWithProps} from '../test-utils';

const XYPLOT_PROPS = {width: 10, height: 10};

testRenderWithProps(XYPlot, XYPLOT_PROPS);

test('Render a stacked bar chart', t => {
  const wrapper = shallow(
    <XYPlot width={300} height={300} stackBy="y">
      <VerticalBarSeries data={[{x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}]} />
      <VerticalBarSeries data={[{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 0}]} />
    </XYPlot>
  );

  const renderedVerticalBarsWrapper = wrapper.find(VerticalBarSeries);

  t.deepEqual(
    renderedVerticalBarsWrapper.at(0).prop('data'),
    [{x: 1, y: 0}, {x: 2, y: 1}, {x: 3, y: 2}],
    'First bar series data is the same'
  );

  t.deepEqual(
    renderedVerticalBarsWrapper.at(1).prop('data'),
    [{x: 1, y: 2, y0: 0}, {x: 2, y: 2, y0: 1}, {x: 3, y: 2, y0: 2}],
    'Second bar series data contains y0 values'
  );

  t.end();
});

test('Render a stacked bar chart with other children', t => {
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

  t.deepEqual(
    renderedVerticalBarsWrapper.at(0).prop('data'),
    [{x: 1, y: 0}],
    'First bar series data is the same'
  );

  t.deepEqual(
    renderedVerticalBarsWrapper.at(1).prop('data'),
    [{x: 1, y: 2, y0: 0}],
    'Second bar series data contains y0 values'
  );

  t.end();
});

test('Render a bar chart with some nonAnimatedProps', t => {
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

  t.deepEqual(
    renderedXAxisWrapper.at(0).prop('animation'),
    {nonAnimatedProps: ['xDomain']},
    'XAxis has nonAnimatedProps'
  );

  t.deepEqual(
    renderedVerticalBarsWrapper.at(0).prop('animation'),
    {nonAnimatedProps: ['xDomain']},
    'VerticalBarSeries has nonAnimatedProps'
  );

  t.end();
});

test('testing flexible charts', t => {
  const $ = mount(FlexibleCharts({height: 200, width: 400}));
  const w = $.find('.flexible-width .rv-xy-plot').prop('style');
  const h = $.find('.flexible-height .rv-xy-plot').prop('style');
  const v = $.find('.flexible-vis .rv-xy-plot').prop('style');

  t.notEqual(w.width, '100px', 'flexible width - width is not 100px');
  t.deepEqual(w.height, '100px', 'flexible width - height is 100px');
  t.deepEqual(h.width, '100px', 'flexible height - width is 100px');
  t.notEqual(h.height, '100px', 'flexible height - height is not 100px');
  t.notEqual(v.width, '100px', 'flexible vis - width is not 100px');
  t.notEqual(v.height, '100px', 'flexible vis - height is not 100px');
  t.end();
});

test('Render two stacked bar series with a non-stacked line series chart', t => {
  const $ = mount(<MixedStackedChart />);

  const renderedBarsWrapper = $.find(BarSeries);
  const renderedLineWrapper = $.find(LineSeries);

  t.deepEqual(
    renderedBarsWrapper.at(0).prop('data'),
    [{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}],
    'First bar series data is the same'
  );

  t.deepEqual(
    renderedBarsWrapper.at(1).prop('data'),
    [{x: 2, y: 22, y0: 10}, {x: 4, y: 7, y0: 5}, {x: 5, y: 26, y0: 15}],
    'Second bar series data contains y0 values'
  );

  t.deepEqual(
    renderedLineWrapper.at(0).prop('data'),
    [{x: 2, y: 26}, {x: 4, y: 8}, {x: 5, y: 30}],
    'Line series data does not contain y0 values'
  );

  t.end();
});

test('Render a line series with data accessors', t => {
  const $ = mount(
    <XYPlot width={300} height={300} getX={d => d[0]} getY={d => d[1]}>
      <LineSeries data={[[1, 0], [2, 1], [3, 2]]} />
    </XYPlot>
  );

  const renderedLineWrapper = $.find(LineSeries);
  const dataProp = renderedLineWrapper.at(0).prop('data');
  const getXProp = renderedLineWrapper.at(0).prop('getX');
  const getYProp = renderedLineWrapper.at(0).prop('getY');
  t.deepEqual(
    dataProp.map(getXProp),
    [1, 2, 3],
    'X values should be mapped correctly'
  );
  t.deepEqual(
    dataProp.map(getYProp),
    [0, 1, 2],
    'Y values should be mapped correctly'
  );
  t.end();
});

test('Trigger all onParentMouse handlers on Series components', t => {
  t.plan(14);
  class ExtendedSeries extends AbstractSeries {
    onParentMouseUp(event) {
      t.pass(`onParentMouseUp on ${this.props.name} is called correctly`);
    }
    onParentMouseDown(event) {
      t.pass(`onParentMouseDown on ${this.props.name} is called correctly`);
    }
    onParentMouseMove(event) {
      t.pass(`onParentMouseMove on ${this.props.name} is called correctly`);
    }
    onParentMouseLeave(event) {
      t.pass(`onParentMouseLeave on ${this.props.name} is called correctly`);
    }
    onParentMouseEnter(event) {
      t.pass(`onParentMouseEnter on ${this.props.name} is called correctly`);
    }
    onParentTouchStart(event) {
      t.pass(`onParentTouchStart on ${this.props.name} is called correctly`);
    }
    onParentTouchMove(event) {
      t.pass(`onParentTouchMove on ${this.props.name} is called correctly`);
    }
    render() {
      return null;
    }
  }
  const $ = mount(
    <XYPlot width={300} height={300} getX={d => d[0]} getY={d => d[1]}>
      <ExtendedSeries name="series-1" data={[[1, 0], [2, 1], [3, 2]]} />
      <ExtendedSeries name="series-2" data={[[1, 0], [2, 1], [3, 2]]} />
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

  t.end();
});

test('XYPlot dontCheckIfEmpty - Showcase example EmptyChart', t => {
  const $ = mount(<EmptyChart />);
  t.equal($.find('.rv-xy-plot__series').length, 0, 'should find no series');
  t.equal(
    $.text(),
    '1!1.5!2!3!Empty Chart Right Here',
    'should find the correct text'
  );
  t.end();
});

test('XYPlot attach ref only to series components', t => {
  const Stateless = () => {
    return <div>stateless</div>;
  };
  const $ = mount(
    <XYPlot width={300} height={300}>
      <HorizontalGridLines />
      <XAxis />
      <LineSeries
        data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
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
  t.ok(
    horizontalGridLinesChild.ref === null,
    'Ref not attached to non series components'
  );
  t.ok(axisChild.ref === null, 'Ref not attached to axis');
  t.ok(
    typeof lineSeriesChild.ref === 'function',
    'Ref attached to series components'
  );
  t.ok(statelessChild.ref === null, 'Ref not attached to stateless components');
  t.end();
});
