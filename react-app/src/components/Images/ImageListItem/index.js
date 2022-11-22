import React from 'react'
import { NavLink } from 'react-router-dom'
import './ImageListItem.css'

function ImageListItem({ image, user }) {

  const postDate = image?.updated_at ? image?.updated_at?.slice(0, 16) : image?.created_at?.slice(0, 16)

  return (
    <div className='image-list-item-container'>
      <NavLink to={`/users/${user?.id}`}>
        <p>{user?.username}</p>
      </NavLink>
      <NavLink className='image-list-item-img-link' to={`/images/${image?.id}`}>
        <div className='image-list-item-img-container'>
          <img
            className='image-list-item-img'
            src={image?.image_url}
            alt={image.caption}
          />
          <p className='image-list-item-img-caption'>{image?.caption}</p>
          <div className='image-list-item-post-date'>
            {postDate}
          </div>
        </div>
        <p>View all {image?.Comments?.length} Comments</p>
      </NavLink>
      <div>
        <p>{image?.Likes?.length} Likes</p>
      </div>
    </div>
  );
};

export default ImageListItem
