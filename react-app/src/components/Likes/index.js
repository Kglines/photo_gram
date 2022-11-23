import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateLike, fetchDeleteLike } from '../../store/images'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

function Likes({ image, loadImages }) {
    const dispatch = useDispatch()
    const liked = image?.Likes?.liked
    // console.log('IMAGE INSIDE LIKES', image?.Likes)

    // console.log('IMAGE LIKES IN LIKES = ', liked);
    const handleClick = async () => {
        return liked ? 
          await dispatch(fetchDeleteLike(image.id))
            .then(() => loadImages())
            .then(() => loadImages()) : 
          await dispatch(fetchCreateLike(image.id))
            .then(() => loadImages())
            .then(() => loadImages())
    }
  return (
    <div>
      {liked ? (
        <FaHeart className='like-icon' style={{ color: 'red' }} onClick={handleClick} />
      ) : (
        <FaRegHeart className='like-icon' onClick={handleClick} />
      )}
      {/* <div>
        {image?.Likes?.total === 1 ? (
          <p>{image?.Likes?.total} Like</p>
        ) : (
          <p>{image?.Likes?.total} Likes</p>
        )}{' '}
      </div> */}
    </div>
  );
}

export default Likes
