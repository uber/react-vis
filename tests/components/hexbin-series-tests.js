import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import HexbinSeries from 'plot/series/hexbin-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import HexHeatmap from '../../showcase/plot/hex-heatmap';
import HexbinSizeExample from '../../showcase/plot/hexbin-size-example';

testRenderWithProps(HexbinSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('HexbinSeries: Showcase Example - HexHeatmap', t => {
  const $ = mount(<HexHeatmap />);
  t.equal(
    $.find('.rv-xy-plot__series--hexbin').length,
    1,
    'should find the right number of series'
  );
  t.equal(
    $.find('.rv-xy-plot__series--hexbin path').length,
    53,
    'should find the right number of hexes'
  );
  t.equal(
    $.find('.hexbin-example').length,
    1,
    'should find the correct custom class name'
  );
  t.equal(
    $.text(),
    '4050607080901002345678UPDATE DATAUPDATE RADIUSUPDATE OFFSET',
    'should find the correct text'
  );

  $.find('.rv-xy-plot__series--hexbin path')
    .at(2)
    .simulate('mouseOver');
  t.equal(
    $.text(),
    '4050607080901002345678x: 138.56406460551017y: 180value: 1UPDATE DATAUPDATE RADIUSUPDATE OFFSET',
    'should find the correct text'
  );

  t.end();
});

test('HexbinSeries: Showcase Example - HexbinSizeExample', t => {
  const $ = mount(<HexbinSizeExample />);
  t.equal($.find('.alt-x-label').length, 1, 'should find custom x class on chart label correctly');
  t.equal($.find('.alt-y-label').length, 1, 'should find custom y class on chart label correctly');
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
    t.equal(
      $.find('.rv-xy-plot__series--hexbin').length,
      1,
      'should find the right number of series'
    );
    t.equal(
      $.find('.rv-xy-plot__series--hexbin path').length,
      numHexes,
      'should find the right number of hexes'
    );
    t.equal(
      $.find('.hexbin-size-example').length,
      1,
      'should find the correct custom class name'
    );
    t.equal($.text(), text, 'should find the correct text');
  });

  t.end();
});
