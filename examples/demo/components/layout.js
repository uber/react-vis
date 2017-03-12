import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';
import TableOfContents from './table-of-contents';

class Gallery extends Component {

  render() {
    const {
      children,
      route: {path, pages}
    } = this.props;

    return (
      <div className="layout-container">
        <Header />
        <div className="main-content">
          <TableOfContents pages={pages} parentRoute={path}/>
          { children }
        </div>
      </div>
    );
  }
}

export default connect(state => state.app)(Gallery);
