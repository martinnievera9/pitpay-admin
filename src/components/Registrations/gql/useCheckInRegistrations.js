import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { logDevError } from 'shared/alerts';
import { RegistrationValuesFragment } from './registrations.fragments';

export const CHECKIN_REGISTRATION = gql`
  mutation CheckinRegistration($id: Int!) {
    checkinRegistration(id: $id) {
      ...registrationValues
    }
  }
  ${RegistrationValuesFragment}
`;

export const UN_CHECK_REGISTRATION = gql`
  mutation UnCheckRegistration($id: Int!) {
    unCheckRegistration(id: $id) {
      ...registrationValues
    }
  }
  ${RegistrationValuesFragment}
`;

export function useCheckinRegistration() {
  const [checkinRegistrationMutation] = useMutation(CHECKIN_REGISTRATION);

  const checkinRegistration = useCallback(
    async (id) => {
      try {
        const response = await checkinRegistrationMutation({
          variables: { id },
          update: (cache) => {
            const currentRegistration = cache.readFragment({
              id: `RegistrationForm:${id}`,
              fragment: RegistrationValuesFragment,
            });
            if (currentRegistration) {
              cache.writeFragment({
                id: `RegistrationForm:${id}`,
                fragment: RegistrationValuesFragment,
                data: {
                  ...currentRegistration,
                  is_checked: true,
                },
              });
            }
          },
        });

        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [checkinRegistrationMutation]
  );
  return checkinRegistration;
}

export function useUnCheckRegistration() {
  const [unCheckRegistrationMutation] = useMutation(UN_CHECK_REGISTRATION);

  const unCheckRegistration = useCallback(
    async (id) => {
      try {
        const response = await unCheckRegistrationMutation({
          variables: { id },
          update: (cache) => {
            const currentRegistration = cache.readFragment({
              id: `RegistrationForm:${id}`,
              fragment: RegistrationValuesFragment,
            });
            if (currentRegistration) {
              cache.writeFragment({
                id: `RegistrationForm:${id}`,
                fragment: RegistrationValuesFragment,
                data: {
                  ...currentRegistration,
                  is_checked: false,
                },
              });
            }
          },
        });

        return response;
      } catch (error) {
        logDevError(error);
      }
    },
    [unCheckRegistrationMutation]
  );
  return unCheckRegistration;
}
