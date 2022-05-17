import React from 'react';
import styled from 'styled-components';
import StripeButton from 'components/StripeButton';

const Heading = styled.p`
  margin-bottom: 10px;
  color: #fff;
  font-weight: 600;
  font-family: 'Barlow Condensed';
  text-align: left;
  font-size: 30px;
  line-height: 29px;
`;

const Text = styled.p`
  margin-bottom: 20px;
  color: #fff;
  text-align: left;
  font-size: 16px;
  line-height: 29px;

  a {
    margin-right: 5px;
    margin-left: 5px;
    color: #fa4616;
    text-decoration: none;
  }
`;

export const SetStripe = (props) => {
  const { history } = props;
  return (
    <div style={{ padding: 20 }}>
      <Heading>What is Stripe Connect?</Heading>
      <Text>
        Stripe is Pit Pay's third-party payment processor. In order to be paid,
        you will need to setup a Stripe Connect account with the business debit
        card or business checking account where your payments will be received.
        With the Stripe dashboard, you can securely log into your Stripe account
        and manage your payments on the go.
      </Text>
      <Text>
        Stripe “Instant Payouts” will be utilized when a Stripe-approved
        business debit card is connected to the business bank account where the
        payout is desired. "Instant Payouts" will be processed within one
        business day of the event.
      </Text>
      <Text>
        Payments via ACH will be made directly to your checking account if you
        are not able to participate in “Instant Payouts.” Payments will take 2-3
        business days to process.
      </Text>
      <Text>
        Here are the links to the Stripe Dashboard in the app stores:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://apps.apple.com/us/app/stripe-dashboard/id978516833"
        >
          Apple App Store
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://play.google.com/store/apps/details?id=com.stripe.android.dashboard"
        >
          Google Play Store
        </a>
      </Text>
      <StripeButton
        style={{
          backgroundColor: '#00001f',
          fontSize: 20,
          padding: 15,
        }}
        email={history.location.state.email}
        userId={history.location.state.id}
        redirect_url={`/admin-track/stripe`}
      />
    </div>
  );
};
