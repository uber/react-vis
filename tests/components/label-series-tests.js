import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import LabelSeries from 'plot/series/label-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import LabelSeriesExample from '../../showcase/misc/label-series-example';

testRenderWithProps(LabelSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('LabelSeries: Showcase Example - LabelSeriesExample', t => {
  const $ = mount(<LabelSeriesExample />);
  t.equal($.text(), 'UPDATE-101234505101520WigglytuffPsyduckGeodudeDittoSnorlax', 'should find the right text content');
  t.equal($.find('.rv-xy-plot__series--label text').length, 5, 'should find the right number of text boxes');

  $.find('.showcase-button').simulate('click');
  t.equal($.text(), 'UPDATE-101234505101520WigglytuffPsyduckGeoduderedblue', 'should find the right text content');
  $.find('.showcase-button').simulate('click');
  t.equal($.text(), 'UPDATE-101234505101520WigglytuffPsyduckGeoduderedblue', 'should find the right text content');
  t.end();
});
