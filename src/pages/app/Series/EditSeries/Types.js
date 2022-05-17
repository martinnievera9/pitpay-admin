import React, { useEffect } from 'react';
import { Select } from 'components/Form/Select';
import GetSeriesTypes from '../../SeriesTypes/gql/queries/get-series-types';

const Types = ({ value, errors, touched, onChange, onBlur, data }) => {
  if (data.loading || !data.getSeriesTypes) return null;

  return (
    <SelectInput
      id="type_id"
      label="Series Type"
      options={data.getSeriesTypes.map(type => ({
        label: type.key,
        value: type.id
      }))}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={errors.type && touched.type && errors.type}
    />
  );
};

export default GetSeriesTypes(Types);
