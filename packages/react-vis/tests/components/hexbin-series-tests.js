import React from 'react';
import {mount} from 'enzyme';
import HexbinSeries from 'plot/series/hexbin-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import HexHeatmap from '../../../showcase/plot/hex-heatmap';
import HexbinSizeExample from '../../../showcase/plot/hexbin-size-example';

testRenderWithProps(HexbinSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('HexbinSeries: Showcase Example - HexHeatmap', () => {
  const $ = mount(<HexHeatmap />);
  expect($.find('.rv-xy-plot__series--hexbin').length).toBe(1);
  expect($.find('.rv-xy-plot__series--hexbin path').length).toBe(53);
  expect($.find('g.hexbin-example').length).toBe(1);
  expect($.text()).toBe(
    '4050607080901002345678UPDATE DATAUPDATE RADIUSUPDATE OFFSET'
  );

  $.find('.rv-xy-plot__series--hexbin path')
    .at(2)
    .simulate('mouseOver');
  expect($.text()).toBe(
    '4050607080901002345678x: 138.56406460551017y: 180value: 1UPDATE DATAUPDATE RADIUSUPDATE OFFSET'
  );
});

test('HexbinSeries: Showcase Example - HexbinSizeExample', () => {
  const $ = mount(<HexbinSizeExample />);
  expect($.find('g.alt-x-label').length).toBe(1);
  expect($.find('g.alt-y-label').length).toBe(1);
  [
    {
      numHexes: 56,
      text:
        'PREV X X AXIS economy (mpg) NEXT XPREV Y Y AXIS power (hp) NEXT Y051015202530354045050100150200economy (mpg)power (hp)',
      buttonToPress: null
    },

    // click next x
    {
      numHexes: 56,
      text:
        'PREV X X AXIS cylinders NEXT XPREV Y Y AXIS power (hp) NEXT Y3.03.54.04.55.05.56.06.57.07.58.0050100150200cylinderspower (hp)',
      buttonToPress: 1
    },

    // click next y
    {
      numHexes: 20,
      text:
        'PREV X X AXIS cylinders NEXT XPREV Y Y AXIS weight (lb) NEXT Y3.03.54.04.55.05.56.06.57.07.58.02,0002,5003,0003,5004,0004,5005,000cylindersweight (lb)',
      buttonToPress: 3
    },

    // click prev y
    {
      numHexes: 20,
      text:
        'PREV X X AXIS cylinders NEXT XPREV Y Y AXIS weight (lb) NEXT Y3.03.54.04.55.05.56.06.57.07.58.02,0002,5003,0003,5004,0004,5005,000cylindersweight (lb)',
      buttonToPress: 0
    }
  ].forEach(({numHexes, text, buttonToPress}) => {
    if (buttonToPress) {
      $.find('.showcase-button')
        .at(buttonToPress)
        .simulate('click');
    }
    expect($.find('.rv-xy-plot__series--hexbin').length).toBe(1);
    expect($.find('.rv-xy-plot__series--hexbin path').length).toBe(numHexes);
    expect($.find('g.hexbin-size-example').length).toBe(1);
    expect($.text()).toBe(text);
  });
});
