import React from 'react';
import { Select } from 'components/Form/Select';
import GetTrackTypes from '../../TrackTypes/gql/queries/get-track-types';

const Types = ({ value, errors, touched, onChange, onBlur, data }) => {
  if (data.loading || !data.getTrackTypesAdmin) return null;

  const options = [{ type: '', label: '' }].concat(
    data.getTrackTypesAdmin.results.map(type => ({
      label: type.name,
      value: type.id
    }))
  );

  return (
    <Select
      id="type_id"
      label="Track Info"
      placeholder="Track Info"
      options={options}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={errors.type_id}
    />
  );
};

export default GetTrackTypes(Types);
