import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Borders from 'plot/borders';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import GradientExample from '../../showcase/misc/gradient-example';

testRenderWithProps(Borders, GENERIC_XYPLOT_SERIES_PROPS);

test('Borders: GradientExample', t => {
  const $ = mount(<GradientExample />);
  t.equal($.find('.rv-xy-plot__borders').length, 1, 'should find the right number of borders containers');
  t.equal($.find('.rv-xy-plot__borders rect').length, 4, 'should find the right number of borders');
  t.end();
});
