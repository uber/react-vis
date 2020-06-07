import React from 'react';
import {mount} from 'enzyme';
import CircularGridLines from 'plot/circular-grid-lines';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import FauxRadialScatterplot from '../../../showcase/plot/faux-radial-scatterplot';

describe('CircularGridLines', () => {
  testRenderWithProps(CircularGridLines, GENERIC_XYPLOT_SERIES_PROPS, true);

  test('Showcase Example - FauxRadialScatterplot', () => {
    const $ = mount(<FauxRadialScatterplot />);
    expect($.text()).toBe('-3-2-10123-3-2-10123');
    expect($.find('.rv-xy-plot__circular-grid-lines__line').length).toBe(7);
  });
});
