import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { fetchOneImage } from '../../../store/images'
import { fetchEditComments } from '../../../store/comments'

function CommentEditForm({ setEditModal, comment}) {
  
    const dispatch = useDispatch()

    const [body, setBody] = useState(comment?.body)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        dispatch(fetchEditComments(payload, comment?.id))
        .then(async (res) => {
          if (res.ok === false){
            const data = await res.json()
            if (data.errors) setErrors(data.errors)
          } else {
            setErrors([])
            setEditModal(false)
          }
        })
    }

    const isDisabled = () => {
      if (body.length < 1 || body[0].includes(' ')) {
        return true;
      } else {
        return false;
      }
    };

  return (
    <form className='modal-container' onSubmit={handleSubmit}>
      <h2>Edit Comment</h2>
      {errors?.map((error) => (
        <div className='errors' key={error}>
          {error}
        </div>
      ))}
      <textarea
        className='modal-input-title'
        type='text'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div>
        <button disabled={isDisabled()} className='modal-btn modal-submit-btn'>Submit</button>
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
