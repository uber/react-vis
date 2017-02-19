import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

export const testRenderWithProps = (Component, props) =>
  test(`Rendering ${Component.displayName}`, assert => {
    const wrapper = mount(<Component {...props} />);
    const wrapperProps = wrapper.props();
    assert.ok(
      wrapper.find(Component).length,
      `${Component.displayName} is rendered`
    );
    Object.keys(props).forEach(propName => {
      assert.ok(
        wrapperProps[propName] === props[propName],
        `${propName} is set`);
    });
    assert.end();
  });
