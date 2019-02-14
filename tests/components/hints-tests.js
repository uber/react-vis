import test from 'tape';
import React from 'react';
import {shallow} from 'enzyme';
import Hint from 'plot/hint';

test('Hint', t => {
  const wrapper = shallow(
    <Hint
      x={0}
      y={0}
      value={{test: 123}}
      className='test-class-name'
    />
  );

  t.equal(
    wrapper.hasClass('test-class-name'),
    true,
    'should find className passed as prop'
  );
  t.end();
});
