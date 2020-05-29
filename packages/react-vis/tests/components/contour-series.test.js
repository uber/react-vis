import React from 'react';
import {mount} from 'enzyme';
import ContourSeries from 'plot/series/contour-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import ContourSeriesExample from '../../../showcase/plot/contour-series-example';

describe('ContourSeries', () => {
  testRenderWithProps(ContourSeries, GENERIC_XYPLOT_SERIES_PROPS);

  test('Showcase Example - ContourSeriesExample', () => {
    const $ = mount(<ContourSeriesExample />);
    expect($.text()).toBe('4045505560657075808590951002345678UPDATE');
    expect($.find('.rv-xy-plot__series--contour').length).toBe(1);
    expect($.find('.rv-xy-plot__series--contour-line').length).toBe(28);
  });
});
