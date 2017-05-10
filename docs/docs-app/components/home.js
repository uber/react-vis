import React, {Component} from 'react';
import ComplexChartExample from '../../../examples/complex-chart/complex-chart-example';
import StreamgraphExample from '../../../examples/streamgraph/streamgraph-example';
import SankeyBasic from '../../../showcase/sankey/basic';
import DonutChart from '../../../showcase/radial-chart/donut-chart';

/* eslint-disable max-len */
const sections = [{
  title: 'A FLEXIBLE CHARTING SOLUTION FOR THE REACT ECOSYSTEM',
  text: 'react-vis allows elaborate visualizations to be created in a breeze. No more messing around with the interface between d3 and react, simply write familiar jsx and get beautiful diagrams.',
  component: (<ComplexChartExample forFrontPage/>)
}, {
  title: 'ENABLES NUMEROUS CHART TYPES',
  text: 'We provide a robust and ever-expanding set of tools that enables users to create a wide variety of chart types including Line charts, Area charts, Scatterplots, Bar charts, Histograms, Heatmaps, Treemaps, Radial charts, Sankey diagrams, and many more.',
  component: (<StreamgraphExample forFrontPage/>)
}, {
  title: 'EASY TO EXTEND',
  text: 'The library provides a strongly extensible API, so that if we don\'t have a chart type that you need, it is easy and pleasant to create.',
  component: (<div className="f example-charts">
    <SankeyBasic />
    <DonutChart />
  </div>)
}];
/* eslint-enable max-len */

function renderSection(section, index) {
  const content = [(
    <div
      className={`fcol fg bullet-info ${(index % 2) ? '' : 'bullet-info-reversed'}`}
      key={`section-${index}`}>
      <div className="bullet-point-title">
        {section.title}
      </div>
      <div className="bullet-point-text">
        {section.text}
      </div>
    </div>
  ), (
    <div className="bullet-example" key={`bullet-example-${index}`}>
      {section.component}
    </div>
  )];
  return (
    <div className="bullet-point f" key={`bullet-${index}`}>
      {!(index % 2) ? content.reverse() : content}
    </div>
  );
}

class Home extends Component {
  componentDidMount() {
    window.addEventListener(
      'resize',
      () => this.setState({width: window.innerWidth})
    );
  }

  render() {
    return (
      <div className="fcol fg home-wrapper">
        <div className="f home-top-section dots">
          <div className="fcol title-wrapper">
            <div className="page-title">
              REACT-VIS
            </div>
            <div className="page-subtitle">
              A COMPOSABLE VISUALIZATION SYSTEM
            </div>
          </div>
        </div>
        <div className="home-bottom-section fg fcol bullet-points-wrapper">
          {sections.map(renderSection)}
        </div>
        <div id="footer" className="dots flex-grow">
          <h4>Made by</h4>
          <i className="icon icon-uber-logo" />
        </div>
      </div>
    );
  }

}

export default Home;
