import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import { fetchUserImages } from '../store/images';
import ImageCreateForm from './Images/ImageCreateForm';
import ImageListItem from './Images/ImageListItem';
import './User.css'
import UserEditForm from './UserEditForm';

function User() {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { Images } = user
  // console.log('IMAGE FROM USER = ', Images)
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
      <div>
        <div className='user-info-container'>
          <div className='user-img-container'>
            <li>
              <img
                className='profile-pic'
                src={user?.profile_img}
                alt={user?.username}
              />
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
                <UserEditForm setEditModal={setEditModal} />
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
        {user &&
          Images?.map((image) => (
            <div key={image?.id}>
              <ImageListItem image={image} />
            </div>
          ))}
      </div>
    </>
  );
}
export default User;
