import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEditImage, fetchOneImage } from '../../../store/images'
import './ImageEditForm.css'

function ImageEditForm({ imageId, setEditModal, image }) {
  const [caption, setCaption] = useState(image?.Image?.caption)
  const [image_url, setImage_url] = useState(image?.Image?.image_url)
  const [errors, setErrors] = useState([])

  console.log('IMAGE EDIT FORM = ', image?.Image?.user_id, imageId)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: image?.id,
      caption,
      image_url
    }

    const newImage = dispatch(fetchEditImage(payload, imageId))
    .then(() => dispatch(fetchOneImage(imageId)))
    .then(() => {
      setEditModal(false)
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors)
    })

    return newImage;
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Edit your caption</p>
      <input 
        type='text' 
        value={caption} 
        onChange={(e) => setCaption(e.target.value)} 
        name='caption' 
        required 
      />
      <input 
        type='text' 
        value={image_url} 
        onChange={(e) => setImage_url(e.target.value)} 
        name='image_url' 
        required 
      />
      {errors?.map(error => (
        <li key={error} className='errors'>{error}</li>
      ))}
      <button>Continue</button>
      <button onClick={() => setEditModal(false)}>Cancel</button>
    </form>
  )
}

export default ImageEditForm
