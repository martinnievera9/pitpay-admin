import * as Sentry from '@sentry/browser';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './routes';
import * as serviceWorker from './serviceWorker';
import AppProvider from './shared/AppContext';
import UpdateAlert from './updateAlert';

Sentry.init({
  dsn: 'https://9a4a16653eaf46438dedace1c829f238@sentry.io/1780549',
});

ReactDOM.render(
  <Fragment>
    <ToastContainer />
    <UpdateAlert />
    <AppProvider>
      <App />
    </AppProvider>
  </Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register({
//   onSuccess: () => console.log('success'),
//   onUpdate: reg => {
//     console.log('reg', reg);
//   }
// });
serviceWorker.register();
