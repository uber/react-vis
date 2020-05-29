import React from 'react';
import {shallow} from 'enzyme';
import Hint from 'plot/hint';

describe('Hint', () => {
  test('Appends user-input class name to the class signatures list', () => {
    const wrapper = shallow(
      <Hint x={0} y={0} value={{test: 123}} className="test-class-name" />
    );

    expect(wrapper.hasClass('test-class-name')).toBe(true);
  });

  test('Assigns only default class names when no custom class specified', () => {
    const wrapper = shallow(<Hint x={0} y={0} value={{test: 123}} />);

    expect(wrapper.hasClass('undefined')).toBe(false);
  });
});
