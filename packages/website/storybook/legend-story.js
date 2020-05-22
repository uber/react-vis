import React from 'react';

import {storiesOf} from '@storybook/react';

import {
  withKnobs,
  boolean,
  color,
  number,
  select,
  text
} from '@storybook/addon-knobs/react';

import {
  ContinuousColorLegend,
  ContinuousSizeLegend,
  DiscreteColorLegend,
  SearchableDiscreteColorLegend
} from 'react-vis';

import {
  CATEGORY_PALETTE,
  LINEAR_PALETTE,
} from './storybook-utils.js';

storiesOf('Legends', module)
  .addDecorator(withKnobs)
  .addWithJSX(
    'Discrete color legend',
    () => (
      <DiscreteColorLegend
        colors={CATEGORY_PALETTE.slice(0, 8)}
        orientation={select(
          'orientation',
          {horizontal: 'horizontal', vertical: 'vertical'},
          'vertical'
        )}
        items={[
          'apples',
          'bananas',
          'carrots',
          'dill',
          'eggplant',
          'fig',
          'ginger'
        ]}
      />
    ),
  )
  .addWithJSX(
    'Searchable discrete color legend',
    () => (
      <SearchableDiscreteColorLegend
        colors={CATEGORY_PALETTE.slice(0, 8)}
        orientation={select(
          'orientation',
          {horizontal: 'horizontal', vertical: 'vertical'},
          'vertical'
        )}
        searchText={text('searchText', '')}
        items={[
          'apples',
          'bananas',
          'carrots',
          'dill',
          'eggplant',
          'fig',
          'ginger'
        ]}
      />
    ),
  )
  .addWithJSX(
    'Continuous Color Legend',
    () => {
      const width = number('width', 300, {
        max: 500,
        min: 100,
        range: true,
        step: 1
      });

      const startTitle = number('startTitle', 0, {
        max: 1000,
        min: -1000,
        range: true,
        step: 1
      });
      const endTitle = number('endTitle', 100, {
        max: 1000,
        min: -1000,
        range: true,
        step: 1
      });
      const midTitle = number('midTitle', 50, {
        max: 1000,
        min: -1000,
        range: true,
        step: 1
      });
      const startColor = color('startColor', LINEAR_PALETTE[0]);
      const midColor = color('midColor', '#DA854F');
      const endColor = color('endColor', LINEAR_PALETTE[1]);
      const useWidth = boolean('use Width?', true);
      const useMidColor = boolean('use midColor?', false);
      return (
        <ContinuousColorLegend
          width={useWidth ? width : null}
          startTitle={startTitle}
          midTitle={midTitle}
          endTitle={endTitle}
          startColor={startColor}
          midColor={useMidColor ? midColor : null}
          endColor={endColor}
        />
      );
    },
  )
  .addWithJSX(
    'Continuous Size Legend',
    () => {
      const width = number('width', 300, {
        max: 500,
        min: 100,
        range: true,
        step: 1
      });
      const useWidth = boolean('use Width?', true);

      const startTitle = number('startTitle', 0, {
        max: 1000,
        min: -1000,
        range: true,
        step: 1
      });
      const endTitle = number('endTitle', 100, {
        max: 1000,
        min: -1000,
        range: true,
        step: 1
      });
      const startSize = number('startSize', 2, {
        max: 100,
        min: 1,
        range: true,
        step: 1
      });
      const endSize = number('endSize', 20, {
        max: 100,
        min: 1,
        range: true,
        step: 1
      });
      const circlesTotal = number('circlesTotal', 10, {
        max: 20,
        min: 1,
        range: true,
        step: 1
      });

      return (
        <ContinuousSizeLegend
          circlesTotal={circlesTotal}
          startSize={startSize}
          endSize={endSize}
          width={useWidth ? width : null}
          startTitle={startTitle}
          endTitle={endTitle}
        />
      );
    },
  );
