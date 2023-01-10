import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFollows } from '../../../store/follows';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';

import './ImageList.css'

function ImageList() {

  const images = Object.values(useSelector(state => state.images?.all_images ? state.images?.all_images : state.images))
  const follows = useSelector(state => state.follows)

//  follows?.follows?.follows?.forEach(follow => 
//     {
//       console.log(follow?.user?.id)
//     }
//   )

  const displayImages = []

  // console.log('DISPLAY   ', displayImages)
  images?.forEach(image => {
    follows?.follows?.follows?.forEach(follow => {
      if (image?.owner?.id === follow?.user?.id) {
        displayImages.push(image)
      }
    })
  })
  // console.log(images)

  const dispatch = useDispatch()

  const loadImages = () => {
    dispatch(fetchAllImages());
  }

  useEffect(() => {
    dispatch(fetchUserFollows())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAllImages())
  }, [dispatch])

  return (
    <div className='image-list-container'>
    {/* Formerly mapping through just images */}
      {displayImages.length > 0 ? displayImages?.map((image) => (
        <div key={image?.id}>
            <ImageListItem
              image={image}
              user={image?.owner}
              loadImages={loadImages}
            />
        </div>
      )) :
      <div>
        <h2>Not Following anyone yet.</h2>
        <h3>Explore different profiles and choose someone to follow!</h3>
      </div>
      }
    </div>
  );
}

export default ImageList
