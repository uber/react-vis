import React from 'react';
import {mount} from 'enzyme';
import ContinuousSizeLegend from '../../../showcase/legends/continuous-size';
import ContinuousColorLegend from '../../../showcase/legends/continuous-color';

import HorizontalDiscreteLegend from '../../../showcase/legends/horizontal-discrete-color';
import VerticalDiscreteLegend from '../../../showcase/legends/vertical-discrete-color';
import SearchableDiscreteLegend from '../../../showcase/legends/searchable-discrete-color';
import SearchableDiscreteColorLegendHoverExample from '../../../showcase/legends/searchable-discrete-color-hover';
import HorizontalDiscreteCustomPalette from '../../../showcase/legends/horizontal-discrete-custom-palette';
import ClusteredStackedVerticalBarChart from '../../../showcase/plot/clustered-stacked-bar-chart';

test('Discrete Legend has no clickable className while onItemClick is not passing', () => {
  const withOnClick$ = mount(<VerticalDiscreteLegend />);
  const withoutOnClick$ = mount(<SearchableDiscreteLegend />);

  expect(
    withOnClick$
      .find('.rv-discrete-color-legend-item.vertical')
      .first()
      .props().onClick
  ).toBe(null);
  expect(
    withoutOnClick$
      .find('.rv-discrete-color-legend-item.vertical.clickable')
      .first()
      .props().onClick
  ).not.toBe(Function);
});

test('Continuous Size Legend', () => {
  const $ = mount(<ContinuousSizeLegend />);
  expect($.text()).toBe('          100200');
  expect($.find('.rv-bubble').length).toBe(10);
});

test('Continuous Color Legend', () => {
  const $ = mount(<ContinuousColorLegend />);
  expect($.text()).toBe('100200150');
  const expectedStyle = {
    background: 'linear-gradient(to right, #EF5D28,#FF9833)'
  };
  expect($.find('.rv-gradient').props().style).toEqual(expectedStyle);
});

test('Discrete Legends', () => {
  const verticalLegend = mount(<VerticalDiscreteLegend />);
  expect(verticalLegend.text()).toBe(
    'OptionsButtonsSelect boxesDate inputsPassword inputsFormsOther'
  );
  expect(
    verticalLegend.find('.rv-discrete-color-legend-item__color').length
  ).toBe(7);

  expect(
    verticalLegend
      .find('.rv-discrete-color-legend-item__color__path')
      .first()
      .props().style
  ).toEqual({stroke: '#12939A'});

  expect(
    mount(<HorizontalDiscreteCustomPalette />)
      .find('.rv-discrete-color-legend-item__color__path')
      .first()
      .props().style
  ).toEqual({stroke: '#6588cd'});

  const $ = mount(<SearchableDiscreteLegend />);
  expect($.text()).toBe(
    'ApplesBananasBlueberriesCarrotsEggplantsLimesPotatoes'
  );
  expect($.find('.rv-discrete-color-legend-item__color').length).toBe(7);
  expect(
    mount(<HorizontalDiscreteLegend />)
      .find('.rv-discrete-color-legend-item__color__path')
      .first()
      .props().style
  ).toEqual({strokeDasharray: '6, 2', stroke: '#45aeb1'});
  expect(
    mount(<HorizontalDiscreteLegend />)
      .find('.rv-discrete-color-legend-item__color__path')
      .at(4)
      .props().style
  ).toEqual({strokeWidth: 13, stroke: 'url(#stripes)'});
  $.find('.rv-search-wrapper__form__input').simulate('change', {
    target: {value: 'egg'}
  });
  expect($.text()).toBe('Eggplants');
  const itemsFound = $.find('.rv-discrete-color-legend-item__color').length;
  expect(itemsFound).toBe(1);

  expect($.find('.disabled').length).toBe(0);
  $.find('.clickable').simulate('click');
  expect($.find('.disabled').length).toBe(1);

  expect(
    mount(<ClusteredStackedVerticalBarChart />)
      .find('.rv-discrete-color-legend')
      .first()
      .props().style
  ).toEqual({
    width: undefined,
    height: undefined,
    position: 'absolute',
    left: '50px',
    top: '10px'
  });
});

test('Discrete Legends Showcase: HorizontalDiscreteCustomPalette', () => {
  const $ = mount(<HorizontalDiscreteCustomPalette />);
  const colors = $.find('.rv-discrete-color-legend-item__color__path')
    .map(colorBrick => {
      return colorBrick.props().style.stroke;
    })
    .join(' ');

  expect(colors).toBe(
    '#6588cd #66b046 #a361c7 #ad953f #c75a87 #55a47b #cb6141'
  );
  expect($.text()).toBe(
    'OptionsButtonsSelect boxesDate inputsPassword inputsFormsOther'
  );

  $.find('.rv-discrete-color-legend-item')
    .first()
    .simulate('mouseEnter');
  expect($.text()).toBe(
    'OptionsSELECTEDButtonsSelect boxesDate inputsPassword inputsFormsOther'
  );
});

test('Discrete Legends Showcase: SearchableDiscreteLegendHover', () => {
  const $ = mount(<SearchableDiscreteColorLegendHoverExample />);
  $.find('.rv-discrete-color-legend-item')
    .first()
    .simulate('mouseEnter');
  expect($.text()).toBe(
    'Apples:SELECTEDBananasBlueberriesCarrotsEggplantsLimesPotatoes'
  );
});
