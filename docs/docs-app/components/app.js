import React from 'react';

import Header from './header';

export default ({children}) => (
  <div className="app">
    <Header />
    <div className="app-container">
      {children}
    </div>
  </div>
);
