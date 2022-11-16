import React from 'react'
import { NavLink } from 'react-router-dom'
import './ImageListItem.css'

function ImageListItem({ image }) {
  return (
    <div>
      <NavLink to={`/images/${image.id}`}>
        <img src={image?.image_url} alt={image.caption} />
        {image?.caption}
      </NavLink>
    </div>
  )
}

export default ImageListItem
