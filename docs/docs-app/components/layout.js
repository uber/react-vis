import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableOfContents from './table-of-contents';
import {loadSinglePage} from '../actions';

class Layout extends Component {
  render() {
    const {
      children,
      route: {path, pages},
      markdownPages
    } = this.props;

    return (
      <div className="f fg">
        <TableOfContents pages={pages} parentRoute={path}/>
        {{...children, props: {
          ...children.props,
          markdownPages,
          loadSinglePage: this.props.loadSinglePage
        }}}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markdownPages: state.markdownPages
  };
}

export default connect(mapStateToProps, {loadSinglePage})(Layout);
