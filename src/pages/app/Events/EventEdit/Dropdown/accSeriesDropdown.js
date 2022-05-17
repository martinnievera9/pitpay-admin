import React, { useEffect } from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetAccountData from './gql/get-account-series';
import { compose } from 'recompose';

const Account = ({ values, errors, touched, setFieldValue, data }) => {
  let value = values.account_id;

  useEffect(() => {
    if (!data || !data.getAllAccounts) return;

    if (!value) {
      let seriesUser =
        data.getAllAccounts.find(
          user => user.id === data.getSeriesDetail.account_id
        ) || {};

      setFieldValue('account_id', {
        label: seriesUser.business_dba,
        value: seriesUser.id
      });
    }
  }, [data, setFieldValue, value]);

  if (data.loading || !data.getAllAccounts) return null;

  return (
    <AutoSuggest
      name="account_id"
      label="Account"
      value={value}
      error={errors.account_id}
      touched={touched.account_id}
      onChange={value => {
        setFieldValue('account_id', value);
      }}
      closeMenuOnSelect
      options={data.getAllAccounts.map(item => ({
        value: item.id,
        label: item.business_dba
      }))}
    />
  );
};

export default compose(GetAccountData)(Account);
