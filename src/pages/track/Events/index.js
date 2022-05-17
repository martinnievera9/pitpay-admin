import React from 'react';
import Me from './gql/queries/me';
import Page from './Page/index';

const Events = props => {
  let { data } = props;
  if (!data.me) return false;
  return (
    <div>
      <Page me={data.me} />
    </div>
  );
};

export default Me(Events);
