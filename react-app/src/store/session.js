// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_USER = 'user/get'
const EDIT_USER = 'user/edit'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user
  }
}

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    payload: user
  }
}

export const fetchGetUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(getUser(user));
    return user
  };
  return res;
};

export const fetchEditUser = (user, userId) => async (dispatch) => {
  const formData = new FormData()
  formData.append('user', user)
  console.log('USER in THUNK = ', formData)
  const res = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    // body: formData
  });

  if (res.ok){
    const user = await res.json();
    dispatch(editUser(user))
    return user;
  };
  return res;
};

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case GET_USER:
      newState = action.payload
      return newState
    case EDIT_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
