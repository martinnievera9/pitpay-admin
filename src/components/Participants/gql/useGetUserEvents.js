import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_USER_EVENTS = gql`
  query GetUserEvents($input: GetUserEventsInput!) {
    getUserEvents(input: $input) {
      count
      results {
        id
        name
        image
        date
        start_date
        fullDate
        nextStartTime
        series {
          id
          name
        }
      }
    }
  }
`;

export function useGetUserEvents() {
  return useQuery(GET_USER_EVENTS, {
    variables: { input: {} }
  });
}
