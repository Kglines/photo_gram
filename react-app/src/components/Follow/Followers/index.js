import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchFollowers } from '../../../store/follows'
import Follow from '../Follow'

function Followers({ user, setFollowersModal }) {
    const dispatch = useDispatch()

    const followers = useSelector(state => state.follows)
    console.log('FOLLOWERS = ', followers)

    const isFollowers = followers?.followers?.followers.length
    console.log('is followers ', isFollowers)

    useEffect(() => {
        dispatch(fetchFollowers(user.id))
    }, [dispatch])
  return (
    <div className='following-modal'>
      <h2 className='following-title'>Followers List:</h2>
      {isFollowers > 0 ? followers?.followers?.followers?.map((follower) => (
        <div className='following-modal-list' key={follower?.id}>
        <div>
            <NavLink
                className='user-link'
                to={`/users/${follower?.user?.id}`}
                onClick={() => setFollowersModal(false)}
            >
                <p className='following-modal-link'>{follower?.user?.username}</p>
            </NavLink>
            <div className='following-modal-item-names'>
                <p className='following-modal-item'>{follower?.user?.firstname}</p>
                <p className='following-modal-item'>{follower?.user?.lastname}</p>
            </div>
        </div>
          <div className='following-modal-btn'>
            <Follow user={follower.user} sessionUser={user} />
          </div>
        </div>
      ))
      : <p className='no-follows'>No followers yet!</p>
      }
    </div>
  );
}

export default Followers
