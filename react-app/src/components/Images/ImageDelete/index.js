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
    <div className='modal-container'>
      <ul>
        {errors?.map((error) => (
          <li className='errors' key={error}>
            {error}
          </li>
        ))}
      </ul>
      <h2>Are you sure you want to delete this post?</h2>
      <div>
        <button
          className='modal-btn modal-submit-btn'
          onClick={() => onDelete()}
        >
          Delete
        </button>
        <button
          className='modal-btn modal-cancel-btn'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ImageDelete
