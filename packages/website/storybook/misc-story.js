/* eslint-env node */

import React from 'react';

import {storiesOf} from '@storybook/react';

import {withKnobs, boolean} from '@storybook/addon-knobs/react';
import {SimpleChartWrapper} from './storybook-utils';
import {generateLinearData} from './storybook-data';

import {LineSeries, ContentClipPath} from 'react-vis';

const data = generateLinearData({randomFactor: 10});

storiesOf('Misc', module)
  .addDecorator(withKnobs)
  .addWithJSX('Clip Content', () => {
    const margin = {left: 40, top: 40, bottom: 40, right: 40};
    const xDomain = [data[1].x, data[data.length - 2].x];
    const shouldClip = boolean(
      'Enable Clipping',
      false,
      'General chart options'
    );
    return (
      <SimpleChartWrapper xDomain={xDomain} yDomain={[0, 20]} margin={margin}>
        {shouldClip && <ContentClipPath id="clip" />}
        <LineSeries data={data} style={{clipPath: 'url(#clip)'}} />
      </SimpleChartWrapper>
    );
  });
