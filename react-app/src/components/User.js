import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import { fetchUserImages } from '../store/images';
import ImageCreateForm from './Images/ImageCreateForm';
import './User.css';
import UserEditForm from './UserEditForm';
import { VscDiffAdded } from 'react-icons/vsc';
import Follow from './Follow/Follow';
import Following from './Follow/Following';
import Followers from './Follow/Followers';
import UserImages from './UserImages';


function User() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);
  const [errors, setErrors] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  const [images, setImages] = useState([]);

  const myImages = Object.values(useSelector(state => state.images.user_images))
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchUserImages(userId));
      setImages(response)
    }
    fetchData()
      
  }, [dispatch, userId])
 
  const sessionUser = useSelector(state => state.session.user)
  
  const isOwner = sessionUser?.id === user?.id;

  useEffect(() => {
    setIsMounted(true)
    const fetchData = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user)
    }
    fetchData()
    return () => {setIsMounted(false)}
  }, [dispatch, userId, user?.bio, user?.firstname, user?.lastname, images])

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
                    <Follow user={user} sessionUser={sessionUser} />
                  )}
                  {/* {isOwner && (
                    <button
                      className='user-edit-btn'
                      onClick={() => setEditModal(true)}
                    >
                      Update Profile
                    </button>
                  )} */}
                </div>
              </li>
              {isOwner && (
                <div>
                  {sessionUser?.firstname && (
                    <li className='user-info-item'>
                      <strong>Name: </strong> {sessionUser?.firstname}{' '}
                      {sessionUser?.lastname}
                    </li>
                  )}
                  <li className='user-info-item'>
                    <strong>Email: </strong> {sessionUser?.email}
                  </li>
                  {sessionUser?.bio ? (
                    <li className='user-info-item user-bio'>
                      <strong>Bio: </strong> {sessionUser?.bio}
                    </li>
                  ) : null}
                  <li className='user-info-item'>
                    <strong>Posts: </strong> {user?.Images?.length}
                  </li>
                </div>
              )}
              {!isOwner && (
                <div>
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
                    <strong>Posts: </strong> {user?.Images?.length}
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className='user-profile-btns'>
        {/* <button onClick={() => setShowModal(true)}> */}

        {/* </button> */}
        {isOwner && (
          <div className='user-profile-create'>
            <div>
              <VscDiffAdded
                className='add-btn'
                onClick={() => setShowModal(true)}
                title='Create Post'
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
        <div className='follows-btns'>
          {isOwner && (
            <div className='following-btn'>
              <button onClick={() => setFollowingModal(true)}>Following</button>
              {followingModal && (
                <Modal onClose={() => setFollowingModal(false)}>
                  <Following
                    setFollowingModal={setFollowingModal}
                    user={user}
                  />
                </Modal>
              )}
            </div>
          )}
          {isOwner && (
            <div className='followers-btn'>
              <button onClick={() => setFollowersModal(true)}>Followers</button>
              {followersModal && (
                <Modal onClose={() => setFollowersModal(false)}>
                  <Followers
                    setFollowersModal={setFollowersModal}
                    user={user}
                  />
                </Modal>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='profile-image-list'>
        {errors?.map((error) => (
          <p key={error} className='errors'>
            {error}
          </p>
        ))}
        {/* {user?.Images?.map((image) => (
          <div key={image?.id}>
            <ImageListItem image={image} loadImages={loadImages} />
          </div>
        ))} */}
        {/* {user && 
        <ImageList user={user} />
        } */}
        {/* {user?.Images?.map(image => (
          <>
          <UserImages key={image?.id} image={image} loadImages={loadImages} user={sessionUser} />

          </>
        ))} */}
        {myImages?.map((image) => (
          <>
            <UserImages
              key={image?.id}
              image={image}
              loadImages={loadImages}
              user={sessionUser}
            />
          </>
        ))}
        {/* <UserImages loadImages={loadImages} /> */}
      </div>
    </>
  );
}
export default User;
