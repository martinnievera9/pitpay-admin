import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  logDevError,
  createErrorMessage,
  createSuccessMessage
} from 'shared/alerts';
import { FaqFieldsFragment, GET_FAQS } from './useGetFaqs';

export const CREATE_FAQ = gql`
  mutation CreateFaq($input: CreateFaqInput!) {
    createFaq(input: $input) {
      ...faqFields
    }
  }
  ${FaqFieldsFragment}
`;

export function useCreateFaq() {
  const [createFaqMutation] = useMutation(CREATE_FAQ);

  const createFaq = useCallback(
    async input => {
      try {
        await createFaqMutation({
          variables: { input },
          createleted: () => createSuccessMessage('FAQ'),
          onError: () => createErrorMessage('FAQ'),
          update: (cache, response) => {
            const newFaq = response?.data?.createFaq;

            if (!newFaq) return;

            const variables = { input: { limit: '200' } };

            const results = cache.readQuery({
              query: GET_FAQS,
              variables
            });

            const getFaqs = [...results.getFaqs.results, newFaq];

            cache.writeQuery({
              query: GET_FAQS,
              variables,
              data: {
                getFaqs: {
                  count: results.count + 1,
                  results: getFaqs.map(faq => ({
                    ...faq,
                    __typename: 'AppFaq'
                  })),
                  __typename: 'FaqList'
                }
              }
            });
          }
        });
      } catch (error) {
        logDevError(error);
        createErrorMessage('FAQ');
      }
      return true;
    },
    [createFaqMutation]
  );
  return createFaq;
}
