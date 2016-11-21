import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <nav className="navbar">
    Hello
    <Link to="/new">Add new</Link>
    <Link to="/user/signup">Sign Up</Link>
  </nav>
);

export default Nav;
