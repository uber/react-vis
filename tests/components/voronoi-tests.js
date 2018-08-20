import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Voronoi from '../../src/plot/voronoi.js';
import XYPlot from 'plot/xy-plot';

import VoronoiLineChart from '../../showcase/misc/voronoi-line-chart';

const StatelessVoronoiWrapper = () => (
  <XYPlot
  height={300}
  width={300}
  dontCheckIfEmpty
  xDomain={[-50, 250]}
  yDomain={[-50, 250]}>
    <Voronoi
    extent={[[0, 0], [200, 200]]}
    nodes={Array(100).fill().map((e, x) => ({
      x,
      y: 10,
      className: `my-class-${x}`,
      style: {color: 'red'}
    }))}
    />
  </XYPlot>
);

test('Voronoi: Basic Chart', t => {
  const $ = mount(<StatelessVoronoiWrapper/>);

  t.equal($.find('.rv-voronoi__cell').at(30).prop('style').color, 'red', 'should apply inline styles');
  t.equal($.find('.rv-voronoi__cell').at(30).hasClass('my-class-30'), true, 'should apply css class');
  t.equal($.find('.rv-voronoi__cell').at(50).hasClass('my-class-50'), true, 'should apply css class');

  t.end();
});

test('Voronoi: Showcase Example - VoronoiLineChart', t => {
  const $ = mount(<VoronoiLineChart/>);

  t.equal($.text(), 'Show Voronoi1.01.52.02.53.03.54.0X Axis2468101214Y Axis', 'should find the correct text');
  t.equal($.find('.rv-voronoi__cell').length, 12, 'should find the right number of voronoi cells');
  t.equal($.find('.rv-xy-plot__series--line').length, 3, 'should find the right number of line series');
  t.equal($.find('circle').length, 0, 'should initially find no scatterplot dots');

  $.find('input').simulate('click');
  $.find('.rv-voronoi__cell').at(0).simulate('mouseOver');

  t.equal($.find('circle').length, 1, 'should now find a single hover dot');

  $.find('.rv-voronoi__cell').at(0).simulate('mouseOut');

  t.equal($.find('circle').length, 0, 'after mouse out should find no hover dots');

  t.end();
});

