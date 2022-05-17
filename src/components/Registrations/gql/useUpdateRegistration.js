import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { RegistrationValuesFragment } from 'components/Registrations/gql';
import { logDevError, updateErrorMessage } from 'shared/alerts';

export const UPDATE_REGISTRATION = gql`
  mutation UpdateRegistration($input: UpdateRegistrationForm!) {
    updateRegistration(input: $input) {
      ...registrationValues
    }
  }
  ${RegistrationValuesFragment}
`;

export function useUpdateRegistration() {
  const [updateRegistrationMutation] = useMutation(UPDATE_REGISTRATION);

  const updateRegistration = useCallback(
    async (input) => {
      try {
        const response = await updateRegistrationMutation({
          variables: { input },
        });
        if (!response) {
          updateErrorMessage('Registration', response);
          return null;
        }
        return response;
      } catch (error) {
        logDevError(error);
        updateErrorMessage('Registration');
        return null;
      }
    },
    [updateRegistrationMutation]
  );
  return updateRegistration;
}
