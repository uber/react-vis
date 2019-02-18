import test from 'tape';
import React from 'react';
import {shallow} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeries from 'plot/series/line-series';
import HorizontalGridLines from 'plot/horizontal-grid-lines';
import VerticalGridLines from 'plot/vertical-grid-lines';

test('GridLines: HorizontalGridLines', t => {
  const wrapper = shallow(
    <XYPlot width={300} height={300} stackBy="y">
      <HorizontalGridLines className='test-class-name' />
      <LineSeries data={[{x: 1, y: 3}]} />
    </XYPlot>
  );

  t.equal(
    wrapper.find(HorizontalGridLines).at(0).hasClass('test-class-name'),
    true,
    'should find className passed as prop'
  );
  t.end();
});

test('GridLines: VerticalGridLines', t => {
  const wrapper = shallow(
    <XYPlot width={300} height={300} stackBy="y">
      <VerticalGridLines className='test-class-name' />
      <LineSeries data={[{x: 1, y: 3}]} />
    </XYPlot>
  );

  t.equal(
    wrapper.find(VerticalGridLines).at(0).hasClass('test-class-name'),
    true,
    'should find className passed as prop'
  );
  t.end();
});
