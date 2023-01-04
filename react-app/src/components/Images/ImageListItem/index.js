import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import './ImageListItem.css'
import { useDispatch } from 'react-redux';
import { fetchCreateLike, fetchDeleteLike} from '../../../store/images.js'


function ImageListItem({ image, user, loadImages }) {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const liked = image?.Likes?.liked

  const handleClick = async (e) => {
    return liked
      ? await dispatch(fetchDeleteLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
      :
        await dispatch(fetchCreateLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
  };

  const postDate = image?.updated_at ? image?.updated_at?.slice(0, 16) : image?.created_at?.slice(0, 16)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    })
  })
  const hiddenElements = document.querySelectorAll('.image-list-item-img');
  hiddenElements.forEach(el => observer.observe(el));

  return (
    <div className='image-list-item-container'>
      <NavLink className='user-link' to={`/users/${user?.id}`}>
        <p>{user?.username}</p>
      </NavLink>
      <div className='image-list-item-img-container'>
        <NavLink
          className='image-list-item-img-link'
          to={`/images/${image?.id}`}
        >
       
          <img
            className='image-list-item-img'
            src={image?.image_url}
            alt={image?.caption}
          />
      
       
        </NavLink>
        <div className='image-icons-container'>
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
            <NavLink className='comment-link' to={`/images/${image?.id}`}>
              <FaRegComment className='comment-icon' />
            </NavLink>
          </div>
          <div className='image-icons-res'>
            <div>
              <NavLink className='comment-link' to={`/images/${image?.id}`}>
                <p>View Comments</p>
              </NavLink>
            </div>
            <div>
              {image?.Likes?.total === 1 ? (
                <p>{image?.Likes?.total} Like</p>
              ) : (
                <p>{image?.Likes?.total} Likes</p>
              )}
            </div>
          </div>
        </div>
        <NavLink className='caption-link' to={`/images/${image?.id}`}>
          <p className='image-list-item-img-caption'>{image?.caption}</p>
        </NavLink>
        <div className='image-list-item-post-date'>{postDate}</div>
      </div>
    </div>
  );
};

export default ImageListItem
