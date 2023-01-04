import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFollows, fetchCreateFollow, fetchDeleteFollow } from '../../../store/follows';
import './Follow.css'

function Follow({ user, sessionUser }) {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const userFollows = Object.values(useSelector(state => state.follows))

    const isFoll = userFollows.find(follow => follow?.follows_id === user?.id)

    useEffect(() => {
      dispatch(fetchFollows(sessionUser?.id));
    }, [dispatch, sessionUser?.id]);


    const createFollows = () => {
      const payload = {
        user_id: sessionUser?.id,
        follows_id: user?.id,
      };
      dispatch(fetchCreateFollow(payload, user?.id));
    };


    const deleteFollows = () => {
      dispatch(fetchDeleteFollow(isFoll?.id));
    };

  return (
    <div className='follow-btn-container'>
      {isFoll ? (
            <button className='unfollow' onClick={deleteFollows}>unfollow</button>
        )
        : (
            <button className='follow' onClick={createFollows}>follow</button>
        )}
        
    </div>
  );
}

export default Follow;
