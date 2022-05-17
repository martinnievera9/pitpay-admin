import React from 'react';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { ErrorText } from 'components/Form/styles';
import Loading from 'components/Loading';
import storage from 'shared/storage';
import { useMyOwnershipQuery } from './gql/me';

export function getUserOwnership() {
  const user = storage.get('user');
  const tracks = user?.ownership?.tracks;
  const series = user?.ownership?.series;
  const isMultiVenueOwner = (tracks?.length ?? 0) + (series?.length ?? 0) > 1;
  const firstVenue = tracks?.[0] ?? series?.[0] ?? undefined;
  return {
    isMultiVenueOwner,
    venues: (tracks ?? []).concat(series ?? []),
    firstVenue,
  };
}

export const OwnershipInput = ({
  value,
  error,
  setFieldValue,
  label,
  placeholder,
  onBlur,
}) => {
  const { data, loading } = useMyOwnershipQuery();
  if (loading) return <Loading size={50} />;

  if (!data.me) return null;

  if (!data.me.ownership.tracks.length && !data.me.ownership.series.length)
    return null;

  if (data.me.ownership.tracks.length + data.me.ownership.series.length < 2)
    return null;

  const makeOptions = () => {
    const allOptions = data.me.ownership.tracks.concat(
      data.me.ownership.series
    );

    const dropDownOptions = allOptions.map((item) => ({
      label: item.name,
      id: item.id,
      type: item.__typename,
    }));

    return dropDownOptions;
  };

  return (
    <>
      <AutoSuggest
        name="ownership"
        placeholder={placeholder}
        label={label}
        onChange={(value) => {
          setFieldValue('ownership', {
            value: value.id,
            label: value.label,
            type: value.type,
          });
        }}
        onBlur={onBlur}
        value={value}
        closeMenuOnSelect
        options={makeOptions()}
      />
      {error && <ErrorText fontSize={14}>{error}</ErrorText>}
    </>
  );
};
