import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';
import CreateTextMessage from '../gql/mutations/create-text-message';
import GetNotificationEstimate from '../gql/mutations/get-estimate';
import GetTracksSeries from '../gql/queries/getTracksSeries';
import EventsDropdown from './EventsDropdown';
import TextForm from './TextForm';
import TextList from './TextList';

const textTargets = [
  {
    label: '',
    value: '__please_select__', //! dont change this valu
  },
  {
    label: 'App Users',
    value: 'users',
  },
  {
    label: 'Promoters',
    value: 'promoters',
  },
  {
    label: 'Promoters & Staff',
    value: 'promoters-staff',
  },
  {
    label: 'Text Words',
    value: 'lists',
  },
];

const TextMessageForm = ({
  createTextMessage,
  data,
  onComplete,
  clearState,
  getNotificationEstimate,
}) => {
  const [textTarget, setTextTarget] = useState();
  const [audienceTarget, setAudienceTarget] = useState();
  const [trackTarget, setTrackTarget] = useState();
  const [seriesTarget, setSeriesTarget] = useState();
  const [eventTarget, setEventTarget] = useState();
  const [listTarget, setListTarget] = useState();
  const [estimate, setEstimate] = useState(null);

  const resetForm = () => {
    setTextTarget('');
    setAudienceTarget('');
    setTrackTarget('');
    setSeriesTarget('');
    setEventTarget('');
    setListTarget('');
  };

  useEffect(() => {
    resetForm();
  }, [clearState]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getNotificationEstimate({
        textTarget: textTarget ? textTarget : null,
        audienceTarget: audienceTarget ? audienceTarget : null,
        trackTarget: trackTarget ? trackTarget.value : null,
        seriesTarget: seriesTarget ? seriesTarget.value : null,
        eventTarget: eventTarget ? eventTarget.value : null,
        listTarget: listTarget ? listTarget.value : null,
      });

      if (results && results.data) {
        setEstimate(results.data.getNotificationEstimate);
      }
    };
    fetchResults();
  }, [
    textTarget,
    audienceTarget,
    trackTarget,
    seriesTarget,
    eventTarget,
    listTarget,
    getNotificationEstimate,
  ]);

  const showMessageField = () => {
    return (
      (audienceTarget && audienceTarget === 'all-users') ||
      (textTarget &&
        ['promoters', 'staff', 'promoters-staff'].includes(textTarget)) ||
      (audienceTarget && audienceTarget === 'track-favorites' && trackTarget) ||
      (audienceTarget &&
        audienceTarget === 'series-favorites' &&
        seriesTarget) ||
      (textTarget && textTarget === 'lists' && listTarget) ||
      (audienceTarget && audienceTarget === 'event-participants' && eventTarget)
    );
  };

  return (
    <>
      <Spacer size={18} />
      <Select
        label="Send Message To"
        options={textTargets}
        onChange={(val) => {
          setTextTarget(val.target.value);
        }}
        // onBlur={handleBlur}
        value={textTarget}
      />
      {textTarget === 'users' ? (
        <>
          <Spacer size={18} />
          <Select
            label="Group"
            options={[
              {
                label: '',
                value: '__please_select__', //! dont change this valu
              },
              {
                label: 'All App Users',
                value: 'all-users',
              },
              {
                label: 'Track Favorites',
                value: 'track-favorites',
              },
              {
                label: 'Series Favorites',
                value: 'series-favorites',
              },
              {
                label: 'Event Participants',
                value: 'event-participants',
              },
            ]}
            onChange={(val) => {
              setAudienceTarget(val.target.value);
            }}
            // onBlur={handleBlur}
            value={audienceTarget}
          />
        </>
      ) : null}
      {audienceTarget && audienceTarget === 'track-favorites' ? (
        <>
          <Spacer size={18} />
          <AutoSuggest
            name="track_id"
            label="Track"
            value={trackTarget}
            onChange={(value) => {
              setTrackTarget(value);
            }}
            // onBlur={() => setTrackTarget('track_id', true)}
            closeMenuOnSelect
            options={data.getTracks.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </>
      ) : null}

      {audienceTarget && audienceTarget === 'series-favorites' ? (
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

      {audienceTarget && audienceTarget === 'event-participants' ? (
        <EventsDropdown
          setEvent={setEventTarget}
          event={eventTarget}
          tracks={data.getTracks}
          series={data.getSeries}
        />
      ) : null}

      <TextList
        textTarget={textTarget}
        data={data}
        setListTarget={setListTarget}
        listTarget={listTarget}
      />

      {showMessageField() ? (
        <TextForm
          onSubmit={async ({ message }) => {
            const response = await createTextMessage({
              message,
              textTarget,
              audienceTarget,
              trackTarget: trackTarget?.value,
              seriesTarget: seriesTarget?.value,
              eventTarget: eventTarget?.value,
              listTarget: listTarget?.value,
            });

            if (response && !response.errors) {
              resetForm();
              onComplete();
            }

            return response;
          }}
          estimate={estimate}
          type={'text'}
        />
      ) : null}
    </>
  );
};

export default compose(
  CreateTextMessage,
  GetTracksSeries,
  GetNotificationEstimate
)(TextMessageForm);
