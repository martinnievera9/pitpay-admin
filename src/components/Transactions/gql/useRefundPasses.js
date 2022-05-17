import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { GET_EVENT_REFUND_STATUS_GET_ALL_EVENT_TRANSACTIONS } from './useGetRefundStatus';

export const REFUND_PASSES = gql`
  mutation RefundPasses($pass_ids: [Int!]!) {
    refundPasses(pass_ids: $pass_ids) {
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

export function useRefundPasses() {
  const [refundPassesMutation] = useMutation(REFUND_PASSES);

  const refundPasses = useCallback(
    (pass_ids, event_id) => {
      return refundPassesMutation({
        variables: { pass_ids: [...pass_ids] },
        refetchQueries: [
          {
            query: GET_EVENT_REFUND_STATUS_GET_ALL_EVENT_TRANSACTIONS,
            variables: {
              event_id
            }
          }
        ]
      });
    },
    [refundPassesMutation]
  );
  return refundPasses;
}
