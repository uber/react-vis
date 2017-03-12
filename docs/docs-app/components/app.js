import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect(state => state.app)(App);
