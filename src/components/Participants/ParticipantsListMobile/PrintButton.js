import React from 'react';
import { useGetParticipantsDownload } from 'components/Participants/gql/useGetParticipantsDownload';
import { PrintParticipants } from 'components/Participants/PrintParticipants';
import useNewPurchase from 'hooks/useNewPurchase';

export const PrintButton = ({ event, date, match }) => {
  const { data, subscribeToMore } = useGetParticipantsDownload();
  useNewPurchase({ subscribeToMore }, event?.id, '', date);

  if (!data || !data.getParticipantsList) return null;

  const participants = data.getParticipantsList;

  return (
    <PrintParticipants
      refunded={
        participants
          ?.map(item => (item.status === 'refunded' ? item.name : null))
          .filter(Boolean) ?? []
      }
      checkedIn={participants
        .map(item => {
          const tickets = item.tickets.filter(
            ticket => ticket.is_checked && 'active' === ticket.status
          );
          return tickets.length === item.tickets.length ? item.name : null;
        })
        .filter(Boolean)}
      participants={participants}
      date={date}
      eventID={match.params.id}
      event={event}
      text="Print or Share List"
    />
  );
};
