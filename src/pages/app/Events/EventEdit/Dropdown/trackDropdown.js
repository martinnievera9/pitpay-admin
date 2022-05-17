import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetOwnershipData from './gql/get-ownership-tracks';

const Ownership = ({ values, errors, touched, setFieldValue, data }) => {
  const value = values.user_id;

  useEffect(() => {
    if (!data || !data.getAllUsers) return;

    if (!value) {
      const trackUser =
        data.getAllUsers.find((user) => user.id === data.getTrack.user_id) ||
        {};

      setFieldValue('user_id', {
        label: `${trackUser.first_name ? trackUser.first_name : ''} ${
          trackUser.middle_name ? trackUser.middle_name : ''
        } ${trackUser.last_name ? trackUser.last_name : ''}`,
        value: trackUser.id ? trackUser.id : null,
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
