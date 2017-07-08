import React, {Component} from 'react';

import Header from './header';

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
