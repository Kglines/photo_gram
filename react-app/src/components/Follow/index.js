import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollows, fetchCreateFollow, fetchDeleteFollow } from '../../store/follows';

function Follow({ user, sessionUser, setFollows, follows }) {
    const dispatch = useDispatch()

    const userFollows = Object.values(useSelector(state => state.follows))


    const isFoll = userFollows.find(follow => follow.follows_id ===user.id)
  

    useEffect(() => {
        dispatch(fetchFollows(sessionUser?.id))
    }, [dispatch])


    const createFollows = () => {
      const payload = {
        user_id: sessionUser?.id,
        follows_id: user?.id,
      };
      dispatch(fetchCreateFollow(payload, user?.id));
      setFollows(true);
    };


    const deleteFollows = (followsId) => {
      dispatch(fetchDeleteFollow(followsId));
      setFollows(false);
    };

  return (
    <div>
      {isFoll ? (
            <button onClick={deleteFollows}>unfollow</button>
        )
        : (
            <button onClick={createFollows}>follow</button>
        )}
        
    </div>
  );
}

export default Follow
