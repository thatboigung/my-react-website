import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaLink, FaComments, FaInfoCircle } from 'react-icons/fa';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            <FaHome /> <span>Confessions & Stories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaks" activeClassName="active">
            <FaBook /> <span>Leaks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/linkups" activeClassName="active">
            <FaLink /> <span>Linkups</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" activeClassName="active">
            <FaComments /> <span>Chat</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            <FaInfoCircle /> <span>About</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
