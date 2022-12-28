import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';

import './ImageList.css'

function ImageList({ user }) {
  const images = Object.values(useSelector(state => state.images?.all_images ? state.images?.all_images : state.images))

  // console.log('USER IN IMAGE LIST = ', user, images)

  // const imageUser = images.find(image => image.owner.id === user.id)
  // console.log("IMAGE USER = ", imageUser)
  const dispatch = useDispatch()

  const loadImages = () => {
    dispatch(fetchAllImages());
  }

  useEffect(() => {
    dispatch(fetchAllImages())
  }, [dispatch])

  return (
    <div className='image-list-container'>
      {images?.map((image) => (
        <div key={image?.id}>
            <ImageListItem
              image={image}
              user={image?.owner}
              loadImages={loadImages}
            />
        </div>
      ))}
    </div>
  );
}

export default ImageList
