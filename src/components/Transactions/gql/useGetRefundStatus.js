import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';

export const GET_EVENT_REFUND_STATUS_GET_ALL_EVENT_TRANSACTIONS = gql`
  query getEventRefundStatus($event_id: Int!) {
    getEventRefundStatus(event_id: $event_id)
    getAllEventTransactions(event_id: $event_id) {
      count
      results {
        id
        fee
        total
        refund
        discount
        card {
          last4
        }
        purchase_date
        status
        user {
          id
          name
          first_name
          last_name
        }
        users {
          promo
          user {
            id
            name
            first_name
            last_name
          }
          tickets {
            id
            name
            price
            refunded
            type
          }
        }
        event {
          hide_fee
        }
      }
    }
    getAllEventPasses(event_id: $event_id) {
      ticket
      type
      participant
      purchaser
      refunded
      cost
      promo
      transfer
      charge
      fee
      international_fee
    }
  }
`;

export function useGetRefundStatus() {
  const { id } = useParams();
  return useQuery(GET_EVENT_REFUND_STATUS_GET_ALL_EVENT_TRANSACTIONS, {
    variables: { event_id: Number(id) },
  });
}
