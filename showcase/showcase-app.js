import React, {Component} from 'react';
import AxesShowcase from './showcase-sections/axes-showcase';
import PlotsShowcase from './showcase-sections/plots-showcase';
import SunburstSection from './showcase-sections/sunburst-showcase';
import RadialShowcase from './showcase-sections/radial-showcase';
import LegendsShowcase from './showcase-sections/legends-showcase';
import SankeysShowcase from './showcase-sections/sankeys-showcase';
import TreemapShowcase from './showcase-sections/treemap-showcase';
import MiscShowcase from './showcase-sections/misc-showcase';

import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const {forExample} = this.props;
    return (
      <main>

        {!forExample && (<header>
          <div className="header-contents">
            <a className="header-logo" href="#">react-vis</a>
            <nav>
              <li><a href="#plots">Plots</a></li>
              <li><a href="#axes">Axes</a></li>
              <li><a href="#radial-charts">Radial Charts</a></li>
              <li><a href="#treemaps">Treemaps</a></li>
              <li><a href="#legends">Legends</a></li>
              <li><a href="#sunbursts">Sunbursts</a></li>
              <li><a href="#sankeys">Sankeys</a></li>
            </nav>
          </div>
        </header>)}
        <PlotsShowcase forExample={forExample}/>
        <AxesShowcase />
        <MiscShowcase />
        <RadialShowcase />
        <TreemapShowcase />
        <SunburstSection />
        <LegendsShowcase />
        <SankeysShowcase />
      </main>
    );
  }
}

App.propTypes = {
  forExample: PropTypes.bool
};

export default App;
