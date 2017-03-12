import React from 'react';
import {Link} from 'react-router';

const tabs = [{
  name: 'EXAMPLES',
  path: '/examples'
}, {
  name: 'DOCUMENTATION',
  path: '/documentation'
}];

export default class Header extends React.Component {
  renderTab(tab, index) {
    return (<Link
      key={`${index}-link`}
      className="link" to={ tab.path } activeClassName="active">{ tab.name }</Link>);
  }

  render() {
    return (
      <div className="example-header">
        <div className="app-name-wrapper">
          {'REACT VIS'}
        </div>
        <div className="tabs-wrapper">
          {tabs.map(this.renderTab)}
        </div>
      </div>
    );
  }
}
