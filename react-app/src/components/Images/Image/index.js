import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ImageEditForm from '../ImageEditForm';
import ImageDelete from '../ImageDelete';
import './Image.css'
import { useDispatch, useSelector } from 'react-redux';
import CommentCreateForm from '../../Comments/CommentCreateForm';
import CommentList from '../../Comments/CommentList';
import Likes from '../../Likes';
import { fetchCreateLike } from '../../../store/images';
import { fetchDeleteLike } from '../../../store/images';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';

function Image({ image, user, loadImage }) {
  const { imageId } = useParams()
  const dispatch = useDispatch()
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sessionUser = useSelector(state => state.session.user)
  const isOwner = sessionUser.id === image?.Image?.user_id

  const liked = image?.Image?.Likes?.liked
  // console.log('Load Image = ', () => loadImage(imageId))
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
            <CommentList comments={image?.Image?.Comments} />
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
                <FaRegComment className='comment-icon' />
              </div>
              <div className='image-icons-res-image'>
                {image?.Image?.Likes?.total === 1 ? (
                  <p>{image?.Image?.Likes?.total} Like</p>
                ) : (
                  <p>{image?.Image?.Likes?.total} Likes</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <CommentCreateForm className='comment-create-form' image={image} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image
