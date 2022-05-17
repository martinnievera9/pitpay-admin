import dayjs from 'dayjs';
import React from 'react';
import { DateCard } from 'components/DateCard';
import Icon from 'components/Icon';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { ExportRegistrations } from './ExportRegistrations';
import { useGetAllEventRegistrations } from './gql';

export const RegistrationsHeader = ({ event, total }) => {
  const theme = useTheme();
  const { data } = useGetAllEventRegistrations();
  if (!data?.getAllEventRegistrations) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: 40,
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <DateCard item={event.getEvent} margin={'margin: 0 10px 0 0'} />
        <Text type="heading" fontSize={32} color={theme.colors.secondary}>
          {event.getEvent.name}
        </Text>
        {'postponed' === event.getEvent.status ? (
          <img
            style={{
              width: '20%',
              height: 'auto',
              display: 'block',
              marginLeft: 20,
              transform: 'rotate(10deg)',
            }}
            src="https://d3294qt0f4hbwl.cloudfront.net/postponed.png"
            alt="postponed-stamp"
          />
        ) : null}
        {'cancelled' === event.getEvent.status ? (
          <img
            style={{
              width: '20%',
              height: 'auto',
              display: 'block',
              marginLeft: 20,
            }}
            src="https://d3294qt0f4hbwl.cloudfront.net/cancelled.png"
            alt="cancelled-stamp"
          />
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ExportRegistrations
          date={
            event.getEvent.isMultiDay
              ? `${event.getEvent.fullMonth} ${
                  event.getEvent.listDates
                } ${dayjs(event.getEvent.end_date).format('MMM DD - YYYY')} `
              : event.getEvent.fullDate.replace(/,/g, ' ')
          }
          transactions={data.getAllEventRegistrations.results}
          event={event.getEvent}
          icon={<Icon icon="Export-Icon" size={40} />}
          total={total}
        />
      </div>
    </div>
  );
};
