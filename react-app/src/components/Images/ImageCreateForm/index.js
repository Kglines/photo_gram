import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchCreateImage } from '../../../store/images'
import './ImageCreateForm.css'

function ImageCreateForm({ setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [caption, setCaption] = useState('')
  const [image_url, setImage_url] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_url', image_url);

    setImageLoading(true);
    const createdImage = await dispatch(fetchCreateImage(formData))
      .then((res) => {
        setShowModal(false)
        return res
      })
      .then((res) => {
        history.push(`/images/${res.id}`)
      })
      .catch(async (res) => {
        const data = await res.json()
        if(data && data.errors) setErrors(data.errors)
      })
      return createdImage
  }

  const updatedImage = (e) => {
    const file = e.target.value
    setImage_url(file)
  }

  return (
    <div>
      {errors && errors.map(error => (
        <div key={error}>{error}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          name='caption'
          placeholder='Caption goes here...'
        />
        <input 
          type='file'
          accept='image_url/*'
          onChange={updatedImage}
        />
        <button type='submit'>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  )
}

export default ImageCreateForm
