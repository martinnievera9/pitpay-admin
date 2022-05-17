import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { logDevError } from 'shared/alerts';
import { GuestFieldsFragment } from './guest.fragments';

export const UPDATE_GUEST = gql`
  mutation UpdateGuest($input: UpdateGuestInput!) {
    updateGuest(input: $input) {
      ...guestFields
    }
  }
  ${GuestFieldsFragment}
`;

export function useUpdateGuest() {
  const [updateGuestMutation] = useMutation(UPDATE_GUEST);
  const updateGuest = useCallback(
    async input => {
      try {
        const response = await updateGuestMutation({
          variables: { input }
        });
        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [updateGuestMutation]
  );
  return updateGuest;
}
