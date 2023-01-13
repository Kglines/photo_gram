import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LoginForm  from './components/auth/LoginForm';
import NavBar  from './components/NavBar/NavBar';
import SignUpForm  from './components/auth/SignUpForm';
import ImageList  from './components/Images/ImageList';
import ImageDetail  from './components/Images/ImageDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // const LoginForm = lazy(() => import("./components/auth/LoginForm"));
  // const NavBar = lazy(() => import('./components/NavBar/NavBar'));
  // const SignUpForm = lazy(() => import('./components/auth/SignUpForm'));
  // const ImageDetail = lazy(() => import('./components/Images/ImageDetail'));
  // const ImageList = lazy(() => import('./components/Images/ImageList'));
  // const UsersList = lazy(() => import('./components/UsersList'));
  // const User = lazy(() => import('./components/User'));


  return (
    <BrowserRouter>
      <Suspense fallback={<h1 style={{ marginLeft: '250px' }}>Loading...</h1>}>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/images/:imageId' exact={true}>
            <ImageDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/home' exact={true}>
            <ImageList />
          </ProtectedRoute>
          <Route path='/' exact={true}>
            <LoginForm />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
