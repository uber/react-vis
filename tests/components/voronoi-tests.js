import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Voronoi from '../../src/plot/voronoi.js';

test('Voronoi: ', t => {
  const $ = mount(<Voronoi
    extent={[[0, 0], [200, 200]]}
    nodes={Array(100).fill().map((e, x) => ({
      x,
      y: 10,
      className: `my-class-${x}`,
      style: {color: 'red'}
    }))}
  />);

  t.equal($.find('.rv-voronoi__cell').at(30).prop('style').color, 'red', 'should apply inline styles');
  t.equal($.find('.rv-voronoi__cell').at(30).hasClass('my-class-30'), true, 'should apply css class');
  t.equal($.find('.rv-voronoi__cell').at(50).hasClass('my-class-50'), true, 'should apply css class');

  t.end();
});

