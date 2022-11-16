import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllImages } from '../../../store/images';
import ImageListItem from '../ImageListItem';
import './ImageList.css'

function ImageList() {
  const images = Object.values(useSelector(state => state.images))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllImages())
  }, [dispatch])

  return (
    <div>
      {images && images?.map(image => (
        <div>
          <ImageListItem image={image}/>
        </div>
      ))}
    </div>
  )
}

export default ImageList
