import { useQuery } from '@apollo/react-hooks';
import { useEffect, useRef } from 'react';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import storage from 'shared/storage';

/**
 *
 * @param {object} QUERY - tagged GraphQL query to run
 * @param {string} keyName - key in local storage to retrieve as fallback
 * @param {object} [options = {}] - an Apollo query options object
 */
export function usePersistedQuery(QUERY, keyName, options = {}) {
  const isOffline = useOfflineCheck();
  const nullFn = () => null;
  const {
    data,
    previousData,
    loading,
    error,
    variables,
    networkStatus,
    refetch,
    fetchMore,
    startPolling,
    stopPolling,
    subscribeToMore,
    updateQuery,
    client
  } = useQuery(QUERY, options);

  const dataRef = useRef(storage.get(keyName));

  useEffect(() => {
    if (data) {
      storage.set(keyName, data);
      dataRef.current = data;
    }
  }, [data, keyName]);

  const restResult = !isOffline
    ? {
        previousData,
        loading,
        error,
        variables,
        networkStatus,
        refetch,
        fetchMore,
        startPolling,
        stopPolling,
        subscribeToMore,
        updateQuery,
        client
      }
    : {
        previousData: undefined,
        loading: false,
        error: undefined,
        variables,
        networkStatus: undefined,
        refetch: nullFn,
        fetchMore: nullFn,
        startPolling,
        stopPolling,
        subscribeToMore,
        updateQuery: nullFn,
        client: undefined
      };

  return {
    data: !data ? dataRef.current : data,
    ...restResult
  };
}
