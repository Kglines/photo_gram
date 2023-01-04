// ******** Comment Constraints ********
const GET_ALL_COMMENTS = 'comments/get';
const GET_ONE_COMMENT = 'one_comment/get';
const CREATE_COMMENTS = 'comments/create';
const EDIT_COMMENTS = 'comments/edit';
const DELETE_COMMENTS = 'comments/delete';


// ******** Comments Actions ********

// GET Comments
export const getAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        payload: comments
    }
}

// GET One Comment
export const getOneComment = (comment) => {
    return {
        type: GET_ONE_COMMENT,
        payload: comment
    }
}

// Create A Comment
export const createComment = (comment) => {
    return {
        type: CREATE_COMMENTS,
        payload: comment
    }
}

// Edit A Comment
export const editComment = (comment) => {
    return {
        type: EDIT_COMMENTS,
        payload: comment
    }
}

// Delete A Comment
export const deleteComment = (id) => {
    return {
        type: DELETE_COMMENTS,
        payload: id
    }
}

// ******** Comments Thunks ********

// Get all Comments of an image based on image ID Thunk
export const fetchAllComments = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}/comments`)

    if(res.ok){
        const comments = await res.json()
        dispatch(getAllComments(comments))
        return comments
    }
    return res
}

// Create Comments Thunk
export const fetchCreateComments = (comment, imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    if(res.ok){
        const comment = await res.json();
        dispatch(createComment(comment));
        return comment;
    };
    return res;
};

// Edit A Comment Thunk
export const fetchEditComments = (comment, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    
    if(res.ok){
        const comment = await res.json();
        dispatch(editComment(comment));
        return comment;
    };
    return res;
}

// Delete A Comment Thunk
export const fetchDeleteComments = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const comment = res.json();
        dispatch(deleteComment(commentId));
        return comment;
    };
    return res;
}


// ******** REDUCER ********

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_ALL_COMMENTS:
            action.payload.Comments.forEach(comment => newState[comment.id] = comment)
            return newState;
        case CREATE_COMMENTS:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case EDIT_COMMENTS:
            newState = {
              ...state,
              [action.payload.id]: action.payload,
            };
            return newState
        case DELETE_COMMENTS:
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default commentsReducer;
