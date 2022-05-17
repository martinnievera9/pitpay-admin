import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { logDevError } from 'shared/alerts';
import { GET_GUESTS } from './useGetGuests';
import { GuestFieldsFragment } from './guest.fragments';

export const CREATE_GUEST = gql`
  mutation CreateGuest($input: CreateGuestInput!) {
    createGuest(input: $input) {
      ...guestFields
    }
  }
  ${GuestFieldsFragment}
`;

export function useCreateGuest({ queryString }) {
  const { id: eventId } = useParams();
  const [createGuestMutation] = useMutation(CREATE_GUEST);
  const createGuest = useCallback(
    async input => {
      try {
        const response = await createGuestMutation({
          variables: { input },
          // If we're on an event guest list, we need to refresh the list
          ...(eventId
            ? {
                refetchQueries: ['GetEventAndEventGuests']
              }
            : null),
          // But if not on an event guest, we need to manually update the cache
          ...(!eventId
            ? {
                update: (cache, { data: { createGuest } }) => {
                  const data = cache.readQuery({
                    query: GET_GUESTS,
                    variables: { input: { queryString } }
                  });
                  if (data) {
                    const updatedGuests = data.getGuests.results.concat(
                      createGuest
                    );
                    const updatedResults = updatedGuests.sort((a, b) =>
                      a.last_name > b.last_name
                        ? 1
                        : b.last_name > a.last_name
                        ? -1
                        : 0
                    );

                    cache.writeQuery({
                      query: GET_GUESTS,
                      variables: { input: { queryString } },
                      data: {
                        ...data,
                        getGuests: {
                          ...data.getGuests,
                          count: data.getGuests.count + 1,
                          results: updatedResults
                        }
                      }
                    });
                  }
                }
              }
            : null)
        });
        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [createGuestMutation, queryString, eventId]
  );
  return createGuest;
}
