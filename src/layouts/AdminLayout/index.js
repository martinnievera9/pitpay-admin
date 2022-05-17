import { withApollo } from '@apollo/react-hoc';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
import { useMe } from 'hooks/useMe';
import Images from 'images';
import storage from 'shared/storage';
import GetStripeLogin from './gql/get-login';
import {
  GlobalStyle,
  BackgroundContainer,
  NavMenu,
  LogoWrapper,
  Logo,
  NavItem,
  NavItemExternal,
  SettingsLink,
  TopBar,
  SettingsWrapper,
  UserName,
  UserRole,
  Wrapper,
  TicketHossLogo,
} from './StyledAdminLayout';

const AdminLayout = ({ children, getStripeLogin, history, ...rest }) => {
  const { data: user } = useMe();
  let menu = [];

  const logout = () => {
    storage.clearUser();
    rest.client.clearStore();
    storage.clear();
    history.push('/');
  };

  if (user?.me?.role === 'admin') {
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
        id: 4,
        link: '/admin-track/guest-lists',
        icon: 'home',
        name: 'Guest List',
        shown: true,
      },
      {
        id: 5,
        link: '/admin-track/employees',
        icon: 'users',
        name: 'Staff',
        shown: true,
      },
      {
        id: 11,
        link: '/admin-track/users',
        icon: 'users',
        name: 'Customers',
        shown: true,
      },
      {
        id: 6,
        link: '/admin-track/notifications',
        icon: 'notifications',
        name: 'Message Ctr',
        shown: user?.me?.message_center,
      },
      {
        id: 7,
        link: '/admin-track/promos',
        icon: 'percent',
        name: 'Promo Codes',
        shown: true,
      },
      {
        id: 8,
        link: '/admin-track/contact',
        icon: 'phone',
        name: 'Contact',
        shown: true,
      },
      {
        id: 9,
        link: '/admin-track/transactions',
        icon: 'invoice-1',
        name: 'Transactions',
        shown: true,
      },
      {
        id: 10,
        link: '/admin-track/registrations',
        icon: 'google-forms',
        name: 'Registrations',
        shown: user?.me?.registrations,
      },
    ];
  }

  return !user ? null : (
    <Fragment>
      <BackgroundContainer>
        <NavMenu>
          <Wrapper>
            {'pitpay' === process.env.REACT_APP_PLATFORM ? (
              <LogoWrapper>
                <Logo src={Images.logoHorizontalWhite} />
              </LogoWrapper>
            ) : 'tickethoss' === process.env.REACT_APP_PLATFORM ? (
              <LogoWrapper style={{ width: '100%' }}>
                <TicketHossLogo
                  src={Images.logoTickethossHorizontal}
                  style={{ width: 200 }}
                />
              </LogoWrapper>
            ) : (
              <LogoWrapper>
                <Logo src={Images.logoKart} />
              </LogoWrapper>
            )}

            {menu
              .filter((item) => item.shown === true)
              .map((item) => (
                <NavItem exact to={item.link} key={item.id}>
                  <div style={{ marginRight: 15, width: 20 }}>
                    <Icon icon={item.icon} size={20} color="white" />
                  </div>{' '}
                  {item.name}
                </NavItem>
              ))}
            {user?.me?.role === 'track' ? (
              <NavItemExternal
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
                <div style={{ marginRight: 15, width: 20 }}>
                  <Icon icon="dollar" size={20} color="white" />
                </div>{' '}
                Stripe
              </NavItemExternal>
            ) : null}
          </Wrapper>
        </NavMenu>

        <TopBar>
          <SettingsWrapper>
            <SettingsLink
              to={
                'admin' === user?.me?.role
                  ? '/admin/settings'
                  : '/admin-track/settings'
              }
            >
              <Icon icon="settings" size={20} color="white" />
            </SettingsLink>
          </SettingsWrapper>
          <Dropdown
            items={[{ id: 1, text: 'Logout', onClick: () => logout() }]}
          >
            <UserName>{`${user?.me?.first_name} ${user?.me?.last_name}`}</UserName>
            <UserRole>
              {'admin' === user?.me?.role
                ? 'APP ADMIN'
                : 'track' === user?.me?.role
                ? 'TRACK ADMIN'
                : 'EMPLOYEE'}
            </UserRole>
          </Dropdown>
        </TopBar>

        <div
          style={{
            width: 'calc(100% - 200px)',
            marginLeft: 200,
            height: '100%',
          }}
        >
          {children}
        </div>
      </BackgroundContainer>
      <GlobalStyle />
    </Fragment>
  );
};

export default compose(withRouter, withApollo, GetStripeLogin)(AdminLayout);
