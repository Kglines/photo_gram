import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import DemoLogin from './DemoLogin';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
        <form onSubmit={onLogin} className='login-form'>
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
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button
            className='login-btn'
            type='submit'
            disabled={email.length === 0}
          >
            Login
          </button>
          <p className='login-or'>
            <hr width='40px' align='center'></hr>Or<hr width='40px'></hr>
          </p>
          <p className='login-link'>
            Don't have an account?{' '}
            <NavLink to='/sign-up' exact={true}>
              SignUp
            </NavLink>{' '}
          </p>
        </form>
        <div className='demo-login'>
          <p className='login-or'>
            <hr width='40px' align='center'></hr>Or<hr width='40px'></hr>
          </p>
          <p>Try it out</p>
          <DemoLogin />
          <a
            className='login-about-links'
            rel='noreferrer'
            target='_blank'
            href='https://github.com/Kglines/photo_gram'
          >
            <FaGithub />
          </a>
          <a
            className='login-about-links'
            rel='noreferrer'
            target='_blank'
            href='https://www.linkedin.com/in/keith-glines-70b28b30'
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
