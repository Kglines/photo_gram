import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchUserFollows } from '../../../store/follows'
import Follow from '../Follow/';
import './Following.css'

function Following({ user, setFollowingModal }) {
    const dispatch = useDispatch()

    const follows = useSelector(state => state.follows)
    useEffect(() => {
        dispatch(fetchUserFollows())
    }, [dispatch])


    const isFollows = follows?.follows?.follows?.length;

  return (
    <div className='following-modal'>
      <h2 className='following-title'>Following List:</h2>
      {isFollows > 0 ? (
        follows?.follows?.follows?.map((follow) => (
            
          <div className='following-modal-list' key={follow?.id}>
            <div>
              <NavLink
                to={`/users/${follow?.follows_id}`}
                className='user-link'
                onClick={() => setFollowingModal(false)}
              >
                <p className='following-modal-link'>
                  {follow?.user?.username}{' '}
                </p>
              </NavLink>
              <div className='following-modal-item-names'>
                <p className='following-modal-item'>
                  {follow?.user?.firstname}{' '}
                </p>
                <p className='following-modal-item'>
                  {follow?.user?.lastname}{' '}
                </p>
              </div>
            </div>
            <div className='following-modal-btn'>
              <Follow user={follow?.user} sessionUser={user} />
            </div>
          </div>
        ))
      ) : (
        <p className='no-follows'>You're not following anyone yet!</p>
      )}
    </div>
  );
}

export default Following
