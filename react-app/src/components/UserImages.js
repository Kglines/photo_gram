import React from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchCreateLike, fetchDeleteLike } from '../store/images'


function UserImages({ image, loadImages }) {
  const dispatch = useDispatch();
  const { userId } = useParams();


  const isLiked = image?.Likes?.liked
  
  const handleClick = async (e) => {
    e.preventDefault();
    // Delete a like ff the image has already been liked, 
    return isLiked
      ? await dispatch(fetchDeleteLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
      : 
      // Create a like if the image has not been liked
        await dispatch(fetchCreateLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId));
  };

  const postDate = image?.updated_at
    ? image?.updated_at?.slice(0, 16)
    : image?.created_at?.slice(0, 16);

  // Intersection Observer...adds class to each img element to gradually reveal the image
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
  const hiddenElements = document.querySelectorAll('.image-list-item-img');
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <div>
      <div className='image-list-item-container' key={image?.id}>
        <NavLink className='user-link' to={`/users/${image?.owner?.id}`}>
          <p>{image?.owner?.username}</p>
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
              {isLiked ? (
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
    </div>
  );
}

export default UserImages
