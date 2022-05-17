import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ParticipantsListMobile } from 'components/Participants';
import { EventParticipantDetail } from 'components/Participants/EventParticipantDetail';
import {
  RegistrationsDesktop,
  RegistrationsMobile,
} from 'components/Registrations';
import useWindowSize from 'hooks/useWindowSize';
import Account from 'pages/app/Account';
import { Events } from 'pages/app/Events';
// import EventDetails from 'pages/app/Events/EventDetails';
import MobileMainAdminEvents from 'pages/app/Events/MobileEvents';
import { FeeMatrices } from 'pages/app/FeeMatrices';
import Notifications from 'pages/app/Notifications';
import Participants from 'pages/app/Participants';
import Promos from 'pages/app/Promos';
import PromoDetail from 'pages/app/Promos/PromoDetail';
import {
  RegistrationsEventsDesktop,
  RegistrationsEventsMobile,
} from 'pages/app/Registrations';
import { Reports } from 'pages/app/Reports';
import Series from 'pages/app/Series';
import SeriesTypes from 'pages/app/SeriesTypes';
import { StripeRedirect } from 'pages/app/Stripe';
import TextLists from 'pages/app/TextLists';
import Tracks from 'pages/app/Tracks';
import TrackTypes from 'pages/app/TrackTypes';
import TransactionsEvents from 'pages/app/Transactions/';
import MobileAdminTransactions from 'pages/app/Transactions/mobileTransactions';
import Transactions from 'pages/app/Transactions/transactionsList';
import Users from 'pages/app/Users';
import UserTransactions from 'pages/app/Users/transactions';
import { Videos } from 'pages/app/Videos';
import Waivers from 'pages/app/Waivers';
import ScanEmployee from 'pages/employee/Scan';
import { MobileTransactionsList } from 'pages/track/MobileTransactions/transactionsList';
import storage from 'shared/storage';
import AdminLayout from '../../layouts/AdminLayout';
import AdminMobileLayout from '../../layouts/AdminMobileLayout';

