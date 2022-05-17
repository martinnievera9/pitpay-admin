import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import { Radio } from 'components/Form/Radio';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';
import {
  YearDropdown,
  withEventYearFilterContext,
} from 'components/YearDropdown';
import CreateTextMessage from '../gql/mutations/create-text-message';
import GetNotificationEstimate from '../gql/mutations/get-estimate';
import { useGetNotificationEvents } from '../gql/queries/get-user-notification-events';
import GuestOptions from './GuestOptions';
import TextForm from './TextForm';

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
    label: 'Guests',
    value: 'guests',
  },
  {
    label: 'Your Text Lists',
    value: 'lists',
  },
];

const TextMessageForm = withEventYearFilterContext(
  ({
    createTextMessage,
    onComplete,
    clearState,
    audienceOptions,
    getNotificationEstimate,
  }) => {
    const [textTarget, setTextTarget] = useState();
    const [audienceTarget, setAudienceTarget] = useState();
    const [trackTarget, setTrackTarget] = useState();
    const [seriesTarget, setSeriesTarget] = useState();
    const [eventTarget, setEventTarget] = useState();
    const [guestYear, setGuestYear] = useState();
    const [guestTarget, setGuestTarget] = useState();
    const [listTarget, setListTarget] = useState();
    const [estimate, setEstimate] = useState(null);

    const { data } = useGetNotificationEvents();

    const resetForm = () => {
      setTextTarget('');
      setAudienceTarget('');
      setTrackTarget('');
      setSeriesTarget('');
      setEventTarget('');
      setListTarget('');
      setEstimate(null);
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
          guestTarget: guestTarget ? guestTarget.value : null,
          guestYear: guestYear ? guestYear.value : null,
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
      guestTarget,
      guestYear,
      getNotificationEstimate,
    ]);

    useEffect(() => {
      if (
        audienceTarget &&
        audienceTarget === 'track-favorites' &&
        data.me.ownership.tracks.length === 1
      ) {
        setTrackTarget(data?.me?.ownership?.tracks[0]?.id);
      }

      if (
        audienceTarget &&
        audienceTarget === 'series-favorites' &&
        data.me.ownership.series.length === 1
      ) {
        setSeriesTarget(data?.me?.ownership?.series[0]?.id);
      }
    }, [audienceTarget, data]);

    const showMessageField = () => {
      return (
        (audienceTarget && audienceTarget === 'all-users') ||
        (textTarget && textTarget === 'guests' && (guestTarget || guestYear)) ||
        (textTarget &&
          ['promoters', 'staff', 'promoters-staff'].includes(textTarget)) ||
        (audienceTarget &&
          audienceTarget === 'track-favorites' &&
          trackTarget) ||
        (audienceTarget &&
          audienceTarget === 'series-favorites' &&
          seriesTarget) ||
        (textTarget && textTarget === 'lists' && listTarget) ||
        (audienceTarget &&
          audienceTarget === 'event-participants' &&
          eventTarget)
      );
    };

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

    return (
      <>
        <Spacer size={25} />
        <Select
          label="Send Message To"
          options={textTargets}
          onChange={(val) => {
            setTextTarget(val.target.value);
          }}
          value={textTarget}
        />
        {textTarget === 'users' && (
          <>
            <Spacer size={25} />
            <Radio
              label="Send Message To"
              options={getAudienceOptions()}
              onChange={(val) => {
                setAudienceTarget(val.target.value);
              }}
              value={audienceTarget}
            />
          </>
        )}
        {textTarget === 'guests' && (
          <GuestOptions
            event={guestTarget}
            setEvent={setGuestTarget}
            setYear={setGuestYear}
            events={
              data && data.getUserNotificationEvents
                ? data.getUserNotificationEvents.results
                : []
            }
          />
        )}
        {audienceTarget &&
          audienceTarget === 'track-favorites' &&
          data.me.ownership.tracks.length > 1 && (
            <>
              <Spacer size={25} />
              <AutoSuggest
                name="track_id"
                label="Track"
                value={trackTarget}
                onChange={(value) => {
                  setTrackTarget(value);
                }}
                closeMenuOnSelect
                options={data.me.ownership.tracks.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </>
          )}

        {audienceTarget &&
          audienceTarget === 'series-favorites' &&
          data.me.ownership.series.length > 1 && (
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
          )}

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
              label="Event"
              isClearable
              placeholder="Event"
              onChange={(value) => {
                setEventTarget(value);
              }}
              value={eventTarget}
              closeMenuOnSelect
              options={data.getUserNotificationEvents.results.map((item) => ({
                value: item.id,
                label: `${item.listDates} — ${item.name}`,
              }))}
            />
          </>
        ) : null}

        {textTarget && textTarget === 'lists' ? (
          <>
            <Spacer size={25} />
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
              options={data.getPromoterLists.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </>
        ) : null}

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
                guestTarget: guestTarget?.value,
                guestYear: guestYear?.value,
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
  }
);

export default compose(
  CreateTextMessage,
  GetNotificationEstimate
)(TextMessageForm);
