import { withApollo } from '@apollo/react-hoc';
import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import Icon from 'components/Icon';
import { useMe } from 'hooks/useMe';
import Images from 'images';
import storage from 'shared/storage';
import GetStripeLogin from '../AdminLayout/gql/get-login';
import { NavItemExternal } from '../AdminLayout/StyledAdminLayout';
import {
  GlobalStyle,
  BackgroundContainer,
  NavMenu,
  LogoWrapper,
  Logo,
  NavItem,
  TopBar,
  NavMenuBackground,
  Wrapper,
} from './StyledAdminMobileLayout';

const AdminLayout = ({
  children,
  getStripeLogin,
  backgroundColor,
  history,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: user } = useMe();

  let menu = [];

  if (user?.me?.role === 'track') {
    menu = [
      {
        id: 1,
        link: '/admin-track/home',
        icon: 'home',
        name: 'Home',
        shown: true,
      },
      {
        id: 2,
        link: '/admin-track/events',
        icon: 'flag',
        name: 'Events',
        shown: true,
      },
      {
        id: 3,
        link: '/admin-track/weather',
        icon: 'bolder-sun',
        name: 'Weather',
        shown: true,
      },
      {
        id: 5,
        link: '/admin-track/guest-lists',
        icon: 'home',
        name: 'Guest List',
        shown: true,
      },
      {
        id: 6,
        link: '/admin-track/employees',
        icon: 'users',
        name: 'Staff',
        shown: true,
      },
      {
        id: 7,
        link: '/admin-track/notifications',
        icon: 'notifications',
        name: 'Message Ctr',
        shown: user?.me?.message_center,
      },
      {
        id: 8,
        link: '/admin-track/promos',
        icon: 'percent',
        name: 'Promo Codes',
        shown: true,
      },
      { id: 9, link: '/admin-track/contact', name: 'Contact', shown: true },
      {
        id: 10,
        link: '/admin-track/transactions',
        name: 'Transactions',
        shown: true,
      },
      {
        id: 11,
        link: '/admin-track/registrations',
        name: 'Registrations',
        shown: user?.me?.registrations,
      },
    ];
  } else if (user?.me?.role === 'admin') {
    menu = [
      {
        id: 1,
        link: '/admin/tracks',
        icon: 'flag',
        name: 'Tracks',
        shown: true,
      },
      {
        id: 2,
        link: '/admin/series',
        icon: 'series',
        name: 'Series',
        shown: true,
      },
      {
        id: 3,
        link: '/admin/events',
        icon: 'flag',
        name: 'Events',
        shown: true,
      },
      {
        id: 4,
        link: '/admin/users',
        icon: 'users',
        name: 'Users',
        shown: true,
      },
      {
        id: 5,
        link: '/admin/reports',
        icon: 'reports',
        name: 'Reports',
        shown: true,
      },
      {
        id: 6,
        link: '/admin/videos',
        icon: 'videos',
        name: 'Videos',
        shown: true,
      },
      {
        id: 7,
        link: '/admin/promos',
        icon: 'percent',
        name: 'Promos',
        shown: true,
      },
      {
        id: 8,
        link: '/admin/notifications',
        icon: 'notifications',
        name: 'Message Ctr',
        shown: true,
      },
      {
        id: 9,
        link: '/admin/track-types',
        icon: 'flag',
        name: 'Track Types',
        shown: true,
      },
      {
        id: 10,
        link: '/admin/series-types',
        icon: 'series',
        name: 'Series Types',
        shown: true,
      },
      {
        id: 11,
        link: '/admin/waivers',
        icon: 'document',
        name: 'Waivers',
        shown: true,
      },
      {
        id: 12,
        link: '/admin/transactions',
        icon: 'invoice-1',
        name: 'Transactions',
        shown: true,
      },
      {
        id: 13,
        link: '/admin/registrations',
        icon: 'google-forms',
        name: 'Registrations',
        shown: true,
      },
      {
        id: 14,
        link: '/admin/fee-matrices',
        icon: 'invoice-1',
        name: 'Fee Matrices',
        shown: true,
      },
    ];
  } else {
    menu = [
      { id: 1, link: '/admin-employee/home', name: 'Home', shown: true },
      { id: 2, link: '/admin-employee/events', name: 'Events', shown: true },
      { id: 3, link: '/admin-employee/weather', name: 'Weather', shown: true },
      { id: 5, link: '/admin-employee/contact', name: 'Contact', shown: true },
      {
        id: 6,
        link: '/admin-employee/transactions',
        name: 'Transactions',
        shown: true,
      },
      {
        id: 7,
        link: '/admin-employee/registrations',
        name: 'Registrations',
        shown: user?.me?.registrations,
      },
    ];
  }

  const logout = () => {
    storage.clearUser();
    storage.clear();
    rest.client.clearStore();
    history.push('/');
  };

  return !user ? null : (
    <Fragment>
      <BackgroundContainer isVisible={isVisible}>
        <NavMenuBackground isVisible={isVisible}>
          <NavMenu isVisible={isVisible}>
            <Wrapper>
              {menu
                .filter((item) => item.shown === true)
                .map((item) => (
                  <NavItem
                    exact
                    to={item.link}
                    onClick={() => setIsVisible(!isVisible)}
                    key={item.id}
                  >
                    {item.name}
                  </NavItem>
                ))}
              {user?.me?.role === 'track' ? (
                <NavItemExternal
                  style={{ fontWeight: 600 }}
                  onClick={async () => {
                    const result = await getStripeLogin();
                    if (result && result.data && result.data.getStripeLogin) {
                      window.location.assign(result.data.getStripeLogin);
                    } else {
                      history.push({
                        pathname: '/stripe',
                        search: '',
                        state: {
                          email: storage.get('user').email,
                          id: storage.get('user').id,
                        },
                      });
                    }
                  }}
                  target="_blank"
                  key={9}
                >
                  Stripe
                </NavItemExternal>
              ) : null}

              <NavItem
                exact
                to="/"
                onClick={logout}
                style={{ marginBottom: 150 }}
              >
                Logout
              </NavItem>
            </Wrapper>
          </NavMenu>
        </NavMenuBackground>

        <TopBar>
          <div
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              margin: 'auto',
              top: 0,
              left: 20,
              bottom: 0,
              cursor: 'pointer',
            }}
            onClick={() => setIsVisible(!isVisible)}
            onKeyUp={() => setIsVisible(!isVisible)}
            role="button"
            tabIndex={0}
          >
            <Icon icon="menu" size={20} color="white" />
          </div>{' '}
          {'pitpay' === process.env.REACT_APP_PLATFORM ? (
            <LogoWrapper>
              <Logo src={Images.logoHorizontalWhite} />
            </LogoWrapper>
          ) : (
            <LogoWrapper>
              <Logo src={Images.logoKart} />
            </LogoWrapper>
          )}
        </TopBar>

        <div
          style={{
            width: '100%',
          }}
        >
          {children}
        </div>
      </BackgroundContainer>
      <GlobalStyle backgroundColor={backgroundColor} />
    </Fragment>
  );
};

export default compose(withRouter, withApollo, GetStripeLogin)(AdminLayout);
