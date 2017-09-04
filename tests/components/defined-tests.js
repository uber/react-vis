import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import NullData from '../../showcase/misc/null-data-example';

test('Defined prop: Showcase Example - Null Data Example', t => {
  const $ = mount(<NullData />);
  t.equal($.find('.rv-xy-plot__series path').length, 2, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--mark circle').length, 3, 'should find the right number of circles');
  t.end();
});
