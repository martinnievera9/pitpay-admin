import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EventsTable,
  EventStatusColorSelect,
  EventYearFilter,
  withEventYearFilterContext,
} from 'components/Events';
import { useDuplicateEvent, useGetEventsAdmin } from 'components/Events/gql';
import Icon from 'components/Icon';
import { SearchableListContainer } from 'components/SearchableListContainer';
import useTheme from 'hooks/useTheme';
import { CancelModal } from './CancelModal';
import { EventHeader } from './Header';

const Events = withEventYearFilterContext(({ match, location }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const history = useHistory();

  const theme = useTheme();

  const duplicateEvent = useDuplicateEvent();

  const isAdminEventList = location.pathname === '/admin/events';
  const type = -1 === location.pathname.indexOf('series') ? 'track' : 'series';

  const eventType = location.pathname.includes('track')
    ? 'track'
    : location.pathname.includes('admin/events')
    ? 'events'
    : 'series';

  const { data } = useGetEventsAdmin(eventType);
  const events = data?.getEventsAdmin?.results ?? [];

  if (!data?.getEventsAdmin) return null;

  function renderReadyStatus(event) {
    const { id, status_color } = event;
    return <EventStatusColorSelect eventId={id} statusColor={status_color} />;
  }

  function renderActions(event) {
    const { id } = event;
    return (
      <>
        <Icon
          icon="edit"
          size={18}
          color={theme.colors.primary}
          padding="0 15px 0 0"
          onClick={async () => history.push(`/admin/events/editEvent/${id}`)}
        />
        <Icon
          icon="cancel-event"
          size={22}
          color={theme.colors.primary}
          onClick={() => {
            setShowCancelModal(true);
            setSelectedEvent(event);
          }}
        />
        <Icon
          icon="duplicate"
          size={22}
          color={theme.colors.primary}
          onClick={async () => {
            if (
              window.confirm('Are you sure you want to duplicate this event?')
            ) {
              const response = await duplicateEvent(id, match.params.id);
              if (!response || response.errors) {
                toast.error('Could not duplicate this event');
              } else {
                toast.success('Event successfully duplicated');
              }
            }
          }}
          padding="0 0 0 15px"
        />
      </>
    );
  }

  return (
    <>
      <SearchableListContainer
        header={
          match.params.id ? (
            <EventHeader id={match.params.id} type={type} />
          ) : undefined
        }
        title="Events"
        titleBarContent={!isAdminEventList && <EventYearFilter />}
        searchInputPlaceholder="Search Events"
        paginated
        pageCount={data?.getEventsAdmin?.count ?? 0}
        onAddClick={() => {
          setTimeout(() => {
            history.push('/admin/events/addEvent');
          }, 300);
        }}
      >
        <EventsTable
          events={events}
          listType="admin-events"
          renderActions={renderActions}
          renderReadyStatus={isAdminEventList ? renderReadyStatus : null}
        />
      </SearchableListContainer>

      {showCancelModal ? (
        <CancelModal
          close={() => setShowCancelModal(false)}
          selectedEvent={selectedEvent}
          allEvents={events}
          currentType={
            match.url.includes('track')
              ? 'track'
              : match.url.includes('series')
              ? 'series'
              : null
          }
          objectId={match.params.id}
        />
      ) : null}
    </>
  );
});

export default Events;
