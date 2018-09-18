import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

const NOOP = f => f;

export const GENERIC_XYPLOT_SERIES_PROPS = {
  xDomain: [0, 1],
  xRange: [0, 1],
  xType: 'linear',
  xDistance: 1,
  yDomain: [0, 1],
  yRange: [0, 1],
  yDistance: 1,
  yType: 'linear',
  data: [{x: 1, y: 1}, {x: 2, y: 2}],
  _allData: [[{x: 1, y: 1}, {x: 2, y: 2}]],
  onSeriesMouseOver: NOOP,
  onSeriesMouseOut: NOOP,
  onSeriesClick: NOOP,
  onSeriesRightClick: NOOP,
  onValueMouseOver: NOOP,
  onValueMouseOut: NOOP,
  onValueClick: NOOP,
  onValueRightClick: NOOP
};

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
        `${propName} is set`
      );
    });
    assert.end();
  });
