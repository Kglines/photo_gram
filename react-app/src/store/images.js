// ******** Image Constraints ********
const GET_ALL_IMAGES = 'images/get';
const GET_USER_IMAGES = 'user_images/get';
const GET_ONE_IMAGE = 'one_image/get';
const CREATE_IMAGES = 'images/create';
const EDIT_IMAGES = 'images/edit';
const DELETE_IMAGES = 'images/delete';
const CREATE_LIKE = 'like/create'
const DELETE_LIKE = 'like/delete'

// ******** Images Actions ********

// GET Images
export const getAllImages = (images) => {
    return {
        type: GET_ALL_IMAGES,
        payload: images
    }
}

// GET User Images
export const getUserImages = (images) => {
    return {
        type: GET_USER_IMAGES,
        payload: images
    }
}

// GET One Image
export const getOneImage = (image) => {
    return {
        type: GET_ONE_IMAGE,
        payload: image
    }
}

// Create Images
export const createImages = (image) => {
    return {
        type: CREATE_IMAGES,
        payload: image
    }
}

// Edit an Image
export const editImage = (image) => {
    return {
        type: EDIT_IMAGES,
        payload: image
    }
}

// Delete an Image
export const deleteImage = (id) => {
    return {
        type: DELETE_IMAGES,
        payload: id
    }
}

// Create a Like
export const createLike = (imageId) => {
    return {
        type: CREATE_LIKE,
        payload: imageId
    }
}

// Delete a Like
export const deleteLike = (imageId) => {
    return {
        type: DELETE_LIKE,
        payload: imageId
    }
}

// ******** Image Thunks ********

// GET all Images Thunk
export const fetchAllImages = () => async (dispatch) => {
    const res = await fetch(`/api/images`);

    if(res.ok){
        const images = await res.json();
        dispatch(getAllImages(images));
        return images;
    };
    return res;
};

// GET USER Images Thunk
export const fetchUserImages = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/images`);

    if(res.ok){
        const images = await res.json();
        dispatch(getUserImages(images));
        return images;
    };
    return res;
};

// GET one Image Thunk
export const fetchOneImage = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`);

    if(res.ok){
        const image = await res.json();
        dispatch(getOneImage(image));
        return image;
    };
    return res;
};

// Create Image Thunk
export const fetchCreateImage = (image) => async (dispatch) => {
    const res = await fetch(`/api/images`, {
      method: 'POST',
      body: image,
    });

    if(res.ok){
        const image = await res.json();
        dispatch(createImages(image));
        return image;
    };
    return res;
};

// Edit Image Thunk
export const fetchEditImage = (image, imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });

    if(res.ok){
        const image = await res.json();
        dispatch(editImage(image));
        return image;
    };
    return res;
};

// Delete an Image Thunk
export const fetchDeleteImage = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    });

    if(res.ok){
        const image = await res.json();
        dispatch(deleteImage(image));
        return image;
    };
    return res;
};

// Create Like Thunk
export const fetchCreateLike = (imageId) => async (dispatch) => {
    let res = await fetch(`/api/images/${imageId}/likes`, {
        method: 'POST'
    })
    if (res.ok){
        const like = await res.json();
        dispatch(createLike(like));
        return like;
    }
    return res;
}

// Delete Like Thunk
export const fetchDeleteLike = (imageId) => async (dispatch) => {
    let res = await fetch(`/api/images/${imageId}/like`, {
        method: 'DELETE'
    })

    
    if (res.ok){
        const like = await res.json();
        dispatch(deleteLike(like));
        return like;
    }
    return res;
}

// ******** REDUCER *********

const initialState = {all_images: {}, user_images: {}, one_image: {}}

const imagesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_ALL_IMAGES:
            newState.all_images = {}
            action.payload.Images.forEach(image => newState.all_images[image.id] = image)
            return newState
        case GET_USER_IMAGES:
            newState.user_images = {}
            action.payload.Images.forEach(image => newState.user_images[image.id] = image)
            return newState
        case GET_ONE_IMAGE:
            newState.one_image = {}
            newState.one_image = action.payload
            return newState
        case CREATE_IMAGES:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case EDIT_IMAGES:
            newState.all_images[action.payload.id] = action.payload
            newState.one_image.Image = action.payload
            return newState
        case DELETE_IMAGES:
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default imagesReducer;
