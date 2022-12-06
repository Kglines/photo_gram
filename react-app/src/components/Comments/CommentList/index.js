import React from 'react';
import { NavLink } from 'react-router-dom';
import CommentListItem from '../CommentListItem';
import './CommentList.css';

function CommentList({ comments, image }) {
  // console.log(image)
  const imageComments = comments.filter(
    (comment) => {
    return comment?.image_id === image?.Image?.id
  });
  
  return (
    <div className='comment-container'>
      <NavLink className='user-link' to={`/users/${image?.Image?.user_id}`}>
        <p className='comment-user'>{image?.Image?.owner?.username}</p>
      </NavLink>
      <p className='comment-body'>{image?.Image?.caption}</p>
      {imageComments?.map((comment) => (
        <div className='comment-container-content' key={comment?.id}>
          <CommentListItem comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList
