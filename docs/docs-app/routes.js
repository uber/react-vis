import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  IndexRedirect,
  useRouterHistory
} from 'react-router';
import {createHashHistory} from 'history';

import App from './components/app.js';
import Home from './components/home.js';
import Layout from './components/layout.js';
import ExamplePage from './components/example-page.js';
import DocumentationPage from './components/documentation-page';

import {
  examplePages,
  docPages
} from './constants/pages';

const pageType = {
  example: ExamplePage,
  documentation: DocumentationPage
};

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

const getDefaultPath = pages => {
  const path = [];
  let page;
  while (pages) {
    page = pages[0];
    pages = page.children;
    path.push(page.path);
  }
  return path.join('/');
};

const renderRoute = (page, i) => {
  const {children, path, content} = page;
  if (children) {
    return (
      <Route key={i} path={path} >
        <IndexRedirect to={getDefaultPath(children)} />
        {children.map(renderRoute)}
      </Route>
    );
  }
  const component = pageType[content.pageType];
  return (<Route key={i} path={path} component={component} content={content} />);
};

const renderRouteGroup = (path, pages) => {
  return (
    <Route path={path} component={Layout} pages={pages}>
      <IndexRedirect to={getDefaultPath(pages)} />
      {pages.map(renderRoute)}
    </Route>
  );
};

/* eslint-disable react/display-name */
export default () => (
  <Router history={appHistory}>

    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      {renderRouteGroup('documentation', docPages)}
      {renderRouteGroup('examples', examplePages)}
    </Route>

    <Redirect from="*" to="/" />
  </Router>
);
/* eslint-enable react/display-name */
