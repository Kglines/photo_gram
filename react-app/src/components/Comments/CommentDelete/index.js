import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDeleteComments } from '../../../store/comments'
import { fetchOneImage } from '../../../store/images';

function CommentDelete({ comment, setDeleteModal }) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])

    const onDelete = () => {
        let delComment = dispatch(fetchDeleteComments(comment?.id))
        .catch(async (res) => {
            const data = await res.json()
            if (data?.errors) setErrors(data?.errors)
        })
        setDeleteModal(false);
        return delComment
    }
  return (
    <div className='modal-container'>
      <ul>
        {errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <h2>Are you sure you want to delete your comment?</h2>
      <div>
        <button
          className='modal-btn modal-submit-btn'
          onClick={() => onDelete()}
        >
          Delete
        </button>
        <button
          className='modal-btn modal-cancel-btn'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CommentDelete
