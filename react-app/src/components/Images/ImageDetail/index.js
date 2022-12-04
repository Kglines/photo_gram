import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneImage } from '../../../store/images'
import Image from '../Image'
import './ImageDetail.css'

function ImageDetail() {
  const { imageId } = useParams()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const image = useSelector(state => state.images?.one_image)

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchOneImage(imageId))
    setIsLoading(false)
  }, [dispatch, imageId, image?.one_image?.Image?.Comments, image?.one_image?.Image.caption])

  const loadImage = (imageId) => {
    dispatch(fetchOneImage(imageId));
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <Image image={image} user={image?.Image?.owner} loadImage={loadImage} isLoading={isLoading}/>
    </div>
  )
}

export default ImageDetail
