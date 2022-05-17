import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';
import {
  createErrorMessage,
  duplicateErrorMessage,
  logDevError,
  updateErrorMessage,
} from 'shared/alerts';
import { EditTicketFieldsFragment } from './Events.fragments';
import { GET_EVENTS_ADMIN } from './Events.queries';

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useCreateEvent() {
  const { input: search } = useSearchInput();
  const [createEventMutation] = useMutation(CREATE_EVENT);
  const createEvent = useCallback(
    async (input, type, object_id) => {
      try {
        const response = await createEventMutation({
          variables: { input },
          update: (cache, { data: { createEvent } }) => {
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

            const unsortedEvents = (
              data?.getEventsAdmin?.results ?? []
            ).concat([{ ...createEvent }]);
            const updatedResults = unsortedEvents.sort((a, b) => {
              const aStartDate = a?.eventDates?.[0] ?? '';
              const bStartDate = b?.eventDates?.[0] ?? '';
              return aStartDate < bStartDate
                ? -1
                : aStartDate > bStartDate
                ? 1
                : 0;
            });

            cache.writeQuery({
              query: GET_EVENTS_ADMIN,
              variables,
              data: {
                ...data,
                getEventsAdmin: {
                  ...data.getEventsAdmin,
                  count: data.getEventsAdmin.count + 1,
                  results: updatedResults,
                },
              },
            });
          },
        });
        return response;
      } catch (error) {
        logDevError(error);
        createErrorMessage('Event');
      }
    },
    [createEventMutation, search]
  );
  return createEvent;
}

export const DUPLICATE_EVENT = gql`
  mutation DuplicateEvent($event_id: Int!) {
    duplicateEvent(event_id: $event_id) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useDuplicateEvent() {
  const { input: search } = useSearchInput();
  const { pathname } = useLocation();
  const [duplicateEventMutation] = useMutation(DUPLICATE_EVENT);
  const duplicateEvent = useCallback(
    async (event_id, id) => {
      try {
        const response = await duplicateEventMutation({
          variables: { event_id },
          update: (cache, { data: { duplicateEvent } }) => {
            const type = pathname.includes('track')
              ? 'track'
              : pathname.includes('admin/events')
              ? 'events'
              : 'series';

            const variables = {
              input: {
                ...search,
                ...(type === 'track' ? { track_id: Number(id) } : null),
                ...(type === 'series' ? { series_id: Number(id) } : null),
              },
            };

            const data = cache.readQuery({
              query: GET_EVENTS_ADMIN,
              variables,
            });

            const newResults = data.getEventsAdmin.results
              .map((result) => {
                if (result.id === event_id) return [result, duplicateEvent];
                return [result];
              })
              .reduce((acc, cur) => [...acc, ...cur], []);

            cache.writeQuery({
              query: GET_EVENTS_ADMIN,
              variables,
              data: {
                ...data,
                getEventsAdmin: {
                  ...data.getEventsAdmin,
                  count: data.getEventsAdmin.count + 1,
                  results: newResults,
                },
              },
            });
          },
        });
        return response;
      } catch (error) {
        logDevError(error);
        duplicateErrorMessage('Event');
      }
    },
    [duplicateEventMutation, pathname, search]
  );
  return duplicateEvent;
}

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useUpdateEvent() {
  const { input: search } = useSearchInput();
  const [updateEventMutation] = useMutation(UPDATE_EVENT);
  const updateEvent = useCallback(
    async (input) => {
      try {
        const response = await updateEventMutation({
          variables: { input },
          update: (cache, { data: { updateEvent } }) => {
            const data = cache.readQuery({
              query: GET_EVENTS_ADMIN,
              variables: { input: { ...search, track_id: input.track_id } },
            });

            cache.writeQuery({
              query: GET_EVENTS_ADMIN,
              variables: { input: search },
              data: {
                ...data,
                getEventsAdmin: {
                  ...data.getEventsAdmin,
                  count: data.getEventsAdmin.count + 1,
                  results: data.getEventsAdmin.results.reduce((acc, event) => {
                    if (parseInt(event.id) === parseInt(input.id)) {
                      return acc.concat([updateEvent]);
                    }

                    return acc.concat([event]);
                  }, []),
                },
              },
            });
          },
        });
        return response;
      } catch (error) {
        logDevError(error);
        updateErrorMessage('Event');
      }
    },
    [updateEventMutation, search]
  );
  return updateEvent;
}

export const UPDATE_EVENT_COLOR = gql`
  mutation UpdateEventColor($input: UpdateEventColor!) {
    updateEventColor(input: $input) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useUpdateEventColor() {
  const [updateEventColorMutation] = useMutation(UPDATE_EVENT_COLOR);
  const updateEventColor = useCallback(
    async (id, status_color) => {
      try {
        const response = await updateEventColorMutation({
          variables: { input: { id, status_color } },
        });
        return response;
      } catch (error) {
        logDevError(error);
        updateErrorMessage('Event');
      }
    },
    [updateEventColorMutation]
  );
  return updateEventColor;
}
