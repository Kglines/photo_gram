import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateComments } from '../../../store/comments'
import './CommentCreateForm.css'

function CommentCreateForm({ image }) {
  
  const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        body: comment
      }

      dispatch(fetchCreateComments(payload, image?.Image?.id))
        .then(async (res) => {
          if(res.ok === false) {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
          }
          else {
            setComment('')
            setErrors([])
          }
        })
    }

  return (
    <div>
      <form className='comment-create-form-container' onSubmit={handleSubmit}>
        {/* {errors.map(error => (
          <div className='errors comment-errors' key={error}>{error}</div>
        ))} */}
        <input
          type='text'
          placeholder='Add a Comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={comment?.length < 1 ? true : false}>Post</button>
      </form>
      <div>
        {errors.map((error) => (
          <div className='errors comment-errors' key={error}>
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentCreateForm
