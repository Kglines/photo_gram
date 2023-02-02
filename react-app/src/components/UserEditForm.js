import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchEditUser, fetchGetUser} from '../store/session';
import './User.css';

function UserEditForm({ setEditModal, user }) {
    const { userId } = useParams();
    console.log('ID = ', userId)
    const dispatch = useDispatch();
    const history = useHistory()

    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.lastname || '');
    const [profilePic, setProfilePic] = useState(user?.profile_img || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const response = await fetch(`/api/users/${userId}`);
    //     const user = await response.json();
    //   };
    //   fetchData();
    // }, [dispatch, userId, user.profile_img])

    const handleSubmit = async (e) => {
      e.preventDefault();

      // const formData = new FormData();
      // formData.append('firstname', firstname);
      // formData.append('lastname', lastname);
      // formData.append('profile_img', profilePic || '');
      // formData.append('bio', bio)

      // const res = await dispatch(fetchEditUser(formData, userId))

      // const res = await fetch(`/api/users/${userId}`, {
      //   method: 'PUT',
      //   body: formData
      // })

      // history.push(`/users/${userId}`)
      // if(!res.ok){
      //   console.log('Something went wrong!')
      //   // const data = await res.json();
      //   // if(data.errors) setErrors(data.errors)
      // } else {
      //   // fetchGetUser(userId)
      //   window.location.reload()
      //   setErrors([])
      //   setFirstname('')
      //   setLastname('')
      //   setProfilePic('')
      //   setBio('')
      //   setEditModal(false);
      // }
      const payload = {
        firstname,
        lastname,
        profile_img: profilePic,
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
            setProfilePic('')
            setBio('')
            setEditModal(false)
          }
        })
    }

  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <h2>Edit Your Profile</h2>
      {errors?.map((error) => (
        <div className='errors' key={error}>
          {error}
        </div>
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
      <input
        className='modal-input-title file-btn'
        type='file'
        accept='image/*'
        onChange={(e) => setProfilePic(e.target.files[0])}
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
