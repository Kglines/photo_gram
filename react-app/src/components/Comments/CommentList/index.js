import React from 'react';
import CommentListItem from '../CommentListItem';
import './CommentList.css';

function CommentList({ comments }) {
  
  return (
    <div className='comment-container'>
      {comments?.map((comment) => (
        <div className='comment-container-content' key={comment?.id}>
          <CommentListItem comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList
