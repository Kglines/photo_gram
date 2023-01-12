import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    {/* <Suspense fallback={<h1>Loading...</h1>}> */}
      <Provider store={store}>
        <ModalProvider>
            <App />
        </ModalProvider>
      </Provider>
    {/* </Suspense> */}
  </React.StrictMode>,
  document.getElementById('root')
);
