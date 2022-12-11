import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { fetchUserFollows } from '../../../store/follows'
import Follow from '../Follow/';
import './Following.css'

function Following({ user, setFollowingModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const follows = useSelector(state => state.follows)
    // console.log('FOLLOWS IN FOLLOWING = ', follows?.follows?.follows?.map(follow => {
    //     // if(follow?.follows_id === user.id)
    //     return follow
    //     // return follow.user.username
    // }))

    // console.log('USER IN FOLLOWING = ', user)
    useEffect(() => {
        dispatch(fetchUserFollows())
    }, [dispatch])


    const isFollows = follows?.follows?.follows?.length;
    // console.log('FOLLOWS LENGTH = ', isFollows)

  return (
    <div className='following-modal'>
      <h2 className='following-title'>Following List:</h2>
      {isFollows > 0 ? (
        follows?.follows?.follows?.map((follow) => (
            
          <div className='following-modal-list' key={follow?.id}>
          {/* {console.log('FOLLOW MAP IN FOLLOW MAP = ', follow?.user)} */}
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
      {/* {user?.Follows?.map(follow => (
            <div key={follow.id}>{follow.username}</div>
        ))} */}
    </div>
  );
}

export default Following
