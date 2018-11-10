import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import {MiniCharts} from '../../showcase/data/mini-data-examples';

test('Scales and data examples: MiniCharts', t => {
  const $ = mount(<MiniCharts />);
  t.equal($.find('.rv-xy-plot').length, 3, '3 XYPlot in this example');
  t.end();
});
