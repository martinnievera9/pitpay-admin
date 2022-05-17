import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

export const REFUND_EVENT = gql`
  mutation RefundEvent($event_id: Int!) {
    refundEvent(event_id: $event_id) {
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
      }
      users {
        user {
          id
          name
        }
        tickets {
          id
          name
          price
          refunded
        }
      }
    }
  }
`;

export function useRefundEvent() {
  const [refundEventMutation] = useMutation(REFUND_EVENT);

  const refundEvent = useCallback(
    event_id => {
      return refundEventMutation({ variables: { event_id } });
    },
    [refundEventMutation]
  );
  return refundEvent;
}
