import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  FlexibleBarChartExample,
  FlexibleRadarChartExample,
  FlexibleRadialChartExample,
  FlexibleSankeyExample,
  FlexibleSunburstExample,
  FlexibleTreemapExample
} = showCase;

/* eslint-disable max-len */
const FLEXIBLE_ROWS = [
  [{
    name: 'FlexibleBarChartExample',
    component: FlexibleBarChartExample,
    componentName: 'FlexibleBarChartExample'
  }, {
    name: 'FlexibleRadarChartExample',
    component: FlexibleRadarChartExample,
    componentName: 'FlexibleRadarChartExample'
  }],
  [{
    name: 'FlexibleRadialChartExample',
    component: FlexibleRadialChartExample,
    componentName: 'FlexibleRadialChartExample'
  }, {
    name: 'FlexibleSankeyExample',
    component: FlexibleSankeyExample,
    componentName: 'FlexibleSankeyExample'
  }],
  [{
    name: 'FlexibleSunburstExample',
    component: FlexibleSunburstExample,
    componentName: 'FlexibleSunburstExample'
  }, {
    name: 'FlexibleTreemapExample',
    component: FlexibleTreemapExample,
    componentName: 'FlexibleTreemapExample'
  }]
];

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  maxHeight: '400px'
  // justifyContent: 'space-between',
  // position: 'relative',
  // width: '60vw',
  // height: '30vh'
};

class FlexibleShowcase extends Component {
  render() {
    return (
      <article id="flexible">
        <h2>FLEXIBLE</h2>
        {
          FLEXIBLE_ROWS.map((row, idx) => (
            <div style={rowStyle} key={idx}>
              {row.map(mapSection)}
            </div>
          ))
        }
      </article>
    );
  }
}

export default FlexibleShowcase;
