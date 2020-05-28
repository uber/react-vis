import React from 'react';
import {mount} from 'enzyme';
import ArcSeries from 'plot/series/arc-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import ArcSeriesExample from '../../../showcase/radial-chart/arc-series-example';

testRenderWithProps(ArcSeries, GENERIC_XYPLOT_SERIES_PROPS);

describe('ArcSeries', () => {
  test('Showcase Example - ArcSeriesExample', () => {
    const $ = mount(<ArcSeriesExample />);
    expect($.text()).toBe('UPDATE-4-2024-4-2024');
    // multiplied by two to account for shadow listeners
    expect($.find('.rv-xy-plot__series--arc').length).toBe(4);
    expect($.find('.rv-xy-plot__series--arc path').length).toBe(2 * 8);
  });
});
