import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function UserEditForm({ setEditModal, user }) {
    const { userId } = useParams();
    
    const [firstname, setFirstname] = useState(user?.firstname);
    const [lastname, setLastname] = useState(user?.lastname);
    const [bio, setBio] = useState(user?.bio);
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

        if (res.ok){
            const user = await res.json();
            setImageLoading(false);
            setEditModal(false);

            updatedUser()
            updatedUser()
            return user
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
      {errors?.map(error => (
        <li key={error}>{error}</li>
      ))}
      <h2>Edit Your Profile</h2>
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
