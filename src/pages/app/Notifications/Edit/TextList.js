import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Radio } from 'components/Form/Radio';
import Spacer from 'components/Spacer';
import GetListsById from '../gql/mutations/get-lists-by-id';
import GetTracksSeries from '../gql/queries/getTracksSeries';

const TextLists = ({
  textTarget,
  data,
  setListTarget,
  listTarget,
  getListsById,
}) => {
  const [listType, setListType] = useState();
  const [seriesTarget, setSeriesTarget] = useState(null);
  const [trackTarget, setTrackTarget] = useState(null);
  const [pitpayTarget, setPitpayTarget] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function fetchLists() {
      const results = await getListsById({
        series_id: seriesTarget ? seriesTarget.value : null,
        track_id: trackTarget ? trackTarget.value : null,
      });

      if (results && results.data) {
        setLists(
          results.data.getListsById.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        );
      }
    }

    fetchLists();
  }, [getListsById, seriesTarget, trackTarget, pitpayTarget]);

  useEffect(() => {
    setSeriesTarget(null);
    setTrackTarget(null);
    setPitpayTarget(false);
    setLists([]);
  }, [listType]);

  return textTarget && textTarget === 'lists' ? (
    <>
      <Spacer size={18} />
      <Radio
        options={[
          {
            label: 'Pit Pay',
            value: 'pitpay',
          },
          {
            label: 'Track',
            value: 'track',
          },
          {
            label: 'Series',
            value: 'series',
          },
        ]}
        onChange={(val) => {
          setListType(val.target.value);
          if (val.target.value === 'pitpay') {
            setPitpayTarget(true);
          }
        }}
        value={listType}
      />
      {listType === 'series' ? (
        <>
          <Spacer size={18} />
          <AutoSuggest
            name="series_id"
            label="Series"
            value={seriesTarget}
            onChange={(value) => {
              setSeriesTarget(value);
            }}
            closeMenuOnSelect
            options={data.getSeries.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </>
      ) : null}

      {listType === 'track' ? (
        <>
          <Spacer size={18} />
          <AutoSuggest
            name="track_id"
            label="Track"
            value={trackTarget}
            onChange={(value) => {
              setTrackTarget(value);
            }}
            closeMenuOnSelect
            options={data.getTracks.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </>
      ) : null}

      {seriesTarget || trackTarget || listType === 'pitpay' ? (
        <>
          <Spacer size={18} />
          <AutoSuggest
            name="list_id"
            label="Text Word Group"
            isClearable
            placeholder="Text Group"
            onChange={(value) => {
              setListTarget(value);
            }}
            value={listTarget}
            closeMenuOnSelect
            options={lists}
          />
        </>
      ) : null}
    </>
  ) : null;
};

export default compose(GetTracksSeries, GetListsById)(TextLists);
