import dayjs from 'dayjs';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { DateCard } from 'components/DateCard';
import { useRefundEvent } from 'components/Events';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { useGetRefundStatus } from 'components/Transactions';
import useTheme from 'hooks/useTheme';
import Export from './export';
import { TransactionsPrintList } from './TransactionsPrintList';

const RefundEvent = styled.div`
  width: auto;
  padding: 10px;
  color: #fff;
  background-color: #fa4616;
  border-radius: 5px;
  font-family: 'Barlow Condensed';
  font-weight: 600;
  margin-left: 20px;
  font-size: 20px;
  cursor: pointer;
`;

export const TransactionsListHeader = ({ event, total }) => {
  const { data } = useGetRefundStatus();
  const refundEvent = useRefundEvent();
  const theme = useTheme();
  if (!data?.getAllEventTransactions || !data?.getAllEventPasses) return null;
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
        <Export
          date={
            event.getEvent.isMultiDay
              ? `${event.getEvent.fullMonth} ${
                  event.getEvent.listDates
                } ${dayjs(event.getEvent.end_date).format('MMM DD - YYYY')} `
              : event.getEvent.fullDate.replace(/,/g, ' ')
          }
          transactions={data?.getAllEventPasses}
          event={event.getEvent}
          icon={<Icon icon="Export-Icon" size={40} />}
          total={total}
        />
        <TransactionsPrintList
          transactions={data.getAllEventTransactions.results}
          date={
            event.getEvent.isMultiDay
              ? `${event.getEvent.fullMonth} ${
                  event.getEvent.listDates
                } - ${dayjs(event.getEvent.end_date).format('MMM DD - YYYY')}`
              : event.getEvent.fullDate
          }
          event={event.getEvent}
          total={total}
          text="Print List"
        />
        {data?.getEventRefundStatus ? (
          <RefundEvent
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to the entire event?')
              ) {
                try {
                  const response = await refundEvent(event.getEvent.id);
                  if (!response || response.errors) {
                    toast.error('Event can not be refunded');
                    return;
                  }

                  if (response.data?.refundEvent) {
                    toast.success('Event has been refunded');
                  } else {
                    toast.error('Event can not be refunded');
                  }
                } catch (e) {}
              }
            }}
          >
            Refund Event
          </RefundEvent>
        ) : null}
      </div>
    </div>
  );
};
