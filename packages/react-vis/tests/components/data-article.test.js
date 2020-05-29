import React from 'react';
import {mount} from 'enzyme';

import {MiniCharts} from '../../../showcase/data/mini-data-examples';

describe('Scales and data examples', () => {
  test('MiniCharts', () => {
    const $ = mount(<MiniCharts />);
    expect($.find('.rv-xy-plot').length).toBe(3);
  });
});
