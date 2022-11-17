import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import './ImageListItem.css'

function ImageListItem({ image, user }) {
  
  const history = useHistory()
  // console.log('Image List Item = ', image)
  // console.log('IMAGE LIST ITEM USER = ', user.find(u => u.id === image.user_id))
  // console.log('USER from IMAGE LIST ITEM', user)
  // let imageUser = user?.filter((u) => u?.id === image?.user_id);
  // console.log('ImageUser FIND', imageUser[0].id)
  
  return (
    <div>
    <NavLink to={`/users/${user?.id}`}>
      <p>{user?.username}</p>

    </NavLink>
    {/* <img src={imageUser[0].profile_img} alt={imageUser[0].username}/> */}
      {/* <div>{imageUser[0]?.username}</div> */}
      <NavLink to={`/images/${image?.id}`}>
        <img src={image?.image_url} alt={image.caption} />
        <p>{image?.caption}</p>
        <p>View all {image?.Comments.length} Comments</p>
      </NavLink>
      <div>
        <p>{image?.Likes.length} Likes</p>
      </div>
    </div>
  );
}

export default ImageListItem
