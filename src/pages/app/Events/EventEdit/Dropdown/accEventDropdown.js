import React from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetAccountData from './gql/get-account-events';

const Account = ({ values, errors, touched, setFieldValue, data }) => {
  const value = values.account_id;

  if (data.loading || !data.getAllAccounts) return null;

  return (
    <AutoSuggest
      name="account_id"
      label="Account"
      value={value}
      error={errors.account_id}
      touched={touched.account_id}
      onChange={(value) => {
        setFieldValue('account_id', value);
      }}
      closeMenuOnSelect
      options={data.getAllAccounts.map((item) => ({
        value: item.id,
        label: item.business_dba,
      }))}
    />
  );
};

export default compose(GetAccountData)(Account);
