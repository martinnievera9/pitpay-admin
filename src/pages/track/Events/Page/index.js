import dayjs from 'dayjs';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import {
  EventYearFilter,
  withEventYearFilterContext,
} from 'components/Events/EventYearFilter';
import { useGetUserEvents } from 'components/Events/gql';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import { CancelModal } from 'pages/app/Events/CancelModal';

const Page = withEventYearFilterContext(({ match, theme }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const { data } = useGetUserEvents();

  const events = data?.getUserEventsV2?.results ?? [];

  const showTracks = events.reduce((acc, event) => {
    if (true === acc) {
      return acc;
    }

    if (false === acc) {
      return event.track.id;
    } else {
      return acc !== event.track.id ? true : event.track.id;
    }
  }, false);

  return (
    <>
      <SearchableListContainer
        pageCount={data?.getUserEventsV2?.count}
        paginated
        searchInputPlaceholder="Search Events"
        title="Events"
        titleBarContent={<EventYearFilter />}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col">Event</TableCell>
              {true === showTracks ? (
                <TableCell scope="col">Track</TableCell>
              ) : null}
              <TableCell scope="col">Date</TableCell>
              <TableCell scope="col">
                <LineHeightText>Gate Time</LineHeightText>
              </TableCell>
              <TableCell scope="col">Status</TableCell>
              <TableCell scope="col" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    style={{ color: theme.colors.primary }}
                    to={`/admin-track/track/${item.track_id}/events/${
                      item.id
                    }/participants?date=${
                      dayjs(item.nextFullDate, 'ddd, MMM DD, YYYY').format(
                        'YYYY-MM-DD'
                      ) === dayjs().format('YYYY-MM-DD')
                        ? dayjs(item.nextFullDate, 'ddd, MMM DD, YYYY').format(
                            'YYYY-MM-DD'
                          )
                        : item.eventDates[0]
                    }`}
                  >
                    <LineHeightText>{item.name}</LineHeightText>
                  </Link>
                </TableCell>
                {true === showTracks ? (
                  <TableCell>
                    <LineHeightText>{item.track.name}</LineHeightText>
                  </TableCell>
                ) : null}
                <TableCell>
                  <LineHeightText>
                    {item.isMultiDay
                      ? `${item.month.toUpperCase()} ${item.listDates} - ${
                          item.year
                        }`
                      : `${item.date} - ${item.year}`}
                  </LineHeightText>
                </TableCell>
                <TableCell>
                  <LineHeightText>{item.nextGateTime}</LineHeightText>
                </TableCell>
                <TableCell>
                  <LineHeightText>{item.status.toUpperCase()}</LineHeightText>{' '}
                </TableCell>
                <TableCell>
                  <Icon
                    icon="cancel-event"
                    size={22}
                    color={theme.colors.primary}
                    onClick={() => {
                      setShowCancelModal(true);
                      setSelectedEvent(item);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchableListContainer>
      {showCancelModal ? (
        <CancelModal
          close={() => setShowCancelModal(false)}
          selectedEvent={selectedEvent}
          allEvents={events}
          currentType={match.url.includes('track') ? 'track' : 'series'}
          objectId={match.params.id}
          noDelete={true}
        />
      ) : null}
    </>
  );
});

export default withRouter(withTheme(Page));
