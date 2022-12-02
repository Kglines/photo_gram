import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDeleteComments } from '../../../store/comments'
import { fetchOneImage } from '../../../store/images';

function CommentDelete({ comment, setDeleteModal }) {
    const { imageId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])

    const onDelete = () => {
        let delComment = dispatch(fetchDeleteComments(comment?.id))
        // .then(() => history.push(`/images/${imageId}`))
        // .then(() => dispatch(fetchOneImage(imageId)))
        // .then(() => dispatch(fetchOneImage(imageId)))
        // .then(() => dispatch(fetchOneImage(imageId)))
        // .then(() => setDeleteModal(false))
        .catch(async (res) => {
            const data = await res.json()
            if (data?.errors) setErrors(data?.errors)
        })
        // console.log('COMMENT DELETE = ', delComment);
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
