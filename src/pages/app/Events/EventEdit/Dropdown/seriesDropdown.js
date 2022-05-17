import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetOwnershipData from './gql/get-owndership-series';

const Ownership = ({ values, errors, touched, setFieldValue, data }) => {
  const value = values.user_id;

  useEffect(() => {
    if (!data || !data.getAllUsers) return;

    if (!value) {
      const seriesUser =
        data.getAllUsers.find(
          (user) => user.id === data.getSeriesDetail.user_id
        ) || {};

      setFieldValue('user_id', {
        label: `${seriesUser.first_name} ${
          seriesUser.middle_name ? seriesUser.middle_name : ''
        } ${seriesUser.last_name}`,
        value: seriesUser.id,
      });
    }
  }, [data, setFieldValue, value]);

  if (data.loading || !data.getAllUsers) return null;

  return (
    <AutoSuggest
      name="user_id"
      label="Ownership / Payee"
      value={value}
      error={errors.user_id}
      touched={touched.user_id}
      onChange={(value) => {
        setFieldValue('user_id', value);
      }}
      closeMenuOnSelect
      options={data.getAllUsers.map((item) => ({
        value: item.id,
        label: `${item.first_name} ${
          item.middle_name ? item.middle_name : ''
        } ${item.last_name}`,
      }))}
    />
  );
};

export default compose(GetOwnershipData)(Ownership);
