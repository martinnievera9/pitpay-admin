import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from 'shared/storage';
import AdminMobileLayout from '../../layouts/AdminMobileLayout';
import AdminLayout from '../../layouts/AdminLayout';
import useWindowSize from 'hooks/useWindowSize';

const AdminRoute = ({ component: Component, backgroundColor, ...rest }) => {
  let [width] = useWindowSize();

  return (
    <Route
      {...rest}
      render={(props) => {
        const user = storage.get('user', {});

        if (typeof user.role !== 'undefined') {
          if (user.role !== 'track')
            return (
              <Redirect
                to={{
                  pathname: '/admin',
                  state: { from: props.location },
                }}
              />
            );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <div>
            {width <= 860 ? (
              <AdminMobileLayout backgroundColor={backgroundColor}>
                <Component {...props} />
              </AdminMobileLayout>
            ) : (
              <AdminLayout>
                <Component {...props} />
              </AdminLayout>
            )}
          </div>
        );
      }}
    />
  );
};

export default AdminRoute;
