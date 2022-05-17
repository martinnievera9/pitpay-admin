import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import {
  EditTicketFieldsFragment,
  GET_EVENTS_ADMIN,
} from 'components/Events/gql';
import { useSearchInput } from 'hooks/useSearchInput';
import { deleteErrorMessage, logDevError } from 'shared/alerts';

export const POSTPONE_EVENT = gql`
  mutation PostponeEvent($id: Int!) {
    postponeEvent(id: $id) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function usePostponeEvent() {
  const [postponeEventMutation] = useMutation(POSTPONE_EVENT);
  const postponeEvent = useCallback(
    async (id) => {
      return postponeEventMutation({ variables: { id } });
    },
    [postponeEventMutation]
  );
  return postponeEvent;
}

export const CANCEL_EVENT = gql`
  mutation CancelEvent($id: Int!) {
    cancelEvent(id: $id) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useCancelEvent() {
  const [cancelEventMutation] = useMutation(CANCEL_EVENT);
  const cancelEvent = useCallback(
    async (id) => {
      return cancelEventMutation({ variables: { id } });
    },
    [cancelEventMutation]
  );
  return cancelEvent;
}

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: Int!) {
    deleteEvent(id: $id)
  }
`;

export function useDeleteEvent() {
  const { input: search } = useSearchInput();
  const [deleteEventMutation] = useMutation(DELETE_EVENT);
  const deleteEvent = useCallback(
    async ({ id }, type, object_id) => {
      try {
        const response = await deleteEventMutation({
          variables: { id },
          update: (cache, { data: { deleteEvent } }) => {
            if (!deleteEvent) {
              return;
            }
            const variables = {
              input: {
                ...search,
                ...(type === 'track' ? { track_id: Number(object_id) } : null),
                ...(type === 'series'
                  ? { series_id: Number(object_id) }
                  : null),
              },
            };
            const data = cache.readQuery({
              query: GET_EVENTS_ADMIN,
              variables,
            });

            cache.writeQuery({
              query: GET_EVENTS_ADMIN,
              variables,
              data: {
                ...data,
                getEventsAdmin: {
                  ...data.getEventsAdmin,
                  count: data.getEventsAdmin.count - 1,
                  results: data.getEventsAdmin.results.filter(
                    (event) => event.id !== id
                  ),
                },
              },
            });
          },
        });
        return response;
      } catch (error) {
        logDevError(error);
        deleteErrorMessage('Event');
      }
    },
    [deleteEventMutation, search]
  );
  return deleteEvent;
}
