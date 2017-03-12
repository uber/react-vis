import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableOfContents from './table-of-contents';

class Layout extends Component {

  componentWillMount() {
    this.props.loadContent();
  }

  render() {
    const {
      children,
      route: {path, pages}
    } = this.props;

    return (
      <div className="f fg">
        <TableOfContents pages={pages} parentRoute={path}/>
        {{...children, props: {...children.props, markdownPages}}}
      </div>
    );
  }
}

export default connect(state => state.app)(Gallery);
