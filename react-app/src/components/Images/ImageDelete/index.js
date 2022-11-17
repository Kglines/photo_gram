import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchDeleteImage } from '../../../store/images'
import './ImageDelete.css'

function ImageDelete({ setDeleteModal, imageId }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])

  const onDelete = () => {
    dispatch(fetchDeleteImage(imageId))
    .then(() => setDeleteModal(false))
    .then(() => history.push('/home'))
    .catch(async (res) => {
      const data = await res.json();
      if(data && data.errors) setErrors(data.errors)
    })
  }
  return (
    <div>
      <ul>
        {errors?.map(error => (
          <li className='errors' key={error}>{error}</li>
        ))}
      </ul>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={() => onDelete()}>Delete</button>
      <button onClick={() => setDeleteModal(false)}>Cancel</button>
    </div>
  )
}

export default ImageDelete
