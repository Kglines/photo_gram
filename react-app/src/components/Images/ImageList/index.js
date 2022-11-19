import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';
import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images?.all_images ? state.images.all_images : state.images))
  // const images = useSelector(state => state.images.all_images)
  function compare(a, b){ return b - a}
  // console.log('IMAGEs IMAGELIST = ', images.map(image => image?.created_at).sort(compare))
  // const imagesArr = Object.values(images[0]);
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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllImages())
  }, [dispatch])

  // const imageUser = usersList.find(user => user.id === imagesArr.userId)
  
  return (
    <div>
      {images?.map(image => (
        <div key={image?.id}>
          {usersList?.forEach(users => {
            if (users?.id === image?.user_id){
              user = users
            }
          })}
            <ImageListItem image={image} user={user} />
        </div>
      ))}
    </div>
  )
}

export default ImageList
