import React, { useState } from 'react';
import styled from 'styled-components';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import Spacer from 'components/Spacer';
import {
  YearDropdown,
  withEventYearFilterContext,
} from 'components/YearDropdown';
import { useGetEventsAdmin } from '../gql/queries/getEventsAdmin';

const WarningLabel = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;
  line-height: 1.2;
`;

const EventsDropdown = withEventYearFilterContext(
  ({ setEvent, event, tracks, series }) => {
    const [trackTarget, setTrackTarget] = useState();
    const [seriesTarget, setSeriesTarget] = useState();
    const { data, loading } = useGetEventsAdmin({
      track: trackTarget,
      series: seriesTarget,
    });

    if (loading) return null;

    return (
      <>
        <Spacer size={18} />
        <WarningLabel>
          Please choose an event as well as the track or series that it pertains
          to.
        </WarningLabel>
        <Spacer size={18} />
        <AutoSuggest
          name="track_id"
          label="Track"
          value={trackTarget}
          onChange={(value) => {
            setSeriesTarget(null);
            setTrackTarget(value);
          }}
          // onBlur={() => setTrackTarget('track_id', true)}
          closeMenuOnSelect
          options={
            tracks
              ? tracks.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))
              : []
          }
        />
        <Spacer size={18} />
        <AutoSuggest
          name="series_id"
          label="Series"
          value={seriesTarget}
          onChange={(value) => {
            setTrackTarget(null);
            setSeriesTarget(value);
          }}
          closeMenuOnSelect
          options={
            series
              ? series.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))
              : []
          }
        />
        <Spacer size={18} />
        <YearDropdown />
        <Spacer size={18} />
        <AutoSuggest
          name="event_id"
          label="Event"
          isClearable
          placeholder="Event"
          onChange={(value) => {
            setEvent(value);
          }}
          value={event}
          closeMenuOnSelect
          options={data.getEventsAdmin.results.map((item) => ({
            value: item.id,
            label: `${item.fullDate} — ${item.name}`,
          }))}
        />
      </>
    );
  }
);

export default EventsDropdown;
