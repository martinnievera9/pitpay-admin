import React from 'react';
import { Button } from './style';

const StripeButton = ({ style, email, redirect_url, userId }) => {
  return (
    <Button
      style={style}
      href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${process.env.REACT_APP_FRONT_END_URL}${redirect_url}&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[email]=${email}&suggested_capabilities[]=tax_reporting_us_1099_misc&tax_reporting_us_1099_k&stripe_user[business_type]=corporation`}
    >
      Stripe Connect
    </Button>
  );
};

export default StripeButton;
