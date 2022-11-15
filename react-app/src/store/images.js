// ******** Image Constraints ********
const GET_ALL_IMAGES = 'images/get';
const GET_USER_IMAGES = 'user_images/get';
const GET_ONE_IMAGE = 'one_image/get';
const CREATE_IMAGES = 'images/create';
const EDIT_IMAGES = 'images/edit';
const DELETE_IMAGES = 'images/delete';

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
export const fetchUserImages = () => async (dispatch) => {
    const res = await fetch(`/api/users/images`);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    });

    if(res.ok){
        const image = await res.json();
        dispatch(createImages(image));
        return image;
    };
    return res;
};

// Edit Image Thunk
export const fetchEditImage = (image) => async (dispatch) => {
    const res = await fetch(`/api/images/${image.id}`, {
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

// ******** REDUCER *********

const initialState = {}

const imagesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_ALL_IMAGES:
            // newState = {}
            action.payload.forEach(image => newState[image.id] = image)
            return newState
        case GET_USER_IMAGES:
            action.payload.forEach(image => newState[image.id] = image)
            return newState
        case GET_ONE_IMAGE:
            newState = action.payload
            return newState
        case CREATE_IMAGES:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case EDIT_IMAGES:
            newState = action.payload
            return newState
        case DELETE_IMAGES:
            delete newState[action.payload]
            return newState
        default:
            return newState
    }
}

export default imagesReducer;
