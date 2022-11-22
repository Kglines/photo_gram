import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ImageCreateForm from '../Images/ImageCreateForm';
import { Modal } from '../../context/Modal'
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false)

  let sessionLinks;

  const handleClick = () => {
    return history.push('/home')
    // return <Redirect to={'/home'} />
  }

  if(user){
    sessionLinks = (
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <NavLink to='/home'>
            <p className='logo'>Photogram</p>
          </NavLink>
        </li>
        <li className='nav-list-item'>
          <button className='nav-btn' onClick={handleClick}>
            Home
          </button>
        </li>
        <li className='nav-list-item'>
          <button
            onClick={() => setShowModal(true)}
            className='create-btn nav-btn'
          >
            Create
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ImageCreateForm setShowModal={setShowModal} />
            </Modal>
          )}
        </li>
        <li className='nav-list-item'>
          <button className='nav-btn' onClick={() => history.push('/users')}>
            Explore
          </button>
        </li>
        <li className='nav-list-item'>
          <button
            className='nav-btn'
            onClick={() => history.push(`/users/${user.id}`)}
          >
            Profile
          </button>
        </li>
        <li className='nav-list-item'>
          <button className='nav-btn' onClick={() => setAboutModal(true)}>
            About
          </button>
          {aboutModal && (
            <Modal onClose={() => setAboutModal(false)}>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://github.com/Kglines/photo_gram'
              >
                Github
              </a>
              <br></br>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://www.linkedin.com/in/keith-glines-70b28b30'
              >
                LinkedIn
              </a>
            </Modal>
          )}
        </li>
        <li className='nav-list-item'>
          <LogoutButton />
        </li>
      </ul>
    );
  } else {
    sessionLinks = null
    // (
      // <ul>
      //   <li>
      //     <NavLink to='/' exact={true} activeClassName='active'>
      //       Home
      //     </NavLink>
      //   </li>
      //   <li>
      //     <NavLink to='/login' exact={true} activeClassName='active'>
      //       Login
      //     </NavLink>
      //   </li>
        // <li>
        //   <NavLink to='/sign-up' exact={true} activeClassName='active'>
        //     Sign Up
        //   </NavLink>
        // </li>
      // </ul>
    // )
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
