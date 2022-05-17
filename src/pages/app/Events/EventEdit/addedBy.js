import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import GetUsers from '../gql/queries/get-users';
import { ErrorText } from 'components/Form/styles';

const AddedBy = ({
  value,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  isMulti,
  data
}) => {
  if (data.loading) return <div />;
  return (
    <div>
      <AutoSuggest
        name="added_by"
        label="Added By"
        isClearable
        error={errors.added_by && touched.added_by && errors.added_by}
        value={data.getAllUsers.map(item => {
          return item.id === value
            ? {
                value: item.id,
                label: `${item.first_name} ${
                  item.middle_name ? item.middle_name : ''
                } ${item.last_name}`
              }
            : null;
        })}
        touched={touched.added_by}
        onChange={({ value }) => {
          setFieldValue('added_by', value);
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
      {errors.added_by && (
        <ErrorText fontSize={12}>{errors.added_by}</ErrorText>
      )}
    </div>
  );
};

export default GetUsers(AddedBy);
