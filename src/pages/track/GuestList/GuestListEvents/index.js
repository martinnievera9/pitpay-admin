import React from 'react';
import Me from './gql/queries/me';
import Page from './Page/index';

const Events = props => {
  const { data } = props;
  if (!data.me) return null;
  return (
    <div>
      <Page me={data.me} />
    </div>
  );
};

export default Me(Events);
