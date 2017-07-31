import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import HistoryExample from '../../showcase/examples/history/history-example';

test('Showcase Examples: HistoryExample', t => {
  const $ = mount(<HistoryExample />);
  t.equal($.find('.rv-xy-plot__series.rv-xy-plot__series--linemark').length, 58, 'should find the right number of lines');

  t.end();
});
