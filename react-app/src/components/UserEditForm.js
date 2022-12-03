import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetUser } from '../store/session';

function UserEditForm({ setEditModal, user }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    
    const [newUser, setNewUser] = useState('')
    const [firstname, setFirstname] = useState(user?.firstname);
    const [lastname, setLastname] = useState(user?.lastname);
    const [bio, setBio] = useState(user?.bio);
    const [profile_img, setProfile_img] = useState(user?.profile_img);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('bio', bio)

        setImageLoading(true);

        const res = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: formData
        });
        // console.log('RES IN USER EDIT = ', userId)
        if (res.ok){
          const user = await res.json();
          setImageLoading(false);
          setEditModal(false);
          // const refresh = dispatch(fetchGetUser(user.id));
          // console.log('USER USER EDIT FORM', user)
          // console.log('refresh = ', refresh)
          // updatedUser();
          // updatedUser();
          // console.log('USER IN USER EDIT = ', user)
          return user;
        } else {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        }
       
    }

    const updatedUser = async () => {
        const res = await fetch(`/api/users/${userId}`);

        if (res.ok){
            const user = await res.json();
            return user
        } else {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        }
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
      {/* <input
        className='modal-input-title'
        type='file'
        accept='image/*'
        onChange={(e) => setProfile_img(e.target.files[0])}
      /> */}
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
