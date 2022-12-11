const GET_LIKES = 'likes/get'
const CREATE_LIKE = 'like/create'
const DELETE_LIKE = 'like/delete'

export const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        payload: likes
    }
}

export const createLike = (like) => {
    return {
        type: CREATE_LIKE,
        payload: like
    }
}

export const deleteLike = (id) => {
    // console.log('*********************** DELETE ACTION ID', id)
    return {
        type: DELETE_LIKE,
        payload: id
    }
}

export const fetchAllLikes = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}/likes`)
    // console.log('^^^^^^^^^^^^^^^^ all likes res ', res)
    if(res.ok){
        const likes = await res.json()
        dispatch(getLikes(likes))
        return likes
    }
    return res
}

export const fetchCreateLike = (imageId, like) => async (dispatch) => {
    const res = await fetch(`/api/likes/${imageId}/like`, {
        method: 'POST',
        body: like
    })
    // console.log('************** RES CREATE = ', res)
    if(res.ok){
        const like = await res.json()
        // console.log('************** RES CREATE LIKE = ', like)
        dispatch(createLike(like))
        return like
    }
    return res
}
// export const fetchCreateLike = (imageId, like) => async (dispatch) => {
//     const res = await fetch(`/api/images/${imageId}/like`, {
//         method: 'POST',
//         body: like
//     })
//     console.log('************** RES CREATE = ', res)
//     if(res.ok){
//         const like = await res.json()
//         console.log('************** RES CREATE LIKE = ', like)
//         dispatch(createLike(like))
//         return like
//     }
//     return res
// }

export const fetchDeleteLike = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}/like`, {
        method: 'DELETE'
    })
    if(res.ok){
        const like = await res.json()
        // console.log('************** RES DELETE = ', like);
        dispatch(deleteLike(like))
        return like
    }
    return res
}

const initialState = {}
const likesReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_LIKES:
            return action.payload
        case CREATE_LIKE:
            newState = action.payload
            // console.log('****** CREATE LIKE REDUCER = ', newState)
            return newState
        case DELETE_LIKE:
            // console.log('******* DELETE REDUCER = ', action.payload)
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default likesReducer;
