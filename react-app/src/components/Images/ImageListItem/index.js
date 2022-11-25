import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Likes from '../../Likes';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import './ImageListItem.css'
import { useDispatch } from 'react-redux';
import { fetchAllImages, fetchCreateLike, fetchDeleteLike, fetchOneImage, fetchUserImages} from '../../../store/images.js'


function ImageListItem({ image, user, loadImages }) {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const liked = image?.Likes?.liked
  
  // console.log('Load Images liked', liked)
  // console.log('Load Image User = ', userId)


  const handleClick = async (e) => {
    console.log('CLICKED')
    return liked
      ? await dispatch(fetchDeleteLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
      :
        await dispatch(fetchCreateLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
  };

  const postDate = image?.updated_at ? image?.updated_at?.slice(0, 16) : image?.created_at?.slice(0, 16)

  return (
    <div className='image-list-item-container'>
      <NavLink to={`/users/${user?.id}`}>
        <p>{user?.username}</p>
      </NavLink>
      <div className='image-list-item-img-container'>
        <NavLink
          className='image-list-item-img-link'
          to={`/images/${image?.id}`}
        >
          <img
            className='image-list-item-img'
            src={image?.image_url}
            alt={image.caption}
          />
        </NavLink>
        <div className='image-icons-container'>
          <div className='image-icons'>
            {/* <Likes
              className='like-icon'
              image={image}
              loadImages={loadImages}
            /> */}
            {/* {liked && <p>LIKE</p>} */}
            {liked ? (
              <FaHeart
                className='like-icon'
                style={{ color: 'red' }}
                onClick={handleClick}
              />
            ) : (
              <FaRegHeart 
              className='like-icon' 
              onClick={handleClick} 

              />
            )}
            <FaRegComment className='comment-icon' />
          </div>
          <div className='image-icons-res'>
            {image?.Likes?.total === 1 ? (
              <p>{image?.Likes?.total} Like</p>
            ) : (
              <p>{image?.Likes?.total} Likes</p>
            )}
          </div>
        </div>
        <p className='image-list-item-img-caption'>{image?.caption}</p>
        <div className='image-list-item-post-date'>{postDate}</div>
      </div>
      <p>View all {image?.Comments?.length} Comments</p>
    </div>
  );
};

export default ImageListItem
