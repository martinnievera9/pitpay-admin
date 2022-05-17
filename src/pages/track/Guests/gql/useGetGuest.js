import { useQuery } from '@apollo/react-hooks';
import { getYear } from 'date-fns';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { GuestFieldsFragment } from './guest.fragments';

export const GET_GUEST_AND_USER_NOTIFICATION_EVENTS = gql`
  query GetGuestAndUserNotificationEvents($id: Int!, $year: Int!) {
    getGuest(id: $id) {
      ...guestFields
    }
    getUserEvents(input: { year: $year, limit: "100" }) {
      count
      results {
        id
        name
        day
        date
        month
        isMultiDay
        listDates
      }
    }
  }
  ${GuestFieldsFragment}
`;

export const GET_GUEST = gql`
  query GetGuest($id: Int!) {
    getGuest(id: $id) {
      ...guestFields
    }
  }
  ${GuestFieldsFragment}
`;

export function useGetGuestAndUserNotificationEvents(currentGuestId) {
  const { guestId } = useParams();
  return useQuery(GET_GUEST_AND_USER_NOTIFICATION_EVENTS, {
    variables: {
      id: Number(currentGuestId ?? guestId ?? 0),
      year: getYear(new Date()),
    },
  });
}

export function useGetGuest(currentGuestId) {
  const { guestId } = useParams();
  return useQuery(GET_GUEST, {
    variables: { id: Number(currentGuestId ?? guestId ?? 0) },
  });
}
