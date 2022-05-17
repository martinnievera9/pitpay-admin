import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_SERIES_ADMIN = gql`
  query GetSeriesAdmin($input: GetSeriesAdminInput!) {
    getSeriesAdmin(input: $input) {
      count
      results {
        id
        name
      }
    }
  }
`;

export function useGetSeriesAdmin() {
  const { data, loading, error } = useQuery(GET_SERIES_ADMIN, {
    variables: { input: { limit: '300' } }
  });
  return { data, loading, error };
}
