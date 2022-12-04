import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ImageEditForm from '../ImageEditForm';
import ImageDelete from '../ImageDelete';
import './Image.css'
import { useDispatch, useSelector } from 'react-redux';
import CommentCreateForm from '../../Comments/CommentCreateForm';
import CommentList from '../../Comments/CommentList';
import { fetchCreateLike } from '../../../store/images';
import { fetchDeleteLike } from '../../../store/images';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { fetchAllComments } from '../../../store/comments';

function Image({ image, user, loadImage, isLoading }) {
  const { imageId } = useParams()
  const dispatch = useDispatch()
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  
  const comments = Object.values(useSelector(state => state.comments))

  useEffect(() => {
    dispatch(fetchAllComments(imageId))
  }, [dispatch, imageId])

  const sessionUser = useSelector(state => state.session.user)
  const isOwner = sessionUser.id === image?.Image?.user_id

  const liked = image?.Image?.Likes?.liked

  const handleClick = async () => {
    return liked
      ? await dispatch(fetchDeleteLike(imageId))
          .then(() => loadImage(imageId))
          .then(() => loadImage(imageId))
      : await dispatch(fetchCreateLike(imageId))
          .then(() => loadImage(imageId))
          .then(() => loadImage(imageId))
  };

  return (
    <div className='image-container'>
      <div className='image-btn-container'>
        {isOwner && (
          <button className='edit-btn' onClick={() => setEditModal(true)}>
            Edit
          </button>
        )}
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <ImageEditForm
              setEditModal={setEditModal}
              imageId={imageId}
              image={image}
            />
          </Modal>
        )}
        {isOwner && (
          <button className='delete-btn' onClick={() => setDeleteModal(true)}>
            Delete
          </button>
        )}
        {deleteModal && (
          <Modal onClose={() => setDeleteModal(false)}>
            <ImageDelete
              setDeleteModal={setDeleteModal}
              imageId={imageId}
              image={image}
            />
          </Modal>
        )}
      </div>
      <div className='full-image'>
          
        <div className='image-pic-container'>
          {isLoading && <p>Loading...</p>}
          <img
            className='image-pic'
            src={image?.Image?.image_url}
            alt={image?.Image?.caption}
          />
        </div>
        <div className='image-text-container'>
          <div className='image-text-container-header'>
            <NavLink to={`/users/${user?.id}`} className='user-link'>
              {user?.profile_img && (
                <img
                  className='profile-img'
                  src={user?.profile_img}
                  alt={user?.username}
                />
              )}
              <p>{user?.username}</p>
            </NavLink>
          </div>
          <div className='caption-container'>
            <NavLink className='user-link' to={`/users/${user?.id}`}>
              <p>{user?.username}</p>
            </NavLink>
            <p className='caption'>{image?.Image?.caption}</p>
          </div>
          <div className='comment-container'>
            <CommentList comments={comments} image={image} />
          </div>
          <div>
            <div className='image-icons-container-image'>
              <div className='image-icons'>
                {liked ? (
                  <FaHeart
                    className='like-icon'
                    style={{ color: 'red' }}
                    onClick={handleClick}
                  />
                ) : (
                  <FaRegHeart className='like-icon' onClick={handleClick} />
                )}
              </div>
              <div className='image-icons-res-image'>
                {image?.Image?.num_likes === 1 ? (
                  <p>{image?.Image?.num_likes} Like</p>
                ) : (
                  <p>{image?.Image?.num_likes} Likes</p>
                )}
              </div>
            </div>
          <div>
            <CommentCreateForm className='comment-create-form' image={image} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image
