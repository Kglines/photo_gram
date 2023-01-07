import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateComments } from '../../../store/comments'
import EmojiPicker from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'
import './CommentCreateForm.css'

function CommentCreateForm({ image }) {
  
  const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [showPicker, setShowPicker] = useState(false)

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

    const isDisabled = () => {
      if (comment.length < 1 || comment[0].includes(' ')) {
        return true;
      } else {
        return false;
      }
    };

    const emojiClick = (emojiObject) => {
      setComment(prevInput => prevInput + emojiObject)
      setShowPicker(false)
    }

  return (
    <div>
      <form className='comment-create-form-container' onSubmit={handleSubmit}>
        <span className='emoji-container'>
          {showPicker && (
            <EmojiPicker
              
              onEmojiClick={(e) => emojiClick(e.emoji)}
              emojiStyle='native'
              className='emoji-picker'
              
            />
          )}
          <BsEmojiSmile
            className='show-emoji'
            onClick={() => setShowPicker(!showPicker)}
          />
        </span>
        <input
          type='text'
          placeholder='Add a Comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={isDisabled()}>Post</button>
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
