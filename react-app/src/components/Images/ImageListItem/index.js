import React from 'react'
import { NavLink } from 'react-router-dom'
import Likes from '../../Likes';
import { FaRegComment } from 'react-icons/fa';
import './ImageListItem.css'

function ImageListItem({ image, user, loadImages }) {

  const postDate = image?.updated_at ? image?.updated_at?.slice(0, 16) : image?.created_at?.slice(0, 16)

  return (
    <div className='image-list-item-container'>
      <NavLink to={`/users/${user?.id}`}>
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
            alt={image.caption}
          />
        </NavLink>
        <div className='image-icons-container'>
          <div className='image-icons'>
            <Likes
              className='like-icon'
              image={image}
              loadImages={loadImages}
            />
            <FaRegComment className='comment-icon' />
          </div>
          <div className='image-icons-res'>
            {image?.Likes?.total === 1 ? (
              <p>{image?.Likes?.total} Like</p>
            ) : (
              <p>{image?.Likes?.total} Likes</p>
            )}
          </div>
        </div>
        <p className='image-list-item-img-caption'>{image?.caption}</p>
        <div className='image-list-item-post-date'>{postDate}</div>
      </div>
      <p>View all {image?.Comments?.length} Comments</p>
    </div>
  );
};

export default ImageListItem
