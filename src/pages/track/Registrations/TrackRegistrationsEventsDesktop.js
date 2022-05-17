import React from 'react';
import {
  EventsTable,
  EventYearFilter,
  withEventYearFilterContext,
} from 'components/Events';
import { useGetUserEvents } from 'components/Events/gql';
import { SearchableListContainer } from 'components/SearchableListContainer';

export const TrackRegistrationsEventsDesktop = withEventYearFilterContext(
  () => {
    const { data } = useGetUserEvents();

    const events = data?.getUserEventsV2?.results ?? [];
    const count = data?.getUserEventsV2?.count ?? 0;

    return (
      <SearchableListContainer
        pageCount={count}
        paginated
        searchInputPlaceholder="Search Events"
        title="Registrations"
        titleBarContent={<EventYearFilter />}
      >
        <EventsTable events={events} listType="registrations" />
      </SearchableListContainer>
    );
  }
);
