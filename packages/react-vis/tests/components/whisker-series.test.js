import React from 'react';
import {mount} from 'enzyme';
import WhiskerSeries from '~/plot/series/whisker-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import WhiskerChart from '../../../showcase/plot/whisker-chart';

testRenderWithProps(WhiskerSeries, GENERIC_XYPLOT_SERIES_PROPS, true);

describe('WhiskerSeries', () => {
  test('Showcase Example - Whisker Scatterplot', () => {
    const $ = mount(
      <svg>
        <WhiskerChart />
      </svg>
    );
    expect($.text()).toBe('1.01.52.02.53.068101214');
    expect($.find('g.whisker-series-example').length).toBe(1);
    // 8 lines each per 5 (double) whiskers
    expect($.find('.rv-xy-plot__series--whisker line').length).toBe(40);
  });
});
