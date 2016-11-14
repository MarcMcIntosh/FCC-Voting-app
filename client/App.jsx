import React from 'react';
import Nav from './components/Nav/Container';

// Check for cookie here //
const App = ({ children }) => (
  <div>
    <Nav />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
