import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import { useSearchInput } from 'hooks/useSearchInput';
import { logDevError } from 'shared/alerts';
import storage from 'shared/storage';

function useGetEventParams() {
  const { id } = useParams();
  const { input } = useSearchInput();
  const { date } = input ?? {};
  let event_id = null;

  if (id) {
    event_id = Number(id);
  } else {
    event_id = Number(window.location.href.split('/')[7]);
  }
  return [event_id, date];
}

export function useGetStoredPurchaseIds() {
  const [eventId, date] = useGetEventParams();
  const getStoredPurchaseIds = useCallback(
    (operation = 'check') => {
      const storedPurchaseIds = storage.get(
        `purchase_ids-${operation}-${eventId}-${date}`
      );
      return !storedPurchaseIds || storedPurchaseIds === 'undefined'
        ? []
        : storedPurchaseIds;
    },
    [eventId, date]
  );
  return getStoredPurchaseIds;
}

function useSaveForLater(operation = 'check') {
  const [eventId, date] = useGetEventParams();
  const getStoredPurchaseIds = useGetStoredPurchaseIds();
  const saveForLater = useCallback(
    // Wrapping with a Promise for symmetry with async mutation
    (purchase_ids) =>
      new Promise((resolve) => {
        const storedPurchaseIds = getStoredPurchaseIds(operation);
        const updatedPurchaseIds = [
          ...new Set(storedPurchaseIds.concat(purchase_ids)),
        ];
        storage.set(
          `purchase_ids-${operation}-${eventId}-${date}`,
          updatedPurchaseIds
        );
        resolve('stored');
      }),
    [eventId, date, operation, getStoredPurchaseIds]
  );
  return saveForLater;
}

export const useSyncCheckins = ({ mutation, operation = 'check' }) => {
  const isOffline = useOfflineCheck();
  const [event_id, date] = useGetEventParams();
  const saveForLater = useSaveForLater(operation);
  const getStoredPurchaseIds = useGetStoredPurchaseIds();

  const submitMutation = useCallback(
    async (purchase_ids, onSuccess, onError) => {
      try {
        const response = await mutation({
          variables: {
            input: {
              event_id,
              purchase_ids,
              date,
            },
          },
        });

        storage.set(`purchase_ids-${operation}-${event_id}-${date}`, '');

        if (response && !response.errors) {
          onSuccess && onSuccess();
          return response;
        } else {
          onError && onError();
        }
      } catch (error) {
        logDevError(error);
        saveForLater(purchase_ids);
      }
    },
    [mutation, event_id, date, operation, saveForLater]
  );

  const syncStoredCheckins = useCallback(async () => {
    const storedPurchaseIds = getStoredPurchaseIds(operation);

    if (storedPurchaseIds.length < 1) return;

    await submitMutation(storedPurchaseIds);
  }, [submitMutation, getStoredPurchaseIds, operation]);

  useEffect(() => {
    if (!isOffline) {
      syncStoredCheckins();
    }
  }, [isOffline, syncStoredCheckins]);

  return isOffline ? saveForLater : submitMutation;
};

export const ParticipantCheckinFragment = gql`
  fragment participantCheckinFields on ParticipantTicket {
    id
    ticket_name
    is_checked
    cost
    status
  }
`;

export const CHECK_IN_USER = gql`
  mutation CheckInUser($input: CheckInUserInput!) {
    checkInUser(input: $input) {
      ...participantCheckinFields
    }
  }
  ${ParticipantCheckinFragment}
`;

export function useCheckInUser() {
  const [mutation] = useMutation(CHECK_IN_USER);
  const checkInUser = useSyncCheckins({
    mutation,
    operation: 'check',
  });
  return checkInUser;
}

export const UNCHECK_IN_USER = gql`
  mutation UncheckInUser($input: CheckInUserInput!) {
    uncheckInUser(input: $input) {
      ...participantCheckinFields
    }
  }
  ${ParticipantCheckinFragment}
`;

export function useUncheckInUser() {
  const [mutation] = useMutation(UNCHECK_IN_USER);
  const uncheckInUser = useSyncCheckins({
    mutation,
    operation: 'uncheck',
  });
  return uncheckInUser;
}
