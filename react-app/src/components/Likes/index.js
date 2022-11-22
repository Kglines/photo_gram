import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateLike, fetchDeleteLike } from '../../store/images'

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
        <button onClick={handleClick}>Like</button>
        <div>{image?.Likes?.total}</div>
    </div>
  )
}

export default Likes
