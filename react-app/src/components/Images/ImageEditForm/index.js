import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEditImage } from '../../../store/images'
import EmojiPicker from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'
import './ImageEditForm.css'

function ImageEditForm({ imageId, setEditModal, image }) {
  const [caption, setCaption] = useState(image?.Image?.caption)
  const [image_url, setImage_url] = useState(image?.Image?.image_url)
  const [errors, setErrors] = useState([])
  const [showPicker, setShowPicker] = useState(false);


  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: image?.id,
      caption,
      image_url
    }

    const newImage = dispatch(fetchEditImage(payload, imageId))
    .then(() => {
      setEditModal(false)
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data?.errors) setErrors(data?.errors)
    })
    
    return newImage;
  }

  const isDisabled = () => {
    if (caption.length < 1 || caption[0].includes(' ')) {
      return true;
    } else {
      return false;
    }
  };

  const emojiClick = (emojiObject) => {
    setCaption(prevInput => prevInput + emojiObject);
    setShowPicker(false)
  }

  return (
    <form className='modal-container' onSubmit={handleSubmit}>
      <h2>Edit your caption</h2>
      <textarea
        className='modal-input-title'
        type='text'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        name='caption'
        required
      />
      {errors?.map((error) => (
        <li key={error} className='errors'>
          {error}
        </li>
      ))}
      <div>
        {showPicker && (
          <span id='edit-caption-emojis'>
            <EmojiPicker
              id='emoji-picker'
              onEmojiClick={(e) => emojiClick(e.emoji)}
              emojiStyle='native'
              height={'400px'}
              searchDisabled={true}
            />
          </span>
        )}
        <span>
          <BsEmojiSmile
            style={{
              width: '30px',
              height: '30px',
              marginBottom: '-10px',
              marginRight: '10px',
            }}
            onClick={() => setShowPicker(!showPicker)}
          />
        </span>
        <button disabled={isDisabled()} className='modal-btn modal-submit-btn'>
          Continue
        </button>
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

export default ImageEditForm
