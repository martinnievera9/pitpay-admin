import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Spacer from 'components/Spacer';
import useViewport from 'hooks/useViewport';
import Images from 'images';
import { AppContext } from 'shared/AppContext';
import storage from 'shared/storage';
import HelpLink from './components/HavingTrouble';
import 'react-phone-number-input/style.css';
import './../../../index.css';

const LogoTicketHoss = styled.img`
  width: 417px;
  height: 160px;
`;

const Stripe = styled.img`
  height: 100%;
  width: 180px;
`;

export default () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const { width } = useViewport();
  const defaultRedirect = '/admin/tracks';

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: width > 768 ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 28,
            textAlign: 'center',
            display: 'block',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontFamily: 'Barlow Condensed',
            marginBottom: 10,
            order: width > 768 ? 0 : 1,
          }}
        >
          Set Up Your Payments Account
        </span>

        <div style={{ order: width > 768 ? 0 : 1 }}>
          <Stripe src={Images.stripe} />
        </div>
      </div>
      <span
        style={{
          color: 'white',
          fontSize: 28,
          textAlign: 'center',
          display: 'block',
          fontWeight: 'bold',
          alignSelf: 'center',
          fontFamily: 'Barlow Condensed',
          marginBottom: 40,
        }}
      >
        You'll Need to Have a Few Things Handy
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        <LogoTicketHoss
          style={{
            width: '70px',
            height: '100%',
            marginRight: 15,
            alignSelf: 'center',
          }}
          src={Images.bankAccount}
        />
        <span
          style={{
            color: 'white',
            fontSize: 24,
            display: 'block',
            width: '80%',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontFamily: 'Barlow Condensed',
            marginBottom: 10,
          }}
        >
          Business Bank Info
          <br />
          Account # / Routing # Or Business Debit Card #
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        <LogoTicketHoss
          style={{
            width: '70px',
            height: '100%',
            marginRight: 15,
            alignSelf: 'center',
          }}
          src={Images.tax}
        />
        <span
          style={{
            color: 'white',
            fontSize: 24,
            display: 'block',
            width: '80%',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontFamily: 'Barlow Condensed',
            marginBottom: 10,
          }}
        >
          Business Entity Info <br />
          Including EIN / TIN / BN / SIN <br />
        </span>
      </div>
      <Button
        small={true}
        buttonColor={width > 768 ? '#00001d' : '#fa4616'}
        textColor={'#fff'}
        onClick={() => {
          const account = storage.get('account');
          storage.removeItem('current-step');
          storage.removeItem('account');
          storage.removeItem('promoter-user-phone');
          dispatch({
            type: 'SET_THEME',
            theme: 'light',
          });
          window.open(
            `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${process.env.REACT_APP_FRONT_END_URL}/admin-track/stripe&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[email]=${account.email}&suggested_capabilities[]=tax_reporting_us_1099_misc&tax_reporting_us_1099_k&stripe_user[business_type]=corporation`
          );
        }}
        buttonStyle={{
          width: '65%',
          alignSelf: 'center',
        }}
        style={{
          fontSize: 30,
          padding: 20,

          fontFamily: 'Barlow Condensed Semi',
        }}
      >
        Set Up Stripe
      </Button>
      <Button
        block
        small={true}
        buttonColor={width > 768 ? '#fa4616' : '#00001d'}
        textColor={width > 768 ? '#00001d' : '#FFFFFF'}
        onClick={async () => {
          storage.removeItem('current-step');
          storage.removeItem('account');
          storage.removeItem('promoter-user-phone');
          dispatch({
            type: 'SET_THEME',
            theme: 'light',
          });
          dispatch({ type: 'SET_STRIPE_STATUS', status: false });
          history.push(defaultRedirect);
        }}
        buttonStyle={{
          width: '65%',
          alignSelf: 'center',
        }}
        style={{
          fontSize: 30,
          padding: 20,

          fontFamily: 'Barlow Condensed Semi',
        }}
      >
        Skip for Now
      </Button>
      <Spacer size={width > 768 ? 0 : 50} />
      <HelpLink />
    </>
  );
};
