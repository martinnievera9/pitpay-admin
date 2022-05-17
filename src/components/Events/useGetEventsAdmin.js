import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLocation, useParams } from 'react-router-dom';
import { useSearchInput } from 'hooks/useSearchInput';

export const GET_EVENTS_ADMIN = gql`
  query GetEventsAdmin($input: GetEventsAdminInput!) {
    getEventsAdmin(input: $input) {
      count
      results {
        id
        fullDate
        start_date
        added_by
        end_date
        name
        eventDates
        admin_website_url
        admin_schedule_url
        date
        month
        listDates
        year
        day
        fullDate
        nextStartTime
        isMultiDay
        nextGateTime
        nextFullDate
        status
        track {
          id
          name
        }
        user {
          id
          first_name
          last_name
        }
        series {
          id
          name
        }
        status
        color_code
        isMultiDay
        faqs {
          id
          question
          answer
        }
        tickets {
          id
          color_code
          end_date
          isMultiDay
          start_date
          name
          price
          date
          start_time
          gate_time
        }
        admin_tickets {
          id
          color_code
          end_date
          isMultiDay
          start_date
          name
          price
          date
          start_time
          gate_time
        }
        admin_multiday_tickets {
          id
          end_date
          start_date
          name
          price
          color_code
          start_time
          gate_time
          isMultiDay
        }
        admin_other_tickets {
          id
          name
          price
          end_date
          start_date
          color_code
        }
      }
    }
  }
`;

export function useGetEventsAdmin() {
  const { input } = useSearchInput();
  const { pathname } = useLocation();
  const { id: idParam } = useParams();

  const id = Number(idParam);

  const type = pathname.includes('track')
    ? 'track'
    : pathname.includes('/admin/series')
    ? 'series'
    : 'events';

  const variables = {
    input: {
      ...input,
      ...(type === 'track' ? { track_id: id } : null),
      ...(type === 'series' ? { series_id: id } : null)
    }
  };

  return useQuery(GET_EVENTS_ADMIN, { variables });
}
