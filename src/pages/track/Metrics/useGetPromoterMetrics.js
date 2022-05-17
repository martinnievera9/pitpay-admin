import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_PROMOTER_METRICS = gql`
  query GetPromoterMetrics {
    getPromoterMetrics {
      favorites
      passes
      venue
    }
  }
`;

export function useGetPromoterMetrics() {
  return useQuery(GET_PROMOTER_METRICS);
}
