import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { logDevError, updateErrorMessage } from 'shared/alerts';
import { GET_FAQS, FaqFieldsFragment } from './useGetFaqs';

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($ids: [Int!]!) {
    updateOrder(ids: $ids) {
      count
      results {
        ...faqFields
      }
    }
  }
  ${FaqFieldsFragment}
`;

export function useUpdateOrder() {
  const [updateOrderMutation] = useMutation(UPDATE_ORDER);

  const updateOrder = useCallback(
    async ids => {
      try {
        await updateOrderMutation({
          variables: { ids },
          onError: () => updateErrorMessage('FAQ Order'),
          update: (cache, { data }) => {
            const { updateOrder } = data ?? {};
            if (!updateOrder) {
              return;
            }
            const input = { limit: '200' };
            const cached = cache.readQuery({
              query: GET_FAQS,
              variables: { input }
            });

            cache.writeQuery({
              query: GET_FAQS,
              variables: { input },
              data: { ...cached, getFaqs: { ...updateOrder } }
            });
          }
        });
      } catch (error) {
        logDevError(error);
        updateErrorMessage('FAQ Order');
      }
    },
    [updateOrderMutation]
  );
  return updateOrder;
}
