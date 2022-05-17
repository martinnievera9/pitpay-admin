import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import storage from 'shared/storage';

import AdminMobileLayout from '../../layouts/AdminMobileLayout';

const AdminRoute = ({ component: Component, backgroundColor, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const user = storage.get('user', {});

        if (typeof user.role !== 'undefined') {
          if (user.role !== 'employee')
            return (
              <Redirect
                to={{
                  pathname: '/admin',
                  state: { from: props.location }
                }}
              />
            );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          );
        }

        return (
          <AdminMobileLayout backgroundColor={backgroundColor}>
            <Component {...props} />
          </AdminMobileLayout>
        );
      }}
    />
  );
};

export default AdminRoute;
