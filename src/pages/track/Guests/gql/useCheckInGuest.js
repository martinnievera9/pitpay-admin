import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { GET_EVENT_AND_EVENT_GUESTS } from 'pages/track/GuestList/gql';
import { logDevError } from 'shared/alerts';
import { useGuestSearch } from '../GuestSearch';
import { GuestFieldsFragment } from './guest.fragments';

export const CHECK_IN_GUEST = gql`
  mutation CheckinGuest($input: CheckGuestInput!) {
    checkinGuest(input: $input) {
      ...guestFields
    }
  }
  ${GuestFieldsFragment}
`;

export function useCheckinGuest() {
  const [checkinGuestMutation] = useMutation(CHECK_IN_GUEST);
  const { guestSearchQuery: queryString } = useGuestSearch();
  const { eventId } = useParams();
  const event_id = Number(eventId);
  const checkinGuest = useCallback(
    async (guest_id, options = {}) => {
      try {
        const response = await checkinGuestMutation({
          variables: { input: { event_id, guest_id } },
          refetchQueries: [
            {
              query: GET_EVENT_AND_EVENT_GUESTS,
              variables: {
                getEventGuestsInput: {
                  event_id,
                  queryString,
                },
                getEventInput: {
                  id: event_id,
                },
              },
            },
          ],
          ...options,
        });
        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [checkinGuestMutation, queryString, event_id]
  );
  return checkinGuest;
}

export const UN_CHECK_GUEST = gql`
  mutation UnCheckGuest($input: CheckGuestInput!) {
    unCheckGuest(input: $input) {
      ...guestFields
    }
  }
  ${GuestFieldsFragment}
`;

export function useUnCheckGuest() {
  const [unCheckGuestMutation] = useMutation(UN_CHECK_GUEST);
  const { guestSearchQuery: queryString } = useGuestSearch();
  const { eventId } = useParams();
  const event_id = Number(eventId);
  const unCheckGuest = useCallback(
    async (guest_id, options = {}) => {
      try {
        const response = await unCheckGuestMutation({
          variables: { input: { event_id, guest_id } },
          refetchQueries: [
            {
              query: GET_EVENT_AND_EVENT_GUESTS,
              variables: {
                getEventGuestsInput: {
                  event_id,
                  queryString,
                },
                getEventInput: {
                  id: event_id,
                },
              },
            },
          ],
          ...options,
        });
        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [unCheckGuestMutation, queryString, event_id]
  );
  return unCheckGuest;
}
