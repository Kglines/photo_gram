import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchAllImages, fetchCreateImage } from '../../../store/images'
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
    formData.append('caption', caption)
    formData.append('image_url', image_url);
    // console.log('image_url', image_url)
    // console.log('caption', caption)
    // console.log('formdata', formData)
    setImageLoading(true);
    
    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData
    })
    // console.log('FORM DATA', formData)
    // console.log('RES', res)
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      dispatch(fetchAllImages())
      history.push(`/home`);
      setShowModal(false);
    } else {
      setImageLoading(false);
      const data = await res.json();
      console.log('error');
      if(data && data.errors) setErrors(data.errors)
    }
    
    // const createdImage = await dispatch(fetchCreateImage(formData))
    //   .then((res) => {
    //     setImageLoading(false)
    //     setShowModal(false)
    //     return res
    //   })
    //   .then((res) => {
    //     console.log('RES = ', res)
    //     history.push(`/images/${res.id}`)
    //     return res
    //   })
    //   .catch(async (res) => {
    //     const data = await res.json()
    //     if(data && data.errors) setErrors(data.errors)
    //   })
    //   return createdImage
  }

  return (
    <div>
      {errors &&
        errors.map((error) => (
          <div className='errors' key={error}>
            {error}
          </div>
        ))}
      <form onSubmit={handleSubmit} className='modal-container'>
        <h2 className='modal-form-title'>Share A New Image</h2>
        <input
          className='modal-input-title file-btn'
          type='file'
          accept='image/*'
          onChange={(e) => setImage_url(e.target.files[0])}
          required
        />
        <input
          className='modal-input-title'
          type='text'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          name='caption'
          placeholder='Caption goes here...'
          required
        />
        <div>
          <button className='modal-btn modal-submit-btn' type='submit'>
            Share
          </button>
          <button
            className='modal-btn modal-cancel-btn'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default ImageCreateForm
