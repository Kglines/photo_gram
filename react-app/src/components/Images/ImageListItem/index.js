import React from 'react'
import { NavLink } from 'react-router-dom'
import './ImageListItem.css'

function ImageListItem({ image, user }) {
  return (
    <div className='image-list-item-container'>
      <NavLink to={`/users/${user?.id}`}>
        <p>{user?.username}</p>
      </NavLink>
      <NavLink to={`/images/${image?.id}`}>
        <img src={image?.image_url} alt={image.caption} />
        <p>{image?.caption}</p>
        <p>View all {image?.Comments?.length} Comments</p>
      </NavLink>
      <div>{image?.created_at}</div>
      <div>
        <p>{image?.Likes?.length} Likes</p>
      </div>
    </div>
  );
};

export default ImageListItem
