const GET_LIKES = 'likes/get'
const GET_IMAGE_LIKES = 'image-likes/get'
const CREATE_LIKE = 'like/create'
const DELETE_LIKE = 'like/delete'

export const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    };
};

export const getImageLikes = (likes) => {
    return {
        type: GET_IMAGE_LIKES,
        payload: likes
    };
};

export const createLike = (like) => {
    return {
        type: CREATE_LIKE,
        payload: like
    };
};

export const deleteLike = (id) => {
    return {
        type: DELETE_LIKE,
        payload: id
    };
};

export const fetchAllLikes = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/likes`)
    console.log('^^^^^^^^^^^^^^^^ all likes res ', res)
    if(res.ok){
        const likes = await res.json();
        dispatch(getLikes(likes));
        return likes;
    };
    return res;
};

export const fetchImageLikes = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/likes/images/${imageId}`)

    if (res.ok){
        const likes = await res.json();
        dispatch(getImageLikes(likes));
        return likes;
    };
    return res;
};

export const fetchCreateLike = (imageId, like) => async (dispatch) => {
    const res = await fetch(`/api/likes/images/${imageId}`, {
        method: 'POST',
        body: like
    })
    if(res.ok){
        const like = await res.json();
        dispatch(createLike(like));
        return like;
    };
    return res;
};

export const fetchDeleteLike = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        const like = await res.json();
        dispatch(deleteLike(like));
        return like;
    };
    return res;
};

const initialState = {}
const likesReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_LIKES:
            return action.payload
        case GET_IMAGE_LIKES:
            newState = action.payload;
            return newState;
        case CREATE_LIKE:
            newState = action.payload
            return newState
        case DELETE_LIKE:
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default likesReducer;
