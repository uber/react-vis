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

function mapStateToProps(state) {
  return {
    markdownPages: state.markdownPages
  };
}

export default connect(mapStateToProps)(App);
