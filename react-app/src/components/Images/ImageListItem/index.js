import React from 'react'
import { NavLink } from 'react-router-dom'
import './ImageListItem.css'

function ImageListItem({ image }) {
  // console.log('Image List Item = ', image)
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
