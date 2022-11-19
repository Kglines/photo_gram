import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneImage } from '../../../store/images'
import { fetchEditComments } from '../../../store/comments'

function CommentEditForm({ setEditModal, comment}) {
    const dispatch = useDispatch()
    const { imageId } = useParams()

    const [body, setBody] = useState(comment?.body)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        const newComment = dispatch(fetchEditComments(payload, comment?.id))
        .then(() => dispatch(fetchOneImage(imageId)))
        .then(() => setEditModal(false))
        .catch(async (res) => {
            const data = await res.json()
            if (data?.errors) setErrors(data?.errors)
        })
        return newComment
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name='comment'
        />
        {errors?.map(error => (
            <li className='errors' key={error}>{error}</li>
        ))}
        <button>Submit</button>
        <button onClick={() => setEditModal(false)}>Cancel</button>
    </form>
  )
}

export default CommentEditForm
