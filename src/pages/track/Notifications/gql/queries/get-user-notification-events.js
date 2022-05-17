import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEventYearFilter } from 'components/YearDropdown';

export const NOTIFICATION_EVENTS = gql`
  query GetUserNotificationEvents($year: Int!) {
    getUserNotificationEvents(year: $year) {
      count
      results {
        id
        name
        day
        date
        month
        isMultiDay
        listDates
        fullDate
      }
    }
    getPromoterLists {
      id
      code
      name
      recipient_count
      track_id
      series_id
      track {
        id
        name
      }
      series {
        id
        name
      }
      messages_sent
      reply_message
    }
    me {
      id
      first_name
      last_name
      ownership {
        tracks {
          id
          name
        }
        series {
          id
          name
        }
      }
      messageCount
      racerCount
      staffCount
      guestCount
    }
  }
`;

export function useGetNotificationEvents() {
  const { yearFilter } = useEventYearFilter();

  const variables = {
    year: yearFilter,
  };
  return useQuery(NOTIFICATION_EVENTS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
}
