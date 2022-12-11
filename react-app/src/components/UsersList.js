import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  
  const userComponents = users.map((user) => {
    // console.log('USER in USER LIST = ', user)
    return (
      <li className='user-list-card' key={user?.id}>
        <NavLink className='user-link-user-list' to={`/users/${user?.id}`}>{user?.username}</NavLink>
        {user?.firstname && <p><strong>Name: </strong>{user?.firstname} {user?.lastname}</p>}
        <p><strong>Email: </strong>{user?.email}</p>
        {user?.bio && <p><strong>Bio: </strong>{user?.bio}</p>}
        <p><strong>Posts: </strong>{user?.Images?.length}</p>
        {/* <p><strong>Following: </strong>{user?.Follows?.length}</p> */}
      </li>
    );
  });

  return (
    <>
      <h1 className='user-list-title'>User List: </h1>
      <ul className='user-list'>{userComponents}</ul>
    </>
  );
}

export default UsersList;
