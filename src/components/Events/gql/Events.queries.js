import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLocation, useParams } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';
import { useEventYearFilter } from '../EventYearFilter';
import {
  CommonEventFieldsFragment,
  EditTicketFieldsFragment,
  TicketFieldsFragment,
} from './Events.fragments';

export const GET_EVENT = gql`
  query GetEvent($input: GetEventInput!) {
    getEvent(input: $input) {
      ...editTicketFields
    }
  }
  ${EditTicketFieldsFragment}
`;

export function useGetEvent(currentEventId) {
  const { id: idParam } = useParams();
  const { pathname } = useLocation();
  const isTrackEventsView = pathname.includes('/admin/track/events');
  const id =
    currentEventId ?? (!isTrackEventsView && idParam ? Number(idParam) : null);
  return useQuery(GET_EVENT, {
    variables: { input: { id } },
    skip: !id,
  });
}

export const GET_EVENT_HEADER_INFO = gql`
  query GetEventHeaderInfo($input: GetEventInput!) {
    getEvent(input: $input) {
      ...commonEventFields
      next_date
      tickets {
        name
        price
        date
      }
      other_tickets {
        name
        price
      }
      isMultiDay
      listDates
      day
      date
      month
    }
  }
  ${CommonEventFieldsFragment}
`;

export function useGetEventHeaderInfo() {
  const { id } = useParams();
  return useQuery(GET_EVENT_HEADER_INFO, {
    variables: { input: { id: Number(id) }, skip: !id },
  });
}

export const GET_EVENTS_ADMIN = gql`
  query GetEventsAdmin($input: GetEventsAdminInput!) {
    getEventsAdmin(input: $input) {
      count
      results {
        ...commonEventFields
        tickets {
          ...ticketFields
        }
        admin_tickets {
          ...ticketFields
        }
        admin_multiday_tickets {
          ...ticketFields
        }
        admin_other_tickets {
          ...ticketFields
        }
        admin_bundle_tickets {
          ...ticketFields
        }
      }
    }
  }
  ${CommonEventFieldsFragment}
  ${TicketFieldsFragment}
`;

/**
 *
 * @param {string} type - 'track' | 'series' | 'events'
 */
export function useGetEventsAdmin(type, options = {}) {
  const { yearFilter } = useEventYearFilter();
  const { input: search } = useSearchInput();
  const { id } = useParams();
  const { pathname } = useLocation();

  const variables = {
    input: {
      ...search,
      ...(type === 'track' ? { track_id: Number(id) } : null),
      ...(type === 'series' ? { series_id: Number(id) } : null),
      ...(yearFilter && pathname !== '/admin/events'
        ? { year: yearFilter }
        : null),
    },
  };
  return useQuery(GET_EVENTS_ADMIN, { variables, ...options });
}

export const GET_USER_EVENTS = gql`
  query GetUserEvents($input: GetUserEventsInput!) {
    getUserEventsV2(input: $input) {
      count
      results {
        ...commonEventFields
        nextGateTime
        tickets {
          name
          price
          date
        }
        other_tickets {
          name
          price
        }
      }
    }
  }
  ${CommonEventFieldsFragment}
`;

export function useGetUserEvents(search, options = {}) {
  const { yearFilter } = useEventYearFilter();
  const { input: routeSearch } = useSearchInput();
  const variables = {
    input: {
      ...routeSearch,
      ...(search ? { queryString: search } : null),
      ...(yearFilter ? { year: yearFilter } : null),
    },
  };
  return useQuery(GET_USER_EVENTS, { variables, ...options });
}
