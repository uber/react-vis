import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import HorizontalBarSeries from 'plot/series/horizontal-bar-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import StackedHorizontalBarChart from '../../showcase/plot/stacked-horizontal-bar-chart';
import StackedVerticalBarChart from '../../showcase/plot/stacked-vertical-bar-chart';
import BarChart from '../../showcase/plot/bar-chart';
import BigBaseBarChart from '../../showcase/plot/big-base-bar-chart';
import ClusteredStackedVerticalBarChart from '../../showcase/plot/clustered-stacked-bar-chart';
import DifferenceChart from '../../showcase/plot/difference-chart';

testRenderWithProps(HorizontalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('BarSeries: Showcase Example - BarChart', t => {
  const $ = mount(<BarChart />);
  t.equal(
    $.text(),
    'TOGGLE TO CANVASABC02468101214ABC',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    6,
    'should find the right number of bars'
  );
  t.equal(
    $.find('.vertical-bar-series-example').length,
    1,
    'should find the right number of custom named series'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    0,
    'should now find no rects'
  );
  t.equal(
    $.find('.rv-xy-canvas canvas').length,
    1,
    'should now find one canvas'
  );

  // TODO CONFIGURE BETTER TESTING SYSTEM FOR CANVAS
  // const canvas = $.find('.rv-xy-canvas canvas');
  // t.equal(
  //   canvas && canvas.node.toDataURL(),
  //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAABmJLR0QA/wD/AP+gvaeTAAAEa0lEQVR4nO3cwYpWZQDH4fd8jjppTeJCpExoU0HrFOoS2rePoCBw0a5uwNoLgQTRTbTpBgy8i1JoVYsIQ3PeNk1CzJQYfcfp9zzbd/Pf/M55N+csA46R8zdufjnG8u7aOx6Zd3+89sGltVf8k83aA4D/ntAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHgJ21BzyOj7/97sPNXC6sveNPm+X29auXvl57BjyuYxH6MjefzDEvrb3jwNwfX40xhM6x4eoOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQci+/R4Wn0/Okz4+1Xrl587tad79fe8off5v7+O5+9dfn2Xw+EDk9os9mM3ZMnN+Op+SnK8vPYLGcPO3F1h39hzrn2hEeW+fCoI6FDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQc+pnqCzdvnvn1wfLytsccZX8+PLlZPJPgSR0a+v37mytzzG+WMe5te9Bh7j24v3f21O7aM+DYOvLHE8tYfhljntvmmKPMMeYYY1l7BxxX7sMQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BCws/aAgvM3vrg9xry49o4Dc4xPf7r2/udr72B7hL4Fy5ivzTGeXXvHgWXMC2tvYLtc3SFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUPAztoD2K7XL1weV1589aNTt+68t/aWMcZY5vzh+psvvbH2jv87occ8s3N6nDqxszfG3Ft7yxhjjGWcW3tCgas7BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQcGToy5i72xzyd5ZlWXsCHOrE5il6V85xZLO/A/PwTf3wSEVKAAAAAElFTkSuQmCC',
  //   'should get the correct serialized image'
  // );

  t.end();
});

test('BarSeries: Showcase Example - StackedHorizontalBarChart & StackedVerticalBarChart', t => {
  [StackedHorizontalBarChart, StackedVerticalBarChart].forEach(
    (Component, i) => {
      const $ = mount(<Component />);
      const textContent = ['0510152025', '12345'];
      const expectedContent = `TOGGLE TO CANVAS${(i === 1
        ? textContent.reverse()
        : textContent
      ).join('')}`;
      t.equal($.text(), expectedContent, 'should fine the right text content');
      t.equal(
        $.find('.rv-xy-plot__series--bar rect').length,
        6,
        'should find the right number of bars'
      );
      $.find('.showcase-button').simulate('click');
      t.equal(
        $.find('.rv-xy-plot__series--bar rect').length,
        0,
        'should now find no rects'
      );
      t.equal(
        $.find('.rv-xy-canvas canvas').length,
        1,
        'should now find one canvas'
      );
    }
  );
  t.end();
});

test('BarSeries: Ordinal Y-Axis HorizontalBarSeries', t => {
  const $ = mount(
    <XYPlot width={300} height={300} yType="ordinal">
      <HorizontalBarSeries
        data={[{y: 'a', x: 10}, {y: 'b', x: 5}, {y: 'c', x: 15}]}
      />
    </XYPlot>
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    3,
    'should find the right number of bars'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect')
      .at(0)
      .prop('height') > 0,
    true,
    'should not have negative bar height'
  );
  t.end();
});

test('BarSeries: No data', t => {
  const $ = mount(
    <XYPlot width={300} height={300} yType="ordinal">
      <HorizontalBarSeries data={null} />
    </XYPlot>
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    0,
    'should find the right number of bars'
  );
  t.end();
});

test('BarSeries: Showcase Example - ClusteredStackedVerticalBarChart', t => {
  const $ = mount(<ClusteredStackedVerticalBarChart />);
  t.equal(
    $.text(),
    'TOGGLE TO CANVASQ1Q2Q3Q40102030ApplesOranges',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    16,
    'should find the right number of bars'
  );
  t.equal(
    $.find('.rv-xy-plot__series').length,
    4,
    'should find the right number of series'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    0,
    'should now find no rects'
  );
  t.equal(
    $.find('.rv-xy-canvas canvas').length,
    1,
    'should now find one canvas'
  );
  t.end();
});

test('BarSeries: Showcase Example - BigBaseBarChart', t => {
  const $ = mount(<BigBaseBarChart />);
  t.equal(
    $.text(),
    'TOGGLE TO CANVAS:38:39:40:41199,800199,900200,000200,100200,200200,300200,400',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    15,
    'should find the right number of bars'
  );
  t.equal(
    $.find('.rv-xy-plot__series').length,
    1,
    'should find the right number of series'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    0,
    'should now find no rects'
  );
  t.equal(
    $.find('.rv-xy-canvas canvas').length,
    1,
    'should now find one canvas'
  );
  t.end();
});

test('BarSeries: Showcase Example - DifferenceChart', t => {
  const $ = mount(<DifferenceChart />);
  t.equal(
    $.text(),
    'TOGGLE TO CANVAS02468101214-4-20246810',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    15,
    'should find the right number of bars'
  );
  t.equal(
    $.find('.rv-xy-plot__series').length,
    1,
    'should find the right number of series'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    0,
    'should now find no rects'
  );
  t.equal(
    $.find('.rv-xy-canvas canvas').length,
    1,
    'should now find one canvas'
  );
  t.end();
});
