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

const renderGithubLink = () => (
  <a href="https://github.com/uber/react-vis" className="link" key="github-link">
    <i className="icon icon-github" />
  </a>
);

const mappedTabs = tabs.map(renderTab).concat(renderGithubLink());

export default class Header extends Component {

  render() {
    return (
      <div className="example-header">
        <Link to="/" className="link">
          {'REACT VIS'}
        </Link>
        <div className="tabs-wrapper">
          {mappedTabs}
        </div>
      </div>
    );
  }
}
