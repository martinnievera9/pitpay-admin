import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
// components
import { Faqs } from 'components/Faqs';
import { ParticipantsListMobile } from 'components/Participants';
import { EventParticipantDetail } from 'components/Participants/EventParticipantDetail';
import { PrintParticipants } from 'components/Participants/PrintParticipants';
import { TicketsListMobile } from 'components/Participants/TicketsListMobile';
import {
  RegistrationsDesktop,
  RegistrationsMobile,
} from 'components/Registrations';
import ThemeProvider from 'components/ThemeProvider';
import { TicketDetails } from 'components/Transactions/TransactionModal/TicketDetails';
import useWindowSize from 'hooks/useWindowSize';
// app admin
import Account from 'pages/app/Account';
import { Events } from 'pages/app/Events';
import EventDetails from 'pages/app/Events/EventDetails';
import MobileMainAdminEvents from 'pages/app/Events/MobileEvents';
import { FaqsAdmin } from 'pages/app/Faqs';
import { FeeMatrices } from 'pages/app/FeeMatrices';
import Notifications from 'pages/app/Notifications';
import Participants from 'pages/app/Participants';
import Promos from 'pages/app/Promos';
import PromoDetail from 'pages/app/Promos/PromoDetail';
import { Reports } from 'pages/app/Reports';
import Series from 'pages/app/Series';
import SeriesTypes from 'pages/app/SeriesTypes';
import { StripeRedirect } from 'pages/app/Stripe';
import TextLists from 'pages/app/TextLists';
import Tickets from 'pages/app/Tickets';
import Tracks from 'pages/app/Tracks';
import TrackTypes from 'pages/app/TrackTypes';
import TransactionsEvents from 'pages/app/Transactions/';
import MobileAdminTransactions from 'pages/app/Transactions/mobileTransactions';
import Transactions from 'pages/app/Transactions/transactionsList';
import Users from 'pages/app/Users';
import UserTransactions from 'pages/app/Users/transactions';
import { Videos } from 'pages/app/Videos';
import Waivers from 'pages/app/Waivers';
// auth
import Auth from 'pages/Auth';
import PromoterSignup from 'pages/Auth/PromoterSignup';
// employee admin
import ContactEmployee from 'pages/employee/Contact';
import EventsEmployee from 'pages/employee/Events';
import { EmployeeHome } from 'pages/employee/Home';
import ScanEmployee from 'pages/employee/Scan';
import Settings from 'pages/employee/Settings';
import SupportEmployee from 'pages/employee/Support';
import VideosEmployee from 'pages/employee/Videos';
import Weather from 'pages/employee/Weather';
// track admin
import TrackContact from 'pages/track/Contact';
import Customers from 'pages/track/Customers';
import CustomerDetail from 'pages/track/Customers/CustomerDetail';
import EmployeesTrack from 'pages/track/Employees';
import EmployeeDetail from 'pages/track/Employees/EmployeeDetail';
import EventsTrack from 'pages/track/Events/Page';
import { GuestListDesktop } from 'pages/track/GuestList/EventGuestList/Desktop';
import { GuestListMobile } from 'pages/track/GuestList/EventGuestList/Mobile';
import GuestEvents from 'pages/track/GuestList/GuestListEvents';
import GuestEventsMobile from 'pages/track/GuestList/GuestListEventsMobile';
import { Guests } from 'pages/track/Guests';
import { GuestDetail } from 'pages/track/Guests/GuestDetail';
import { TrackHome } from 'pages/track/Home';
import MobileTransactions from 'pages/track/MobileTransactions';
import { MobileTransactionsList } from 'pages/track/MobileTransactions/transactionsList';
import TrackNotifications from 'pages/track/Notifications';
import {
  TrackRegistrationsEventsDesktop,
  TrackRegistrationsEventsMobile,
} from 'pages/track/Registrations';
import TrackTransactionsEvents from 'pages/track/Transactions';
import TrackVideos from 'pages/track/Videos';
import TrackVideosMobile from 'pages/track/Videos/videosMobile';
import TrackWeather from 'pages/track/Weather';
import { AppContext } from 'shared/AppContext';
import Apollo from '../apollo';
// layouts
import AddEvents from '../pages/app/Events/AddEvents';
import AdminRoute, { MainAdminRoutes } from './AdminRoute';
import AuthRoute, { AuthRoutes } from './AuthRoute';
import EmployeeRoute from './EmployeeRoute';
import TrackAdminRoute from './TrackAdminRoute';

