import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ImageCreateForm from '../Images/ImageCreateForm';
import { Modal } from '../../context/Modal'
import { BsHouseDoorFill } from 'react-icons/bs';
import { VscDiffAdded } from 'react-icons/vsc';
import { MdOutlineExplore } from 'react-icons/md'
import { BsInfoSquare } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory()

  const [showModal, setShowModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false)

  let sessionLinks;

  const handleClick = () => {
    return history.push('/home')
  }

  if(user){
    sessionLinks = (
      <ul className='nav-list'>
        <li className='nav-list-item'>
            <p className='logo'>Photogram</p>
        </li>
        <li className='nav-list-item'>
          <button 
            className='nav-btn' 
            onClick={handleClick}
          >
            <BsHouseDoorFill className='nav-icon' />
            Home
          </button>
        </li>
        <li className='nav-list-item'>
          <button
            onClick={() => setShowModal(true)}
            className='create-btn nav-btn'
          >
            <VscDiffAdded className='nav-icon' />
            Create
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ImageCreateForm setShowModal={setShowModal} />
            </Modal>
          )}
        </li>
        <li className='nav-list-item'>
          <button 
            className='nav-btn' 
            onClick={() => history.push('/users')}
          >
            <MdOutlineExplore className='nav-icon' />
            Explore
          </button>
        </li>
        <li className='nav-list-item'>
          <button
            className='nav-btn'
            onClick={() => history.push(`/users/${user?.id}`)}
          >
            <IoSettingsOutline className='nav-icon' />
            Profile
          </button>
        </li>
        <li className='nav-list-item'>
          <button 
            className='nav-btn' 
            onClick={() => setAboutModal(true)}
          >
            <BsInfoSquare className='nav-icon' />
            About
          </button>
          {aboutModal && (
            <Modal onClose={() => setAboutModal(false)}>
              <div className='modal-container'>
                <h2 className='modal-form-title'>Check out more about me!</h2>
                <div className='link-btns'>
                  <div>
                    <a
                      className='modal-btn modal-submit-btn link-btn'
                      rel='noreferrer'
                      target='_blank'
                      href='https://www.linkedin.com/in/keith-glines-70b28b30'
                    >
                      <AiFillLinkedin className='nav-icon link-icon' />
                      LinkedIn
                    </a>
                  </div>
                  <div>
                    <a
                      className='modal-btn modal-cancel-btn link-btn'
                      rel='noreferrer'
                      target='_blank'
                      href='https://github.com/Kglines/photo_gram'
                    >
                      <AiFillGithub className='nav-icon link-icon' />
                      Github
                    </a>
                  </div>
                </div>
              </div>
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
  }

  return (
    <nav>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
