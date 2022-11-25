import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentListItem from '../CommentListItem';
import './CommentList.css';

function CommentList({ comments }) {
  const dispatch = useDispatch()

  // const comments = useSelector(state => state.comments)
  // console.log('COMMENTS COMMENT LIST = ', comments)

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
