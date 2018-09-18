import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ContourSeries from 'plot/series/contour-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import ContourSeriesExample from '../../showcase/plot/contour-series-example';

testRenderWithProps(ContourSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('ContourSeries: Showcase Example - ContourSeriesExample', t => {
  const $ = mount(<ContourSeriesExample />);
  t.equal(
    $.text(),
    '4045505560657075808590951002345678UPDATE',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--contour').length,
    1,
    'should find the right number of contour groups'
  );
  t.equal(
    $.find('.rv-xy-plot__series--contour-line').length,
    28,
    'with the right number of contour lines'
  );
  t.end();
});
