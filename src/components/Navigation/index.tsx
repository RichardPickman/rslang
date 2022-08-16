import React from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router';

const Navigation = () => {
  return (
    <nav>
      <Link to={RouteNames.HOMEPAGE}>Home</Link>
      <Link to={RouteNames.TEXTBOOK}>Textbook</Link>
      <Link to={RouteNames.GAMES}>Games</Link>
      <Link to={RouteNames.STATISTICS}>Statistics</Link>
      <Link to={RouteNames.LOGIN}>Login</Link>
    </nav>
  );
};

export default Navigation;