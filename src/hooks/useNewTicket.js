import { useEffect } from 'react';
import { orderBy } from 'lodash';
import { query as newTicket } from 'pages/app/Tickets/gql/subscriptions/new-purchase';

export default ({ subscribeToMore }, eventId, queryString, date) => {
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: newTicket,
      variables: {
        input: {
          event_id: Number(eventId),
          queryString: queryString,
          date,
        },
      },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) return previous;

        const { id } = subscriptionData.data.newTicket;
        const existingIndex = previous.getSpectatorTickets.findIndex(
          (ticket) => ticket.id === id
        );

        const getSpectatorTickets = previous.getSpectatorTickets.length
          ? -1 !== existingIndex
            ? previous.getSpectatorTickets.map((item, index) =>
                index === existingIndex ? subscriptionData.data.newTicket : item
              )
            : previous.getSpectatorTickets.concat(
                subscriptionData.data.newTicket
              )
          : [subscriptionData.data.newTicket];

        return Object.assign({}, previous, {
          getSpectatorTickets: orderBy(getSpectatorTickets, 'name', 'asc'),
        });
      },
    });

    return () => unsubscribe();
  }, [date, eventId, queryString, subscribeToMore]);
};
