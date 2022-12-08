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
import { fetchCreateFollow, fetchDeleteFollow, fetchFollows } from '../store/follows';
import { fetchGetUser } from '../store/session';
import Follow from './Follow';

function User() {
  const { userId } = useParams();
  const parsedId = parseInt(userId)
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [errors, setErrors] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  
  const userImages = Object.values(useSelector(state => state?.images?.user_images ? state.images?.user_images : state.images))
  const sessionUser = useSelector(state => state.session.user)
  // const userFollows = useSelector(state => state.follows)
  
  let imageOwner;
  imageOwner = userImages[0]?.owner


  const isOwner = sessionUser.id === imageOwner?.id;
  
  const { Images } = user
  
  useEffect(() => {
    dispatch(fetchUserImages(userId));
  }, [dispatch, userId])


  useEffect(() => {
    setIsMounted(true)
    const fetchData = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      
      setUser(user)
    }
    fetchData()
    .catch(async (res) => {
      const data = await res.json()
      if(data && data.errors) setErrors(data.errors)
    })
    return () => {setIsMounted(false)}
  }, [dispatch, userId])


  useEffect(() => {
    dispatch(fetchFollows(sessionUser.id))
  }, [dispatch])
  

  if (!user) {
    return null;
  }

  const loadImages = (userId) => {
    return dispatch(fetchUserImages(userId))
  }
  
  return (
    <>
      <div>
        <div className='user-info-container'>
          <div>
            {editModal && (
              <Modal onClose={() => setEditModal(false)}>
                <UserEditForm user={sessionUser} setEditModal={setEditModal} />
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
              {isOwner ? (
                <div>
                  <strong>{sessionUser?.username}</strong>
                </div>

              ) : (
                <div>
                  <strong>{user?.username}</strong>
                </div>
              )}
                <div className='user-info-edit-btn'>
                  {isOwner ? (
                    <button
                      className='user-edit-btn'
                      onClick={() => setEditModal(true)}
                    >
                      Update Profile
                    </button>
                  ) : (
                  <Follow 
                    user={user} 
                    sessionUser={sessionUser} 
                  />
                  )}
                </div>
              </li>
              {isOwner &&  (
                <div>
                  {user?.firstname && (
                    <li className='user-info-item'>
                      <strong>Name: </strong> {sessionUser?.firstname} {sessionUser?.lastname}
                    </li>
                  )}
                  <li className='user-info-item'>
                    <strong>Email: </strong> {sessionUser?.email}
                  </li>
                  {user?.bio ? (
                    <li className='user-info-item user-bio'>
                      <strong>Bio: </strong> {sessionUser?.bio}
                    </li>
                  ) : null}
                  <li className='user-info-item'>
                    <strong>Posts: </strong> {Images?.length}
                  </li>
                </div>
              )}
              {!isOwner &&  (
                <div>
                  {user?.firstname && (
                    <li className='user-info-item'>
                      <strong>Name: </strong> {user?.firstname}{' '}
                      {user?.lastname}
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
                </div>
              )}
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
        {errors?.map(error => <p key={error} className='errors'>{error}</p>)}
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
