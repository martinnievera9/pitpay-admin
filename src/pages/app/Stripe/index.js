import React, { useCallback, useEffect, useState } from 'react';
import StripeConnect from './gql/mutations/stripe-connect';
import qs from 'qs';
import { Redirect } from 'react-router-dom';
import Loading from 'components/Loading';

export const StripeRedirect = StripeConnect(({ stripeConnect }) => {
  const [redirect, setRedirect] = useState();
  const [loading, setLoading] = useState(false);

  let { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  });

  const callMutation = useCallback(
    async code => {
      setLoading(true);
      let response = await stripeConnect(code);
      setLoading(false);

      console.log('response', response);

      if (response.data.stripeConnect) {
        setRedirect(response.data.stripeConnect);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (code) {
      callMutation(code);
    }
  }, [code, callMutation]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div
      style={{
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',

        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {loading ? (
        <div
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Barlow Condensed',
            fontWeight: 700
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 30,
              textAlign: 'center',
              color: '#fa4616'
            }}
          >
            Loading...
          </span>
          <Loading />
        </div>
      ) : null}
    </div>
  );
});
