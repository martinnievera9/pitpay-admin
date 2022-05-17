import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UpcomingEventFieldsFragment } from 'components/Events/gql';

export const GET_UPCOMING_EVENT = gql`
  query GetUpcomingEvent {
    getUpcomingEventsV2 {
      ...upcomingEventFields
    }
    me {
      id
      track {
        id
        name
        lat
        lng
      }
    }
  }
  ${UpcomingEventFieldsFragment}
`;

export function useGetUpcomingEvent() {
  return useQuery(GET_UPCOMING_EVENT);
}
