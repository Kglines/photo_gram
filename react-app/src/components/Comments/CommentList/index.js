import React from 'react';
import CommentListItem from '../CommentListItem';
import './CommentList.css';

function CommentList({ comments, image }) {
  
  const imageComments = comments.filter(
    (comment) => {
    return comment?.image_id === image?.Image?.id
  });
  
  return (
    <div className='comment-container'>
      {imageComments?.map((comment) => (
        <div className='comment-container-content' key={comment?.id}>
          <CommentListItem comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList
