import React from 'react';

import {mount} from 'enzyme';
import ZoomHandler from '../../src/plot/zoom-handler';
import XYPlot from '../../src/plot/xy-plot';

describe('zoom-handler', () => {
  it('should zoom', () => {
    const onZoom = jest.fn();
    const wrapper = mount(
      <XYPlot
        width={300}
        height={300}
        dontCheckIfEmpty={true}
        xDomain={[0, 20]}
        yDomain={[0, 20]}
      >
        <ZoomHandler onZoom={onZoom} />
      </XYPlot>
    );

    const svg = wrapper.find('svg');
    svg.simulate('mousedown', mouseEvent(100, 100));
    svg.simulate('mouseMove', mouseEvent(150, 150));
    svg.simulate('mouseUp', mouseEvent(150, 150));

    expect(onZoom).toBeCalledWith({
      left: 4.8,
      top: 12,
      right: 8.8,
      bottom: 8
    });
  });

  it('should render selection', () => {
    const onZoom = jest.fn();
    const wrapper = mount(
      <XYPlot
        width={300}
        height={300}
        dontCheckIfEmpty={true}
        xDomain={[0, 20]}
        yDomain={[0, 20]}
      >
        <ZoomHandler onZoom={onZoom} />
      </XYPlot>
    );

    const svg = wrapper.find('svg');
    svg.simulate('mousedown', mouseEvent(100, 100));
    svg.simulate('mouseMove', mouseEvent(150, 150));

    const selection = wrapper.find('rect');

    expect(selection.props()).toMatchObject({
      x: 100,
      y: 100,
      width: 50,
      height: 50
    });
  });

  it('should clear selection if plot mouseleave', () => {
    const onZoom = jest.fn();
    const wrapper = mount(
      <XYPlot
        width={300}
        height={300}
        dontCheckIfEmpty={true}
        xDomain={[0, 20]}
        yDomain={[0, 20]}
      >
        <ZoomHandler onZoom={onZoom} />
      </XYPlot>
    );

    const svg = wrapper.find('svg');
    svg.simulate('mousedown', mouseEvent(100, 100));
    svg.simulate('mousemove', mouseEvent(150, 150));

    expect(wrapper.find('rect')).toHaveLength(1);

    svg.simulate('mouseleave');
    expect(wrapper.find('rect')).toHaveLength(0);
    expect(onZoom).not.toBeCalled();
  });
});

function mouseEvent(x, y) {
  return {nativeEvent: {offsetX: x, offsetY: y}};
}
