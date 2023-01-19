import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchFollows } from '../../../store/follows';

function SuggestedFollows({ suggested }) {
  const dispatch = useDispatch();

  const [ users, setUsers ] = useState('');
  const latestUsers = users?.slice(users?.length - 4, users?.length)
    const sessionUser = useSelector(state => state.session.user)
    
    console.log('USERS ====== ', users)
    console.log('Latest USER = ', latestUsers)

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);
    
  return (
    <div>
      <h3>Newest Members</h3>
      <div>{latestUsers?.map(user => (
        <NavLink key={user?.id} to={`/users/${user?.id}`}>
          <p>{user?.username}</p>
        </NavLink>
      ))}
      </div>
    </div>
  )
}

export default SuggestedFollows
