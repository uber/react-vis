import React from 'react';
import {mount} from 'enzyme';
import LabelSeries from 'plot/series/label-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import LabelSeriesExample from '../../../showcase/misc/label-series-example';
import LabeledStackedVerticalBarChart from '../../../showcase/plot/labeled-stacked-vertical-bar-chart';

testRenderWithProps(LabelSeries, GENERIC_XYPLOT_SERIES_PROPS, true);

describe('LabelSeries', () => {
  test('Showcase Example - LabelSeriesExample', () => {
    const $ = mount(
      <svg>
        <LabelSeriesExample />
      </svg>
    );
    expect($.text()).toBe(
      'UPDATE-101234505101520WigglytuffPsyduckGeodudeDittoSnorlax'
    );
    expect($.find('.rv-xy-plot__series--label text').length).toBe(5);

    $.find('.showcase-button').simulate('click');
    expect($.text()).toBe(
      'UPDATE-101234505101520WigglytuffPsyduckGeoduderedblue'
    );
    $.find('.showcase-button').simulate('click');
    expect($.text()).toBe(
      'UPDATE-101234505101520WigglytuffPsyduckGeoduderedblue'
    );
  });

  test('Showcase Example - LabeledStackedVerticalBarChart', () => {
    const $ = mount(
      <svg>
        <LabeledStackedVerticalBarChart />
      </svg>
    );
    expect($.find('.rv-xy-plot__series--label text').length).toBe(9);
  });
});
