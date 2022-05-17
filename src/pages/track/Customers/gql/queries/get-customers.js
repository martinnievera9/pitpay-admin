import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSearchInput } from 'hooks/useSearchInput';

export const query = gql`
  query GetCustomers($input: GetCustomersInput!) {
    getCustomers(input: $input) {
      count
      results {
        id
        first_name
        middle_name
        address
        last_name
        email
        role
        cellphone
        suffix
        parents {
          first_name
          last_name
          cellphone
          user_id
        }
        inactive
      }
    }
  }
`;

export function useGetCustomers() {
  const { input } = useSearchInput();
  const { queryString, page } = input;
  return useQuery(query, {
    variables: { input: { queryString, page } },
  });
}
