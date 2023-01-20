import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchFollows } from '../../../store/follows';
import './SuggestedFollows.css';

function SuggestedFollows({ userList }) {

  const latestUsers = userList?.slice(userList?.length - 5, userList?.length)
    
  return (
    <div className='suggested-container'>
      <h3>Newest Members</h3>
      <div>
        {latestUsers?.map((user) => (
          <NavLink
            key={user?.id}
            to={`/users/${user?.id}`}
            className='suggested-list'
          >
            <p className='suggested-list'>{user?.username}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SuggestedFollows
