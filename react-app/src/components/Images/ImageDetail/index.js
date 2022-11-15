import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneImage } from '../../../store/images'
import './ImageDetail.css'

function ImageDetail() {
  const { imageId } = useParams()
  const dispatch = useDispatch()

  // const image = useSelector(state => state.images)
  const [image, setImage] = useState({});
  console.log('IMAGE', image)

  // useEffect(() => {
  //   dispatch(fetchOneImage(imageId))
  // }, [dispatch, imageId])
  useEffect(() => {
    (async () => {
      const res = await fetchOneImage(imageId)
      const image = await res.json()
      setImage(image)
    })()
  }, [imageId])

  return (
    <div>
      {image.caption}
    </div>
  )
}

export default ImageDetail
