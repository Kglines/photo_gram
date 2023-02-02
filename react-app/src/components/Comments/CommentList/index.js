import React from 'react';
import { NavLink } from 'react-router-dom';
import CommentListItem from '../CommentListItem';
import './CommentList.css';

function CommentList({ comments, image }) {
  const imageComments = comments.filter(
    (comment) => {
    return comment?.image_id === image?.Image?.id
  });
  console.log(image)
  return (
    <div className='comment-container'>
      <NavLink className='user-link' to={`/users/${image?.Image?.user_id}`}>
        {image?.Image?.owner?.profile_img && <img
          // style={{ marginTop: '20px' }}
          src={image?.Image?.owner?.profile_img}
          alt={image?.Image?.owner?.username}
        />}
        <p 
          // style={{ marginLeft: '25px' }} 
          className='comment-user'>
          {image?.Image?.owner?.username}
        </p>
      </NavLink>
      <p
        className='comment-body'
        // style={{ marginLeft: '55px', marginTop: '-25px', marginBottom: '25px' }}
      >
        {image?.Image?.caption}
      </p>
      {imageComments?.map((comment) => (
        <div className='comment-container-content' key={comment?.id}>
          <CommentListItem comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList
