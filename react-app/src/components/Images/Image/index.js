import React from 'react'
import { NavLink } from 'react-router-dom';
import './Image.css'

function Image({ image, user }) {
  const { Image } = image;
  // console.log('image page = ', image)
  // console.log('IMAGE PAGE = ', Image)
  // console.log('IMAGE PAGE USER = ', user)

  return (
    <div>
    <NavLink to={`/users/${user.id}`}>
      <p>{user.username}</p>
    </NavLink>
      <img src={Image?.image_url} alt={Image?.caption} />
      <p>{Image?.caption}</p>
      <p>{Image?.num_likes} Likes</p>
      <p>{Image?.num_comments} Comments</p>
      <p>
        {Image?.Comments.map((comment) => (
          <div>
            <p key={comment?.id}>{comment?.body}</p>
            <p>{comment?.user.username}</p>
          </div>
        ))}
      </p>
    </div>
  );
}

export default Image
