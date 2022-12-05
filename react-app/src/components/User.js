import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import { fetchUserImages } from '../store/images';
import ImageCreateForm from './Images/ImageCreateForm';
import ImageListItem from './Images/ImageListItem';
import './User.css'
import UserEditForm from './UserEditForm';
import { VscDiffAdded } from 'react-icons/vsc';
import { fetchCreateFollow } from '../store/follows';

function User() {
  const { userId } = useParams();
  const parsedId = parseInt(userId)
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const userImages = Object.values(useSelector(state => state?.images?.user_images ? state.images?.user_images : state.images))
  const sessionUser = useSelector(state => state.session.user)
  console.log('session user = ', sessionUser, user.Follows)
  const isOwner = sessionUser.id === parsedId;
  const { Images } = user
  
  useEffect(() => {
    dispatch(fetchUserImages(userId));
  }, [dispatch, userId])

  
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [user, userId]);

  if (!user) {
    return null;
  }

  const loadImages = (userId) => {
    return dispatch(fetchUserImages(userId))
  }

  // const createFollows = () => {
  //   const payload = {
  //     user_id: user?.id,
  //     follows_id: sessionUser?.id
  //   }
  //   dispatch(fetchCreateFollow(payload, user?.id))
  //   console.log('payload', payload)
  // }
  
  return (
    <>
      <div>
        <div className='user-info-container'>
          <div>
            {editModal && (
              <Modal onClose={() => setEditModal(false)}>
                <UserEditForm user={user} setEditModal={setEditModal} />
              </Modal>
            )}
          </div>
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
              <li className='user-info-item user-info-username'>
                <div>
                  <strong>{user?.username}</strong>
                </div>
                <div className='user-info-edit-btn'>
                  {isOwner && (
                    <button
                      className='user-edit-btn'
                      onClick={() => setEditModal(true)}
                    >
                      Update Profile
                    </button>
                  )}
                  {/* {!isOwner && (
                    <button onClick={createFollows}>Follow</button>
                  )} */}
                </div>
              </li>
              {user?.firstname && (
                <li className='user-info-item'>
                  <strong>Name: </strong> {user?.firstname} {user?.lastname}
                </li>
              )}
              <li className='user-info-item'>
                <strong>Email: </strong> {user?.email}
              </li>
              {user?.bio ? (
                <li className='user-info-item user-bio'>
                  <strong>Bio: </strong> {user?.bio}
                </li>
              ) : null}
              <li className='user-info-item'>
                <strong>Posts: </strong> {Images?.length}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        {/* <button onClick={() => setShowModal(true)}> */}

        {/* </button> */}
        {isOwner && (
          <div className='user-profile-create'>
            <div>
              <VscDiffAdded
                className='add-btn'
                onClick={() => setShowModal(true)}
              />
            </div>
            <div>Create</div>
          </div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ImageCreateForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
      <div className='profile-image-list'>
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
