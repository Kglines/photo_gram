import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function UserEditForm({ setEditModal}) {
    const { userId } = useParams();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [bio, setBio] = useState('');
    const [profile_img, setProfile_img] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if(firstname.length > 0) formData.append('firstname', firstname)
        if(lastname.length > 0) formData.append('lastname', lastname)
        if(bio.length > 0) formData.append('bio', bio)
        if(profile_img) formData.append('image_url', profile_img)

        setImageLoading(true);

        const res = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: formData
        });

        if (res.ok){
            await res.json();
            setImageLoading(false);
            setEditModal(false);
        } else {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        }
    }

  return (
    <form>
        <p>Edit Your Profile</p>
        <input 
            type='text' 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} name='fistname' 
            placeholder='First Name' 
        />
        <input 
            type='text'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            name='lastname'
            placeholder='Last Name'
        />
        <textarea 
            type='text'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            name='bio'
            placeholder='Bio...'
        />
        <input 
            type='file'
            accept='image/*'
            onChange={(e) => setProfile_img(e.target.files[0])}
        />
        <button type='submit'>Update</button>
        <button onClick={() => setEditModal(false)}>Cancel</button>
    </form>
  )
}

export default UserEditForm
