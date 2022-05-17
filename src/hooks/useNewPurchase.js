import { useEffect } from 'react';
import { orderBy } from 'lodash';
import { query as newPurchase } from 'pages/app/Participants/gql/subscriptions/new-purchase';

export default ({ subscribeToMore }, eventId, queryString, date) => {
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: newPurchase,
      variables: {
        input: {
          event_id: Number(eventId),
          queryString: queryString,
          date
        }
      },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) return previous;
        const { user_id } = subscriptionData.data.newPurchase;
        const existingIndex = previous.getParticipantsList.findIndex(
          user => user.user_id === user_id
        );

        const getParticipantsList = previous.getParticipantsList.length
          ? -1 !== existingIndex
            ? previous.getParticipantsList.map((item, index) =>
                index === existingIndex
                  ? subscriptionData.data.newPurchase
                  : item
              )
            : previous.getParticipantsList.concat(
                subscriptionData.data.newPurchase
              )
          : [subscriptionData.data.newPurchase];

        return Object.assign({}, previous, {
          getParticipantsList: orderBy(getParticipantsList, 'name', 'asc')
        });
      }
    });

    return () => unsubscribe();
  }, [date, eventId, queryString, subscribeToMore]);
};
