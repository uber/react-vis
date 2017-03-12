import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';
import TableOfContents from './table-of-contents';
import {loadContent} from '../actions';

class Layout extends Component {
  componentWillMount() {
    this.props.loadContent();
  }

  render() {
    const {
      children,
      route: {path, pages},
      markdownPages
    } = this.props;

    return (
      <div className="layout-container">
        <Header />
        <div className="main-content">
          <TableOfContents pages={pages} parentRoute={path}/>
          { {...children, props: {...children.props, markdownPages}} }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markdownPages: state.markdownPages
  };
}

export default connect(mapStateToProps, {loadContent})(Layout);
