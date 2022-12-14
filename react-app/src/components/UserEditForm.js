import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEditUser} from '../store/session';

function UserEditForm({ setEditModal, user }) {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.lastname || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();

      const payload = {
        firstname,
        lastname,
        bio
      }

      dispatch(fetchEditUser(payload, userId))
        .then(async (res) => {
          if(res.ok === false){
            const data = await res.json()
            if(data.errors) setErrors(data.errors)
          } else {
            setErrors([])
            setFirstname('')
            setLastname('')
            setBio('')
            setEditModal(false)
          }
        })
    }

  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <h2>Edit Your Profile</h2>
      {errors?.map(error => (
        <div className='errors' key={error}>{error}</div>
      ))}
      <input
        className='modal-input-title'
        type='text'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        name='fistname'
        placeholder='First Name'
      />
      <input
        className='modal-input-title'
        type='text'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        name='lastname'
        placeholder='Last Name'
      />
      <textarea
        className='modal-input-body'
        type='text'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        name='bio'
        placeholder='Bio...'
      />
      <div>
        <button className='modal-btn modal-submit-btn' type='submit'>
          Update
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

export default UserEditForm
