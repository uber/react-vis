import React from 'react';

import Header from './header';

/* eslint-disable react/display-name*/
export default ({children}) => (
  <div className="app">
    <Header />
    <div className="app-container">
      {children}
    </div>
  </div>
);
/* eslint-enable react/display-name*/
