import React, {Component} from 'react';

/* eslint-disable max-len */
const sections = [{
  title: 'REACT-VIS IS A FLEXIBLE CHARTING SOLUTION FOR THE REACT ECOSYSTEM',
  text: 'react-vis allows elaborate visualizations to be created in a breeze. No more messing around with the interface between d3 and react, simply write familiar jsx and get beautiful diagrams.'
}, {
  title: 'ENABLES NUMEROUS CHART TYPES',
  text: 'We provide a robust and ever expanding library of chart types including Line charts, Area charts, Scatterplots, Bar charts, Histograms, Heatmaps, Treemaps, Radial charts, Sankey diagrams, and many more.'
}, {
  title: 'EASY TO EXTEND',
  text: 'The library provides a strongly extenible API, so that if we dont have a chart type that you need, it is easy and pleasant to create.'
}];
/* eslint-enable max-len */

function renderSection(section) {
  return (
    <div className="bullet-point f-down">
      <div className="bullet-point-title">
        {section.title}
      </div>
      <div className="bullet-point-text">
        {section.text}
      </div>
    </div>
  );
}

class Home extends Component {

  render() {
    return (
      <div className="f-down f-grow home-wrapper">
        <div className="f home-top-section">
          <div className="f-down title-wrapper">
            <div className="page-title">
              REACT-VIS
            </div>
            <div className="page-subtitle">
              A COMPOSABLE VISUALIZATION SYSTEM
            </div>
          </div>
          <div className="f image-wrapper">
            <div className="preview-image" />
          </div>
        </div>
        <div className="f-down home-bottom-section">
          <div className="bullet-points-wrapper f-down">
            {sections.map(renderSection)}
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
