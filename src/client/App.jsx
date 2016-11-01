import React from 'react';
import Nav from './components/Nav/Container';

const App = ({ children }) => (
  <div>
    <header className="topnav"><Nav /></header>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
