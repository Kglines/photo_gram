import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { fetchOneImage } from '../../../store/images'
import { fetchEditComments } from '../../../store/comments'

function CommentEditForm({ setEditModal, comment}) {
  // console.log('EDIT COMMENT = ', comment)
    const dispatch = useDispatch()
    // const { imageId } = useParams()

    const [body, setBody] = useState(comment?.body)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        const newComment = dispatch(fetchEditComments(payload, comment?.id))
        .then(() => setEditModal(false))
        .catch(async (res) => {
            const data = await res.json()
            if (data?.errors) setErrors(data?.errors)
        })
        setBody('')
        return newComment
    }
  return (
    <form className='modal-container' onSubmit={handleSubmit}>
      <h2>Edit Comment</h2>
      {errors?.map((error) => (
        <li className='errors' key={error}>
          {error}
        </li>
      ))}
      <textarea
        className='modal-input-title'
        type='text'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div>
        <button className='modal-btn modal-submit-btn'>Submit</button>
        <button
          className='modal-btn modal-cancel-btn'
          onClick={() => setEditModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CommentEditForm