const AppRouter = () => {
  const [width] = useWindowSize();
  const { state } = useContext(AppContext);

  const GlobalStyle = createGlobalStyle`
body {
  background-color: ${(props) =>
    'light' === state.theme
      ? 768 > width
        ? props.theme.colors.primary
        : props.theme.colors.secondary
      : props.theme.colors.secondary};
}
`;

  return (
    <Apollo>
      <ThemeProvider>
        <Router>
          <Switch>
            {/* Auth */}
            {AuthRoutes.map((props) => (
              <AuthRoute {...props} />
            ))}
            <AuthRoute
              exact
              path="/promoter-signup"
              component={PromoterSignup}
            />
            {/* Super Admin */}
            <AdminRoute exact path="/admin/settings" component={Account} />
            <AdminRoute
              exact
              path="/admin/events/addEvent"
              component={AddEvents}
            />
            <AdminRoute
              exact
              path="/admin/events/editEvent/:id"
              component={AddEvents}
            />
            <AdminRoute
              exact
              path="/admin/track/events/:id"
              component={(props) =>
                width > 860 ? (
                  <Events {...props} />
                ) : (
                  <MobileMainAdminEvents {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/series/events/:id"
              component={(props) =>
                width > 860 ? (
                  <Events {...props} />
                ) : (
                  <MobileMainAdminEvents {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/track/:track_id/events/:id/participants"
              component={
                process.env.REACT_APP_PLATFORM !== 'tickethoss'
                  ? Participants
                  : Tickets
              }
            />
            <AdminRoute
              exact
              path="/admin/track/:track_id/events/:id/participants/:userId"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  <EventParticipantDetail {...props} />
                ) : (
                  <TicketDetails {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/series/:track_id/events/:id/participants/:userId"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  <EventParticipantDetail {...props} />
                ) : (
                  <TicketDetails {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/series/:track_id/events/:id/participants"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  width > 860 ? (
                    <Participants {...props} />
                  ) : (
                    <ParticipantsListMobile {...props} />
                  )
                ) : width > 860 ? (
                  <Tickets {...props} />
                ) : (
                  <TicketsListMobile {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/events/"
              component={(props) =>
                width > 860 ? (
                  <Events {...props} />
                ) : (
                  <MobileMainAdminEvents {...props} />
                )
              }
            />

            <AdminRoute
              exact
              path="/admin/events/:id"
              component={EventDetails}
            />
            <AdminRoute exact path="/admin/faqs" component={FaqsAdmin} />
            <AdminRoute
              exact
              path="/admin/fee-matrices"
              component={FeeMatrices}
            />
            <AdminRoute
              exact
              path="/admin/notifications"
              component={Notifications}
            />
            <AdminRoute exact path="/admin/promos" component={Promos} />
            <AdminRoute
              exact
              path="/admin/promos/:promo_id"
              component={PromoDetail}
            />
            <AdminRoute exact path="/admin/reports" component={Reports} />
            <AdminRoute exact path="/admin/series" component={Series} />
            <AdminRoute exact path="/admin/tracks" component={Tracks} />
            <AdminRoute exact path="/admin/users" component={Users} />
            <AdminRoute
              exact
              path="/admin/users/transactions/:id"
              component={UserTransactions}
            />
            <AdminRoute exact path="/admin/videos" component={Videos} />
            <AdminRoute exact path="/admin/stripe" component={StripeRedirect} />
            <AdminRoute
              exact
              path="/admin/track-types"
              component={TrackTypes}
            />
            <AdminRoute
              exact
              path="/admin/series-types"
              component={SeriesTypes}
            />
            <AdminRoute exact path="/admin/text-lists" component={TextLists} />
            <AdminRoute exact path="/admin/waivers" component={Waivers} />
            <AdminRoute exact path="/admin/scan/:id" component={ScanEmployee} />
            <AdminRoute
              exact
              path="/admin/transactions"
              component={(props) =>
                width > 860 ? (
                  <TransactionsEvents {...props} />
                ) : (
                  <MobileAdminTransactions {...props} />
                )
              }
            />
            <AdminRoute
              exact
              path="/admin/transactions/event/:id"
              component={(props) =>
                width > 860 ? (
                  <Transactions {...props} />
                ) : (
                  <MobileTransactionsList {...props} />
                )
              }
            />
            {MainAdminRoutes.map((props) => (
              <AdminRoute {...props} />
            ))}
            <AdminRoute
              exact
              path="/admin/events/addEvent"
              component={AddEvents}
            />
            <AdminRoute
              exact
              path="/admin/events/editEvent/:id"
              component={AddEvents}
            />
            {/* Track Admin */}
            <TrackAdminRoute
              path="/admin-track/stripe"
              component={StripeRedirect}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/home"
              component={TrackHome}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/events"
              // component={EventsTrack}
              component={(props) =>
                width > 860 ? (
                  <EventsTrack {...props} />
                ) : (
                  <EventsEmployee {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/guest-lists"
              component={(props) =>
                width > 860 ? (
                  <GuestEvents {...props} />
                ) : (
                  <GuestEventsMobile {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/guest-lists/event/:eventId"
              component={(props) =>
                width > 860 ? (
                  <GuestListDesktop {...props} />
                ) : (
                  <GuestListMobile {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/guest-lists/event/:eventId/guest/:guestId"
              component={(props) =>
                width > 860 ? (
                  <GuestDetail {...props} />
                ) : (
                  <GuestDetail {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/guests"
              component={(props) => <Guests {...props} />}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/guests/:guestId"
              component={GuestDetail}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/track/:track_id/events/:id/participants"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  width > 860 ? (
                    <Participants {...props} />
                  ) : (
                    <ParticipantsListMobile {...props} />
                  )
                ) : width > 860 ? (
                  <Tickets {...props} />
                ) : (
                  <TicketsListMobile {...props} />
                )
              }
            />

            <TrackAdminRoute
              exact
              path="/admin-track/track/:track_id/events/:id/participants/:userId"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  <EventParticipantDetail {...props} />
                ) : (
                  <TicketDetails {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/employees"
              component={EmployeesTrack}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/employees/:employee_id"
              component={EmployeeDetail}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/promos"
              component={Promos}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/promos/:promo_id"
              component={PromoDetail}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/settings"
              component={Account}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/scan/:id"
              component={ScanEmployee}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/notifications"
              component={TrackNotifications}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/faqs"
              component={(props) => <Faqs {...props} />}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/weather"
              component={TrackWeather}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/training"
              component={(props) =>
                width > 860 ? (
                  <TrackVideos {...props} />
                ) : (
                  <TrackVideosMobile {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/contact"
              component={TrackContact}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/transactions"
              component={(props) =>
                width > 860 ? (
                  <TrackTransactionsEvents {...props} />
                ) : (
                  <MobileTransactions {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/transactions/event/:id"
              component={(props) =>
                width > 860 ? (
                  <Transactions {...props} />
                ) : (
                  <MobileTransactionsList {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/registrations"
              component={(props) =>
                width > 860 ? (
                  <TrackRegistrationsEventsDesktop {...props} />
                ) : (
                  <TrackRegistrationsEventsMobile {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/registrations/event/:id"
              component={(props) =>
                width > 860 ? (
                  <RegistrationsDesktop {...props} />
                ) : (
                  <RegistrationsMobile {...props} />
                )
              }
            />
            <TrackAdminRoute
              exact
              path="/admin-track/users"
              component={Customers}
            />
            <TrackAdminRoute
              exact
              path="/admin-track/users/transactions/:id"
              component={CustomerDetail}
            />

            <Route
              exact
              path="/admin-track/print"
              // component={TrackVideos}
              render={(props) => <PrintParticipants {...props} />}
            />
            {/* Employee  Admin */}
            <EmployeeRoute
              exact
              path="/admin-employee/home"
              component={EmployeeHome}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/events"
              component={(props) => <EventsEmployee {...props} />}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/weather"
              component={Weather}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/track/:track_id/events/:id/participants"
              component={
                process.env.REACT_APP_PLATFORM !== 'tickethoss'
                  ? ParticipantsListMobile
                  : TicketsListMobile
              }
            />

            <EmployeeRoute
              exact
              path="/admin-employee/track/:track_id/events/:id/participants/:userId"
              component={(props) =>
                process.env.REACT_APP_PLATFORM !== 'tickethoss' ? (
                  <EventParticipantDetail {...props} />
                ) : (
                  <TicketDetails {...props} />
                )
              }
            />
            <EmployeeRoute
              exact
              path="/admin-employee/scan/:id"
              component={ScanEmployee}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/videos"
              component={VideosEmployee}
            />
            <EmployeeRoute exact path="/admin-employee/faqs" component={Faqs} />
            <EmployeeRoute
              backgroundColor="#fff"
              exact
              path="/admin-employee/support"
              component={SupportEmployee}
            />
            <EmployeeRoute
              backgroundColor="#fff"
              exact
              path="/admin-employee/contact"
              component={ContactEmployee}
            />
            <EmployeeRoute
              backgroundColor="#fff"
              exact
              path="/admin-employee/settings"
              component={Settings}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/transactions"
              component={(props) => <MobileTransactions {...props} />}
            />
            <EmployeeRoute
              exact
              path="/admin-employee/transactions/event/:id"
              component={(props) => <MobileTransactionsList {...props} />}
            />
            {/* used as a catch all redirect */}
            <AuthRoute component={Auth} />
          </Switch>
          <GlobalStyle />
        </Router>
      </ThemeProvider>
    </Apollo>
  );
};

export default AppRouter;
