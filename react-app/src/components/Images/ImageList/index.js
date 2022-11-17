import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';
import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images))
  // const user = useSelector(state => state.session.user)
  const [usersList, setUsersList] = useState([]);

  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsersList(responseData.users);
    }
    fetchData();
  }, []);
  // console.log('IMAGE LIST USERS', usersList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllImages())
  }, [dispatch])

  let user;


  return (
    <div>
      {images && images?.map(image => (
        <div key={image?.id}>
          {usersList.map(users => {
            if (users?.id === image?.user_id){
              user = users
            }
          })}
          <ImageListItem image={image} user={user}/>
        </div>
      ))}
    </div>
  )
}

export default ImageList
