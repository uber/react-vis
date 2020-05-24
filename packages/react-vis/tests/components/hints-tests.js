import test from 'tape';
import React from 'react';
import {shallow} from 'enzyme';
import Hint from 'plot/hint';

test('Hint: Appends user-input class name to the class signatures list', t => {
  const wrapper = shallow(
    <Hint x={0} y={0} value={{test: 123}} className="test-class-name" />
  );

  t.equal(
    wrapper.hasClass('test-class-name'),
    true,
    'should find className passed as prop'
  );
  t.end();
});

test('Hint: Assigns only default class names when no custom class specified', t => {
  const wrapper = shallow(<Hint x={0} y={0} value={{test: 123}} />);

  t.equal(
    wrapper.hasClass('undefined'),
    false,
    'should not add any class names when no specified in prop'
  );
  t.end();
});
