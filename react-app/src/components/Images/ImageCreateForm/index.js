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
    formData.append('caption', caption)
    formData.append('image_url', image_url);
    console.log('image_url', image_url)
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
    //     setShowModal(false)
    //     return res
    //   })
    //   .then((res) => {
    //     history.push(`/images/${res.id}`)
    //   })
    //   .catch(async (res) => {
    //     const data = await res.json()
    //     if(data && data.errors) setErrors(data.errors)
    //   })
    //   return createdImage
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
          accept='image/*'
          onChange={(e) => setImage_url(e.target.files[0])}
        />
        <button type='submit'>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        {(imageLoading) && <p>Loading...</p>}
      </form>
    </div>
  )
}

export default ImageCreateForm
