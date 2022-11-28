import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllImages } from '../../store/images'

function Home() {
    const [images, setImages] = useState({})
    const sessionImages = Object.values(useSelector(state => state.images))
    // console.log('SESSION IMAGES HOME PAGE = ', Object.values(sessionImages))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllImages())
    }, [dispatch])

  return (
    <div>
        {sessionImages && sessionImages?.map(image => (
            <div>
                <img src={image?.image_url} alt={image?.caption} />
                {image?.caption}
            </div>
        ))}
    </div>
  )
}

export default Home
