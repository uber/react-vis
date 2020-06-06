/* eslint-env node */

import React, {useState, useCallback} from 'react';

import {storiesOf} from '@storybook/react';

import {withKnobs, boolean, button} from '@storybook/addon-knobs/react';
import {SimpleChartWrapper} from './storybook-utils';
import {generateLinearData} from './storybook-data';

import {LineSeries, ContentClipPath, Highlight} from 'react-vis';

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
  })
  .addWithJSX('Highlight', () => {
    const [zoom, setZoom] = useState();
    const onZoom = useCallback(area => {
      console.log('zoom', area);
    }, []);

    button('Reset Zoom', () => setZoom(null), 'Zoom');

    const xDomain = zoom ? [zoom.left, zoom.right] : undefined;

    return (
      <SimpleChartWrapper xDomain={xDomain}>
        <Highlight onBrushEnd={onZoom} />
        <LineSeries data={data} />
      </SimpleChartWrapper>
    );
  });
