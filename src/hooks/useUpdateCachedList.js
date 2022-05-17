import { useCallback } from 'react';
import { useSearchInput } from 'hooks/useSearchInput';

export function useAddNewItemToList() {
  const { input } = useSearchInput();
  const addNewItemToList = useCallback(
    ({ cache, newItem, query, queryName }) => {
      if (newItem) {
        const currentData = cache.readQuery({
          query,
          variables: { input }
        });

        if (currentData && currentData[queryName]) {
          const newData = {
            ...currentData,
            [queryName]: {
              ...currentData[queryName],
              count: currentData[queryName].count + 1,
              results: currentData[queryName].results.concat(newItem)
            }
          };

          cache.writeQuery({
            query,
            variables: { input },
            data: newData
          });
        }
        /**
         * We're not going to add any other conditions here because
         * our default `fetchPolicy` of 'cache-and-network' will update
         * the UI after a moment anyway.
         */
      }
    },
    [input]
  );
  return addNewItemToList;
}

export function useRemoveDeletedItemFromList() {
  const { input } = useSearchInput();
  const removeDeletedItemFromList = useCallback(
    ({ cache, itemId, query, queryName }) => {
      const currentData = cache.readQuery({
        query,
        variables: { input }
      });

      if (currentData && currentData[queryName]) {
        const newData = {
          ...currentData,
          [queryName]: {
            ...currentData[queryName],
            count: currentData[queryName].count - 1,
            results: currentData[queryName].results.filter(
              item => item.id !== itemId
            )
          }
        };

        cache.writeQuery({
          query,
          variables: { input },
          data: newData
        });
      }
    },
    [input]
  );
  return removeDeletedItemFromList;
}
