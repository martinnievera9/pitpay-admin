import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';
import CreatePushNotification from '../gql/mutations/create-push-notification';
import GetNotificationEstimate from '../gql/mutations/get-estimate';
import GetTracksSeries from '../gql/queries/getTracksSeries';
import EventsDropdown from './EventsDropdown';
import TextForm from './TextForm';

const PushMessageForm = ({
  createPushNotification,
  data,
  onComplete,
  clearState,
  getNotificationEstimate,
}) => {
  const [audienceTarget, setAudienceTarget] = useState();
  const [trackTarget, setTrackTarget] = useState();
  const [seriesTarget, setSeriesTarget] = useState();
  const [eventTarget, setEventTarget] = useState();
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getNotificationEstimate({
        audienceTarget: audienceTarget ? audienceTarget : null,
        trackTarget: trackTarget ? trackTarget.value : null,
        seriesTarget: seriesTarget ? seriesTarget.value : null,
        eventTarget: eventTarget ? eventTarget.value : null,
      });

      if (results && results.data) {
        setEstimate(results.data.getNotificationEstimate);
      }
    };
    fetchResults();
  }, [
    audienceTarget,
    trackTarget,
    seriesTarget,
    eventTarget,
    getNotificationEstimate,
  ]);

  const resetForm = () => {
    setAudienceTarget('');
    setTrackTarget('');
    setSeriesTarget('');
    setEventTarget('');
    setEstimate(null);
  };

  useEffect(() => {
    resetForm();
  }, [clearState]);

  const showMessageField = () => {
    return (
      (audienceTarget && audienceTarget === 'all-users') ||
      (audienceTarget && audienceTarget === 'track-favorites' && trackTarget) ||
      (audienceTarget &&
        audienceTarget === 'series-favorites' &&
        seriesTarget) ||
      (audienceTarget && audienceTarget === 'event-participants' && eventTarget)
    );
  };

  return (
    <>
      <Spacer size={18} />
      <Select
        label="Send Message To"
        options={[
          {
            label: '',
            value: '__please_select__', //! dont change this valu
          },
          {
            label: 'App Users',
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

      {showMessageField() ? (
        <TextForm
          onSubmit={async ({ title, message }) => {
            const response = await createPushNotification({
              message,
              title,
              audienceTarget,
              trackTarget: trackTarget?.value,
              seriesTarget: seriesTarget?.value,
              eventTarget: eventTarget?.value,
            });

            if (response && !response.errors) {
              resetForm();
              onComplete();
            }

            return response;
          }}
          showTitle={true}
          estimate={estimate}
          type={'push'}
        />
      ) : null}
    </>
  );
};

export default compose(
  CreatePushNotification,
  GetNotificationEstimate,
  GetTracksSeries
)(PushMessageForm);
