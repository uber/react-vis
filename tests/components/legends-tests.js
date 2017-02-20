import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ContinuousSizeLegend from '../../showcase/legends/continuous-size';
import ContinuousColorLegend from '../../showcase/legends/continuous-color';

import HorizontalDiscreteLegend from '../../showcase/legends/horizontal-discrete-color';
import VerticalDiscreteLegend from '../../showcase/legends/vertical-discrete-color';
import SearchableDiscreteLegend from '../../showcase/legends/searchable-discrete-color';

test('Continuous Size Legend', t => {
  const $ = mount(<ContinuousSizeLegend/>);
  t.equal($.text(), '          100200', 'should find the correct text content');
  t.equal($.find('.rv-bubble').length, 10, 'should find the right number of bubbles');

  t.end();
});

test('Continuous Color Legend', t => {
  const $ = mount(<ContinuousColorLegend/>);
  t.equal($.text(), '100200150', 'should find the correct text content');
  const expectedStyle = {background: 'linear-gradient(to right, #EF5D28,#FF9833)'};
  t.deepEqual($.find('.rv-gradient').props().style, expectedStyle, 'should find the correct styling');
  t.end();
});

test('Discerete Legends', t => {
  [HorizontalDiscreteLegend, VerticalDiscreteLegend].forEach(Component => {
    const $ = mount(<Component/>);
    t.equal($.text(), 'OptionsButtonsSelect boxesDate inputsPassword inputsFormsOther',
    'should find the correct text content');
    t.equal($.find('.rv-discrete-color-legend-item__color').length, 7,
    'should find the right number of elements');
  });

  const $ = mount(<SearchableDiscreteLegend/>);
  t.equal($.text(), 'ApplesBananasBlueberriesCarrotsEggplantsLimesPotatoes',
  'should find the correct text content for the searchable legend');
  t.equal($.find('.rv-discrete-color-legend-item__color').length, 7,
  'should find the right number of element for the searchable legends');
  $.find('.rv-search-wrapper__form__input').simulate('change', {target: {value: 'egg'}});
  t.equal($.text(), 'Eggplants', 'should find the correct text content after search');
  const itemsFound = $.find('.rv-discrete-color-legend-item__color').length;
  t.equal(itemsFound, 1, 'should find the right number of elements for the searchable legend after searched');

  t.equal($.find('.disabled').length, 0, 'before clicking, should find no items disabled');
  $.find('.clickable').simulate('click');
  t.equal($.find('.disabled').length, 1, 'before clicking, should find no items disabled');

  t.end();
});