export const MainAdminRoutes = [
  { path: '/admin/settings', key: 'SETTINGS', exact: true, component: Account },
  {
    path: '/admin/track/events/:id',
    key: 'MAIN_ADMIN_TRACK_EVENT',
    exact: true,
    component: Events,
    mobileComponent: MobileMainAdminEvents,
  },
  {
    path: '/admin/series/events/:id',
    key: 'MAIN_ADMIN_SERIES_EVENT',
    exact: true,
    component: Events,
    mobileComponent: MobileMainAdminEvents,
  },
  {
    path: '/admin/track/:track_id/events/:id/participants',
    key: 'MAIN_ADMIN_PARTICIPANTS',
    exact: true,
    component: Participants,
  },
  {
    path: '/admin/track/:track_id/events/:id/participants/:userId',
    key: 'MAIN_ADMIN_TRACK_PARTICIPANTS_DETAIL',
    exact: true,
    component: EventParticipantDetail,
  },
  {
    path: '/admin/series/:track_id/events/:id/participants/:userId',
    key: 'MAIN_ADMIN_SERIES_PARTICIPANTS_DETAIL',
    exact: true,
    component: EventParticipantDetail,
  },
  {
    path: '/admin/series/:track_id/events/:id/participants',
    key: 'MAIN_ADMIN_SERIES_PARTICIPANTS',
    exact: true,
    component: Participants,
    mobileComponent: ParticipantsListMobile,
  },
  {
    path: '/admin/events/',
    key: 'MAIN_ADMIN_EVENTS',
    exact: true,
    component: Events,
    mobileComponent: MobileMainAdminEvents,
  },
  // {
  //   path: '/admin/events/:id',
  //   key: 'MAIN_ADMIN_EVENT_DETAIL',
  //   exact: true,
  //   component: EventDetails,
  // },
  {
    path: '/admin/fee-matrices',
    key: 'MAIN_ADMIN_FEE_MATRICES',
    exact: true,
    component: FeeMatrices,
  },
  {
    path: '/admin/notifications',
    key: 'MAIN_ADMIN_NOTIFICATIONS',
    exact: true,
    component: Notifications,
  },
  {
    path: '/admin/promos',
    key: 'MAIN_ADMIN_PROMOS',
    exact: true,
    component: Promos,
  },
  {
    path: '/admin/promos/:promo_id',
    key: 'MAIN_ADMIN_PROMOS_DETAIL',
    exact: true,
    component: PromoDetail,
  },
  {
    path: '/admin/reports',
    key: 'MAIN_ADMIN_REPORTS',
    exact: true,
    component: Reports,
  },
  {
    path: '/admin/series',
    key: 'MAIN_ADMIN_SERIES',
    exact: true,
    component: Series,
  },
  {
    path: '/admin/tracks',
    key: 'MAIN_ADMIN_TRACKS',
    exact: true,
    component: Tracks,
  },
  {
    path: '/admin/users',
    key: 'MAIN_ADMIN_USERS',
    exact: true,
    component: Users,
  },
  {
    path: '/admin/users/transactions/:id',
    key: 'MAIN_ADMIN_USERS_TRANSACTIONS',
    exact: true,
    component: UserTransactions,
  },
  {
    path: '/admin/videos',
    key: 'MAIN_ADMIN_VIDEOS',
    exact: true,
    component: Videos,
  },
  {
    path: '/admin/stripe',
    key: 'MAIN_ADMIN_STRIPE_REDIRECT',
    exact: true,
    component: StripeRedirect,
  },
  {
    path: '/admin/track-types',
    key: 'MAIN_ADMIN_TRACK_TYPES',
    exact: true,
    component: TrackTypes,
  },
  {
    path: '/admin/series-types',
    key: 'MAIN_ADMIN_SERIES_TYPES',
    exact: true,
    component: SeriesTypes,
  },
  {
    path: '/admin/text-lists',
    key: 'MAIN_ADMIN_TEXTLISTS',
    exact: true,
    component: TextLists,
  },
  {
    path: '/admin/waivers',
    key: 'MAIN_ADMIN_WAIVERS',
    exact: true,
    component: Waivers,
  },
  {
    path: '/admin/scan/:id',
    key: 'MAIN_ADMIN_SCAN',
    exact: true,
    component: ScanEmployee,
  },
  {
    path: '/admin/transactions',
    key: 'MAIN_ADMIN_TRANSACTIONS',
    exact: true,
    component: TransactionsEvents,
    mobileComponent: MobileAdminTransactions,
  },
  {
    path: '/admin/transactions/event/:id',
    key: 'MAIN_ADMIN_TRANSACTIONS_LIST',
    exact: true,
    component: Transactions,
    mobileComponent: MobileTransactionsList,
  },
  {
    path: '/admin/registrations',
    key: 'MAIN_ADMIN_REGISTRATIONS',
    exact: true,
    component: RegistrationsEventsDesktop,
    mobileComponent: RegistrationsEventsMobile,
  },
  {
    path: '/admin/registrations/event/:id',
    key: 'MAIN_ADMIN_REGISTRATIONS_LIST',
    exact: true,
    component: RegistrationsDesktop,
    mobileComponent: RegistrationsMobile,
  },
];

const AdminRoute = ({
  component: Component,
  mobileComponent: MobileComponent,
  backgroundColor,
  // path,
  ...rest
}) => {
  const [width] = useWindowSize();

  return (
    <Route
      // path={path}
      {...rest}
      render={(props) => {
        const user = storage.get('user', {});

        if (typeof user.role !== 'undefined') {
          if (user.role !== 'admin')
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
                {MobileComponent ? (
                  <MobileComponent {...props} />
                ) : (
                  <Component {...props} />
                )}
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
