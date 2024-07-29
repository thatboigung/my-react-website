import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaLink, FaComments, FaUserCircle } from 'react-icons/fa';
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
          <NavLink to="/encounters" activeClassName="active">
            <FaBook /> <span>Encounters</span>
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
          <NavLink to="/profile" activeClassName="active">
            <FaUserCircle /> <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
