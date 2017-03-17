import React, {Component} from 'react';
import {Link} from 'react-router';

const tabs = [{
  name: 'EXAMPLES',
  path: '/examples'
}, {
  name: 'DOCUMENTATION',
  path: '/documentation'
}];

const renderTab = (tab, index) => (
  <Link
    key={`${index}-link`}
    className="link"
    to={tab.path}
    activeClassName="active">
    {tab.name}
  </Link>
);

export default class Header extends Component {

  render() {
    return (
      <div className="example-header">
        <Link to="/" className="app-name-wrapper">
          {'REACT VIS'}
        </Link>
        <div className="tabs-wrapper">
          {tabs.map(renderTab)}
        </div>
      </div>
    );
  }
}
