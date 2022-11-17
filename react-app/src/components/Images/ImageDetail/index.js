import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneImage } from '../../../store/images'
import Image from '../Image'
import './ImageDetail.css'

function ImageDetail() {
  const { imageId } = useParams()
  const dispatch = useDispatch()
  // console.log('Image ID = ', imageId)
  const image = useSelector(state => state.images)
  const user = useSelector(state => state.session.user)
  // console.log('IMAGE', user)

  useEffect(() => {
    dispatch(fetchOneImage(imageId))
  }, [dispatch, imageId])

  return (
    <div>
      <Image image={image} user={user}/>
    </div>
  )
}

export default ImageDetail
