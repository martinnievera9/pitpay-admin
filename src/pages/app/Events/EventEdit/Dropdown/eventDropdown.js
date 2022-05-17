import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetOwnershipData from './gql/get-ownership-events';
import { compose } from 'recompose';

const Ownership = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  currentSeries,
  id,
  data
}) => {
  let value = values.user_id;

  //   useEffect(() => {
  //     if (!data || !data.getAllUsers) return;

  //     if (!value) {
  //       let trackUser =
  //         data.getAllUsers.find((user) => user.id === data.getEvent.user_id) ||
  //         {};

  //       setFieldValue('user_id', {
  //         label: `${trackUser.first_name ? trackUser.first_name : ''} ${
  //           trackUser.middle_name ? trackUser.middle_name : ''
  //         } ${trackUser.last_name ? trackUser.last_name : ''}`,
  //         value: trackUser.id ? trackUser.id : null
  //       });
  //     }
  //   }, [data, setFieldValue, value]);

  if (data.loading || !data.getAllUsers) return null;

  return (
    <AutoSuggest
      name="user_id"
      label="Ownership"
      value={value}
      error={errors.user_id}
      touched={touched.user_id}
      onChange={value => {
        setFieldValue('user_id', value);
      }}
      onBlur={value => {}}
      closeMenuOnSelect
      options={data.getAllUsers.map(item => ({
        value: item.id,
        label: `${item.first_name} ${
          item.middle_name ? item.middle_name : ''
        } ${item.last_name}`
      }))}
    />
  );
};

export default compose(GetOwnershipData)(Ownership);
