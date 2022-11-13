import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserImages } from '../store/images';

function User() {
  const [user, setUser] = useState({});
  // const [images, setImages] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const fetchedImages = useSelector(state => state.images)
  console.log('FETCHED IMAGES = ', fetchedImages)
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(fetchUserImages(userId))
  }, [dispatch])

  if (!user) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        <li>
          <strong>Bio</strong> {user.bio}
        </li>
        <li>
          <img className='profile-pic' src={user.profile_img} alt={user.username}/>
        </li>
      </ul>
      <div>
        {/* {fetchedImages && (
          fetchedImages.map(image => (
            <div>{image.caption}</div>
          ))
        )} */}
      </div>
    </>
  );
}
export default User;
