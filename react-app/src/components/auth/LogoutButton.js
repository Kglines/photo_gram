import React from 'react';
import { useDispatch } from 'react-redux';
import { IoLogOutOutline } from 'react-icons/io5';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div>
      <button className='nav-btn' onClick={onLogout}>
        <IoLogOutOutline className='nav-icon' />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
