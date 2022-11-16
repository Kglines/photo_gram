
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let sessionLinks;

  if(user){
    sessionLinks = (
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <button className='logo' onClick={() => history.push('/home')}>
            Photogram
          </button>
        </li>
        <li className='nav-list-item'>
          <button className='create-btn nav-btn'>Create</button>
        </li>
        <li className='nav-list-item'>
          <button className='nav-btn' onClick={() => history.push('/users')}>
            Explore
          </button>
        </li>
        <li className='nav-list-item'>
          <button className='nav-btn' onClick={() => history.push(`/users/${user.id}`)}>Profile</button>
        </li>
        <li className='nav-list-item'>
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
