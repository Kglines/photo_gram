import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchUserImages } from '../store/images'
import { fetchCreateLike, fetchDeleteLike } from '../store/images'
import { fetchAllLikes } from '../store/likes'

function UserImages({ image, loadImages, user }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  let myLikes;
  // console.log('USER USER USER USER ', user)
  const images = Object.values(
    useSelector((state) => state.images.user_images)
  );
  const likes = useSelector((state) => state.likes);
  // console.log('LIKES SELECTOR = ', likes)
  // console.log('IMAGES SELECTOR = ', images.map(image => myLikes = image.Likes))
  // console.log('*$*$*$*$**$* ', image)

  // console.log('########### # My Likes', myLikes)
  // useEffect(() => {
  //     dispatch(fetchAllLikes(image?.id))
  // }, [dispatch, image?.id])

  // const [isLiked, setIsLiked] = useState(false)
  // console.log('LIKES SELECTOR = ', likes?.likes?.Likes)
  // console.log('*******************************', isLiked)

  // console.log('LIKES MAP ===== ', likes?.likes?.Likes?.find(like => (
  //     // like?.image_id === image?.id
  //     like
  // )))
  const liked = image?.Likes?.liked;
  // console.log('** ** ** ** ', liked)

  useEffect(() => {
    dispatch(fetchAllLikes(image?.id));
  }, [dispatch, image.id]);

  useEffect(() => {
    dispatch(fetchUserImages(userId));
  }, [userId, dispatch, user]);

  // console.log('USER IMAGES LIKED OR NOT = ', liked)

  // const handleCreate = async (e) => {
  // e.preventDefault();

  // const res = await fetch(`/api/likes/${image.id}/like`, {
  //     method: 'POST',
  //     body: {
  //         user_id: user.id,
  //         image_id: image.id
  //     }
  // });
  // console.log('**** ***** *** *** handle create', res);
  // if(res.ok){
  //     const like = await res.json()
  //     // dispatch(fetchCreateLike(like))
  //     console.log('LIKE INSIDE RES ', like)
  //     dispatch(createLike(like))
  //     return like
  // }
  // loadImages(image?.id)
  // loadImages(image?.id)
  // return res
  // }

  // const handleDelete = async (e) => {
  //     e.preventDefault();

  // const res = await fetch(`/api/likes/${like.id}`, {
  //     method: 'DELETE'
  // })
  // console.log('**** ***** *** *** handle delete', res)
  // if(res.ok){
  //     const like = await res.json()
  //     // dispatch(fetchDeleteLike(like))
  //     dispatch(deleteLike(like))
  //     return like

  // }
  // loadImages(image?.id);
  // loadImages(image?.id);
  // return res
  // }

  const handleClick = async (e) => {
    e.preventDefault();
    return liked
      ? await dispatch(fetchDeleteLike(image?.id, image.like))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId))
      : //   .then(() => dispatch(fetchUserImages(userId)))
        //   .then(() => dispatch(fetchUserImages(userId)))
        await dispatch(fetchCreateLike(image?.id))
          .then(() => loadImages(userId))
          .then(() => loadImages(userId));
    //   .then(() => dispatch(fetchUserImages(userId)))
    //   .then(() => dispatch(fetchUserImages(userId)));
  };

  const postDate = image?.updated_at
    ? image?.updated_at?.slice(0, 16)
    : image?.created_at?.slice(0, 16);

  // Intersection Observer...adds class to each img element to gradually reveal the image
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
  const hiddenElements = document.querySelectorAll('.image-list-item-img');
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <div>
      <div className='image-list-item-container' key={image?.id}>
        <NavLink className='user-link' to={`/users/${image?.owner?.id}`}>
          <p>{image?.owner?.username}</p>
        </NavLink>
        <div className='image-list-item-img-container'>
          <NavLink
            className='image-list-item-img-link'
            to={`/images/${image?.id}`}
          >
            <img
              className='image-list-item-img'
              src={image?.image_url}
              alt={image?.caption}
            />
          </NavLink>
          <div className='image-icons-container'>
            <div className='image-icons'>
              {liked ? (
                <FaHeart
                  className='like-icon'
                  style={{ color: 'red' }}
                  onClick={handleClick}
                />
              ) : (
                <FaRegHeart className='like-icon' onClick={handleClick} />
              )}
              <NavLink className='comment-link' to={`/images/${image?.id}`}>
                <FaRegComment className='comment-icon' />
              </NavLink>
            </div>
            <div className='image-icons-res'>
              <div>
                <NavLink className='comment-link' to={`/images/${image?.id}`}>
                  <p>View Comments</p>
                </NavLink>
              </div>
              <div>
                {image?.Likes?.total === 1 ? (
                  <p>{image?.Likes?.total} Like</p>
                ) : (
                  <p>{image?.Likes?.total} Likes</p>
                )}
              </div>
            </div>
          </div>
          <NavLink className='caption-link' to={`/images/${image?.id}`}>
            <p className='image-list-item-img-caption'>{image?.caption}</p>
          </NavLink>
          <div className='image-list-item-post-date'>{postDate}</div>
        </div>
      </div>
    </div>
  );
}

export default UserImages
