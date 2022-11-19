import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateComments } from '../../../store/comments'
import { fetchOneImage } from '../../../store/images'

function CommentCreateForm({ image }) {
  const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
      e.preventDefault();

      const payload = {
        body: comment
      }

      const newComment = dispatch(fetchCreateComments(payload, image?.Image.id))
      .then(() => dispatch(fetchOneImage(image?.Image?.id)))
        .catch(async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        })
        setComment('')
        return newComment
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
            type='text'
            placeholder='Comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={comment?.length < 1 ? true : false}>Post</button>
    </form>
  )
}

export default CommentCreateForm
