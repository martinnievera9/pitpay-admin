import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Radio } from 'components/Form/Radio';
import Spacer from 'components/Spacer';
import { YearDropdown , withEventYearFilterContext } from 'components/YearDropdown';
import CreatePushNotification from '../gql/mutations/create-push-notification';
import GetNotificationEstimate from '../gql/mutations/get-estimate';
import { useGetNotificationEvents } from '../gql/queries/get-user-notification-events';
import TextForm from './TextForm';


const Label = styled.label`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 4.2vw;
  display: block;
  margin-bottom: 15px;

  @media (min-width: 700px) {
    font-size: 16px;
  }
`;

const PushMessageForm = withEventYearFilterContext(
  ({
    createPushNotification,
    onComplete,
    clearState,
    audienceOptions,
    getNotificationEstimate,
  }) => {
    const [audienceTarget, setAudienceTarget] = useState();
    const [trackTarget, setTrackTarget] = useState();
    const [seriesTarget, setSeriesTarget] = useState();
    const [eventTarget, setEventTarget] = useState();
    const [estimate, setEstimate] = useState(null);

    const { data, loading } = useGetNotificationEvents();

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

    if (loading) return null;

    const getAudienceOptions = () => {
      if (data.me.ownership.tracks.length && data.me.ownership.series.length) {
        return audienceOptions.full;
      }

      if (data.me.ownership.tracks.length) {
        return audienceOptions.track;
      }

      if (data.me.ownership.series.length) {
        return audienceOptions.series;
      }
    };

    const showMessageField = () => {
      return (
        (audienceTarget && audienceTarget === 'all-users') ||
        (audienceTarget &&
          audienceTarget === 'track-favorites' &&
          trackTarget) ||
        (audienceTarget &&
          audienceTarget === 'series-favorites' &&
          seriesTarget) ||
        (audienceTarget &&
          audienceTarget === 'event-participants' &&
          eventTarget)
      );
    };

    return (
      <>
        <Spacer size={25} />
        <Label>Send Message To</Label>
        <Radio
          options={getAudienceOptions()}
          onChange={(val) => {
            setAudienceTarget(val.target.value);
          }}
          // onBlur={handleBlur}
          value={audienceTarget}
        />
        {audienceTarget && audienceTarget === 'track-favorites' ? (
          <>
            <Spacer size={25} />
            <AutoSuggest
              name="track_id"
              label="Track"
              value={trackTarget}
              onChange={(value) => {
                setTrackTarget(value);
              }}
              // onBlur={() => setTrackTarget('track_id', true)}
              closeMenuOnSelect
              options={data.me.ownership.tracks.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </>
        ) : null}

        {audienceTarget && audienceTarget === 'series-favorites' ? (
          <>
            <Spacer size={25} />
            <AutoSuggest
              name="series_id"
              label="Series"
              value={seriesTarget}
              onChange={(value) => {
                setSeriesTarget(value);
              }}
              closeMenuOnSelect
              options={data.me.ownership.series.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </>
        ) : null}

        {audienceTarget && audienceTarget === 'event-participants' ? (
          <>
            <Spacer size={25} />
            <YearDropdown />
          </>
        ) : null}

        {audienceTarget && audienceTarget === 'event-participants' ? (
          <>
            <Spacer size={25} />
            <AutoSuggest
              name="event_id"
              label="Event Participants"
              isClearable
              placeholder="Select..."
              onChange={(value) => {
                setEventTarget(value);
              }}
              value={eventTarget}
              closeMenuOnSelect
              options={data.getUserNotificationEvents.results.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </>
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
  }
);

export default compose(
  CreatePushNotification,
  GetNotificationEstimate
)(PushMessageForm);
