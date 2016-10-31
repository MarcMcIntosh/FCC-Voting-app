import React from 'react';

const App = ({ children }) => (
  <main>{children}</main>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
