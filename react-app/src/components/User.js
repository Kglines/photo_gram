import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import { fetchCreateFollow, fetchFollows } from '../store/follows';
import { fetchUserImages } from '../store/images';
import ImageCreateForm from './Images/ImageCreateForm';
import ImageListItem from './Images/ImageListItem';
import './User.css'
import UserEditForm from './UserEditForm';

function User() {
  const { userId } = useParams();
  const parsedId = parseInt(userId)
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const userImages = Object.values(useSelector(state => state?.images?.user_images ? state.images.user_images : state.images))
  const sessionUser = useSelector(state => state.session.user)
  const canLike = sessionUser.id !== user.id
  const follows = useSelector(state => state.follows)

  console.log('USER = ', user)
  console.log('SESSION USER = ', sessionUser)
  console.log('FOLLOWS', follows)

  useEffect(() => {
    dispatch(fetchFollows(userId))
  }, [dispatch])
  
  useEffect(() => {
    dispatch(fetchUserImages(parsedId));
  }, [dispatch, parsedId])

  const { Images } = user
  // console.log('IMAGE FROM USER = ', Images)
  // const [images, setImages] = useState({});

  
  
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

  const loadImages = (userId) => {
    return dispatch(fetchUserImages(userId))
  }

  console.log('follow', userId)
  const handleFollow = (sessionUser, userId) => {
    return dispatch(fetchCreateFollow(sessionUser, userId))
  }

  // console.log('USER LOAD = ', loadImages)
  
  return (
    <>
      <div>
        <div className='user-info-container'>
          <div className='user-img-container'>
            <li>
              {/* <img
                className='profile-pic'
                src={user?.profile_img}
                alt={user?.username}
              /> */}
            </li>
          </div>
          <div className='user-info'>
            <ul>
              <li className='user-info-item'>
                {user?.firstname} {user?.lastname}
              </li>
              <li className='user-info-item'>
                <strong>Username</strong> {user?.username}
              </li>
              <li className='user-info-item'>
                <strong>Email</strong> {user?.email}
              </li>
              <li className='user-info-item'>
                <strong>Bio</strong> {user?.bio}
              </li>
              <li className='user-info-item'>
                <strong>{Images?.length}</strong> posts
              </li>
            </ul>
          </div>
          <div className='user-edit-btn'>
            <button onClick={() => setEditModal(true)}>Edit Profile</button>
            {editModal && (
              <Modal onClose={() => setEditModal(false)}>
                <UserEditForm user={user} setEditModal={setEditModal} />
              </Modal>
            )}
          </div>
        </div>
      </div>

      <div>
        <button onClick={() => setShowModal(true)}>+</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ImageCreateForm setShowModal={setShowModal} />
          </Modal>
        )}
        <p>New</p>
      </div>
      <div>
        {canLike && (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
      <div>
        {userImages?.map((image) => (
          <div key={image?.id}>
            <ImageListItem image={image} loadImages={loadImages} />
          </div>
        ))}
      </div>
    </>
  );
}
export default User;
