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
      isMenuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    // do i need to unmount this?
    // w.addEventListener('message', event => {
    //   console.log(event.data);
    // });
    //
    // w.postMessage({actionType: 'getIndex'});

    fetch(
      'http://localhost:3001/markdown/examples/showcases/plots-showcase.md',
      {
        method: 'GET',
        'content-type': 'application/json'
      }
    )
    .then(response => {
      return response.json();
      // console.log(response)
      // response.blob()
    }).then(body => {
      console.log(body);
    });
  }

  toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  }

  render() {
    return (<div className="app">
      <Header
        isMenuOpen={this.state.isMenuOpen}
        opacity={this.state.opacity}
        toggleMenu={this.toggleMenu}
      />
      <div className="app-container">
        {this.props.children}
      </div>
    </div>);
  }
}
/* eslint-enable react/display-name*/

export default App;
