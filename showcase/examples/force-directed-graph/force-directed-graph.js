// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';
import {forceSimulation, forceLink, forceManyBody, forceCenter} from 'd3-force';

import {XYPlot, MarkSeriesCanvas, LineSeriesCanvas} from 'index';

const colors = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#4DC19C',
  '#12939A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#E79FD5',
  '#89DAC1'
];

/**
 * Create the list of nodes to render.
 * @returns {Array} Array of nodes.
 * @private
 */
function generateSimulation(props) {
  const {data, height, width, maxSteps, strength} = props;
  if (!data) {
    return {nodes: [], links: []};
  }
  // copy the data
  const nodes = data.nodes.map(d => ({...d}));
  const links = data.links.map(d => ({...d}));
  // build the simuatation
  const simulation = forceSimulation(nodes)
    .force('link', forceLink().id(d => d.id))
    .force('charge', forceManyBody().strength(strength))
    .force('center', forceCenter(width / 2, height / 2))
    .stop();

  simulation.force('link').links(links);

  const upperBound = Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  );
  for (let i = 0; i < Math.min(maxSteps, upperBound); ++i) {
    simulation.tick();
  }

  return {nodes, links};
}

class ForceDirectedGraph extends React.Component {
  static get defaultProps() {
    return {
      className: '',
      data: {nodes: [], links: []},
      maxSteps: 50
    };
  }

  static get propTypes() {
    return {
      className: PropTypes.string,
      data: PropTypes.object.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      steps: PropTypes.number
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: generateSimulation(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: generateSimulation(nextProps)
    });
  }

  render() {
    const {className, height, width, animation} = this.props;
    const {data} = this.state;
    const {nodes, links} = data;
    return (
      <XYPlot width={width} height={height} className={className}>
        {links.map(({source, target}, index) => {
          return (
            <LineSeriesCanvas
              animation={animation}
              color={'#B3AD9E'}
              key={`link-${index}`}
              opacity={0.3}
              data={[{...source, color: null}, {...target, color: null}]}
            />
          );
        })}
        <MarkSeriesCanvas
          data={nodes}
          animation={animation}
          colorType={'category'}
          stroke={'#ddd'}
          strokeWidth={2}
          colorRange={colors}
        />
      </XYPlot>
    );
  }
}

ForceDirectedGraph.displayName = 'ForceDirectedGraph';

export default ForceDirectedGraph;
