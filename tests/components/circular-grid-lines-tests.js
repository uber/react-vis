import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import CircularGridLines from 'plot/circular-grid-lines';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import FauxRadialScatterplot from '../../showcase/plot/faux-radial-scatterplot';

testRenderWithProps(CircularGridLines, GENERIC_XYPLOT_SERIES_PROPS);

test('CircularGridLines: Showcase Example - FauxRadialScatterplot', t => {
  const $ = mount(<FauxRadialScatterplot />);
  t.equal(
    $.text(),
    '-3-2-10123-3-2-10123',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__circular-grid-lines__line').length,
    7,
    'should find the right number of circles'
  );
  t.end();
});
