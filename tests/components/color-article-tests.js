import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import {
  SensibleDefaults,
  ColorInXYPlot,
  ColorSpecificity,
  CategoryColorAtMarkLevel,
  CategoryColorAtMarkLevelCustomPalette,
  CategoryColorAtMarkLevelFixedStroke,
  GradientCharts,
  LinearColorAtMarkLevel,
  LinearColorAtMarkLevelNoPalette,
  LineSeriesMarkSeries,
  LiteralColorAtMarkLevel,
  CategoryColorAtSeriesLevel,
  LinearColorAtSeriesLevel,
  LiteralColorAtSeriesLevel,
  ReactVis5,
  ReactVis20,
  Continuous,
  CustomPalette
} from '../../showcase/color/mini-color-examples';

test('Color Article Test: #generateCharts', t => {
  [
    {name: 'SensibleDefaults', Item: SensibleDefaults},
    {name: 'ColorInXYPlot', Item: ColorInXYPlot},
    {name: 'LiteralColorAtSeriesLevel', Item: LiteralColorAtSeriesLevel},
    {name: 'LinearColorAtSeriesLevel', Item: LinearColorAtSeriesLevel},
    {name: 'CategoryColorAtSeriesLevel', Item: CategoryColorAtSeriesLevel},
    {name: 'LiteralColorAtMarkLevel', Item: LiteralColorAtMarkLevel},
    {name: 'CategoryColorAtMarkLevel', Item: CategoryColorAtMarkLevel},
    {
      name: 'CategoryColorAtMarkLevelCustomPalette',
      Item: CategoryColorAtMarkLevelCustomPalette
    },
    {
      name: 'CategoryColorAtMarkLevelFixedStroke',
      Item: CategoryColorAtMarkLevelFixedStroke
    },
    {
      name: 'LinearColorAtMarkLevelNoPalette',
      Item: LinearColorAtMarkLevelNoPalette
    },
    {name: 'LinearColorAtMarkLevel', Item: LinearColorAtMarkLevel}
  ].forEach(obj => {
    const {name, Item} = obj;
    const $ = mount(<Item />);
    t.equal(
      $.find('.rv-xy-plot').length,
      3,
      `${name} should find the right number of xy-plots`
    );
    t.equal(
      $.find('.rv-xy-plot__series--bar rect').length,
      30,
      `${name} should find the right number of rects`
    );
    t.equal(
      $.find('path.rv-xy-plot__series--line').length,
      3,
      `${name} should find the right number of paths`
    );
    t.equal(
      $.find('.rv-xy-plot__series--mark circle').length,
      30,
      `${name} should find the right number of circles`
    );
  });
  t.end();
});

test('Color Article Test: GradientCharts', t => {
  const $ = mount(<GradientCharts />);

  t.equal(
    $.find('.rv-xy-plot').length,
    3,
    'should find the right number of xy-plots'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    10,
    'should find the right number of rects'
  );
  t.equal(
    $.find('path.rv-xy-plot__series--line').length,
    1,
    'should find the right number of paths'
  );
  t.equal(
    $.find('.rv-xy-plot__series--mark circle').length,
    10,
    'should find the right number of circles'
  );

  t.end();
});

test('Color Article Test: ColorSpecificity', t => {
  const $ = mount(<ColorSpecificity />);

  t.equal(
    $.find('.rv-xy-plot').length,
    3,
    'should find the right number of xy-plots'
  );
  t.equal(
    $.find('.rv-xy-plot__series--bar rect').length,
    10,
    'should find the right number of rects'
  );
  t.equal(
    $.find('path.rv-xy-plot__series--line').length,
    3,
    'should find the right number of paths'
  );
  t.equal(
    $.find('.rv-xy-plot__series--mark circle').length,
    30,
    'should find the right number of circles'
  );

  t.end();
});

test('Color Article Test: generatePalette', t => {
  [
    {
      name: 'ReactVis5',
      Item: ReactVis5,
      expectedText: '#12939A#79C7E3#1A3177#FF9833#EF5D28',
      numberOfBoxes: 5
    },
    {
      name: 'ReactVis20',
      Item: ReactVis20,
      expectedText:
        '#19CDD7#DDB27C#88572C#FF991F#F15C17#223F9A#DA70BF#125C77#4DC19C#776E57#12939A#17B8BE#F6D18A#B7885E#FFCB99#F89570#829AE3#E79FD5#1E96BE#89DAC1#B3AD9E',
      numberOfBoxes: 21
    },
    {
      name: 'Continuous',
      Item: Continuous,
      expectedText: '#EF5D28#FF9833',
      numberOfBoxes: 2
    },
    {
      name: 'CustomPalette',
      Item: CustomPalette,
      expectedText:
        '#cd3b54#59b953#ba4fb9#99b53e#7f61d3#c9a83a#626dbc#e08b39#5ea0d8#cf4d2a#4fb79b#d24691#528240#c388d2#80742b#9c4a6d#caaa70#e0829f#9d5d30#dc7666',
      numberOfBoxes: 20
    }
  ].forEach(obj => {
    const {Item, expectedText, numberOfBoxes, name} = obj;
    const $ = mount(<Item />);
    t.equal(
      $.find('.color-box').length,
      numberOfBoxes,
      `${name} color scale: should find boxes being rendered`
    );
    t.equal(
      $.text(),
      expectedText,
      `${name} color scale: should find the right text`
    );
  });

  t.end();
});

test('Color Article Test: LineSeriesMarkSeries', t => {
  const $ = mount(<LineSeriesMarkSeries />);
  t.equal(
    $.find('path.rv-xy-plot__series--line').length,
    3,
    'should find the right number of paths'
  );
  t.equal(
    $.find('.rv-xy-plot__series--mark circle').length,
    30,
    'should find the right number of circles'
  );

  t.end();
});
