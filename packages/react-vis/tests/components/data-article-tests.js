import React from 'react';
import {mount} from 'enzyme';

import {MiniCharts} from '../../../showcase/data/mini-data-examples';

test('Scales and data examples: MiniCharts', () => {
  const $ = mount(<MiniCharts />);
  expect($.find('.rv-xy-plot').length).toBe(3);
});
