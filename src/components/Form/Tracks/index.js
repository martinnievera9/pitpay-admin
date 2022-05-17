import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { ErrorText } from 'components/Form/styles';
import GetTracks from './gql/get-tracks.js';

const Tracks = ({
  values,
  errors,
  touched,
  setFieldValue,
  data,
  label,
  name,
}) => {
  if (data.loading) return <div />;

  if (!data.getTracks) return false;

  const selectedItem = data.getTracks.find(
    (item) => values.track_id === item.id
  );

  return (
    <div>
      <AutoSuggest
        name={name}
        label={label}
        isClearable
        value={
          typeof values.track_id == 'number' && selectedItem
            ? {
                value: selectedItem.id,
                label: selectedItem.name,
              }
            : values.track_id
        }
        error={errors.track_id && touched.track_id && errors.track_id}
        touched={touched.track_id}
        onChange={(value) => {
          setFieldValue('track_id', value);
        }}
        closeMenuOnSelect
        options={data.getTracks.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
      />
      {errors.track_id && (
        <ErrorText fontSize={12}>{errors.track_id}</ErrorText>
      )}
    </div>
  );
};

export default GetTracks(Tracks);
