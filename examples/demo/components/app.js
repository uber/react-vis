import React, {Component} from 'react';
// import {toggleMenu, setHeaderOpacity} from '../actions/app-actions';
import {connect} from 'react-redux';
import Header from './header';

class App extends Component {
  render() {
    const {children} = this.props;

    return (
      <div>
        <Header />
        {children || 'WOW!'}
      </div>
    );
  }
}

export default connect(
  state => state.app,
  // {toggleMenu, setHeaderOpacity}
)(App);
