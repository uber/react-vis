import React from 'react';
import {mount} from 'enzyme';
import Voronoi from '../../src/plot/voronoi.js';
import XYPlot from '~/plot/xy-plot';

import VoronoiLineChart from '../../../showcase/misc/voronoi-line-chart';

const StatelessVoronoiWrapper = () => (
  <XYPlot
    height={300}
    width={300}
    dontCheckIfEmpty
    xDomain={[-50, 250]}
    yDomain={[-50, 250]}
  >
    <Voronoi
      extent={[
        [0, 0],
        [200, 200]
      ]}
      nodes={Array(100)
        .fill()
        .map((e, x) => ({
          x,
          y: 10,
          className: `my-class-${x}`,
          style: {color: 'red'}
        }))}
    />
  </XYPlot>
);

describe('Voronoi', () => {
  test('Basic Chart', () => {
    const $ = mount(<StatelessVoronoiWrapper />);

    expect(
      $.find('.rv-voronoi__cell')
        .at(30)
        .prop('style').color
    ).toBe('red');
    expect(
      $.find('.rv-voronoi__cell')
        .at(30)
        .hasClass('my-class-30')
    ).toBe(true);
    expect(
      $.find('.rv-voronoi__cell')
        .at(50)
        .hasClass('my-class-50')
    ).toBe(true);
  });

  test('VoronoiLineChart', () => {
    const $ = mount(<VoronoiLineChart />);

    expect($.text()).toBe(
      'Show Voronoi1.01.52.02.53.03.54.0X Axis2468101214Y Axis'
    );
    expect($.find('.rv-voronoi__cell').length).toBe(12);
    expect($.find('.rv-xy-plot__series--line').length).toBe(3);
    expect($.find('circle').length).toBe(0);

    $.find('input').simulate('click');
    $.find('.rv-voronoi__cell')
      .at(0)
      .simulate('mouseOver');

    expect($.find('circle').length).toBe(1);

    $.find('.rv-voronoi__cell')
      .at(0)
      .simulate('mouseOut');

    expect($.find('circle').length).toBe(0);
  });
});
