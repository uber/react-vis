import React from 'react';
import {mount} from 'enzyme';
import XYPlot from '~/plot/xy-plot';
import LineSeriesCanvas from '~/plot/series/line-series-canvas';

describe('LineSeriesCanvas', () => {
  test('should be rendered', () => {
    const k = 7;

    const $ = mount(
      <XYPlot width={300} height={300}>
        {Array(k)
          .fill(0)
          .map((_, index) => (
            <LineSeriesCanvas
              key={index.toString()}
              color="#12939a"
              data={[
                {x: 1, y: 5},
                {x: 2, y: 20},
                {x: 3, y: 10}
              ]}
            />
          ))}
      </XYPlot>
    );

    expect(
      $.find('CanvasWrapper')
        .children()
        .find('LineSeriesCanvas').length
    ).toBe(k);
  });

  test('on onNearestXY should be called and retur ncorrect values', () => {
    const k = 7;
    expect.assertions(k);

    const $ = mount(
      <XYPlot width={300} height={300}>
        {[...Array(k).keys()].map(v => (
          <LineSeriesCanvas
            key={v}
            color="#12939a"
            data={[
              {x: -50, y: -50},
              {x: v, y: v * v},
              {x: 60, y: 60}
            ]}
            onNearestXY={value => {
              expect({x: v, y: v * v}).toEqual(value);
            }}
          />
        ))}
      </XYPlot>
    );

    $.find('.rv-xy-plot__inner').simulate('mousemove', {
      nativeEvent: {clientX: 150, clientY: 150}
    });
  });
});
