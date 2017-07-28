import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowcaseDropdown from './showcase-components/showcase-dropdown';

import ShowcaseIndex from './showcase-index';
const {
  AxesShowcase,
  PlotsShowcase,
  SunburstSection,
  RadialShowcase,
  RadarShowcase,
  LegendsShowcase,
  SankeysShowcase,
  TreemapShowcase,
  MiscShowcase,

  Candlestick,
  ForceDirectedGraph,
  ResponsiveVis,
  StreamgraphExample,
  ZoomableChart
} = ShowcaseIndex;

const sectionNames = [
  {root: true, link: '', name: 'RETURN TO ROOT'},
  // basic examples
  {label: true, name: 'BASIC EXAMPLES'},
  {showByDefault: true, link: 'plots', name: 'Plots', showcase: PlotsShowcase},
  {showByDefault: true, link: 'axes', name: 'Axes', showcase: AxesShowcase},
  {showByDefault: true, link: 'radial-charts', name: 'Radial Charts', showcase: RadialShowcase},
  {showByDefault: true, link: 'radar-charts', name: 'Radar Charts', showcase: RadarShowcase},
  {showByDefault: true, link: 'treemaps', name: 'Treemaps', showcase: TreemapShowcase},
  {showByDefault: true, link: 'legends', name: 'Legends', showcase: LegendsShowcase},
  {showByDefault: true, link: 'sunbursts', name: 'Sunbursts', showcase: SunburstSection},
  {showByDefault: true, link: 'sankeys', name: 'Sankeys', showcase: SankeysShowcase},
  {showByDefault: true, link: 'misc', name: 'Misc', showcase: MiscShowcase},

  // in depth examples
  {label: true, name: 'ADVANCED EXAMPLES'},
  {showByDefault: false, link: 'candlestick', name: 'Candlestick', showcase: Candlestick},
  {showByDefault: false, link: 'force-directed', name: 'ForceDirectedGraph', showcase: ForceDirectedGraph},
  {showByDefault: false, link: 'streamgraph', name: 'Streamgraph', showcase: StreamgraphExample},
  {showByDefault: false, link: 'responsive', name: 'ResponsiveVis', showcase: ResponsiveVis},
  {showByDefault: false, link: 'zoomable', name: 'ZoomableChart', showcase: ZoomableChart}
];

class App extends Component {
  render() {
    const {forExample} = this.props;
    const linkedSection = location.href.split('/#')[1];
    const foundSection = sectionNames.find(section => section.link === linkedSection);

    const filteredSections = sectionNames.filter(section => {
      // if at http://localhost:3001/, just return everything
      if (!linkedSection) {
        return section.showByDefault;
      }
      const showThisSection = (foundSection && section.link === foundSection.link);
      const showDefaultSections = (!foundSection || foundSection.root) && section.showByDefault;

      return showThisSection || showDefaultSections;
    }).map(section => {
      if (section.label || section.root) {
        return <div key={`${section.name}-showcase`}/>;
      }
      return (<section.showcase key={`${section.name}-showcase`}/>);
    });
    return (
      <main>
        {!forExample && (<header>
          <div className="header-contents">
            <a className="header-logo" href="#">react-vis</a>
            <ShowcaseDropdown items={sectionNames.map(section => {
              const {label, link, name} = section;
              const content = label ?
                (<div className="subsection-label">{name}</div>) :
                (<a href={`#${link}`}>{name}</a>);

              return <li key={name}>{content}</li>;
            })}/>
          </div>
        </header>)}
        {filteredSections}
      </main>
    );
  }
}

App.propTypes = {
  forExample: PropTypes.bool
};

export default App;
