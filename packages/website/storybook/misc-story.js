/* eslint-env node */

import React, {useState, useCallback} from 'react';

import {storiesOf} from '@storybook/react';

import {withKnobs, boolean, button} from '@storybook/addon-knobs/react';
import {SimpleChartWrapper} from './storybook-utils';
import {generateLinearData} from './storybook-data';

import {LineSeries, ContentClipPath, Selection, Window} from 'react-vis';

const data = generateLinearData({randomFactor: 10});

const highlightData = generateLinearData({});
const yDomainHighlightData = [
  highlightData.reduce(
    (min, cur) => Math.floor(Math.min(min, cur.y)),
    Number.MAX_SAFE_INTEGER
  ),
  highlightData.reduce(
    (max, cur) => Math.ceil(Math.max(max, cur.y)),
    Number.MIN_SAFE_INTEGER
  )
];
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
  .addWithJSX('Zoom', () => {
    const [zoom, setZoom] = useState();
    const onSelected = useCallback(area => {
      setZoom(area);
    }, []);

    button('Reset Zoom', () => setZoom(null), 'Zoom');

    const xDomain = zoom ? [zoom.left, zoom.right] : undefined;

    return (
      <SimpleChartWrapper xDomain={xDomain} yDomain={yDomainHighlightData}>
        <Selection onSelected={onSelected} />
        <LineSeries data={highlightData} />
      </SimpleChartWrapper>
    );
  })
  .addWithJSX('Window', () => {
    const [zoom, setZoom] = useState({left: 5, right: 10});
    const onMoveComplete = useCallback(area => {
      setZoom(area);
    }, []);

    const xDomain = [zoom.left, zoom.right];

    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div style={{flex: 1}}>
          <SimpleChartWrapper xDomain={xDomain} yDomain={yDomainHighlightData}>
            <ContentClipPath />
            <LineSeries
              style={{clipPath: 'url(#content-area)'}}
              data={highlightData}
            />
          </SimpleChartWrapper>
        </div>
        <div style={{height: '100px'}}>
          <SimpleChartWrapper yDomain={yDomainHighlightData}>
            <LineSeries data={highlightData} />
            <Window enableY={false} onMoveComplete={onMoveComplete} {...zoom} />
          </SimpleChartWrapper>
        </div>
      </div>
    );
  });
