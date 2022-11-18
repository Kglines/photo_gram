import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneImage } from '../../../store/images'
import Image from '../Image'
import './ImageDetail.css'

function ImageDetail() {
  const { imageId } = useParams()
  const dispatch = useDispatch()

  const image = useSelector(state => state.images.one_image)
  // console.log('IMAGE DETAIL PAGE', image)
  const [usersList, setUsersList] = useState([]);
  
  let user;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsersList(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchOneImage(imageId))
  }, [dispatch, imageId])

  usersList.map(users => {
    if (users?.id === image?.Image?.user_id) {
      return user = users;
    }
  })

  return (
    <div>
      <Image image={image} user={user}/>
    </div>
  )
}

export default ImageDetail
