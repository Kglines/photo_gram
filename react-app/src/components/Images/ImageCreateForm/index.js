import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllImages } from '../../../store/images'
import './ImageCreateForm.css'

function ImageCreateForm({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [caption, setCaption] = useState('')
  const [image_url, setImage_url] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image_url', image_url);

    setImageLoading(true);
    
    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      await res.json();
      setImageLoading(false);
      dispatch(fetchAllImages())
      history.push(`/home`);
      setShowModal(false);
    } else {
      setImageLoading(false);
      const data = await res.json();
      if(data && data.errors) setErrors(data.errors)
    }
  }

  const isDisabled = () => {
    if(caption.length < 1 || caption[0].includes(' ')){
      return true
    } else {
      return false
    }
  }

  const emojiClick = (emojiObject) => {
    setCaption((prevInput) => prevInput + emojiObject);
    setShowPicker(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='modal-container'>
        <h2 className='modal-form-title'>Share A New Image</h2>
        {errors &&
          errors.map((error) => (
            <div className='errors' key={error}>
              {error}
            </div>
          ))}
        {imageLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <input
              className='modal-input-title file-btn'
              type='file'
              accept='image/*'
              onChange={(e) => setImage_url(e.target.files[0])}
              required
            />
            <textarea
              className='modal-input-title'
              type='text'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              name='caption'
              placeholder='Caption goes here...'
              required
            />
            <div>
              <span id='create-image-emoji-picker'>
                {showPicker && (
                  <EmojiPicker
                    emojiStyle='native'
                    onEmojiClick={(e) => emojiClick(e.emoji)}
                    // id='create-image-emoji-picker'
                    height={'350px'}
                    searchDisabled={true}
                  />
                )}
                <BsEmojiSmile
                  className='show-emoji-create-image'
                  onClick={() => setShowPicker(!showPicker)}
                />
              </span>
              <button
                disabled={isDisabled()}
                className='modal-btn modal-submit-btn'
                type='submit'
              >
                Share
              </button>
              <button
                className='modal-btn modal-cancel-btn'
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ImageCreateForm
