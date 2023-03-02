import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFollows } from '../../../store/follows';
import { fetchAllImages } from '../../../store/images';
import SuggestedFollows from '../../Follow/SuggestedFollows';
import SearchBar from '../../SearchBar';
import ImageListItem from '../ImageListItem';

import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images?.all_images))
  // const images = Object.values(useSelector(state => state.images?.all_images ? state.images?.all_images : state.images))
  const follows = useSelector(state => state.follows)
  const sessionUser = useSelector(state => state.session.user)

  const [users, setUsers] = useState([]);
  console.log('USERS in Image List = ', users)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const displayImages = []
  const notFriends = []
  const suggested = Array.from(notFriends.entries())
  
  // For Each Image
  images?.forEach(image => {
    // And for each follow
    follows?.follows?.follows?.forEach(follow => {
      // If the owner of the image is someone the user follows
      // send that image to the displayImages array
      if (image?.owner?.id === follow?.user?.id) {
        displayImages.push(image)
      } else {
        notFriends.push(image?.owner)
      }
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
    <div id='image-list'>
      <div className='image-list-container'>
        {/* {images.length > 0 ? images?.map(image => ( */}
        {displayImages.length > 0 ? (
          displayImages?.map((image) => (
            <div key={image?.id}>
              <ImageListItem
                image={image}
                user={image?.owner}
                loadImages={loadImages}
              />
            </div>
          ))
        ) : (
          <div style={{ width: '300px', marginTop: '100px' }}>
            <h2>Not Following anyone yet.</h2>
            <h3>
              Search for friends, explore different profiles, and choose someone
              to follow!
            </h3>
          </div>
        )}
        {/* <div>
        <SuggestedFollows suggested={notFriends} />
      </div> */}
      </div>
      <div className='sidebar'>
        <SearchBar userList={users} />
        <SuggestedFollows userList={users} />
      </div>
    </div>
  );
}

export default ImageList
