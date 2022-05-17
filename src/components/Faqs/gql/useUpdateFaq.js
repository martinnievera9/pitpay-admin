import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  logDevError,
  updateErrorMessage,
  updateSuccessMessage
} from 'shared/alerts';
import { FaqFieldsFragment } from './useGetFaqs';

export const UPDATE_FAQ = gql`
  mutation UpdateFaq($input: UpdateFaqInput!) {
    updateFaq(input: $input) {
      ...faqFields
    }
  }
  ${FaqFieldsFragment}
`;

export function useUpdateFaq() {
  const [updateFaqMutation] = useMutation(UPDATE_FAQ);

  const updateFaq = useCallback(
    async input => {
      try {
        await updateFaqMutation({
          variables: { input },
          onCompleted: () => updateSuccessMessage('FAQ'),
          onError: () => updateErrorMessage('FAQ')
        });
      } catch (error) {
        logDevError(error);
        updateErrorMessage('FAQ');
      }
      return true;
    },
    [updateFaqMutation]
  );
  return updateFaq;
}
