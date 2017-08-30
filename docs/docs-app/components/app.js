import React, {Component} from 'react';

import Header from './header';
import work from 'webworkify-webpack';

const w = work(require.resolve('./search-worker.js'));

/* eslint-disable react/display-name*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      opacity: 1,
      isMenuOpen: false,
      searchResults: [],
      searchLoaded: false
    };
  }

  componentDidMount() {
    w.addEventListener('message', event => {
      if (event.data.actionType === 'search-result') {
        this.setState({searchResults: event.data.body});
      }
      if (event.data.actionType === 'successful-load') {
        this.setState({searchLoaded: true});
      }
    });

    w.postMessage({actionType: 'getIndex'});
  }

  render() {
    const {children} = this.props;
    const {isMenuOpen, opacity, searchResults, searchLoaded} = this.state;
    return (<div className="app">
      <Header
        isMenuOpen={isMenuOpen}
        opacity={opacity}
        toggleMenu={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}
      />
      <div className="app-container">
        {{...children, props: {
          ...children.props,
          searchResults,
          searchWorker: w,
          searchLoaded
        }}}
      </div>
    </div>);
  }
}
/* eslint-enable react/display-name*/

export default App;
