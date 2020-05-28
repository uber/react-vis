import React from 'react';
import {mount} from 'enzyme';
import PolygonSeries from 'plot/series/mark-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import TriangleExample from '../../../showcase/misc/triangle-example';

describe('PolygonSeries', () => {
  testRenderWithProps(PolygonSeries, GENERIC_XYPLOT_SERIES_PROPS);

  test('Showcase Example - Triangle Example', () => {
    const $ = mount(<TriangleExample />);
    expect($.text()).toBe('024681012024681012');
    expect($.find('.rv-xy-plot__series--polygon').length).toBe(121);
  });
});
