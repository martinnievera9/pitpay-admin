import React, { useEffect } from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { ErrorText } from 'components/Form/styles';
import GetTracks from '../gql/queries/get-all-tracks.js';

const Tracks = ({
  values,
  errors,
  touched,
  setFieldValue,
  // setTrackTitle,
  data,
}) => {
  useEffect(() => {
    setFieldValue('track_id', values.track_id);
  }, [setFieldValue, values.track_id]);

  if (data.loading) return <div />;

  if (!data.getTracks) return false;

  const selectedItem = data.getTracks.find((item) => values.track_id === item.id);
  if (selectedItem) setFieldValue('track_id.label', selectedItem.name);

  return (
    <div>
      <AutoSuggest
        name="track_id"
        label="Tracks"
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
          //setTrackTitle(selectedItem ? selectedItem.track_id.label : '');
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
