import { useQuery } from '@apollo/react-hooks';
import { FieldArray } from 'formik';
import React from 'react';
import { Button, RemoveButton } from 'components/Button';
import FieldsRepeater from 'components/FieldsRepeater';
import { SelectInputThatIsRepeatable } from 'components/Form/Select';
import { SectionTitle } from '../../AddEvents/styles';
import {
  GET_WAIVERS,
  GET_WAIVERS_GET_SERIES_DETAIL,
  GET_WAIVERS_GET_TRACK,
} from './Waivers.queries';

export const WaiversRepeater = (props) => {
  const {
    handleChange,
    values,
    handleBlur,
    errors,
    currentTrack,
    currentSeries,
    id,
  } = props;

  const QUERY = currentTrack
    ? GET_WAIVERS_GET_TRACK
    : currentSeries
    ? GET_WAIVERS_GET_SERIES_DETAIL
    : GET_WAIVERS;

  const { data } = useQuery(QUERY, {
    variables:
      currentSeries || currentTrack ? { input: { id: Number(id) } } : undefined,
  });

  const waivers = data?.getWaivers;

  if (!waivers) return null;

  return (
    <FieldArray>
      <>
        <SectionTitle>Waivers</SectionTitle>
        <FieldsRepeater
          fields={
            values?.waivers
              ? values.waivers.filter(Boolean)
              : data?.getSeriesDetail
              ? [{ waiver: data.getSeriesDetail?.waiver_id }]
              : []
          }
          setFields={(value) => {
            handleChange({ target: { name: 'waivers', value } });
          }}
          removeButton={<RemoveButton />}
          addButton={<Button type="button">Add another waiver</Button>}
        >
          <SelectInputThatIsRepeatable
            name="waiver"
            id="waivers"
            placeholder={'Select a waiver.....'}
            options={waivers.map((waiver) => ({
              label: waiver.name,
              value: waiver.id,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.status}
          />
        </FieldsRepeater>
      </>
    </FieldArray>
  );
};
