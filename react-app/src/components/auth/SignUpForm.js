import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, bio, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateBio = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login-form-container'>
      <div>
        <img
          className='login-image login-image-1'
          src='https://images.unsplash.com/photo-1645075408684-27156020be30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          alt='polaroid'
        />
        <img
          className='login-image login-image-2'
          src='https://images.unsplash.com/photo-1645075408684-27156020be30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          alt='polaroid'
        />
        <img
          className='login-image login-image-3'
          src='https://images.unsplash.com/photo-1645075408684-27156020be30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          alt='polaroid'
        />
      </div>
      <div>
        <form className='signup-form' onSubmit={onSignUp}>
          <p id='login-logo' className='logo'>
            Photogram
          </p>
          <div>
            {errors.map((error, ind) => (
              <div className='errors' key={ind}>
                {error}
              </div>
            ))}
          </div>
          <div>
            {/* <label>User Name</label> */}
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='User Name'
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
            ></input>
          </div>
          <div>
            <textarea
              type='text'
              name='bio'
              onChange={updateBio}
              value={bio}
              placeholder='Bio'
            ></textarea>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            ></input>
          </div>
          <div>
            {/* <label>Repeat Password</label> */}
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Repeat Password'
            ></input>
          </div>
          <button
            className='login-btn'
            disabled={
              username.length === 0 ||
              email.length === 0 ||
              password.length === 0 ||
              repeatPassword.length === 0 ||
              errors.length > 0
            }
            type='submit'
          >
            Sign Up
          </button>
          <p>-------- OR --------</p>
          <p className='login-link'>
            Already have an account?{' '}
            <NavLink to='/login' exact={true}>
              Login
            </NavLink>{' '}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
