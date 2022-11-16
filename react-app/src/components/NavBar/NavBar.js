
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let sessionLinks;

  if(user){
    sessionLinks = (
      <ul className='nav-list'>
        <li>
          <button className='create-btn nav-btn'>
            Create
          </button>
        </li>
        <li>
          <NavLink className='nav-btn' to='/users' exact={true} activeClassName='active'>
            Explore
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav>
      <ul>
        {/* <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton />
        </li> */}
      </ul>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
