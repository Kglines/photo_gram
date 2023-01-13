import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFollows } from '../../../store/follows';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';

import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images?.all_images))
  // const images = Object.values(useSelector(state => state.images?.all_images ? state.images?.all_images : state.images))
  const follows = useSelector(state => state.follows)
  const sessionUser = useSelector(state => state.session.user)

  const displayImages = []

  // For Each Image
  images?.forEach(image => {
    // And for each follow
    follows?.follows?.follows?.forEach(follow => {
      // If the owner of the image is someone the user follows
      // send that image to the displayImages array
      if (image?.owner?.id === follow?.user?.id) {
        displayImages.push(image)
      };
    });
    // Send the current users images to the displayImages array
    if (sessionUser.id === image.user_id){
      displayImages.push(image)
    };
  });

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
      {/* {displayImages.length > 0 ? displayImages?.map((image) => ( */}
    {images.length > 0 ? images?.map(image => (
        <div key={image?.id}>
        {console.log('IMAGE in IMAGE LIST = ', image)}
            <ImageListItem
              image={image}
              user={image?.owner}
              loadImages={loadImages}
            />
        </div>
      )) 
      :
      <div>
        <h2>Not Following anyone yet.</h2>
        <h3>Explore different profiles and choose someone to follow!</h3>
      </div>
      }
    </div>
  );
}

export default ImageList
