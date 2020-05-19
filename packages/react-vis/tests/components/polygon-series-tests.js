import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import PolygonSeries from 'plot/series/mark-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import TriangleExample from '../../showcase/misc/triangle-example';

testRenderWithProps(PolygonSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('PolygonSeries: Showcase Example - Triangle Example', t => {
  const $ = mount(<TriangleExample />);
  t.equal($.text(), '024681012024681012', 'should fine the right text content');
  t.equal(
    $.find('.rv-xy-plot__series--polygon').length,
    121,
    'should find the right number of polygons'
  );
  t.end();
});
