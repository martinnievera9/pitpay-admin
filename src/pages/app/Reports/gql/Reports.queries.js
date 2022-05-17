import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSearchInput } from 'hooks/useSearchInput';

const GET_ADMIN_METRICS = gql`
  query GetAdminMetrics($input: GetMatricListInput!) {
    getAdminMetrics(input: $input) {
      count
      results {
        id
        name
        passes
        registrations
        other_passes
        favorites
        type
      }
    }
  }
`;

export function useGetAdminMetrics() {
  const { input } = useSearchInput();
  const { page } = input;
  return useQuery(GET_ADMIN_METRICS, {
    variables: { input: { page } }
  });
}
