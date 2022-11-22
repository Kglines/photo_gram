import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';
import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images?.all_images ? state.images.all_images : state.images))
  // const images = useSelector(state => state.images.all_images)
  // function compare(a, b){ return b - a}
  // console.log('IMAGEs IMAGELIST = ', images.map((image, i) => {
  //   const dateSplit = image.created_at.split(' ')
    // const createdAt = new Intl.DateTimeFormat('en-US').format(dateSplit)
  //   return dateSplit
  // }))

  console.log('NOW = ', new Date())
  // const imagesArr = Object.values(images[0]);
  const [usersList, setUsersList] = useState([]);
  
  // console.log('CHANGE DATE FORMAT = ', images.map((a) => {
  //   return a?.created_at
  // }))

  // const created = images.map(image => image.created_at)
  // const joined = created.join()
  // // const sorted = joined.sort()
  // const sorted = images.sort((imageA, imageB) => imageA.created_at - imageB.created_at)
  // console.log(sorted)
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
    <div className='image-list-container'>
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
