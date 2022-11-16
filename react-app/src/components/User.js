import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserImages } from '../store/images';

function User() {
  const [user, setUser] = useState({});
  const { Images } = user
  // const [images, setImages] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  
  // const fetchedImages = useSelector(state => state.images)
  // console.log('FETCHED IMAGES = ', fetchedImages)
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
          <strong>Username</strong> {user?.username}
        </li>
        <li>
          <strong>Email</strong> {user?.email}
        </li>
        <li>
          <strong>Bio</strong> {user?.bio}
        </li>
        <li>
          <img
            className='profile-pic'
            src={user?.profile_img}
            alt={user?.username}
          />
        </li>
        <li>
          <strong>{Images.length}</strong> posts
        </li>
      </ul>
      <div>
        {user &&
          Images?.map((image) => (
            <div key={image?.id}>
              <img src={image?.image_url} alt={image?.caption} />
              <div>{image?.caption}</div>
              <div>{image?.Likes.length} Likes</div>
              <div>
                {image?.Comments?.length} Comments
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default User;
