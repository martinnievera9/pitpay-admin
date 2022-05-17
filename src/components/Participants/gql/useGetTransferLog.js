import gql from 'graphql-tag';
import { usePersistedQuery } from 'hooks/usePersistedQuery';

export const GET_TRANSFER_LOG = gql`
  query GetTransferLog($pass_id: Int!) {
    getTransferLog(pass_id: $pass_id) {
      name
      date
      phone_number
      calling_code
      id
    }
  }
`;

export function useGetTransferLog({ date, pass_id }) {
  const result = usePersistedQuery(
    GET_TRANSFER_LOG,
    `transfer_log-${pass_id}-${date}`,
    {
      variables: {
        pass_id: pass_id,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  return { ...result };
}
