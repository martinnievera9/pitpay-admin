import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { GET_TRACK_TRANSACTIONS_GET_EVENT } from './useGetTrackTransactionsGetEvent';

export const TRANSFER_PASSES = gql`
  mutation TransferPasses($input: [TransferPassesInput]) {
    transferPasses(input: $input) {
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

export function useTransferPasses() {
  const [transferPassesMutation] = useMutation(TRANSFER_PASSES);
  const transferPasses = useCallback(
    (input, id) => {
      return transferPassesMutation({
        variables: { ...input },
        refetchQueries: [
          {
            query: GET_TRACK_TRANSACTIONS_GET_EVENT,
            variables: {
              getTrackTransactionsInput: { event_id: id },
              getEventInput: { id }
            }
          }
        ]
      });
    },
    [transferPassesMutation]
  );
  return transferPasses;
}
