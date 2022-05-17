import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  logDevError,
  deleteErrorMessage,
  deleteSuccessMessage
} from 'shared/alerts';
import { GET_FAQS } from './useGetFaqs';

export const DELETE_FAQ = gql`
  mutation DeleteFaq($id: Int!) {
    deleteFaq(id: $id)
  }
`;

export function useDeleteFaq() {
  const [deleteFaqMutation] = useMutation(DELETE_FAQ);

  const deleteMutation = useCallback(
    async id => {
      try {
        await deleteFaqMutation({
          variables: { id: Number(id) },
          onCompleted: () => deleteSuccessMessage('FAQ'),
          onError: () => deleteErrorMessage('FAQ'),
          update: (cache, response) => {
            const deleted = response?.data?.deleteFaq;
            if (!deleted) return;

            const variables = {
              input: { limit: '200' }
            };

            const cached = cache.readQuery({
              query: GET_FAQS,
              variables
            });
            const index = cached.getFaqs.results.findIndex(
              faq => faq.id === id
            );

            if (index > -1) {
              cached.getFaqs.results.splice(index, 1);
            }

            cache.writeQuery({
              query: GET_FAQS,
              variables,
              data: {
                ...cached,
                getFaqs: {
                  count: cached.getFaqs.count - 1,
                  results: cached.getFaqs.results
                    .filter(faq => faq.id !== id)
                    .map(faq => ({ ...faq, __typename: 'AppFaq' })),
                  __typename: 'FaqList'
                }
              }
            });
          }
        });
      } catch (error) {
        logDevError(error);
        deleteErrorMessage('FAQ');
      }
      return true;
    },
    [deleteFaqMutation]
  );
  return deleteMutation;
}
