import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Table } from 'components/Table';
import useTheme from 'hooks/useTheme';
import storage from 'shared/storage';

const PassColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
`;

const isSeriesOwner = (adminTrack) => {
  const user = storage.get('user');
  const type =
    user.ownership.series.length && !user.ownership.tracks.length && adminTrack
      ? true
      : false;
  return type;
};

export const EventsTable = (props) => {
  const { events, listType, renderReadyStatus, renderActions } = props;
  const theme = useTheme();
  const { pathname } = useLocation();

  const isAdminEventList = pathname === '/admin/events';
  const adminEventsType =
    -1 === pathname.indexOf('series') ? 'track' : 'series';

  const adminTrack = pathname.includes('admin-track');

  const columns = [
    ...(renderReadyStatus
      ? [
          {
            label: '',
            key: 'ready_status',
          },
        ]
      : []),
    {
      label: 'Date',
      key: 'fullDate',
    },
    {
      label: 'Event',
      key: 'event',
    },
    ...(listType === 'admin-events'
      ? isAdminEventList
        ? [
            {
              label: 'Track Name',
              key: 'venue',
            },
          ]
        : []
      : [
          {
            label: isSeriesOwner(adminTrack) ? 'Series' : 'Tracks',
            key: 'venue',
          },
        ]),
    ...(listType === 'admin-events'
      ? [
          {
            label: 'On Sale Date',
            key: 'on_sale_date',
          },
        ]
      : []),
    ...(listType === 'transactions'
      ? [
          {
            label: 'Pass Color',
            key: 'color_code',
          },
        ]
      : []),
    {
      label: 'Status',
      key: 'status',
    },
    ...(renderActions
      ? [
          {
            label: '',
            key: 'actions',
          },
        ]
      : []),
  ];

  function renderRows(event) {
    const {
      id,
      fullDate = '',
      name,
      series,
      track,
      color_code = '',
      sale_start,
      registration_sale_start,
      status = '',
      start_date,
      track_id,
    } = event;
    return {
      ...(renderReadyStatus
        ? { ready_status: renderReadyStatus(event) }
        : null),
      fullDate: dayjs(fullDate).format('MMM DD - YYYY'),
      event: (
        <Link
          style={{
            color: theme.colors.primary,
          }}
          to={
            listType === 'admin-events'
              ? `/admin/${adminEventsType}/${
                  adminEventsType === 'track' ? track_id : series[0]?.id
                }/events/${id}/participants?date=${dayjs(
                  start_date,
                  'MM-DD-YYYY'
                ).format('YYYY-MM-DD')}`
              : `${pathname}/event/${id}`
          }
        >
          {name}
        </Link>
      ),
      venue: isAdminEventList
        ? track.name
        : isSeriesOwner()
        ? series.map((item) => item.name)
        : track.name,
      on_sale_date:

        dayjs(sale_start).format('MMM DD - YYYY') ??
        dayjs(registration_sale_start).format('MMM DD - YYYY') ??
        '',
      color_code: <PassColor color={color_code} />,
      status,
      ...(renderActions ? { actions: renderActions(event) } : null),
    };
  }

  return <Table items={events} columns={columns} renderRows={renderRows} />;
};
EventsTable.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  listType: PropTypes.oneOf(['registrations', 'transactions', 'admin-events']),
  renderActions: PropTypes.func,
  renderReadyStatus: PropTypes.func,
};
