import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import Auth from 'pages/Auth';
import ForgotPassword from 'pages/Auth/ForgotPassword';
import SetPassword from 'pages/Auth/SetPassword';
import TrackLogIn from 'pages/Auth/track-log-in';
import VerifyPassword from 'pages/Auth/VerifyPassword';
import { SetTrackPassword } from 'pages/track/SignUp';
import { SetStripe } from 'pages/track/SignUp/setStripe';
import storage from 'shared/storage';
import ApolloMainAdmin from '../../apolloMainAdmin';
import AuthLayout from '../../layouts/AuthLayout';

export const AuthRoutes = [
  { path: '/', key: 'ROOT', exact: true, component: Auth },
  {
    path: '/forgot-password',
    key: 'FORGOT_PASSWORD',
    exact: true,
    component: ForgotPassword,
  },
  {
    path: '/verify-password',
    key: 'VERIFY_PASSWORD',
    exact: true,
    component: VerifyPassword,
  },
  {
    path: '/employee-set-password',
    key: 'EMPLOYEE_SET_PASSWORD',
    exact: true,
    component: VerifyPassword,
    backgroundColor: '#fff',
  },
  {
    path: '/stripe',
    key: 'STRIPE',
    exact: false,
    component: SetStripe,
  },
  {
    path: '/track-sign-up',
    key: 'TRACK_SIGN_UP',
    exact: true,
    component: SetTrackPassword,
  },
  {
    path: '/track-log-in',
    key: 'TRACK_LOGIN',
    exact: true,
    component: TrackLogIn,
  },
  {
    path: '/set-password',
    key: 'SET_PASSWORK',
    exact: true,
    backgroundColor: '#fff',
    component: SetPassword,
  },
];

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = storage.get('user', {});
        if (typeof user.role !== 'undefined') {
          if (user.role === 'admin')
            return (
              <Redirect
                to={{
                  pathname: '/admin/series',
                  state: { from: props.location },
                }}
              />
            );
          else if (
            user.role === 'track' &&
            rest.path !== '/stripe' &&
            rest.path !== '/promoter-signup'
          )
            return (
              <Redirect
                to={{
                  pathname: '/admin-track/home',
                  state: { from: props.location },
                }}
              />
            );
          else if (
            user.role === 'employee' &&
            rest.path !== '/admin-employee/set-password'
          )
            return (
              <Redirect
                to={{
                  pathname: '/admin-employee/home',
                  state: { from: props.location },
                }}
              />
            );
        }

        return (
          <ApolloMainAdmin>
            <AuthLayout>
              <Component {...props} />
            </AuthLayout>
          </ApolloMainAdmin>
        );
      }}
    />
  );
};

export default withRouter(AuthRoute);
