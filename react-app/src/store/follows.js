// ******** FOLLOWS CONSTRAINTS ********
const GET_FOLLOWS = 'follows/get';
const GET_FOLLOWERS = 'followers/get';
const CREATE_FOLLOWS = 'follows/create';
const DELETE_FOLLOWS = 'follows/delete';

// ******** Follows Actions ********
// GET Follows
export const getFollows = (follows) => {
    return {
        type: GET_FOLLOWS,
        payload: follows
    }
}

// GET Followers
export const getFollowers = (followers) => {
    return {
        type: GET_FOLLOWERS,
        payload: followers
    }
}

// Create Follows
export const createFollows = (follow) => {
    return {
        type: CREATE_FOLLOWS,
        payload: follow
    }
}
// Delete Follows
export const deleteFollows = (id) => {
    return {
        type: DELETE_FOLLOWS,
        payload: id
    }
}


// ******** FOLLOWS THUNKS ********
// GET Follows
export const fetchFollows = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/follows`);
    // console.log('FOLLOWS THUNK = ', userId)
    // console.log('RES in Follows = ', res)
    if(res.ok){
        const follows = await res.json();
        // console.log('FOLLOWS IN FOLLOWS = ', follows)
        dispatch(getFollows(follows));
        return follows;
    };
    return res;
};

// GET Followers
export const fetchFollowers = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/followers`);
    
    if(res.ok){
        const followers = await res.json();
        dispatch(getFollowers(followers));
        return followers;
    };
    return res;
};

// Create Follow
export const fetchCreateFollow = (follows, userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/users/${userId}/follow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: follows,
    });
    if(res.ok){
        const follow = await res.json();
        dispatch(createFollows(follow));
        return follow;
    };
    return res;
};

// DELETE Follow
export const fetchDeleteFollow = (followsId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${followsId}`, {
        method: 'DELETE'
    });

    if(res.ok){
        const follow = await res.json();
        dispatch(deleteFollows(follow));
        return follow;
    };
    return res;
};

// ******** REDUCER ********
const initialState = {}

const followsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_FOLLOWS:
            action.payload.follows.forEach(follow => newState[follow.id] = follow)
            return newState
        case GET_FOLLOWERS:
            // action.payload.forEach(followers => newState[followers.id] = followers)
            return newState
        case CREATE_FOLLOWS:
            newState = {...state, [action.payload.id]: action.payload}
            return newState
        case DELETE_FOLLOWS:
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default followsReducer;
