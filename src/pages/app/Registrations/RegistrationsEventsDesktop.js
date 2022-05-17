import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  EventsTable,
  EventYearFilter,
  withEventYearFilterContext,
} from 'components/Events';
import { useGetEventsAdmin } from 'components/Events/gql';
import { SearchableListContainer } from 'components/SearchableListContainer';

export const RegistrationsEventsDesktop = withEventYearFilterContext(() => {
  const { pathname } = useLocation();
  const eventType = pathname.includes('track')
    ? 'track'
    : pathname.includes('/admin/series')
    ? 'series'
    : 'events';
  const { data } = useGetEventsAdmin(eventType);

  const events = data?.getEventsAdmin?.results ?? [];
  const count = data?.getEventsAdmin?.count ?? 0;

  return (
    <SearchableListContainer
      pageCount={count}
      paginated
      searchInputPlaceholder="Search Events"
      title="Transactions"
      titleBarContent={<EventYearFilter />}
    >
      <EventsTable events={events} listType="registrations" />
    </SearchableListContainer>
  );
});
